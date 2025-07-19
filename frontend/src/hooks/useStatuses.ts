import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import { Status, CreateStatusDto, UpdateStatusDto } from '../types'

// Obtener todos los estados
export const useStatuses = () => {
  return useQuery({
    queryKey: ['statuses'],
    queryFn: async (): Promise<Status[]> => {
      const response = await api.get('/statuses')
      return response.data
    },
  })
}

// Obtener un estado por ID
export const useStatus = (id: string) => {
  return useQuery({
    queryKey: ['statuses', id],
    queryFn: async (): Promise<Status> => {
      const response = await api.get(`/statuses/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Crear estado
export const useCreateStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateStatusDto): Promise<Status> => {
      const response = await api.post('/statuses', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}

// Actualizar estado
export const useUpdateStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateStatusDto }): Promise<Status> => {
      const response = await api.patch(`/statuses/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
      queryClient.invalidateQueries({ queryKey: ['statuses', id] })
    },
  })
}

// Eliminar estado
export const useDeleteStatus = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/statuses/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['statuses'] })
    },
  })
}

// Obtener estados raíz
export const useRootStatuses = () => {
  return useQuery({
    queryKey: ['statuses', 'root'],
    queryFn: async (): Promise<Status[]> => {
      const response = await api.get('/statuses/root')
      return response.data
    },
  })
}

// Obtener estados hijos
export const useStatusChildren = (parentId: string) => {
  return useQuery({
    queryKey: ['statuses', parentId, 'children'],
    queryFn: async (): Promise<Status[]> => {
      const response = await api.get(`/statuses/${parentId}/children`)
      return response.data
    },
    enabled: !!parentId,
  })
} 