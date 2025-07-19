"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { CreatePatientDto } from "@/constants/DTO";
import { PATIENTS_QUERY_KEY, PROVIDERS_QUERY_KEY } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Provider } from "@/constants/models";
import { AxiosError } from "axios";
import { ApiResponse } from "@/constants/responses";

interface CreatePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreatePatientModal({
  isOpen,
  onClose,
}: CreatePatientModalProps) {
  const queryClient = useQueryClient();

  // Fetch providers for the dropdown
  const { data: providersResponse } = useQuery({
    queryKey: [PROVIDERS_QUERY_KEY],
    queryFn: () => apiClient.get("/providers"),
  });

  const providers = providersResponse?.data || [];

  // Validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string()
      .required("Full name is required")
      .min(2, "Full name must be at least 2 characters")
      .max(100, "Full name must be less than 100 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Please enter a valid email address")
      .max(100, "Email must be less than 100 characters"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number")
      .max(20, "Phone number must be less than 20 characters"),
    providerId: Yup.string()
      //.required("Provider is required")
      .uuid("Please select a valid provider"),
  });

  // Initial values
  const initialValues: CreatePatientDto = {
    fullName: "",
    email: "",
    phone: "",
    providerId: "",
  };

  const createPatientMutation = useMutation({
    mutationFn: (data: CreatePatientDto) => apiClient.post("/patients", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PATIENTS_QUERY_KEY] });
      onClose();
    },
    onError: (error: unknown) => {
      console.error("Error creating patient:", error);
    },
  });

  const handleSubmit = (
    values: CreatePatientDto,
    {
      setSubmitting,
      resetForm,
    }: { setSubmitting: (isSubmitting: boolean) => void; resetForm: () => void }
  ) => {
    createPatientMutation.mutate(values, {
      onSuccess: () => {
        resetForm();
        setSubmitting(false);
      },
      onError: (error: unknown) => {
        setSubmitting(false);
        alert(
          (error as AxiosError<ApiResponse<null>>)?.response?.data?.message ||
            "Error creating patient"
        );
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Patient"
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
                placeholder="John Doe"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

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
                Assigned Provider *
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
                placeholder="Select a provider"
              >
                <option value="">Select a provider</option>
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
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || createPatientMutation.isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting || createPatientMutation.isPending
                  ? "Creating..."
                  : "Create Patient"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
