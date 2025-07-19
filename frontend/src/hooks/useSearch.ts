import { useState, useMemo } from 'react'
import { usePatients } from './usePatients'
import { useProviders } from './useProviders'

export interface SearchResult {
  id: string
  type: 'patient' | 'provider'
  name: string
  email?: string
  phone?: string
  specialty?: string
  status?: string
  href: string
}

export const useSearch = (query: string) => {
  const { data: patients } = usePatients()
  const { data: providers } = useProviders()

  const results = useMemo(() => {
    if (!query.trim() || !patients || !providers) return []

    const searchTerm = query.toLowerCase()
    const results: SearchResult[] = []

    // Search in patients
    patients.forEach(patient => {
      const matchesName = patient.full_name.toLowerCase().includes(searchTerm)
      const matchesEmail = patient.email.toLowerCase().includes(searchTerm)
      const matchesPhone = patient.phone.toLowerCase().includes(searchTerm)

      if (matchesName || matchesEmail || matchesPhone) {
        results.push({
          id: patient.id,
          type: 'patient',
          name: patient.full_name,
          email: patient.email,
          phone: patient.phone,
          status: patient.status_id,
          href: `/patients?search=${encodeURIComponent(patient.full_name)}`
        })
      }
    })

    // Search in providers
    providers.forEach(provider => {
      const matchesName = provider.full_name.toLowerCase().includes(searchTerm)
      const matchesSpecialty = provider.specialty.toLowerCase().includes(searchTerm)

      if (matchesName || matchesSpecialty) {
        results.push({
          id: provider.id,
          type: 'provider',
          name: provider.full_name,
          specialty: provider.specialty,
          href: `/providers?search=${encodeURIComponent(provider.full_name)}`
        })
      }
    })

    // Sort by relevance (name matches first, then other fields)
    return results.sort((a, b) => {
      const aNameMatch = a.name.toLowerCase().includes(searchTerm)
      const bNameMatch = b.name.toLowerCase().includes(searchTerm)
      
      if (aNameMatch && !bNameMatch) return -1
      if (!aNameMatch && bNameMatch) return 1
      return a.name.localeCompare(b.name)
    }).slice(0, 10) // Limit to 10 results
  }, [query, patients, providers])

  return results
} 