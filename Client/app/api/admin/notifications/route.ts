import { NextResponse } from "next/server"
import type { Notification } from "@/lib/types/notifications"

// Mock database
const notifications: Notification[] = [
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
  // More notifications...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let filteredNotifications = [...notifications]

  // Apply filters if provided
  const category = searchParams.get("category")
  if (category && category !== "all") {
    filteredNotifications = filteredNotifications.filter((n) => n.category === category)
  }

  const status = searchParams.get("status")
  if (status && status !== "all") {
    filteredNotifications = filteredNotifications.filter((n) => n.status === status)
  }

  const priority = searchParams.get("priority")
  if (priority) {
    const priorities = priority.split(",")
    filteredNotifications = filteredNotifications.filter((n) => priorities.includes(n.priority))
  }

  const search = searchParams.get("search")
  if (search) {
    const searchLower = search.toLowerCase()
    filteredNotifications = filteredNotifications.filter(
      (n) => n.title.toLowerCase().includes(searchLower) || n.message.toLowerCase().includes(searchLower),
    )
  }

  const fromDate = searchParams.get("from")
  const toDate = searchParams.get("to")
  if (fromDate && toDate) {
    filteredNotifications = filteredNotifications.filter((n) => {
      const notifDate = new Date(n.timestamp).getTime()
      return notifDate >= new Date(fromDate).getTime() && notifDate <= new Date(toDate).getTime()
    })
  }

  return NextResponse.json(filteredNotifications)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.message || !data.category || !data.priority) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create new notification
    const newNotification: Notification = {
      id: `notif${Date.now()}`,
      title: data.title,
      message: data.message,
      category: data.category,
      priority: data.priority,
      timestamp: new Date().toISOString(),
      status: "unread",
      actionUrl: data.actionUrl,
      actionLabel: data.actionLabel,
      metadata: data.metadata,
    }

    notifications.unshift(newNotification)

    return NextResponse.json(newNotification, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
