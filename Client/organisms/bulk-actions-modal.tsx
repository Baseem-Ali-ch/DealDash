"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

// Mock categories - would come from API in real app
const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home" },
  { id: "cat4", name: "Books" },
  { id: "cat5", name: "Toys" },
]

export function BulkActionsModal({ isOpen, onClose, action, count, onConfirm }) {
  const [formData, setFormData] = useState({
    categoryId: "",
    status: "published",
    confirmText: "",
  })

  // Get action details
  const getActionDetails = () => {
    switch (action) {
      case "delete":
        return {
          title: "Delete Products",
          description: `Are you sure you want to delete ${count} products? This action cannot be undone.`,
          confirmText: "delete",
          confirmLabel: "Delete Products",
          confirmVariant: "destructive",
          fields: [],
        }
      case "category":
        return {
          title: "Change Category",
          description: `Update the category for ${count} products.`,
          confirmLabel: "Update Category",
          confirmVariant: "default",
          fields: ["category"],
        }
      case "publish":
        return {
          title: "Publish Products",
          description: `Are you sure you want to publish ${count} products? They will be visible to customers.`,
          confirmLabel: "Publish Products",
          confirmVariant: "default",
          fields: [],
        }
      case "draft":
        return {
          title: "Set Products to Draft",
          description: `Are you sure you want to set ${count} products to draft? They will no longer be visible to customers.`,
          confirmLabel: "Set to Draft",
          confirmVariant: "default",
          fields: [],
        }
      case "duplicate":
        return {
          title: "Duplicate Products",
          description: `Are you sure you want to duplicate ${count} products? This will create copies with "Copy of" prefixed to the name.`,
          confirmLabel: "Duplicate Products",
          confirmVariant: "default",
          fields: [],
        }
      default:
        return {
          title: "Bulk Action",
          description: `Perform action on ${count} products.`,
          confirmLabel: "Confirm",
          confirmVariant: "default",
          fields: [],
        }
    }
  }

  const actionDetails = getActionDetails()

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Check if confirm button should be disabled
  const isConfirmDisabled = () => {
    if (action === "delete" && formData.confirmText !== actionDetails.confirmText) {
      return true
    }

    if (action === "category" && !formData.categoryId) {
      return true
    }

    return false
  }

  // Handle confirm
  const handleConfirm = () => {
    onConfirm(formData)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{actionDetails.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p>{actionDetails.description}</p>

          {actionDetails.fields.includes("category") && (
            <div>
              <Label htmlFor="categoryId">Select Category</Label>
              <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                <SelectTrigger id="categoryId">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {mockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {action === "delete" && (
            <>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  This action cannot be undone. All selected products will be permanently deleted.
                </AlertDescription>
              </Alert>

              <div>
                <Label htmlFor="confirmText">Type "{actionDetails.confirmText}" to confirm</Label>
                <Input id="confirmText" name="confirmText" value={formData.confirmText} onChange={handleChange} />
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={actionDetails.confirmVariant} onClick={handleConfirm} disabled={isConfirmDisabled()}>
            {actionDetails.confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
