"use client"
import type { PaymentMethod } from "@/lib/data/user-data"
import { cn } from "@/lib/utils"
import { CreditCard, Edit, Trash } from "lucide-react"
import { Button } from "@/atoms/button"

interface PaymentMethodItemProps {
  paymentMethod: PaymentMethod
  onEdit: (paymentMethod: PaymentMethod) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export const PaymentMethodItem = ({ paymentMethod, onEdit, onDelete, onSetDefault }: PaymentMethodItemProps) => {
  return (
    <div
      className={cn(
        "border rounded-lg p-4",
        paymentMethod.isDefault ? "border-primary/50 bg-primary/5" : "border-gray-200 dark:border-gray-700",
      )}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h3 className="font-medium">{paymentMethod.name}</h3>
          {paymentMethod.isDefault && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Default</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(paymentMethod)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(paymentMethod.id)}
            className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {paymentMethod.type === "credit" && (
          <div className="flex items-center gap-2">
            <span>{paymentMethod.cardNumber}</span>
            <span>•</span>
            <span>Expires {paymentMethod.expiryDate}</span>
          </div>
        )}
      </div>

      {!paymentMethod.isDefault && (
        <Button variant="outline" size="sm" className="mt-3" onClick={() => onSetDefault(paymentMethod.id)}>
          Set as Default
        </Button>
      )}
    </div>
  )
}
