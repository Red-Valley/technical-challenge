"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PencilIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { UpdatePatientDto } from "@/constants/DTO";
import { PATIENTS_QUERY_KEY, PROVIDERS_QUERY_KEY } from "@/constants/queryKeys";
import { Provider } from "@/constants/models";
import { AxiosError } from "axios";
import { ApiResponse } from "@/constants/responses";

interface EditPatientModalProps {
  patientId: string;
  patientName: string;
  currentEmail: string;
  currentPhone: string;
  currentProviderId: string | null;
}

interface ProvidersResponse {
  data: Provider[];
}

export default function EditPatientModal({
  patientId,
  patientName,
  currentEmail,
  currentPhone,
  currentProviderId,
}: EditPatientModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch providers for the dropdown
  const { data: providersResponse } = useQuery<ProvidersResponse>({
    queryKey: [PROVIDERS_QUERY_KEY],
    queryFn: () => apiClient.get("/providers"),
    enabled: isOpen,
  });

  const providers = providersResponse?.data || [];

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      .max(20, "Phone number must be less than 20 characters"),
    providerId: Yup.string()
      .nullable()
      .optional()
      .uuid("Please select a valid provider"),
  });

  // Initial values
  const initialValues: UpdatePatientDto = {
    email: currentEmail,
    phone: currentPhone,
    providerId: currentProviderId || undefined,
  };

  const updatePatientMutation = useMutation({
    mutationFn: (data: UpdatePatientDto) =>
      apiClient.patch(`/patients/${patientId}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
      setIsOpen(false);
    },
    onError: (error: unknown) => {
      console.error("Error updating patient:", error);
      alert(
        (error as AxiosError<ApiResponse<null>>)?.response?.data?.message ||
          "Failed to update patient"
      );
    },
  });

  const handleSubmit = (
    values: UpdatePatientDto,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    updatePatientMutation.mutate(values, {
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
        className="text-blue-600 hover:text-blue-900 mr-3"
        title="Edit Patient"
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Patient Information"
        size="md"
      >
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Editing information for:{" "}
            <span className="font-medium text-gray-900">{patientName}</span>
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="john.doe@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="+1234567890"
                />
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="mt-1 text-sm text-red-600"
                />
              </div>

              {/* Provider */}
              <div>
                <label
                  htmlFor="providerId"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Assigned Provider (Optional)
                </label>
                <Field
                  as="select"
                  id="providerId"
                  name="providerId"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.providerId && touched.providerId
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">No provider assigned</option>
                  {providers.map((provider: Provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.fullName} - {provider.specialty}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="providerId"
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
                  disabled={isSubmitting || updatePatientMutation.isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting || updatePatientMutation.isPending
                    ? "Updating..."
                    : "Update Patient"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
