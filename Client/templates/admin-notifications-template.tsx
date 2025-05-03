"use client"

import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationList } from "@/organisms/notification-list"
import { NotificationPreferencesForm } from "@/molecules/notification-preferences-form"
import { NotificationDetailModal } from "@/organisms/notification-detail-modal"
import { notificationService } from "@/lib/services/notification-socket"
import type { AppDispatch } from "@/lib/store/store"
import type { Notification } from "@/lib/types/notifications"

export function AdminNotificationsTemplate() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  useEffect(() => {
    // Initialize WebSocket connection for real-time notifications
    notificationService.initialize(dispatch)

    // Request browser notification permission - now using instance method
    if (typeof window !== "undefined" && "Notification" in window) {
      notificationService.requestNotificationPermission()
    }

    return () => {
      // Clean up WebSocket connection
      notificationService.disconnect()
    }
  }, [dispatch])

  const handleViewDetails = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Notification Center</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage your notifications and preferences</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <NotificationList onViewDetails={handleViewDetails} />
        </TabsContent>

        <TabsContent value="preferences">
          <div className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-6">
            <NotificationPreferencesForm />
          </div>
        </TabsContent>
      </Tabs>

      <NotificationDetailModal
        notification={selectedNotification}
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
      />
    </div>
  )
}
