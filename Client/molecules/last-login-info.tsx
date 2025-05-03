"use client"

import { Clock, MapPin } from "lucide-react"

interface LastLoginInfoProps {
  timestamp: string
  ipAddress: string
  location?: string
}

export default function LastLoginInfo({ timestamp, ipAddress, location }: LastLoginInfoProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-sm">
      <div className="flex items-center text-gray-600 dark:text-gray-300 mb-1">
        <Clock className="h-4 w-4 mr-2" />
        <span>Last login: {timestamp}</span>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300">
        <MapPin className="h-4 w-4 mr-2" />
        <span>
          From: {ipAddress} {location && `(${location})`}
        </span>
      </div>
    </div>
  )
}
