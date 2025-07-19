import { useDashboardStats } from '../hooks/useDashboardStats'
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react'

export const DashboardMetrics = () => {
  const stats = useDashboardStats()

  if (!stats) return null

  const patientDistribution = [
    { label: 'Active', value: stats.activePatients, color: 'bg-green-500' },
    { label: 'Scheduled', value: stats.scheduledPatients, color: 'bg-blue-500' },
    { label: 'In Consultation', value: stats.inConsultationPatients, color: 'bg-purple-500' },
    { label: 'Checked-in', value: stats.checkedInPatients, color: 'bg-orange-500' }
  ]

  const weeklyGrowth = [
    { label: 'New Patients', value: stats.recentPatients, icon: Users, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'New Providers', value: stats.recentProviders, icon: UserCheck, color: 'text-green-600 dark:text-green-400' }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Patient Distribution Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Patient Distribution</h3>
        <div className="space-y-4">
          {patientDistribution.map((item, index) => {
            const percentage = stats.totalPatients > 0 ? Math.round((item.value / stats.totalPatients) * 100) : 0
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">({percentage}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weekly Growth */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Growth</h3>
        <div className="space-y-4">
          {weeklyGrowth.map((item, index) => {
            const Icon = item.icon
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${item.color}`} />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">+{item.value}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
} 