"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { ChangeStatusDto } from "@/constants/DTO";
import { PATIENTS_QUERY_KEY } from "@/constants/queryKeys";
import { Status } from "@/constants/models";
import { AxiosError } from "axios";
import { ApiResponse } from "@/constants/responses";

interface ChangePatientStatusModalProps {
  patientId: string;
  currentStatusId: string;
  patientName: string;
  currentStatusName: string;
}

interface NextStatusesResponse {
  data: Status[];
}

export default function ChangePatientStatusModal({
  patientId,
  currentStatusId,
  patientName,
  currentStatusName,
}: ChangePatientStatusModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch available next statuses
  const { data: nextStatusesResponse, isLoading: isLoadingStatuses } =
    useQuery<NextStatusesResponse>({
      queryKey: ["statuses", currentStatusId, "next"],
      queryFn: () => apiClient.get(`/statuses/${currentStatusId}/next`),
      enabled: isOpen, // Only fetch when modal is open
    });

  const nextStatuses = nextStatusesResponse?.data || [];

  // Validation schema
  const validationSchema = Yup.object({
    statusId: Yup.string()
      .required("Status is required")
      .uuid("Please select a valid status"),
  });

  // Initial values
  const initialValues: ChangeStatusDto = {
    statusId: "",
  };

  const changeStatusMutation = useMutation({
    mutationFn: (data: ChangeStatusDto) =>
      apiClient.patch(`/patients/${patientId}/status`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
      setIsOpen(false);
    },
    onError: (error: unknown) => {
      alert(
        (error as AxiosError<ApiResponse<null>>)?.response?.data?.message ||
          "Failed to change patient status"
      );
    },
  });

  const handleSubmit = (
    values: ChangeStatusDto,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    changeStatusMutation.mutate(values, {
      onSuccess: () => {
        resetForm();
        setSubmitting(false);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-blue-600 hover:text-blue-900 ml-2"
        title="Change Status"
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Change Patient Status"
        size="md"
      >
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Changing status for:{" "}
            <span className="font-medium text-gray-900">{patientName}</span>
            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ml-4">
              {currentStatusName || "Unknown"}
            </span>
          </p>
        </div>

        {isLoadingStatuses ? (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">
              Loading available statuses...
            </div>
          </div>
        ) : nextStatuses.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-sm text-gray-500">
              No status changes available
            </div>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-6">
                {/* Status Selection */}
                <div>
                  <label
                    htmlFor="statusId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    New Status *
                  </label>
                  <Field
                    as="select"
                    id="statusId"
                    name="statusId"
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.statusId && touched.statusId
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a new status</option>
                    {nextStatuses.map((status: Status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="statusId"
                    component="p"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting || changeStatusMutation.isPending}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting || changeStatusMutation.isPending
                      ? "Changing..."
                      : "Change Status"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </Modal>
    </>
  );
}
