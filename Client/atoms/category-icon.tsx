import { Bell, ShoppingCart, Package, Shield, Server, AlertTriangle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface CategoryIconProps {
  category: string
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 24, className }: CategoryIconProps) {
  let Icon: LucideIcon

  switch (category) {
    case "order":
      Icon = ShoppingCart
      break
    case "inventory":
      Icon = Package
      break
    case "security":
      Icon = Shield
      break
    case "system":
      Icon = Server
      break
    case "alert":
      Icon = AlertTriangle
      break
    default:
      Icon = Bell
  }

  return <Icon size={size} className={className} />
}
