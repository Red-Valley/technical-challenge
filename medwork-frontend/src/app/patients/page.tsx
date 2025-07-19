"use client";
import { apiClient } from "@/clients/main";
import {
  UserIcon,
  PlusIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CreatePatientModal from "@/components/CreatePatientModal";
import ChangePatientStatusModal from "@/components/ChangePatientStatusModal";
import ShowPatientStatusHistoryModal from "@/components/ShowPatientStatusHistoryModal";
import DeletePatientModal from "@/components/DeletePatientModal";
import EditPatientModal from "@/components/EditPatientModal";
import { AxiosResponse } from "axios";
import { Patient, Provider, Status } from "../../constants/models";
import {
  PATIENTS_QUERY_KEY,
  PROVIDERS_QUERY_KEY,
} from "../../constants/queryKeys";
import AssignProviderModal from "@/components/AssignProviderModal";

export default function PatientsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "provider" | "status" | null
  >(null);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");

  // Fetch providers and statuses for filters
  const { data: providersResponse } = useQuery<AxiosResponse<Provider[]>>({
    queryKey: [PROVIDERS_QUERY_KEY],
    queryFn: () => apiClient.get("/providers"),
  });

  const { data: statusesResponse } = useQuery<AxiosResponse<Status[]>>({
    queryKey: ["statuses"],
    queryFn: () => apiClient.get("/statuses"),
  });

  const providers = providersResponse?.data || [];
  const statuses = statusesResponse?.data || [];

  // Build query parameters
  const queryParams = new URLSearchParams();
  if (activeFilter === "provider" && selectedProviderId) {
    queryParams.append("providerId", selectedProviderId);
  } else if (activeFilter === "status" && selectedStatusId) {
    queryParams.append("statusId", selectedStatusId);
  }

  const queryUrl = queryParams.toString()
    ? `/patients?${queryParams.toString()}`
    : "/patients";

  const {
    data: patients,
    error,
    isLoading,
  } = useQuery<AxiosResponse<Patient[]>>({
    queryKey: [
      PATIENTS_QUERY_KEY,
      activeFilter,
      selectedProviderId,
      selectedStatusId,
    ],
    queryFn: () => apiClient.get(queryUrl),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const clearFilters = () => {
    setActiveFilter(null);
    setSelectedProviderId("");
    setSelectedStatusId("");
  };

  const getFilterLabel = () => {
    if (activeFilter === "provider" && selectedProviderId) {
      const provider = providers.find((p) => p.id === selectedProviderId);
      return `Provider: ${provider?.fullName || "Unknown"}`;
    }
    if (activeFilter === "status" && selectedStatusId) {
      const status = statuses.find((s) => s.id === selectedStatusId);
      return `Status: ${status?.name || "Unknown"}`;
    }
    return null;
  };

  const filterLabel = getFilterLabel();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-600">
            Manage patients and their clinical information
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Patient
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filters
          </h3>
          {filterLabel && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Active filter:</span>
              <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                {filterLabel}
              </span>
              <button
                onClick={clearFilters}
                className="text-gray-400 hover:text-gray-600"
                title="Clear filters"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Provider Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Provider
            </label>
            <select
              value={activeFilter === "provider" ? selectedProviderId : ""}
              onChange={(e) => {
                if (e.target.value) {
                  setActiveFilter("provider");
                  setSelectedProviderId(e.target.value);
                  setSelectedStatusId("");
                } else {
                  setActiveFilter(null);
                  setSelectedProviderId("");
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All providers</option>
              {providers.map((provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.fullName} - {provider.specialty}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Status
            </label>
            <select
              value={activeFilter === "status" ? selectedStatusId : ""}
              onChange={(e) => {
                if (e.target.value) {
                  setActiveFilter("status");
                  setSelectedStatusId(e.target.value);
                  setSelectedProviderId("");
                } else {
                  setActiveFilter(null);
                  setSelectedStatusId("");
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All statuses</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Patients List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">
              Medical Patients
            </h2>
            {filterLabel && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Showing {patients?.data?.length || 0} patients
                </span>
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {filterLabel}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients?.data?.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {patient.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {patient.id.slice(0, 8)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="text-sm text-gray-900">
                          {patient.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {patient.phone}
                        </div>
                      </div>
                      <EditPatientModal
                        patientId={patient.id}
                        patientName={patient.fullName}
                        currentEmail={patient.email}
                        currentPhone={patient.phone}
                        currentProviderId={patient.providerId}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          patient.provider?.fullName
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {patient.provider?.fullName || "Unassigned"}
                      </span>
                      {!patient.providerId && (
                        <AssignProviderModal
                          patientId={patient.id}
                          patientName={patient.fullName}
                          currentProviderId={patient.providerId}
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {patient.status?.name || "Unknown"}
                      </span>
                      <ChangePatientStatusModal
                        patientId={patient.id}
                        currentStatusId={patient.statusId}
                        currentStatusName={patient.status?.name || "Unknown"}
                        patientName={patient.fullName}
                      />
                      <ShowPatientStatusHistoryModal
                        patientId={patient.id}
                        patientName={patient.fullName}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <DeletePatientModal
                      patientId={patient.id}
                      patientName={patient.fullName}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Patient Modal */}
      <CreatePatientModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
