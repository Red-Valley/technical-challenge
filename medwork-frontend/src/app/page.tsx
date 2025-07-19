import { UserGroupIcon, UserIcon, ClockIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const stats = [
    { name: 'Total Patients', value: '1,234', icon: UserIcon, change: '+12%', changeType: 'positive' },
    { name: 'Active Providers', value: '45', icon: UserGroupIcon, change: '+5%', changeType: 'positive' },
    { name: 'Appointments Today', value: '89', icon: ClockIcon, change: '+23%', changeType: 'positive' },
    { name: 'Patient Satisfaction', value: '94%', icon: ChartBarIcon, change: '+2%', changeType: 'positive' },
  ];

  const recentActivities = [
    { id: 1, patient: 'John Doe', action: 'Appointment scheduled', time: '2 minutes ago' },
    { id: 2, patient: 'Jane Smith', action: 'Status updated', time: '5 minutes ago' },
    { id: 3, patient: 'Mike Johnson', action: 'New patient registered', time: '10 minutes ago' },
    { id: 4, patient: 'Sarah Wilson', action: 'Provider assigned', time: '15 minutes ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Medwork</h2>
        <p className="text-gray-600">
          Manage your patients, providers, and clinical statuses efficiently with our comprehensive dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserIcon className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            <UserIcon className="h-4 w-4 mr-2" />
            Add New Patient
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors">
            <UserGroupIcon className="h-4 w-4 mr-2" />
            Add New Provider
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <ClockIcon className="h-4 w-4 mr-2" />
            Schedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
