"use client"

import { AlertTriangle, Info, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"

interface SecurityNoticeProps {
  type: "warning" | "info" | "success"
  message: string
  details?: string
}

export default function SecurityNotice({ type, message, details }: SecurityNoticeProps) {
  const icons = {
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    success: <ShieldCheck className="h-5 w-5 text-green-500" />,
  }

  const backgrounds = {
    warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
  }

  const textColors = {
    warning: "text-amber-800 dark:text-amber-200",
    info: "text-blue-800 dark:text-blue-200",
    success: "text-green-800 dark:text-green-200",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border p-4 ${backgrounds[type]}`}
    >
      <div className="flex">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3">
          <h3 className={`text-sm font-medium ${textColors[type]}`}>{message}</h3>
          {details && <div className={`mt-2 text-sm ${textColors[type]} opacity-80`}>{details}</div>}
        </div>
      </div>
    </motion.div>
  )
}
