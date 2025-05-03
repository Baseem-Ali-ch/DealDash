"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export interface Address {
  id: string
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
  isDefault?: boolean
}

interface AddressCardProps {
  address: Address
  isSelected?: boolean
  selectable?: boolean
  onSelect?: (address: Address) => void
}

export function AddressCard({ address, isSelected = false, selectable = true, onSelect }: AddressCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border p-4",
        selectable && "cursor-pointer transition-colors",
        selectable && isSelected
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : selectable && "hover:border-primary/50 hover:bg-muted/50",
      )}
      onClick={() => {
        if (selectable && onSelect) {
          onSelect(address)
        }
      }}
    >
      <div className="space-y-1">
        <p className="font-medium">{address.fullName}</p>
        <p>{address.addressLine1}</p>
        {address.addressLine2 && <p>{address.addressLine2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="text-sm text-muted-foreground">{address.phone}</p>
      </div>
      {address.isDefault && (
        <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
          Default
        </span>
      )}
      {isSelected && selectable && (
        <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  )
}
