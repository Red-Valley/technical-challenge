import { useMemo } from 'react'
import { usePatients } from './usePatients'
import { useProviders } from './useProviders'
import { useStatuses } from './useStatuses'

export const useDashboardStats = () => {
  const { data: patients } = usePatients()
  const { data: providers } = useProviders()
  const { data: statuses } = useStatuses()

  const stats = useMemo(() => {
    if (!patients || !providers || !statuses) return null

    const totalPatients = patients.length
    const totalProviders = providers.length
    const totalStatuses = statuses.length

    // Calculate patients by status
    const patientsByStatus = patients.reduce((acc, patient) => {
      const status = statuses.find(s => s.id === patient.status_id)
      const statusName = status?.name?.toLowerCase() || 'no-status'
      
      if (!acc[statusName]) {
        acc[statusName] = 0
      }
      acc[statusName]++
      return acc
    }, {} as Record<string, number>)

    // Active patients (not cancelled or no-show)
    const activePatients = patients.filter(p => {
      const status = statuses.find(s => s.id === p.status_id)
      const statusName = status?.name?.toLowerCase() || ''
      return !statusName.includes('cancelled') && !statusName.includes('no-show')
    }).length

    // Scheduled patients
    const scheduledPatients = patientsByStatus['scheduled'] || 0

    // In consultation patients
    const inConsultationPatients = patientsByStatus['in consultation'] || 0

    // Checked-in patients
    const checkedInPatients = patientsByStatus['checked-in'] || 0

    // Calculate percentages
    const activePercentage = totalPatients > 0 ? Math.round((activePatients / totalPatients) * 100) : 0
    const scheduledPercentage = totalPatients > 0 ? Math.round((scheduledPatients / totalPatients) * 100) : 0

    // Calculate recent activity (last 7 days)
    const now = new Date()
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const recentPatients = patients.filter(p => 
      new Date(p.created_at) >= sevenDaysAgo
    ).length

    const recentProviders = providers.filter(p => 
      new Date(p.created_at) >= sevenDaysAgo
    ).length

    // Calculate growth rates
    const patientGrowth = recentPatients > 0 ? `+${recentPatients}` : '0'
    const providerGrowth = recentProviders > 0 ? `+${recentProviders}` : '0'

    return {
      totalPatients,
      activePatients,
      scheduledPatients,
      inConsultationPatients,
      checkedInPatients,
      totalProviders,
      totalStatuses,
      activePercentage,
      scheduledPercentage,
      patientGrowth,
      providerGrowth,
      patientsByStatus,
      recentPatients,
      recentProviders
    }
  }, [patients, providers, statuses])

  return stats
} 