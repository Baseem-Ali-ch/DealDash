import { cn } from "@/lib/utils"
import {
  ShoppingCart,
  LogIn,
  Star,
  MessageSquare,
  Heart,
  RefreshCw,
  UserPlus,
  Mail,
  AlertCircle,
  type LucideIcon,
} from "lucide-react"

export type ActivityType =
  | "purchase"
  | "login"
  | "review"
  | "comment"
  | "wishlist"
  | "return"
  | "registration"
  | "email"
  | "support"

interface ActivityTimelineItemProps {
  type: ActivityType
  title: string
  description: string
  timestamp: string
  link?: {
    text: string
    href: string
  }
  className?: string
}

const activityIcons: Record<ActivityType, LucideIcon> = {
  purchase: ShoppingCart,
  login: LogIn,
  review: Star,
  comment: MessageSquare,
  wishlist: Heart,
  return: RefreshCw,
  registration: UserPlus,
  email: Mail,
  support: AlertCircle,
}

const activityColors: Record<ActivityType, string> = {
  purchase: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
  login: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
  review: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300",
  comment: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
  wishlist: "bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300",
  return: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300",
  registration: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300",
  email: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900 dark:text-cyan-300",
  support: "bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300",
}

export function ActivityTimelineItem({
  type,
  title,
  description,
  timestamp,
  link,
  className,
}: ActivityTimelineItemProps) {
  const Icon = activityIcons[type]
  const colorClass = activityColors[type]

  return (
    <div className={cn("flex gap-4", className)}>
      <div className="flex flex-col items-center">
        <div className={cn("p-2 rounded-full", colorClass)}>
          <Icon className="h-4 w-4" />
        </div>
        <div className="w-px grow bg-gray-200 dark:bg-gray-700 my-2"></div>
      </div>
      <div className="flex-1 pb-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-gray-500 dark:text-gray-400">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        {link && (
          <a href={link.href} className="text-xs text-primary hover:underline mt-2 inline-block">
            {link.text}
          </a>
        )}
      </div>
    </div>
  )
}
