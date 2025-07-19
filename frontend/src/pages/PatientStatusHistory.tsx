import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock, User } from 'lucide-react'
import { usePatient } from '../hooks/usePatients'
import { usePatientStatusHistory } from '../hooks/usePatients'
import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'

const PatientStatusHistory = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  
  const { data: patient, isLoading: isLoadingPatient } = usePatient(id || '')
  const { data: history, isLoading: isLoadingHistory } = usePatientStatusHistory(id || '')

  if (isLoadingPatient || isLoadingHistory) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading history...</div>
      </div>
    )
  }

  if (!patient) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">Patient not found</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/patients')}
          className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Status History</h1>
          <p className="text-gray-600 dark:text-gray-400">Patient status change history</p>
        </div>
      </div>

      {/* Patient Information */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-12 w-12">
            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{patient.full_name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{patient.email}</p>
            <p className="text-gray-600 dark:text-gray-400">{patient.phone}</p>
          </div>
        </div>
      </div>

      {/* Status History */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Status Changes</h3>
        
        {history && history.length > 0 ? (
          <div className="space-y-4">
            {history.map((item: any, index: number) => (
              <div key={item.id} className="flex items-start space-x-4">
                {/* Timeline dot */}
                <div className="flex-shrink-0">
                  <div className={`h-4 w-4 rounded-full ${
                    index === 0 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(item.changed_at), "MMMM dd, yyyy 'at' HH:mm", { locale: enUS })}
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.status?.name || 'Unknown status'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No status change history</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientStatusHistory 