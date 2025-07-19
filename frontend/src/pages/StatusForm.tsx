import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, Tag, GitBranch, Hash } from 'lucide-react'
import { useCreateStatus, useUpdateStatus, useStatus, useStatuses } from '../hooks/useStatuses'
import { CreateStatusDto } from '../types'

const StatusForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const { data: status, isLoading: isLoadingStatus } = useStatus(id || '')
  const { data: allStatuses } = useStatuses()
  const createStatus = useCreateStatus()
  const updateStatus = useUpdateStatus()

  const [formData, setFormData] = useState<CreateStatusDto>({
    name: '',
    parent_id: '',
    order: 1
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (status && isEditing) {
      setFormData({
        name: status.name,
        parent_id: status.parent_id || '',
        order: status.order
      })
    }
  }, [status, isEditing])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (formData.order < 1) {
      newErrors.order = 'Order must be at least 1'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    // Prepare data for submission - handle empty parent_id
    const submitData = {
      ...formData,
      parent_id: formData.parent_id || undefined // Convert empty string to undefined
    }
    
    try {
      if (isEditing && id) {
        await updateStatus.mutateAsync({ id, data: submitData })
        alert('Status updated successfully')
      } else {
        await createStatus.mutateAsync(submitData)
        alert('Status created successfully')
      }
      navigate('/statuses')
    } catch (error: any) {
      console.error('Error saving status:', error)
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        alert(`Error saving status: ${error.response.data.message}`)
      } else if (error.response?.data?.error) {
        alert(`Error saving status: ${error.response.data.error}`)
      } else {
        alert('Error saving status. Please try again.')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? parseInt(value) || 1 : value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (isLoadingStatus && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading status...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/statuses')}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Status' : 'New Status'}
            </h1>
            <p className="text-purple-100 mt-1">
              {isEditing ? 'Update status information' : 'Create a new status in the system'}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Status Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <Tag className="h-5 w-5 text-purple-600" />
              <span>Status Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                    errors.name 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Scheduled"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Parent Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Parent Status
                </label>
                <div className="relative">
                  <GitBranch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select
                    name="parent_id"
                    value={formData.parent_id}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="">No parent (root status)</option>
                    {allStatuses?.filter(s => s.id !== id).map(status => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Order */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order *
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      errors.order 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="1"
                  />
                </div>
                {errors.order && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.order}</p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/statuses')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createStatus.isPending || updateStatus.isPending}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>
                {createStatus.isPending || updateStatus.isPending
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Status'
                  : 'Create Status'
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StatusForm 