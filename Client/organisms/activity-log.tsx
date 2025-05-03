"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, LogIn, Settings, ShoppingCart, AlertTriangle, RefreshCw } from "lucide-react"

// Sample activity data
const activityData = [
  {
    id: "act_001",
    type: "login",
    description: "Logged in from Chrome on Windows",
    timestamp: "2023-05-15T10:30:00Z",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
  },
  {
    id: "act_002",
    type: "settings",
    description: "Changed account password",
    timestamp: "2023-05-14T15:45:00Z",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
  },
  {
    id: "act_003",
    type: "order",
    description: "Processed order #ORD-2023-0005",
    timestamp: "2023-05-13T09:15:00Z",
    ipAddress: "192.168.1.1",
    location: "New York, USA",
  },
  {
    id: "act_004",
    type: "login",
    description: "Logged in from Safari on macOS",
    timestamp: "2023-05-12T14:20:00Z",
    ipAddress: "192.168.1.2",
    location: "Boston, USA",
  },
  {
    id: "act_005",
    type: "security",
    description: "Failed login attempt",
    timestamp: "2023-05-11T08:10:00Z",
    ipAddress: "203.0.113.1",
    location: "Unknown",
  },
]

export function ActivityLog() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "login":
        return <LogIn className="h-4 w-4" />
      case "settings":
        return <Settings className="h-4 w-4" />
      case "order":
        return <ShoppingCart className="h-4 w-4" />
      case "security":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "login":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
            Login
          </Badge>
        )
      case "settings":
        return (
          <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">
            Settings
          </Badge>
        )
      case "order":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
            Order
          </Badge>
        )
      case "security":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
            Security
          </Badge>
        )
      default:
        return <Badge variant="outline">Other</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Recent activity and login history for your account</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activityData.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-1 rounded-full p-2 bg-muted">{getActivityIcon(activity.type)}</div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{activity.description}</p>
                  {getActivityBadge(activity.type)}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                  <span>{formatDate(activity.timestamp)}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>IP: {activity.ipAddress}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <Button variant="outline">View All Activity</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
