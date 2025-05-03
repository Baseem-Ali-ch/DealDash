import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "partially-refunded"

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium",
        status === "paid" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        status === "pending" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        status === "failed" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        status === "refunded" && "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
        status === "partially-refunded" && "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
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
