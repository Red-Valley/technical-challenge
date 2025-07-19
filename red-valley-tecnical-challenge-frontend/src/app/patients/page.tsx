'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setSelectedPatient } from '../store/slices/patientsSlice'
import { useState, useEffect } from 'react'
import {
  usePatients,
  useDeletePatient,
  useUpdatePatientStatus,
  useStatuses,
  useStatusHistory,
  Patient,
  Status,
  StatusHistoryEntry,
} from '../lib/hooks/usePatients'
import { Button } from '../components/ui/atoms/Button'
import { Trash } from 'lucide-react'

export default function PatientsPage() {
  const dispatch = useDispatch()
  const selectedId = useSelector((state: RootState) => state.patients.selectedPatientId)
  const [selectedStatusId, setSelectedStatusId] = useState<string | undefined>()

  const { data: patients, isLoading, isError } = usePatients()
  const { data: statuses } = useStatuses()
  const { data: statusHistory } = useStatusHistory(selectedId ?? undefined)
  const deletePatientMutation = useDeletePatient()
  const updateStatusMutation = useUpdatePatientStatus(selectedId ?? undefined)

  useEffect(() => {
    const currentPatient = patients?.find((p) => p.id === selectedId)
    setSelectedStatusId(currentPatient?.status?.id)
  }, [selectedId, patients])

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-500">Error to load patients.</p>

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <h1 className="text-2xl font-bold mb-4">Patients</h1>
        <ul className="space-y-2 max-h-[500px] overflow-auto">
          {patients?.map((p) => (
            <li
              key={p.id}
              className={`p-4 border rounded cursor-pointer flex gap-3 ${
                selectedId === p.id ? 'bg-transparent border-blue-700' : 'bg-transparent border-gray-300'
              }`}
              onClick={() => dispatch(setSelectedPatient(p.id))}
            >
              <div>
                <strong className="text-xl font-semibold">{p.full_name}</strong>
                <p className="text-sm text-gray-600">
                  Doctor: {p.provider?.full_name || 'Unassigned'}, Specialty: {p.provider?.specialty || 'N/A'}
                </p>
                {p.status?.name ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        {
                          Scheduled: 'bg-blue-500',
                          'Checked-In': 'bg-green-500',
                          'In Consultation': 'bg-yellow-500',
                          Cancelled: 'bg-red-500',
                          'No-Show': 'bg-gray-500',
                        }[p.status.name] || 'bg-neutral-400'
                      }`}
                      title={`Estado: ${p.status.name}`}
                    />
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">Estado: N/A</p>
                )}
              </div>
              <Button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this patient?')) {
                    deletePatientMutation.mutate(p.id)
                  }
                }}
                buttonClass="text-red-500 hover:underline ml-4 flex items-center gap-2 mt-1 cursor-pointer"
              >
                Delete <Trash />
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {selectedId && (
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-4">Update Status</h2>

          <select
            className="border border-gray-300 rounded px-3 py-2 mb-6 w-full max-w-xs"
            value={selectedStatusId}
            onChange={(e) => {
              const newStatusId = e.target.value
              setSelectedStatusId(newStatusId)
              updateStatusMutation.mutate(newStatusId)
            }}
            disabled={updateStatusMutation.status === "pending"}
          >
            <option value="">Select status</option>
            {statuses?.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>

          <h3 className="text-lg font-semibold mb-2">Status History</h3>
          <ul className="max-h-64 overflow-auto border border-gray-200 rounded p-2">
            {statusHistory?.length ? (
              statusHistory.map((entry) => (
                <li key={entry.id} className="border-b border-gray-200 py-1 last:border-b-0">
                  <strong>{entry.status.name}</strong>{' '}
                  <span className="text-sm text-gray-500">- {new Date(entry.updatedAt).toLocaleString()}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No status history available.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
