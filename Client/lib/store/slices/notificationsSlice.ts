import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type {
  Notification,
  NotificationPreferences,
  NotificationCategory,
  NotificationStatus,
} from "@/lib/types/notifications"

interface NotificationsState {
  notifications: Notification[]
  preferences: NotificationPreferences
  loading: boolean
  error: string | null
  unreadCount: number
  filters: {
    search: string
    category: NotificationCategory | "all"
    dateRange: { from: string | null; to: string | null }
    priority: string[]
    status: NotificationStatus | "all"
  }
}

const defaultPreferences: NotificationPreferences = {
  email: true,
  browser: true,
  mobile: false,
  sound: true,
  categories: {
    order: { enabled: true, email: true, browser: true, mobile: true },
    inventory: { enabled: true, email: true, browser: true, mobile: false },
    system: { enabled: true, email: true, browser: true, mobile: false },
    security: { enabled: true, email: true, browser: true, mobile: true },
    payment: { enabled: true, email: true, browser: true, mobile: true },
    customer: { enabled: true, email: true, browser: true, mobile: false },
    review: { enabled: true, email: true, browser: true, mobile: false },
  },
}

const initialState: NotificationsState = {
  notifications: [],
  preferences: defaultPreferences,
  loading: false,
  error: null,
  unreadCount: 0,
  filters: {
    search: "",
    category: "all",
    dateRange: { from: null, to: null },
    priority: [],
    status: "all",
  },
}

// Async thunks for API calls
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch('/api/admin/notifications')
      // const data = await response.json()
      // return data

      // Mock data for now
      return mockNotifications
    } catch (error) {
      return rejectWithValue("Failed to fetch notifications")
    }
  },
)

export const markAsRead = createAsyncThunk("notifications/markAsRead", async (id: string, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // await fetch(`/api/admin/notifications/${id}/read`, { method: 'PUT' })
    return id
  } catch (error) {
    return rejectWithValue("Failed to mark notification as read")
  }
})

export const markAllAsRead = createAsyncThunk("notifications/markAllAsRead", async (_, { rejectWithValue }) => {
  try {
    // In a real app, this would be an API call
    // await fetch('/api/admin/notifications/read-all', { method: 'PUT' })
    return true
  } catch (error) {
    return rejectWithValue("Failed to mark all notifications as read")
  }
})

export const deleteNotification = createAsyncThunk(
  "notifications/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/admin/notifications/${id}`, { method: 'DELETE' })
      return id
    } catch (error) {
      return rejectWithValue("Failed to delete notification")
    }
  },
)

export const archiveNotification = createAsyncThunk(
  "notifications/archiveNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // await fetch(`/api/admin/notifications/${id}/archive`, { method: 'PUT' })
      return id
    } catch (error) {
      return rejectWithValue("Failed to archive notification")
    }
  },
)

export const updatePreferences = createAsyncThunk(
  "notifications/updatePreferences",
  async (preferences: NotificationPreferences, { rejectWithValue }) => {
    try {
      // In a real app, this would be an API call
      // await fetch('/api/admin/notifications/preferences', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(preferences)
      // })
      return preferences
    } catch (error) {
      return rejectWithValue("Failed to update preferences")
    }
  },
)

// Mock data
const mockNotifications: Notification[] = [
  {
    id: "notif1",
    title: "New Order Received",
    message: "Order #12345 has been placed for $129.99",
    category: "order",
    priority: "medium",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: "unread",
    actionUrl: "/admin/orders/12345",
    actionLabel: "View Order",
  },
  {
    id: "notif2",
    title: "Low Stock Alert",
    message: "Product 'Wireless Headphones' is running low (5 units left)",
    category: "inventory",
    priority: "high",
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    status: "unread",
    actionUrl: "/admin/products/inventory",
    actionLabel: "Manage Inventory",
  },
  {
    id: "notif3",
    title: "Security Alert",
    message: "Multiple failed login attempts detected from IP 192.168.1.1",
    category: "security",
    priority: "critical",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: "unread",
    actionUrl: "/admin/settings/security",
    actionLabel: "Review Security",
  },
  {
    id: "notif4",
    title: "New Customer Registration",
    message: "John Doe has created an account",
    category: "customer",
    priority: "low",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    status: "read",
    actionUrl: "/admin/customers",
    actionLabel: "View Customer",
  },
  {
    id: "notif5",
    title: "System Update Available",
    message: "A new system update (v2.5.0) is available for installation",
    category: "system",
    priority: "medium",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "read",
    actionUrl: "/admin/settings/system",
    actionLabel: "Update System",
  },
  {
    id: "notif6",
    title: "New Review",
    message: "5-star review for 'Smart Watch Series 5'",
    category: "review",
    priority: "low",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "archived",
    actionUrl: "/admin/reviews",
    actionLabel: "View Review",
  },
  {
    id: "notif7",
    title: "Payment Failed",
    message: "Payment for order #12339 has failed",
    category: "payment",
    priority: "high",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "read",
    actionUrl: "/admin/orders/12339",
    actionLabel: "View Order",
  },
  {
    id: "notif8",
    title: "Database Backup Completed",
    message: "Weekly database backup completed successfully",
    category: "system",
    priority: "low",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "archived",
    actionUrl: "/admin/settings/backups",
    actionLabel: "View Backups",
  },
]

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload
    },
    setCategoryFilter: (state, action: PayloadAction<NotificationCategory | "all">) => {
      state.filters.category = action.payload
    },
    setDateRangeFilter: (state, action: PayloadAction<{ from: string | null; to: string | null }>) => {
      state.filters.dateRange = action.payload
    },
    setPriorityFilter: (state, action: PayloadAction<string[]>) => {
      state.filters.priority = action.payload
    },
    setStatusFilter: (state, action: PayloadAction<NotificationStatus | "all">) => {
      state.filters.status = action.payload
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      if (action.payload.status === "unread") {
        state.unreadCount += 1
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNotifications.fulfilled, (state, action: PayloadAction<Notification[]>) => {
        state.loading = false
        state.notifications = action.payload
        state.unreadCount = action.payload.filter((n) => n.status === "unread").length
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // Mark as read
      .addCase(markAsRead.fulfilled, (state, action: PayloadAction<string>) => {
        const notification = state.notifications.find((n) => n.id === action.payload)
        if (notification && notification.status === "unread") {
          notification.status = "read"
          state.unreadCount -= 1
        }
      })

      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach((notification) => {
          if (notification.status === "unread") {
            notification.status = "read"
          }
        })
        state.unreadCount = 0
      })

      // Delete notification
      .addCase(deleteNotification.fulfilled, (state, action: PayloadAction<string>) => {
        const index = state.notifications.findIndex((n) => n.id === action.payload)
        if (index !== -1) {
          if (state.notifications[index].status === "unread") {
            state.unreadCount -= 1
          }
          state.notifications.splice(index, 1)
        }
      })

      // Archive notification
      .addCase(archiveNotification.fulfilled, (state, action: PayloadAction<string>) => {
        const notification = state.notifications.find((n) => n.id === action.payload)
        if (notification) {
          if (notification.status === "unread") {
            state.unreadCount -= 1
          }
          notification.status = "archived"
        }
      })

      // Update preferences
      .addCase(updatePreferences.fulfilled, (state, action: PayloadAction<NotificationPreferences>) => {
        state.preferences = action.payload
      })
  },
})

export const {
  setSearchFilter,
  setCategoryFilter,
  setDateRangeFilter,
  setPriorityFilter,
  setStatusFilter,
  resetFilters,
  addNotification,
} = notificationsSlice.actions

export default notificationsSlice.reducer
