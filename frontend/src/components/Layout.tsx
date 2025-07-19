import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  Users, 
  UserCheck, 
  Home, 
  Tag, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Heart
} from 'lucide-react'
import { usePatients } from '../hooks/usePatients'
import { useProviders } from '../hooks/useProviders'
import { useStatuses } from '../hooks/useStatuses'
import { SearchBar } from './SearchBar'
import { NotificationCenter } from './NotificationCenter'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  
  // Data for sidebar stats
  const { data: patients } = usePatients()
  const { data: providers } = useProviders()
  const { data: statuses } = useStatuses()

  const navigation = [
    { 
      name: 'Dashboard', 
      href: '/', 
      icon: Home,
      category: 'main',
      description: 'Overview and analytics'
    },
    { 
      name: 'Patients', 
      href: '/patients', 
      icon: Users,
      category: 'management',
      description: 'Patient management'
    },
    { 
      name: 'Providers', 
      href: '/providers', 
      icon: UserCheck,
      category: 'management',
      description: 'Medical providers'
    },
    { 
      name: 'Statuses', 
      href: '/statuses', 
      icon: Tag,
      category: 'settings',
      description: 'Status configuration'
    },
  ]

  const mainNav = navigation.filter(item => item.category === 'main')
  const managementNav = navigation.filter(item => item.category === 'management')
  const settingsNav = navigation.filter(item => item.category === 'settings')

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
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

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Enhanced Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-20 lg:w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0 group`}>
          
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-20 px-4 lg:px-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="lg:block hidden">
                <span className="text-xl font-bold text-white">Medwork</span>
                <p className="text-blue-100 text-xs">Medical Management</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="mt-6 px-3 lg:px-4 space-y-6 flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <div className="lg:block hidden mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Main</h3>
              </div>
              <div className="space-y-2">
                {mainNav.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-3 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 group/item relative ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={`h-5 w-5 lg:mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="lg:block hidden">{item.name}</span>
                      
                      {/* Tooltip for mobile */}
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity lg:hidden whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Management Navigation */}
            <div>
              <div className="lg:block hidden mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Management</h3>
              </div>
              <div className="space-y-2">
                {managementNav.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-3 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 group/item relative ${
                        isActive
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={`h-5 w-5 lg:mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="lg:block hidden">{item.name}</span>
                      
                      {/* Tooltip for mobile */}
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity lg:hidden whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Settings Navigation */}
            <div>
              <div className="lg:block hidden mb-4">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Settings</h3>
              </div>
              <div className="space-y-2">
                {settingsNav.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href || 
                    (item.href !== '/' && location.pathname.startsWith(item.href))
                  
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center px-3 py-3 lg:py-3 text-sm font-medium rounded-xl transition-all duration-200 group/item relative ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className={`h-5 w-5 lg:mr-3 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                      <span className="lg:block hidden">{item.name}</span>
                      
                      {/* Tooltip for mobile */}
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover/item:opacity-100 transition-opacity lg:hidden whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </nav>



          {/* Enhanced Sidebar Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-sm font-bold text-white">AD</span>
              </div>
              <div className="lg:block hidden">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@medwork.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Enhanced Top Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center h-20 px-4 sm:px-6 lg:px-8">
              {/* Left side - Menu button */}
              <div className="flex-shrink-0">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
              
              {/* Center - Search Bar */}
              <div className="flex-1 mx-4 min-w-0">
                <SearchBar />
              </div>

              {/* Right side - Controls */}
              <div className="flex items-center space-x-4 flex-shrink-0">
                {/* Notifications */}
                <NotificationCenter />

                {/* Dark mode toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                {/* User Profile */}
                <div className="flex items-center space-x-3 p-2 rounded-xl bg-gray-100 dark:bg-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-white">AD</span>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Admin</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{getCurrentTime()}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Layout 