import { useState, useRef, useEffect } from 'react'
import { Bell, AlertCircle, CheckCircle, Info, X } from 'lucide-react'
import { useDashboardStats } from '../hooks/useDashboardStats'

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const notificationRef = useRef<HTMLDivElement>(null)
  const stats = useDashboardStats()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (!stats) return

    const newNotifications: Notification[] = []

    // Check for patients without status
    const patientsWithoutStatus = stats.totalPatients - stats.activePatients - (stats.patientsByStatus['cancelled'] || 0) - (stats.patientsByStatus['no-show'] || 0)
    if (patientsWithoutStatus > 0) {
      newNotifications.push({
        id: 'no-status',
        type: 'warning',
        title: 'Patients without status',
        message: `${patientsWithoutStatus} patients need status assignment`,
        timestamp: new Date(),
        read: false
      })
    }

    // Check for high consultation load
    if (stats.inConsultationPatients > 3) {
      newNotifications.push({
        id: 'high-load',
        type: 'warning',
        title: 'High consultation load',
        message: `${stats.inConsultationPatients} patients currently in consultation`,
        timestamp: new Date(),
        read: false
      })
    }

    // Check for recent activity
    if (stats.recentPatients > 0) {
      newNotifications.push({
        id: 'new-patients',
        type: 'success',
        title: 'New patients this week',
        message: `${stats.recentPatients} new patients registered`,
        timestamp: new Date(),
        read: false
      })
    }

    setNotifications(newNotifications)
  }, [stats])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return CheckCircle
      case 'warning':
        return AlertCircle
      case 'info':
        return Info
      default:
        return Info
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'info':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getNotificationBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20'
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20'
      default:
        return 'bg-gray-50 dark:bg-gray-700'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (minutes < 1) return 'Now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div ref={notificationRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="p-2">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type)
                  return (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg mb-2 transition-colors ${
                        notification.read 
                          ? 'bg-gray-50 dark:bg-gray-700' 
                          : getNotificationBgColor(notification.type)
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${getNotificationColor(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No notifications</p>
                <p className="text-sm text-gray-400 dark:text-gray-500">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 