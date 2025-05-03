"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet"
import AddPromotionForm from "@/organisms/add-promotion-form"

interface PromotionSlideOverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: any) => void
  initialData?: Partial<any>
  isEditing?: boolean
}

export function PromotionSlideOver({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEditing = false,
}: PromotionSlideOverProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center justify-between">
            <SheetTitle>{isEditing ? "Edit Promotion" : "Create New Promotion"}</SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>
            {isEditing ? "Update the details of this promotion" : "Add a new promotion or discount code to your store"}
          </SheetDescription>
        </SheetHeader>
        <AddPromotionForm onSubmit={onSubmit} initialData={initialData} isEditing={isEditing} />
      </SheetContent>
    </Sheet>
  )
}
