"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { MoreVertical, CheckCircle, Trash2, Archive, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { CategoryIcon } from "@/atoms/category-icon"
import { PriorityIndicator } from "@/atoms/priority-indicator"
import type { Notification } from "@/lib/types/notifications"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onDelete: (id: string) => void
  onArchive: (id: string) => void
  onClick?: (notification: Notification) => void
}

export function NotificationItem({ notification, onMarkAsRead, onDelete, onArchive, onClick }: NotificationItemProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { id, title, message, category, priority, timestamp, status, actionUrl, actionLabel } = notification

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (status === "unread") {
      onMarkAsRead(id)
    }
  }

  const handleDelete = () => {
    onDelete(id)
    setIsDeleteDialogOpen(false)
  }

  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation()
    onArchive(id)
  }

  const handleClick = () => {
    if (onClick) {
      onClick(notification)
    }
    if (status === "unread") {
      onMarkAsRead(id)
    }
  }

  return (
    <>
      <div
        className={cn(
          "flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors",
          status === "unread" && "bg-blue-50 dark:bg-blue-900/20",
        )}
        onClick={handleClick}
      >
        <div className="flex-shrink-0">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              priority === "critical"
                ? "bg-red-500"
                : priority === "high"
                  ? "bg-orange-500"
                  : priority === "medium"
                    ? "bg-yellow-500"
                    : "bg-blue-500",
            )}
          >
            <CategoryIcon category={category} size={20} className="text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-medium truncate">{title}</h4>
            <div className="flex items-center gap-2">
              <PriorityIndicator priority={priority} />
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {timestamp && !isNaN(new Date(timestamp).getTime())
                  ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
                  : "Unknown time"}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{message}</p>

          <div className="flex justify-between items-center mt-2">
            {actionUrl && (
              <Link
                href={actionUrl}
                className="text-xs text-primary font-medium hover:underline inline-flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {actionLabel || "View Details"}
                <ExternalLink className="ml-1 h-3 w-3" />
              </Link>
            )}

            <div className="flex items-center gap-2 ml-auto">
              {status === "unread" && (
                <button onClick={handleMarkAsRead} className="text-xs text-primary font-medium hover:underline">
                  Mark as read
                </button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {status === "unread" && (
                    <DropdownMenuItem onClick={handleMarkAsRead}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as read
                    </DropdownMenuItem>
                  )}

                  {status !== "archived" && (
                    <DropdownMenuItem onClick={handleArchive}>
                      <Archive className="mr-2 h-4 w-4" />
                      Archive
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsDeleteDialogOpen(true)
                    }}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
