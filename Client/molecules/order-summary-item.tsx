import Image from "next/image"
import { formatPrice } from "@/lib/utils"

interface OrderSummaryItemProps {
  name: string
  price: number
  quantity: number
  image: string
}

export function OrderSummaryItem({ name, price, quantity, image }: OrderSummaryItemProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-md border">
        <Image src={image || "/placeholder.svg"} alt={name} fill sizes="64px" className="object-cover" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
      </div>
      <div className="text-sm font-medium">{formatPrice(price * quantity)}</div>
    </div>
  )
}
