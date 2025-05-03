import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type CustomerStatus = "active" | "inactive" | "banned"

interface CustomerStatusBadgeProps {
  status: CustomerStatus
  className?: string
}

export function CustomerStatusBadge({ status, className }: CustomerStatusBadgeProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium",
        status === "active" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        status === "inactive" && "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
        status === "banned" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        className,
      )}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}
