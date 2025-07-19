import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import { Patient, CreatePatientDto, UpdatePatientDto, UpdatePatientStatusDto } from '../types'

// Obtener todos los pacientes
export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: async (): Promise<Patient[]> => {
      const response = await api.get('/patients')
      return response.data
    },
  })
}

// Obtener un paciente por ID
export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patients', id],
    queryFn: async (): Promise<Patient> => {
      const response = await api.get(`/patients/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Crear paciente
export const useCreatePatient = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreatePatientDto): Promise<Patient> => {
      const response = await api.post('/patients', data)
      return response.data
    },
    onSuccess: (newPatient) => {
      // Update the cache immediately with the new data
      queryClient.setQueryData(['patients', newPatient.id], newPatient)
      
      // Invalidate and refetch the patients list
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}

// Actualizar paciente
export const useUpdatePatient = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePatientDto }): Promise<Patient> => {
      const response = await api.patch(`/patients/${id}`, data)
      return response.data
    },
    onSuccess: (updatedPatient, { id }) => {
      // Update the cache immediately with the new data
      queryClient.setQueryData(['patients', id], updatedPatient)
      
      // Invalidate and refetch the patients list
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      
      // Also invalidate the specific patient query to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['patients', id] })
    },
  })
}

// Actualizar estado del paciente
export const useUpdatePatientStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePatientStatusDto }): Promise<Patient> => {
      const response = await api.patch(`/patients/${id}/status`, data)
      return response.data
    },
    onSuccess: (updatedPatient, { id }) => {
      // Update the cache immediately with the new data
      queryClient.setQueryData(['patients', id], updatedPatient)
      
      // Invalidate and refetch the patients list
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      
      // Also invalidate the specific patient query and history
      queryClient.invalidateQueries({ queryKey: ['patients', id] })
      queryClient.invalidateQueries({ queryKey: ['patients', id, 'history'] })
    },
  })
}

// Eliminar paciente
export const useDeletePatient = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/patients/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}

// Obtener historial de estados
export const usePatientStatusHistory = (id: string) => {
  return useQuery({
    queryKey: ['patients', id, 'history'],
    queryFn: async () => {
      const response = await api.get(`/patients/${id}/status-history`)
      return response.data
    },
    enabled: !!id,
  })
} 