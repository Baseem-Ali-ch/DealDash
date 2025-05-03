"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CustomerTagProps {
  tag: string
  onRemove?: () => void
  className?: string
}

export function CustomerTag({ tag, onRemove, className }: CustomerTagProps) {
  return (
    <Badge
      className={cn(
        "px-2 py-1 text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground flex items-center gap-1",
        className,
      )}
    >
      {tag}
      {onRemove && (
        <button onClick={onRemove} className="ml-1 hover:bg-primary/20 rounded-full p-0.5">
          <X className="h-3 w-3" />
          <span className="sr-only">Remove {tag} tag</span>
        </button>
      )}
    </Badge>
  )
}
