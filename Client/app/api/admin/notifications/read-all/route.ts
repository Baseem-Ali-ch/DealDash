import { NextResponse } from "next/server"

// This would connect to your database in a real application
let notifications = [
  // Your notifications array from the main route
]

export async function PUT() {
  try {
    // Update all unread notifications
    notifications = notifications.map((notification) => {
      if (notification.status === "unread") {
        return { ...notification, status: "read" }
      }
      return notification
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark all notifications as read" }, { status: 500 })
  }
}
