"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Bell, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationItem } from "@/molecules/notification-item"
import { NotificationFilters } from "@/molecules/notification-filters"
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  archiveNotification,
} from "@/lib/store/slices/notificationsSlice"
import type { RootState, AppDispatch } from "@/lib/store/store"
import type { Notification } from "@/lib/types/notifications"

interface NotificationListProps {
  onViewDetails?: (notification: Notification) => void
}

export function NotificationList({ onViewDetails }: NotificationListProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { notifications, loading, error, filters, unreadCount } = useSelector((state: RootState) => state.notifications)
  const [selectedTab, setSelectedTab] = useState<"all" | "unread" | "read" | "archived">("all")

  useEffect(() => {
    dispatch(fetchNotifications())
  }, [dispatch])

  const handleMarkAsRead = (id: string) => {
    dispatch(markAsRead(id))
  }

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead())
  }

  const handleDelete = (id: string) => {
    dispatch(deleteNotification(id))
  }

  const handleArchive = (id: string) => {
    dispatch(archiveNotification(id))
  }

  const filteredNotifications = notifications.filter((notification) => {
    // Apply status filter based on tab
    if (selectedTab === "unread" && notification.status !== "unread") return false
    if (selectedTab === "read" && notification.status !== "read") return false
    if (selectedTab === "archived" && notification.status !== "archived") return false

    // Apply search filter
    if (
      filters.search &&
      !notification.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !notification.message.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false
    }

    // Apply category filter
    if (filters.category !== "all" && notification.category !== filters.category) {
      return false
    }

    // Apply priority filter
    if (filters.priority.length > 0 && !filters.priority.includes(notification.priority)) {
      return false
    }

    // Apply status filter
    if (filters.status !== "all" && notification.status !== filters.status) {
      return false
    }

    // Apply date range filter
    if (filters.dateRange.from && filters.dateRange.to) {
      // Safely parse dates, checking for invalid values
      const notifDate = notification.timestamp ? new Date(notification.timestamp) : null
      const fromDate = new Date(filters.dateRange.from)
      const toDate = new Date(filters.dateRange.to)

      // Only apply filter if we have valid dates
      if (notifDate && !isNaN(notifDate.getTime()) && !isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        const notifTime = notifDate.getTime()
        if (notifTime < fromDate.getTime() || notifTime > toDate.getTime()) {
          return false
        }
      }
    }

    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Notifications</h2>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      <NotificationFilters />

      <Tabs value={selectedTab} onValueChange={(value) => setSelectedTab(value as any)}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread" className="relative">
            Unread
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium text-white bg-primary">
                {unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="read">Read</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <div className="mt-4 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-500">
              <p>Error loading notifications. Please try again.</p>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <Bell className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No notifications found</p>
              <p className="text-sm">
                {selectedTab === "all"
                  ? "You don't have any notifications matching your filters."
                  : selectedTab === "unread"
                    ? "You don't have any unread notifications."
                    : selectedTab === "read"
                      ? "You don't have any read notifications."
                      : "You don't have any archived notifications."}
              </p>
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                  onArchive={handleArchive}
                  onClick={onViewDetails}
                />
              ))}
            </div>
          )}
        </div>
      </Tabs>
    </div>
  )
}
