"use client"

import { useState } from "react"
import type { Notification } from "@/lib/data/user-data"
import { NotificationItem } from "@/molecules/notification-item"
import { Button } from "@/atoms/button"
import { Input } from "@/atoms/input"
import { Search, Bell, Package, Tag, CreditCard } from "lucide-react"

interface NotificationsSectionProps {
  notifications: Notification[]
}

export const NotificationsSection = ({ notifications: initialNotifications }: NotificationsSectionProps) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | "order" | "promotion" | "account" | "payment">("all")
  const [showUnreadOnly, setShowUnreadOnly] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesReadStatus = !showUnreadOnly || !notification.read
    return matchesSearch && matchesType && matchesReadStatus
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && <Button onClick={handleMarkAllAsRead}>Mark All as Read</Button>}
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search notifications"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={typeFilter === "all" ? "default" : "outline"}
              onClick={() => setTypeFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={typeFilter === "order" ? "default" : "outline"}
              onClick={() => setTypeFilter("order")}
              size="sm"
            >
              <Package className="h-4 w-4 mr-2" />
              Orders
            </Button>
            <Button
              variant={typeFilter === "promotion" ? "default" : "outline"}
              onClick={() => setTypeFilter("promotion")}
              size="sm"
            >
              <Tag className="h-4 w-4 mr-2" />
              Promotions
            </Button>
            <Button
              variant={typeFilter === "account" ? "default" : "outline"}
              onClick={() => setTypeFilter("account")}
              size="sm"
            >
              <Bell className="h-4 w-4 mr-2" />
              Account
            </Button>
            <Button
              variant={typeFilter === "payment" ? "default" : "outline"}
              onClick={() => setTypeFilter("payment")}
              size="sm"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payments
            </Button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            className={showUnreadOnly ? "bg-primary/10" : ""}
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
          >
            {showUnreadOnly ? "Show All" : "Show Unread Only"}
          </Button>
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{unreadCount} unread notifications</span>
        </div>

        <div className="space-y-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No notifications found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
