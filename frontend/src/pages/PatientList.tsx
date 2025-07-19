import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  Plus, 
  Edit, 
  Trash2, 
  History, 
  User, 
  Phone, 
  Mail, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Stethoscope
} from 'lucide-react'
import { usePatients, useDeletePatient, useUpdatePatient } from '../hooks/usePatients'
import { useProviders } from '../hooks/useProviders'
import { useStatuses } from '../hooks/useStatuses'

const PatientList = () => {
  const { data: patients, isLoading, error } = usePatients()
  const { data: providers } = useProviders()
  const { data: statuses } = useStatuses()
  const deletePatient = useDeletePatient()
  const updatePatient = useUpdatePatient()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedProvider, setSelectedProvider] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Read search parameter from URL
  useEffect(() => {
    const searchFromUrl = searchParams.get('search')
    if (searchFromUrl) {
      setSearchTerm(searchFromUrl)
    }
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading patients...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">Error loading patients: {error.message}</div>
      </div>
    )
  }

  const filteredPatients = patients?.filter(patient => {
    const matchesStatus = !selectedStatus || patient.status_id === selectedStatus
    const matchesProvider = !selectedProvider || patient.provider_id === selectedProvider
    const matchesSearch = !searchTerm || 
      patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesProvider && matchesSearch
  }) || []

  const getProviderName = (providerId?: string) => {
    if (!providerId || !providers) return 'Unassigned'
    const provider = providers.find(p => p.id === providerId)
    return provider?.full_name || 'Unassigned'
  }

  const getProviderSpecialty = (providerId?: string) => {
    if (!providerId || !providers) return ''
    const provider = providers.find(p => p.id === providerId)
    return provider?.specialty || ''
  }

  const getStatusName = (statusId?: string) => {
    if (!statusId || !statuses) return 'No status'
    const status = statuses.find(s => s.id === statusId)
    return status?.name || 'No status'
  }

  const getStatusColor = (statusId?: string) => {
    return 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600'
  }

  const handleDelete = async (id: string) => {
    const patient = patients?.find(p => p.id === id)
    const patientName = patient?.full_name || 'this patient'
    
    if (confirm(`Are you sure you want to delete ${patientName}? This action cannot be undone.`)) {
      try {
        console.log('Deleting patient:', id, patientName)
        await deletePatient.mutateAsync(id)
        alert(`${patientName} has been successfully deleted`)
      } catch (error) {
        console.error('Error deleting patient:', error)
        alert(`Error deleting ${patientName}. Please try again.`)
      }
    }
  }

  const handleStatusChange = async (patientId: string, newStatusId: string) => {
    try {
      // Prepare update data - send undefined for empty status_id to clear it
      const updateData: { status_id?: string } = {
        status_id: newStatusId && newStatusId.trim() !== '' ? newStatusId : undefined
      }
      
      await updatePatient.mutateAsync({
        id: patientId,
        data: updateData
      })
      
      const patient = patients?.find(p => p.id === patientId)
      const newStatus = statuses?.find(s => s.id === newStatusId)
      if (patient) {
        if (newStatus) {
          console.log(`Status of ${patient.full_name} updated to: ${newStatus.name}`)
        } else {
          console.log(`Status of ${patient.full_name} cleared`)
        }
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error updating status. Please try again.')
    }
  }

  const clearFilters = () => {
    setSelectedStatus('')
    setSelectedProvider('')
    setSearchTerm('')
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Patients</h1>
            <p className="text-blue-100 mt-1">
              {filteredPatients.length} of {patients?.length || 0} patients
            </p>
          </div>
          <Link
            to="/patients/new"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Patient</span>
          </Link>
        </div>
      </div>

      {/* Enhanced Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </h2>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Clear all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses?.map(status => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>
          </div>

          {/* Provider Filter */}
          <div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Providers</option>
              {providers?.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.full_name}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Patient Cards/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
              {/* Patient Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {patient.full_name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {patient.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{patient.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>{patient.phone}</span>
                </div>
              </div>

              {/* Provider */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <Stethoscope className="h-4 w-4" />
                  <span>Provider</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {getProviderName(patient.provider_id)}
                </p>
                {patient.provider_id && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getProviderSpecialty(patient.provider_id)}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>Status</span>
                </div>
                <select
                  value={patient.status_id || ''}
                  onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${getStatusColor(patient.status_id)}`}
                >
                  <option value="">No status</option>
                  {statuses?.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  to={`/patients/${patient.id}/edit`}
                  className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
                <Link
                  to={`/patients/${patient.id}/history`}
                  className="flex-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors flex items-center justify-center space-x-1"
                >
                  <History className="h-4 w-4" />
                  <span>History</span>
                </Link>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {patient.full_name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {patient.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{patient.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{patient.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {getProviderName(patient.provider_id)}
                      </div>
                      {patient.provider_id && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getProviderSpecialty(patient.provider_id)}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={patient.status_id || ''}
                        onChange={(e) => handleStatusChange(patient.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors ${getStatusColor(patient.status_id)}`}
                      >
                        <option value="">No status</option>
                        {statuses?.map(status => (
                          <option key={status.id} value={status.id}>
                            {status.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/patients/${patient.id}/edit`}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/patients/${patient.id}/history`}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                        >
                          <History className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No patients found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || selectedStatus || selectedProvider 
              ? 'Try adjusting your filters or search terms'
              : 'Get started by creating your first patient'
            }
          </p>
          <Link
            to="/patients/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Patient
          </Link>
        </div>
      )}
    </div>
  )
}

export default PatientList 