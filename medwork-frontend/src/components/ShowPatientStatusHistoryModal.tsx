"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ClockIcon } from "@heroicons/react/24/outline";
import { apiClient } from "@/clients/main";
import Modal from "./Modal";
import { StatusHistory } from "@/constants/models";
import { AxiosError } from "axios";
import { ApiResponse } from "@/constants/responses";

interface ShowPatientStatusHistoryModalProps {
  patientId: string;
  patientName: string;
}

interface StatusHistoryResponse {
  data: StatusHistory[];
}

export default function ShowPatientStatusHistoryModal({
  patientId,
  patientName,
}: ShowPatientStatusHistoryModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Fetch patient status history
  const { data: historyResponse, isLoading, error } = useQuery<StatusHistoryResponse>({
    queryKey: ["patients", patientId, "history"],
    queryFn: () => apiClient.get(`/patients/${patientId}/history`),
    enabled: isOpen, // Only fetch when modal is open
  });

  const statusHistory = historyResponse?.data || [];

  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="text-gray-600 hover:text-gray-900 ml-2"
        title="View Status History"
      >
        <ClockIcon className="h-4 w-4" />
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Patient Status History"
        size="lg"
      >
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Status history for: <span className="font-medium text-gray-900">{patientName}</span>
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-sm text-gray-500">Loading status history...</div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-sm text-red-500">
              {((error as AxiosError<ApiResponse<null>>)?.response?.data?.message) || 
                "Failed to load status history"}
            </div>
          </div>
        ) : statusHistory.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-sm text-gray-500">No status history available</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Status Timeline</h3>
              <div className="space-y-3">
                {statusHistory.map((history, index) => (
                  <div key={history.id} className="flex items-start space-x-3">
                    {/* Timeline dot */}
                    <div className="flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-green-500' : 'bg-blue-500'
                      }`} />
                    </div>
                    
                    {/* Timeline line */}
                    {index < statusHistory.length - 1 && (
                      <div className="flex-shrink-0 w-0.5 h-8 bg-gray-300 ml-1.5" />
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {history.status?.name || 'Unknown Status'}
                          </span>
                          {index === 0 && (
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatDate(history.changedAt)}
                        </div>
                      </div>
                      
                      {history.status?.name && history.status.name !== 'Unknown Status' && (
                        <p className="text-sm text-gray-600 mt-1">
                          Status changed to {history.status.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Summary</h4>
              <div className="text-sm text-blue-800">
                <p>• Total status changes: {statusHistory.length}</p>
                <p>• Current status: {statusHistory[0]?.status?.name || 'Unknown'}</p>
                <p>• First recorded: {statusHistory[statusHistory.length - 1] ? 
                  formatDate(statusHistory[statusHistory.length - 1].changedAt) : 'N/A'}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}
