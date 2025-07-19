import { useMemo } from 'react'
import { Users, UserCheck } from 'lucide-react'
import { usePatients } from './usePatients'
import { useProviders } from './useProviders'

export interface RecentActivity {
  id: string
  type: 'patient' | 'provider'
  action: string
  name: string
  time: Date
  icon: any
  color: string
}

export const useRecentActivity = (limit: number = 5) => {
  const { data: patients } = usePatients()
  const { data: providers } = useProviders()

  const recentActivity = useMemo(() => {
    if (!patients || !providers) return []

    const now = new Date()
    const activities: RecentActivity[] = []

    // Add recent patients
    patients.forEach(patient => {
      activities.push({
        id: patient.id,
        type: 'patient',
        action: 'Registered',
        name: patient.full_name,
        time: new Date(patient.created_at),
        icon: Users,
        color: 'text-blue-600 dark:text-blue-400'
      })
    })

    // Add recent providers
    providers.forEach(provider => {
      activities.push({
        id: provider.id,
        type: 'provider',
        action: 'Added',
        name: provider.full_name,
        time: new Date(provider.created_at),
        icon: UserCheck,
        color: 'text-green-600 dark:text-green-400'
      })
    })

    // Sort by time (most recent first) and limit
    return activities
      .sort((a, b) => b.time.getTime() - a.time.getTime())
      .slice(0, limit)
  }, [patients, providers, limit])

  return recentActivity
} 