"use client"

import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface CouponCodeProps {
  code: string
  className?: string
}

export function CouponCode({ code, className }: CouponCodeProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded bg-gray-100 dark:bg-gray-800 font-mono text-sm",
        className,
      )}
    >
      <span className="uppercase">{code}</span>
      <button
        onClick={copyToClipboard}
        className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        aria-label="Copy code"
      >
        <Copy size={14} />
      </button>
      {copied && <span className="ml-2 text-xs text-green-600 dark:text-green-400">Copied!</span>}
    </div>
  )
}
