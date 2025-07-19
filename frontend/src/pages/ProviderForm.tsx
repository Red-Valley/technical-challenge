import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Save, UserCheck, Stethoscope } from 'lucide-react'
import { useCreateProvider, useUpdateProvider, useProvider } from '../hooks/useProviders'
import { CreateProviderDto } from '../types'

const ProviderForm = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id

  const { data: provider, isLoading: isLoadingProvider } = useProvider(id || '')
  const createProvider = useCreateProvider()
  const updateProvider = useUpdateProvider()

  const [formData, setFormData] = useState<CreateProviderDto>({
    full_name: '',
    specialty: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (provider && isEditing) {
      setFormData({
        full_name: provider.full_name,
        specialty: provider.specialty
      })
    }
  }, [provider, isEditing])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    }

    if (!formData.specialty.trim()) {
      newErrors.specialty = 'Specialty is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      if (isEditing && id) {
        await updateProvider.mutateAsync({ id, data: formData })
        alert('Provider updated successfully')
      } else {
        await createProvider.mutateAsync(formData)
        alert('Provider created successfully')
      }
      navigate('/providers')
    } catch (error) {
      console.error('Error saving provider:', error)
      alert('Error saving provider. Please try again.')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (isLoadingProvider && isEditing) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading provider...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-green-800 rounded-xl p-6 text-white">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/providers')}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Provider' : 'New Provider'}
            </h1>
            <p className="text-green-100 mt-1">
              {isEditing ? 'Update provider information' : 'Register a new medical provider'}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Provider Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              <span>Provider Information</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.full_name 
                      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  placeholder="Dr. John Smith"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.full_name}</p>
                )}
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Specialty *
                </label>
                <div className="relative">
                  <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="specialty"
                    value={formData.specialty}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                      errors.specialty 
                        ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                    } text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                    placeholder="Cardiology"
                  />
                </div>
                {errors.specialty && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.specialty}</p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate('/providers')}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createProvider.isPending || updateProvider.isPending}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>
                {createProvider.isPending || updateProvider.isPending
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Provider'
                  : 'Create Provider'
                }
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProviderForm 