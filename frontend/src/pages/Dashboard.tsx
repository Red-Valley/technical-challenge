import { Link } from 'react-router-dom'
import { 
  Users, 
  UserCheck, 
  Tag, 
  Activity, 
  TrendingUp, 
  Calendar,
  Clock,
  Plus,
  ArrowRight,
  Eye,
  Stethoscope,
  Heart,
  AlertCircle,
  CheckCircle,
  Wifi
} from 'lucide-react'
import { usePatients } from '../hooks/usePatients'
import { useProviders } from '../hooks/useProviders'
import { useStatuses } from '../hooks/useStatuses'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { useRecentActivity } from '../hooks/useRecentActivity'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import { DashboardMetrics } from '../components/DashboardMetrics'

const Dashboard = () => {
  const { data: patients, isLoading: patientsLoading, refetch: refetchPatients } = usePatients()
  const { data: providers, isLoading: providersLoading, refetch: refetchProviders } = useProviders()
  const { data: statuses, isLoading: statusesLoading, refetch: refetchStatuses } = useStatuses()
  const stats = useDashboardStats()
  const recentActivity = useRecentActivity(5)

  // Auto-refresh data every 30 seconds
  useAutoRefresh(() => {
    refetchPatients()
    refetchProviders()
    refetchStatuses()
  }, 30000)

  const isLoading = patientsLoading || providersLoading || statusesLoading

  const getStatusName = (statusId?: string) => {
    if (!statusId || !statuses) return 'No status'
    const status = statuses.find(s => s.id === statusId)
    return status?.name || 'No status'
  }

  const getStatusColor = (statusId?: string) => {
    if (!statusId) return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
    const status = statuses?.find(s => s.id === statusId)
    const statusName = status?.name?.toLowerCase() || ''
    
    if (statusName.includes('scheduled')) return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
    if (statusName.includes('checked')) return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
    if (statusName.includes('consultation')) return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
    if (statusName.includes('cancelled')) return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    if (statusName.includes('no-show')) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
    
    return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
  }

  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 1) return 'Now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCurrentTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    )
  }

  const dashboardStats = [
    {
      name: 'Total Patients',
      value: stats?.totalPatients || 0,
      change: stats?.patientGrowth || '0',
      changeType: stats?.recentPatients && stats.recentPatients > 0 ? 'increase' : 'neutral',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      href: '/patients',
      description: 'Registered patients'
    },
    {
      name: 'Active Patients',
      value: stats?.activePatients || 0,
      change: `${stats?.activePercentage || 0}%`,
      changeType: 'neutral',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      href: '/patients',
      description: 'With active status'
    },
    {
      name: 'In Consultation',
      value: stats?.inConsultationPatients || 0,
      change: `${stats?.inConsultationPatients || 0} active`,
      changeType: 'increase',
      icon: Stethoscope,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      href: '/patients',
      description: 'Currently consulting'
    },
    {
      name: 'Available Providers',
      value: stats?.totalProviders || 0,
      change: stats?.providerGrowth || '0',
      changeType: stats?.recentProviders && stats.recentProviders > 0 ? 'increase' : 'neutral',
      icon: UserCheck,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      href: '/providers',
      description: 'Medical providers'
    }
  ]

  const recentPatients = patients?.slice(0, 5) || []

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{getGreeting()}, Doctor!</h1>
                <p className="text-blue-100">Here's what's happening in your medical practice today</p>
              </div>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="text-2xl font-bold">{getCurrentTime()}</div>
            <div className="text-blue-100 text-sm">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center justify-end space-x-1 text-blue-100 text-xs">
              <Wifi className="h-3 w-3" />
              <span>Live data</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/patients/new"
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/40 transition-colors">
              <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">New Patient</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Register a new patient</p>
            </div>
          </div>
        </Link>

        <Link
          to="/providers/new"
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/40 transition-colors">
              <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">Add Provider</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Register a new provider</p>
            </div>
          </div>
        </Link>

        <Link
          to="/patients"
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 group"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
              <Eye className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">View All</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">See all patients</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Real-time Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <Link
            key={stat.name}
            to={stat.href}
            className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                stat.changeType === 'increase' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' :
                stat.changeType === 'decrease' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}>
                <TrendingUp className={`h-3 w-3 ${
                  stat.changeType === 'decrease' ? 'rotate-180' : ''
                }`} />
                <span>{stat.change}</span>
              </div>
            </div>
            
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-1">{stat.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description}</p>
            </div>
            
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors duration-200" />
          </Link>
        ))}
      </div>

      {/* Detailed Metrics */}
      <DashboardMetrics />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Patients */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Patients</h2>
            <Link
              to="/patients"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentPatients.length > 0 ? (
              recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {patient.full_name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {patient.email}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(patient.status_id)}`}>
                      {getStatusName(patient.status_id)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No patients registered yet</p>
                <Link
                  to="/patients/new"
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/40"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add first patient
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
          
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.action} • {formatRelativeTime(activity.time)}
                      </p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 