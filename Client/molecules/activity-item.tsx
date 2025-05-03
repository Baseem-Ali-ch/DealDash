import type React from "react"
import { cn } from "@/lib/utils"

interface ActivityItemProps {
  title: string
  description: string
  time: string
  icon: React.ReactNode
  iconColor?: string
  isLast?: boolean
}

export const ActivityItem = ({
  title,
  description,
  time,
  icon,
  iconColor = "bg-primary",
  isLast = false,
}: ActivityItemProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", iconColor)}>{icon}</div>
        {!isLast && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2"></div>}
      </div>
      <div className="pb-6">
        <h4 className="text-sm font-medium">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{description}</p>
        <span className="text-xs text-gray-400 dark:text-gray-500 mt-1 block">{time}</span>
      </div>
    </div>
  )
}
