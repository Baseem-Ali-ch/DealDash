import type React from "react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function MetricCard({ title, value, icon, change, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-3xl font-bold mt-1">{value}</h3>

          {change && (
            <div className="flex items-center mt-2">
              <span className={cn("text-sm font-medium", change.isPositive ? "text-green-500" : "text-red-500")}>
                {change.isPositive ? "+" : ""}
                {change.value}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last period</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-primary/10 text-primary rounded-lg">{icon}</div>
      </div>
    </div>
  )
}
