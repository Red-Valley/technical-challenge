'use client'
import { useProviders } from '../lib/hooks/useProviders'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setSelectedProvider } from '../store/slices/providersSlice'
import { Button } from '../components/ui/atoms/Button'
import { Trash } from 'lucide-react'

export default function ProvidersPage() {
  const dispatch = useDispatch()
  const selected = useSelector((state: RootState) => state.providers.selectedProviderId)

  const { data: providers, isLoading, isError, deleteProvider } = useProviders()

  if (isLoading) return <p className="p-4">Loading...</p>
  if (isError) return <p className="p-4 text-red-500">Error fetching providers.</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Doctors</h1>
      <ul className="space-y-2">
        {providers?.map((prov) => (
          <li
            key={prov.id}
            className={`p-4 border rounded cursor-pointer flex justify-between items-center ${
              selected === prov.id ? 'bg-transparent border-green-700' : 'bg-transparent border-gray-300'
            }`}
            onClick={() => dispatch(setSelectedProvider(prov.id))}
          >
            <div>
              <strong>{prov.full_name}</strong>
              <p className="text-sm text-gray-600">{prov.specialty}</p>
            </div>

            <Button
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this provider?')) {
                  deleteProvider.mutate(prov.id)
                }
              }}
              buttonClass="text-red-500 hover:underline flex items-center gap-2"
              disabled={deleteProvider.status === 'pending'}
            >
              Delete <Trash />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
