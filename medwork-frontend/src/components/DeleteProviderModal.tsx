"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  TrashIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { PROVIDERS_QUERY_KEY } from "@/constants/queryKeys";
import { AxiosError } from "axios";
import { ApiResponse } from "@/constants/responses";

interface DeleteProviderModalProps {
  providerId: string;
  providerName: string;
  specialty: string;
}

export default function DeleteProviderModal({
  providerId,
  providerName,
  specialty,
}: DeleteProviderModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteProviderMutation = useMutation({
    mutationFn: () => apiClient.delete(`/providers/${providerId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PROVIDERS_QUERY_KEY] });
      setIsOpen(false);
    },
    onError: (error: unknown) => {
      console.error("Error deleting provider:", error);
      alert(
        (error as AxiosError<ApiResponse<null>>)?.response?.data?.message ||
          "Failed to delete provider"
      );
    },
  });

  const handleDelete = () => {
    deleteProviderMutation.mutate();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-red-600 hover:text-red-900"
        title="Delete Provider"
      >
        <TrashIcon className="h-4 w-4" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Delete Provider"
        size="md"
      >
        <div className="space-y-6">
          {/* Warning Icon and Message */}
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-red-800">
                This action cannot be undone
              </h3>
              <p className="text-sm text-red-700 mt-1">
                This will permanently delete the provider and all associated
                data.
              </p>
            </div>
          </div>

          {/* Provider Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Provider to be deleted:
            </h4>
            <div className="text-sm text-gray-700">
              <p className="font-medium">{providerName}</p>
              <p className="text-gray-500">Specialty: {specialty}</p>
              <p className="text-gray-500">ID: {providerId.slice(0, 8)}...</p>
            </div>
          </div>

          {/* What will be deleted */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">
              The following will be permanently deleted:
            </h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Provider information</li>
            </ul>
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
              type="button"
              onClick={handleDelete}
              disabled={deleteProviderMutation.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteProviderMutation.isPending
                ? "Deleting..."
                : "Delete Provider"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
