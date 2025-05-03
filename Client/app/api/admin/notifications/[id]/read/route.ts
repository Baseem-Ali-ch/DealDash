import { NextResponse } from "next/server"

// This would connect to your database in a real application
const notifications = [
  // Your notifications array from the main route
]

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Find the notification
    const notificationIndex = notifications.findIndex((n) => n.id === id)

    if (notificationIndex === -1) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    // Update the status
    notifications[notificationIndex].status = "read"

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
  }
}
