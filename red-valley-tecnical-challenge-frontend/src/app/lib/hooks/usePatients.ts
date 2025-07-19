
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export type Patient = {
  id: string
  full_name: string
  status?: { id: string; name: string }
  provider?: { id: string; full_name: string; specialty?: string }
}

export const usePatients = () => {
  return useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/api/patients')
      return data
    },
  })
}

export const useDeletePatient = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (patientId: string) => {
      await axios.delete(`http://localhost:3001/api/patients/${patientId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}

export const useUpdatePatientStatus = (patientId?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (statusId: string) => {
      if (!patientId) throw new Error("Patient ID required")
      return axios.put(`http://localhost:3001/api/patients/${patientId}/status`, {
        status_id: statusId,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      if (patientId) {
        queryClient.invalidateQueries({ queryKey: ['statusHistory', patientId] })
      }
    },
  })
}

export type Status = { id: string; name: string }
export const useStatuses = () => {
  return useQuery<Status[]>({
    queryKey: ['statuses'],
    queryFn: async () => {
      const { data } = await axios.get('http://localhost:3001/api/statuses')
      return data
    },
  })
}

export type StatusHistoryEntry = {
  id: string
  status: { id: string; name: string }
  updatedAt: string
}
export const useStatusHistory = (patientId?: string) => {
  return useQuery<StatusHistoryEntry[]>({
    queryKey: ['statusHistory', patientId],
    queryFn: async () => {
      if (!patientId) return []
      const { data } = await axios.get(
        `http://localhost:3001/api/patients/${patientId}/status-history`
      )
      return data
    },
    enabled: !!patientId,
  })
}
