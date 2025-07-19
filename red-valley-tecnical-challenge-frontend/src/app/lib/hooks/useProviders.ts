// lib/hooks/useProviders.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export type Provider = {
  id: string
  full_name: string
  specialty: string
}

const fetchProviders = async (): Promise<Provider[]> => {
  const { data } = await axios.get('http://localhost:3001/api/providers')
  return data
}

const deleteProvider = async (providerId: string) => {
  await axios.delete(`http://localhost:3001/api/providers/${providerId}`)
}

export const useProviders = () => {
  const queryClient = useQueryClient()

  const query = useQuery({ queryKey: ['patients'] , queryFn: fetchProviders})

  const mutation = useMutation({mutationFn:deleteProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })

  return {
    ...query,
    deleteProvider: mutation,
  }
}
