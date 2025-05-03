"use client"

import { formatDistanceToNow, format } from "date-fns"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CategoryIcon } from "@/atoms/category-icon"
import { PriorityIndicator } from "@/atoms/priority-indicator"
import type { Notification } from "@/lib/types/notifications"

interface NotificationDetailModalProps {
  notification: Notification | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationDetailModal({ notification, open, onOpenChange }: NotificationDetailModalProps) {
  if (!notification) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CategoryIcon category={notification.category} size={20} />
            {notification.title}
          </DialogTitle>
          <DialogDescription className="flex items-center justify-between">
            <span>{formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}</span>
            <PriorityIndicator priority={notification.priority} showLabel />
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">{notification.message}</p>

          {notification.metadata && (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md text-sm">
              <h4 className="font-medium mb-2">Additional Information</h4>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                {Object.entries(notification.metadata).map(([key, value]) => (
                  <div key={key} className="col-span-2">
                    <dt className="font-medium text-gray-500 dark:text-gray-400 inline">{key}: </dt>
                    <dd className="inline">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="text-xs text-gray-500 dark:text-gray-400">
            <p>Received on {format(new Date(notification.timestamp), "PPP 'at' p")}</p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>

          {notification.actionUrl && (
            <Link href={notification.actionUrl}>
              <Button className="gap-2">
                {notification.actionLabel || "View Details"}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
