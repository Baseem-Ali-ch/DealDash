"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { markAsRead, deleteNotification, archiveNotification } from "@/lib/store/slices/notificationsSlice"
import type { RootState, AppDispatch } from "@/lib/store/store"

interface NotificationBulkActionsProps {
  selectedNotifications: string[]
  onSelectAll: () => void
  onClearSelection: () => void
  allSelected: boolean
}

export function NotificationBulkActions({
  selectedNotifications,
  onSelectAll,
  onClearSelection,
  allSelected,
}: NotificationBulkActionsProps) {
  const dispatch = useDispatch<AppDispatch>()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { notifications } = useSelector((state: RootState) => state.notifications)

  const handleMarkAsRead = () => {
    selectedNotifications.forEach((id) => {
      dispatch(markAsRead(id))
    })
    onClearSelection()
  }

  const handleArchive = () => {
    selectedNotifications.forEach((id) => {
      dispatch(archiveNotification(id))
    })
    onClearSelection()
  }

  const handleDelete = () => {
    selectedNotifications.forEach((id) => {
      dispatch(deleteNotification(id))
    })
    setIsDeleteDialogOpen(false)
    onClearSelection()
  }

  if (selectedNotifications.length === 0) {
    return null
  }

  return (
    <>
      <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-2"
            onClick={allSelected ? onClearSelection : onSelectAll}
          >
            {allSelected ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
            <span className="text-sm">{selectedNotifications.length} selected</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleMarkAsRead}>
            Mark as read
          </Button>

          <Button variant="ghost" size="sm" onClick={handleArchive}>
            Archive
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </Button>
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notifications</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedNotifications.length} notification
              {selectedNotifications.length !== 1 ? "s" : ""}? This action cannot be undone.
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
