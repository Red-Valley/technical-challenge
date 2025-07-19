import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Tag, 
  Search,
  Filter,
  MoreVertical,
  Calendar,
  Hash,
  GitBranch
} from 'lucide-react'
import { useStatuses, useDeleteStatus } from '../hooks/useStatuses'

const StatusList = () => {
  const { data: statuses, isLoading, error } = useStatuses()
  const deleteStatus = useDeleteStatus()
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedParent, setSelectedParent] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading statuses...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">Error loading statuses: {error.message}</div>
      </div>
    )
  }

  // Get unique parent statuses for filter
  const parentStatuses = [...new Set(statuses?.map(s => s.parent_id).filter(Boolean) || [])]

  const filteredStatuses = statuses?.filter(status => {
    const matchesParent = !selectedParent || status.parent_id === selectedParent
    const matchesSearch = !searchTerm || 
      status.name.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesParent && matchesSearch
  }) || []

  const handleDelete = async (id: string) => {
    const status = statuses?.find(s => s.id === id)
    const statusName = status?.name || 'this status'
    
    if (confirm(`Are you sure you want to delete ${statusName}? This action cannot be undone.`)) {
      try {
        console.log('Deleting status:', id, statusName)
        await deleteStatus.mutateAsync(id)
        alert(`${statusName} has been successfully deleted`)
      } catch (error: any) {
        console.error('Error deleting status:', error)
        
        // Handle specific error messages from backend
        if (error.response?.data?.message) {
          alert(`Cannot delete ${statusName}: ${error.response.data.message}`)
        } else {
          alert(`Error deleting ${statusName}. Please try again.`)
        }
      }
    }
  }

  const clearFilters = () => {
    setSelectedParent('')
    setSearchTerm('')
  }

  const getParentName = (parentId?: string) => {
    if (!parentId || !statuses) return 'No parent'
    const parent = statuses.find(s => s.id === parentId)
    return parent?.name || 'No parent'
  }

  const getStatusColor = (statusName: string) => {
    const nameLower = statusName.toLowerCase()
    
    if (nameLower.includes('scheduled')) return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-700'
    if (nameLower.includes('checked')) return 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-700'
    if (nameLower.includes('consultation')) return 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 border-purple-200 dark:border-purple-700'
    if (nameLower.includes('cancelled')) return 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-700'
    if (nameLower.includes('no-show')) return 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700'
    
    return 'bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Statuses</h1>
            <p className="text-purple-100 mt-1">
              {filteredStatuses.length} of {statuses?.length || 0} statuses
            </p>
          </div>
          <Link
            to="/statuses/new"
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Status</span>
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
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
          >
            Clear all
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search statuses..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Parent Filter */}
          <div>
            <select
              value={selectedParent}
              onChange={(e) => setSelectedParent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All Parents</option>
              {parentStatuses.map(parentId => {
                const parent = statuses?.find(s => s.id === parentId)
                return (
                  <option key={parentId} value={parentId}>
                    {parent?.name || 'Unknown'}
                  </option>
                )
              })}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Status Cards/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStatuses.map((status) => (
            <div key={status.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200">
              {/* Status Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                    <Tag className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {status.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {status.id.slice(0, 8)}...
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Status Info */}
              <div className="space-y-3 mb-6">
                {/* Parent Status */}
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <GitBranch className="h-4 w-4" />
                    <span>Parent Status</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getParentName(status.parent_id)}
                  </p>
                </div>

                {/* Order */}
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <Hash className="h-4 w-4" />
                    <span>Order</span>
                  </div>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    {status.order}
                  </span>
                </div>

                {/* Creation Date */}
                <div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>Created</span>
                  </div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(status.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Link
                  to={`/statuses/${status.id}/edit`}
                  className="flex-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 px-3 py-2 rounded-lg text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors flex items-center justify-center space-x-1"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(status.id)}
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
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Parent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Creation Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredStatuses.map((status) => (
                  <tr key={status.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                            <Tag className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {status.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {status.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {getParentName(status.parent_id)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {status.order}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(status.created_at).toLocaleDateString('en-US')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/statuses/${status.id}/edit`}
                          className="text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-300"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(status.id)}
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
      {filteredStatuses.length === 0 && (
        <div className="text-center py-12">
          <Tag className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No statuses found
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {searchTerm || selectedParent 
              ? 'Try adjusting your filters or search terms'
              : 'Get started by creating your first status'
            }
          </p>
          <Link
            to="/statuses/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add First Status
          </Link>
        </div>
      )}
    </div>
  )
}

export default StatusList 