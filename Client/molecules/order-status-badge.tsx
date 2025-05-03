import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "on-hold"

interface OrderStatusBadgeProps {
  status: OrderStatus
  className?: string
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium",
        status === "pending" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        status === "processing" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        status === "shipped" && "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
        status === "delivered" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        status === "cancelled" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        status === "refunded" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
        status === "on-hold" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        className,
      )}
    >
      {status
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}
    </Badge>
  )
}
