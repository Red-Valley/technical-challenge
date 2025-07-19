import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../services/api'
import { Provider, CreateProviderDto, UpdateProviderDto } from '../types'

// Obtener todos los proveedores
export const useProviders = () => {
  return useQuery({
    queryKey: ['providers'],
    queryFn: async (): Promise<Provider[]> => {
      const response = await api.get('/providers')
      return response.data
    },
  })
}

// Obtener un proveedor por ID
export const useProvider = (id: string) => {
  return useQuery({
    queryKey: ['providers', id],
    queryFn: async (): Promise<Provider> => {
      const response = await api.get(`/providers/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}

// Crear proveedor
export const useCreateProvider = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: CreateProviderDto): Promise<Provider> => {
      const response = await api.post('/providers', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] })
    },
  })
}

// Actualizar proveedor
export const useUpdateProvider = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProviderDto }): Promise<Provider> => {
      const response = await api.patch(`/providers/${id}`, data)
      return response.data
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['providers'] })
      queryClient.invalidateQueries({ queryKey: ['providers', id] })
    },
  })
}

// Eliminar proveedor
export const useDeleteProvider = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      await api.delete(`/providers/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['providers'] })
    },
  })
} 