"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { CreateProviderDto } from "@/app/constants/DTO";
import { PROVIDERS_QUERY_KEY } from "@/app/constants/queryKeys";

interface CreateProviderModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const commonSpecialties = [
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "Oncology",
  "Psychiatry",
  "Emergency Medicine",
  "Family Medicine",
  "Internal Medicine",
  "Surgery",
  "Radiology",
  "Anesthesiology",
  "Pathology",
  "Other",
] as const;
export default function CreateProviderModal({
  isOpen,
  onClose,
}: CreateProviderModalProps) {
  const queryClient = useQueryClient();

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    specialty: Yup.string()
      .required("Specialty is required")
      .oneOf(
        [
          "Cardiology",
          "Neurology",
          "Pediatrics",
          "Orthopedics",
          "Dermatology",
          "Oncology",
          "Psychiatry",
          "Emergency Medicine",
          "Family Medicine",
          "Internal Medicine",
          "Surgery",
          "Radiology",
          "Anesthesiology",
          "Pathology",
          "Other",
        ],
        "Please select a valid specialty"
      ),
  });

  // Initial values
  const initialValues: CreateProviderDto = {
    fullName: "",
    specialty: "",
  };

  const createProviderMutation = useMutation({
    mutationFn: (data: CreateProviderDto) => apiClient.post("/providers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      onClose();
    },
    onError: (error: unknown) => {
      console.error("Error creating provider:", error);
    },
  });

  const handleSubmit = (
    values: CreateProviderDto,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    createProviderMutation.mutate(values, {
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Provider"
      size="md"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name *
              </label>
              <Field
                type="text"
                id="fullName"
                name="fullName"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullName && touched.fullName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Dr. John Doe"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Specialty */}
            <div>
              <label
                htmlFor="specialty"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Specialty *
              </label>
              <Field
                as="select"
                id="specialty"
                name="specialty"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.specialty && touched.specialty
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Select a specialty"
              >
                <option value="">Select a specialty</option>
                {commonSpecialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="specialty"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || createProviderMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || createProviderMutation.isPending
                  ? "Creating..."
                  : "Create Provider"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
