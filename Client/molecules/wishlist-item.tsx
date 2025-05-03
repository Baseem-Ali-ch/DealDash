"use client"

import { useState } from "react"
import { ShoppingCart, Trash2, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/atoms/button"
import { Badge } from "@/atoms/badge"
import { formatPrice } from "@/lib/utils"
import { addToCart } from "@/lib/store/slices/cartSlice"
import { removeFromWishlist } from "@/lib/store/slices/wishlistSlice"
import { useAppDispatch } from "@/lib/hooks/use-redux"

export interface WishlistItemProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  slug: string
  addedPrice?: number
  inStock?: boolean
}

export function WishlistItem({
  id,
  name,
  price,
  originalPrice,
  image,
  slug,
  addedPrice,
  inStock = true,
}: WishlistItemProps) {
  const dispatch = useAppDispatch()
  const [isRemoving, setIsRemoving] = useState(false)

  const handleMoveToCart = () => {
    dispatch(addToCart({ id, name, price, image }))
    dispatch(removeFromWishlist(id))
  }

  const handleRemove = () => {
    setIsRemoving(true)
    // Delay removal to allow animation to complete
    setTimeout(() => {
      dispatch(removeFromWishlist(id))
    }, 300)
  }

  const priceChanged = addedPrice !== undefined && addedPrice !== price
  const priceIncreased = addedPrice !== undefined && price > addedPrice
  const priceDecreased = addedPrice !== undefined && price < addedPrice

  return (
    <motion.div
      layout
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: isRemoving ? 0 : 1, y: isRemoving ? 20 : 0 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4 hover:bg-muted/50"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-md">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <div>
            <h3 className="font-medium line-clamp-2">
              <a href={`/product/${slug}`} className="hover:underline">
                {name}
              </a>
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-medium">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
              )}
              {priceChanged && (
                <Badge variant={priceDecreased ? "success" : "destructive"} className="ml-2">
                  {priceDecreased ? "Price dropped" : "Price increased"}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-start">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleRemove}
              aria-label="Remove from wishlist"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleMoveToCart}
              disabled={!inStock}
              aria-label="Move to cart"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {!inStock && (
          <div className="mt-2 flex items-center text-sm text-destructive">
            <AlertTriangle className="mr-1 h-4 w-4" />
            <span>Out of stock</span>
          </div>
        )}
        {priceChanged && (
          <p className="mt-1 text-xs text-muted-foreground">
            {priceIncreased
              ? `Price increased by ${formatPrice(price - (addedPrice || 0))}`
              : `Price decreased by ${formatPrice((addedPrice || 0) - price)}`}
          </p>
        )}
      </div>
    </motion.div>
  )
}
