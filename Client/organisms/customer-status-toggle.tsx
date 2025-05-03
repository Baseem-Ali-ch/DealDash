"use client"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { CustomerStatusBadge } from "@/molecules/customer-status-badge"
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react"

type CustomerStatus = "active" | "inactive" | "banned"

interface CustomerStatusToggleProps {
  customerId: string
  initialStatus: CustomerStatus
  onStatusChange: (customerId: string, newStatus: CustomerStatus) => Promise<void>
}

export function CustomerStatusToggle({ customerId, initialStatus, onStatusChange }: CustomerStatusToggleProps) {
  const [status, setStatus] = useState<CustomerStatus>(initialStatus)
  const [isChanging, setIsChanging] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    newStatus: CustomerStatus | null
    title: string
    description: string
  }>({
    isOpen: false,
    newStatus: null,
    title: "",
    description: "",
  })

  const handleStatusChange = async (newStatus: CustomerStatus) => {
    // If trying to ban, show confirmation dialog
    if (newStatus === "banned") {
      setConfirmDialog({
        isOpen: true,
        newStatus,
        title: "Ban Customer",
        description:
          "Are you sure you want to ban this customer? They will no longer be able to log in or place orders.",
      })
      return
    }

    // If changing from banned to active, show confirmation
    if (status === "banned" && newStatus === "active") {
      setConfirmDialog({
        isOpen: true,
        newStatus,
        title: "Unban Customer",
        description: "Are you sure you want to unban this customer? They will regain access to their account.",
      })
      return
    }

    // Otherwise, proceed with the change
    await executeStatusChange(newStatus)
  }

  const executeStatusChange = async (newStatus: CustomerStatus) => {
    setIsChanging(true)
    try {
      await onStatusChange(customerId, newStatus)
      setStatus(newStatus)
    } catch (error) {
      console.error("Failed to change customer status:", error)
    } finally {
      setIsChanging(false)
      setConfirmDialog({ ...confirmDialog, isOpen: false, newStatus: null })
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Status:</span>
          <CustomerStatusBadge status={status} />
        </div>

        <div className="flex gap-2">
          <Button
            variant={status === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("active")}
            disabled={status === "active" || isChanging}
            className="flex items-center gap-1"
          >
            <ShieldCheck className="h-4 w-4" />
            <span>Active</span>
          </Button>

          <Button
            variant={status === "inactive" ? "default" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("inactive")}
            disabled={status === "inactive" || isChanging}
            className="flex items-center gap-1"
          >
            <Shield className="h-4 w-4" />
            <span>Inactive</span>
          </Button>

          <Button
            variant={status === "banned" ? "destructive" : "outline"}
            size="sm"
            onClick={() => handleStatusChange("banned")}
            disabled={status === "banned" || isChanging}
            className="flex items-center gap-1"
          >
            <ShieldAlert className="h-4 w-4" />
            <span>Banned</span>
          </Button>
        </div>
      </div>

      <AlertDialog
        open={confirmDialog.isOpen}
        onOpenChange={(isOpen) => setConfirmDialog({ ...confirmDialog, isOpen })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
            <AlertDialogDescription>{confirmDialog.description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => confirmDialog.newStatus && executeStatusChange(confirmDialog.newStatus)}
              className={
                confirmDialog.newStatus === "banned"
                  ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  : ""
              }
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
