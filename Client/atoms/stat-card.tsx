import type React from "react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  change?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export const StatCard = ({ title, value, icon, change, className }: StatCardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>

          {change && (
            <div className="flex items-center mt-1">
              <span className={cn("text-xs font-medium", change.isPositive ? "text-green-500" : "text-red-500")}>
                {change.isPositive ? "+" : ""}
                {change.value}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>

        {icon && <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">{icon}</div>}
      </div>
    </div>
  )
}
