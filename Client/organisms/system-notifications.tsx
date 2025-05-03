"use client"

import { useState } from "react"
import { Bell, ShoppingBag, AlertTriangle, User, Star, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data
const notifications = [
  {
    id: 1,
    title: "New order received",
    message: "Order #12345 has been placed for $129.99",
    time: "5 minutes ago",
    read: false,
    type: "order",
  },
  {
    id: 2,
    title: "Low stock alert",
    message: "Product 'Wireless Headphones' is running low (5 units left)",
    time: "1 hour ago",
    read: false,
    type: "inventory",
  },
  {
    id: 3,
    title: "New customer registration",
    message: "John Doe has created an account",
    time: "3 hours ago",
    read: true,
    type: "customer",
  },
  {
    id: 4,
    title: "New review",
    message: "5-star review for 'Smart Watch Series 5'",
    time: "Yesterday",
    read: true,
    type: "review",
  },
  {
    id: 5,
    title: "Order fulfilled",
    message: "Order #12340 has been shipped to customer",
    time: "Yesterday",
    read: true,
    type: "order",
  },
  {
    id: 6,
    title: "Payment failed",
    message: "Payment for order #12339 has failed",
    time: "2 days ago",
    read: true,
    type: "payment",
  },
]

type NotificationType = "order" | "inventory" | "customer" | "review" | "payment"

interface NotificationItemProps {
  notification: {
    id: number
    title: string
    message: string
    time: string
    read: boolean
    type: NotificationType
  }
  onMarkAsRead: (id: number) => void
}

const NotificationItem = ({ notification, onMarkAsRead }: NotificationItemProps) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5" />
      case "inventory":
        return <AlertTriangle className="h-5 w-5" />
      case "customer":
        return <User className="h-5 w-5" />
      case "review":
        return <Star className="h-5 w-5" />
      case "payment":
        return notification.message.includes("failed") ? (
          <XCircle className="h-5 w-5" />
        ) : (
          <CheckCircle className="h-5 w-5" />
        )
    }
  }

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "order":
        return "bg-blue-500"
      case "inventory":
        return "bg-amber-500"
      case "customer":
        return "bg-green-500"
      case "review":
        return "bg-purple-500"
      case "payment":
        return notification.message.includes("failed") ? "bg-red-500" : "bg-green-500"
    }
  }

  return (
    <div
      className={cn(
        "flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50",
        !notification.read && "bg-blue-50 dark:bg-blue-900/20",
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0",
          getIconColor(notification.type),
        )}
      >
        {getIcon(notification.type)}
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{notification.title}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">{notification.time}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>

        {!notification.read && (
          <button
            onClick={() => onMarkAsRead(notification.id)}
            className="text-xs text-primary font-medium mt-2 hover:underline"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  )
}

export function SystemNotifications() {
  const [notificationsList, setNotificationsList] = useState(notifications)

  const handleMarkAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
  }

  const handleMarkAllAsRead = () => {
    setNotificationsList(notificationsList.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notificationsList.filter((notification) => !notification.read).length

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">System Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
              {unreadCount} new
            </span>
          )}
        </div>

        {unreadCount > 0 && (
          <button onClick={handleMarkAllAsRead} className="text-sm text-primary hover:underline">
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notificationsList.length > 0 ? (
          notificationsList.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} onMarkAsRead={handleMarkAsRead} />
          ))
        ) : (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">No notifications to display</div>
        )}
      </div>
    </div>
  )
}
