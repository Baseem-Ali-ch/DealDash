import { addNotification } from "@/lib/store/slices/notificationsSlice"
import type { Notification } from "@/lib/types/notifications"
import type { AppDispatch } from "@/lib/store/store"

export class NotificationSocketService {
  private socket: WebSocket | null = null
  private dispatch: AppDispatch | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectTimeout: NodeJS.Timeout | null = null

  constructor() {
    this.socket = null
  }

  initialize(dispatch: AppDispatch) {
    this.dispatch = dispatch
    this.connect()

    // Handle page visibility changes to reconnect when user returns
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && !this.isConnected()) {
        this.connect()
      }
    })

    // Clean up on page unload
    window.addEventListener("beforeunload", () => {
      this.disconnect()
    })
  }

  private connect() {
    if (this.socket?.readyState === WebSocket.OPEN) return

    try {
      // In a real app, this would be your WebSocket server URL
      this.socket = new WebSocket("wss://your-websocket-server.com/notifications")

      this.socket.onopen = () => {
        console.log("Notification WebSocket connected")
        this.reconnectAttempts = 0
      }

      this.socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data) as Notification
          if (this.dispatch) {
            this.dispatch(addNotification(notification))

            // Play sound for high priority notifications if enabled
            if ((notification.priority === "high" || notification.priority === "critical") && this.shouldPlaySound()) {
              this.playNotificationSound()
            }

            // Show browser notification if enabled
            if (this.shouldShowBrowserNotification()) {
              this.showBrowserNotification(notification)
            }
          }
        } catch (error) {
          console.error("Error processing notification:", error)
        }
      }

      this.socket.onclose = (event) => {
        console.log("Notification WebSocket disconnected:", event.code, event.reason)
        this.attemptReconnect()
      }

      this.socket.onerror = (error) => {
        console.error("Notification WebSocket error:", error)
        this.socket?.close()
      }
    } catch (error) {
      console.error("Failed to connect to notification WebSocket:", error)
      this.attemptReconnect()
    }
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log("Max reconnection attempts reached")
      return
    }

    this.reconnectAttempts++
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)

    console.log(`Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`)

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
    }

    this.reconnectTimeout = setTimeout(() => {
      this.connect()
    }, delay)
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }

    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
  }

  isConnected() {
    return this.socket?.readyState === WebSocket.OPEN
  }

  private shouldPlaySound() {
    // In a real app, this would check user preferences from Redux or localStorage
    return true
  }

  private playNotificationSound() {
    try {
      const audio = new Audio("/sounds/notification.mp3")
      audio.play()
    } catch (error) {
      console.error("Failed to play notification sound:", error)
    }
  }

  private shouldShowBrowserNotification() {
    // In a real app, this would check user preferences
    return Notification.permission === "granted"
  }

  private showBrowserNotification(notification: Notification) {
    try {
      new Notification(notification.title, {
        body: notification.message,
        icon: "/icons/notification-icon.png",
      })
    } catch (error) {
      console.error("Failed to show browser notification:", error)
    }
  }

  // Changed from static to instance method
  requestNotificationPermission() {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission !== "granted" && Notification.permission !== "denied") {
        Notification.requestPermission()
      }
    }
  }
}

export const notificationService = new NotificationSocketService()
