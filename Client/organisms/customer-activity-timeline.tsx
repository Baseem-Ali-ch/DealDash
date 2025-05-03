"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityTimelineItem, type ActivityType } from "@/molecules/activity-timeline-item"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  timestamp: string
  date: Date
  link?: {
    text: string
    href: string
  }
}

interface CustomerActivityTimelineProps {
  activities: Activity[]
}

export function CustomerActivityTimeline({ activities }: CustomerActivityTimelineProps) {
  const [filter, setFilter] = useState<ActivityType | "all">("all")

  const filteredActivities = activities
    .filter((activity) => filter === "all" || activity.type === filter)
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Activity Timeline</h3>
        <Select value={filter} onValueChange={(value) => setFilter(value as ActivityType | "all")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter activities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="purchase">Purchases</SelectItem>
            <SelectItem value="login">Logins</SelectItem>
            <SelectItem value="review">Reviews</SelectItem>
            <SelectItem value="comment">Comments</SelectItem>
            <SelectItem value="wishlist">Wishlist</SelectItem>
            <SelectItem value="return">Returns</SelectItem>
            <SelectItem value="email">Emails</SelectItem>
            <SelectItem value="support">Support</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-0 pt-2">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <ActivityTimelineItem
              key={activity.id}
              type={activity.type}
              title={activity.title}
              description={activity.description}
              timestamp={activity.timestamp}
              link={activity.link}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
            No activities found for this filter.
          </p>
        )}
      </div>
    </div>
  )
}
