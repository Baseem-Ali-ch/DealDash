export type NotificationCategory = "order" | "inventory" | "system" | "security" | "alert" | "other"
export type NotificationPriority = "low" | "medium" | "high" | "critical"
export type NotificationStatus = "unread" | "read" | "archived" | "deleted"

export interface Notification {
  id: string
  title: string
  message: string
  category: NotificationCategory
  priority: NotificationPriority
  timestamp: string // ISO format date string (YYYY-MM-DDTHH:mm:ss.sssZ)
  status: NotificationStatus
  actionUrl?: string
  actionLabel?: string
  metadata?: Record<string, any>
}

export interface NotificationPreferences {
  email: boolean
  browser: boolean
  mobile: boolean
  sound: boolean
  categories: {
    order: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    inventory: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    system: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    security: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    payment: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    customer: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
    review: { enabled: boolean; email: boolean; browser: boolean; mobile: boolean }
  }
}

export interface NotificationFilters {
  search: string
  category: NotificationCategory | "all"
  priority: NotificationPriority[]
  status: NotificationStatus | "all"
  dateRange: {
    from: string | null
    to: string | null
  }
}
