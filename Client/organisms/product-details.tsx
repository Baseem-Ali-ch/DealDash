"use client"

import { useState } from "react"
import { Star, Truck, ShieldCheck, Heart, Share2, Tag, Clock } from "lucide-react"
import { Button } from "@/atoms/button"
import { Badge } from "@/atoms/badge"
import { ProductVariantSelector } from "@/molecules/product-variant-selector"
import { QuantitySelector } from "@/molecules/quantity-selector"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import { addToCart } from "@/lib/store/slices/cartSlice"
import { toggleWishlist } from "@/lib/store/slices/wishlistSlice"
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils"
import { cn } from "@/lib/utils"

interface ProductDetailsProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    description: string
    rating: number
    reviewCount: number
    inStock: boolean
    sku: string
    variants: {
      colors?: Array<{
        name: string
        value: string
      }>
      sizes?: string[]
    }
  }
}

// Available offers for all products
const availableOffers = [
  {
    id: "offer1",
    title: "Free Shipping",
    description: "On all orders above $50",
    icon: Truck,
    validUntil: "2025-12-31",
  },
  {
    id: "offer2",
    title: "10% Off on First Purchase",
    description: "Use code FIRST10 at checkout",
    icon: Tag,
    validUntil: "2025-12-31",
  },
  {
    id: "offer3",
    title: "Limited Time Sale",
    description: "Additional 5% off on all products",
    icon: Clock,
    validUntil: "2025-06-30",
  },
]

export function ProductDetails({ product }: ProductDetailsProps) {
  const dispatch = useAppDispatch()
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((item) => item.id === product.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product.variants.colors?.[0] || null)
  const [selectedSize, setSelectedSize] = useState(product.variants.sizes?.[0] || null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const discountPercentage = product.originalPrice
    ? calculateDiscountPercentage(product.originalPrice, product.price)
    : null

  const handleAddToCart = () => {
    setIsAddingToCart(true)
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: "/placeholder.svg",
        color: selectedColor?.name,
        size: selectedSize,
        quantity: quantity,
      }),
    )
    setTimeout(() => setIsAddingToCart(false), 1000)
  }

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: "/placeholder.svg",
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
        <div className="mt-2 flex items-center space-x-4">
          <div className="flex items-center">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
                  )}
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{product.rating.toFixed(1)}</span>
            <span className="mx-2 text-sm text-muted-foreground">•</span>
            <a href="#reviews" className="text-sm text-primary hover:underline">
              {product.reviewCount} reviews
            </a>
          </div>
          <span className="text-sm text-muted-foreground">SKU: {product.sku}</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        {discountPercentage && (
          <Badge variant="destructive" className="text-xs font-semibold">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>

      <div className="prose prose-sm max-w-none dark:prose-invert">
        <p>{product.description}</p>
      </div>

      {/* Available Offers Section */}
      <div className="space-y-3 rounded-lg border p-4">
        <h3 className="font-medium">Available Offers</h3>
        {availableOffers.map((offer) => (
          <div key={offer.id} className="flex items-start space-x-3">
            <offer.icon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">{offer.title}</h4>
              <p className="text-xs text-muted-foreground">{offer.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className={cn("flex h-3 w-3 rounded-full", product.inStock ? "bg-green-500" : "bg-red-500")} />
          <span className="text-sm font-medium">{product.inStock ? "In Stock" : "Out of Stock"}</span>
        </div>

        <ProductVariantSelector
          colors={product.variants.colors}
          sizes={product.variants.sizes}
          onColorChange={setSelectedColor}
          onSizeChange={setSelectedSize}
        />

        <div className="flex items-center space-x-4">
          <div>
            <label htmlFor="quantity" className="mb-2 block text-sm font-medium">
              Quantity
            </label>
            <QuantitySelector initialQuantity={1} onChange={setQuantity} min={1} max={product.inStock ? 10 : 0} />
          </div>
        </div>

        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <Button size="lg" className="flex-1" onClick={handleAddToCart} disabled={!product.inStock || isAddingToCart}>
            {isAddingToCart ? "Added to Cart!" : "Add to Cart"}
          </Button>
          <Button
            variant={isWishlisted ? "secondary" : "outline"}
            size="lg"
            onClick={handleToggleWishlist}
            className={isWishlisted ? "bg-secondary/20" : ""}
          >
            <Heart className={cn("mr-2 h-4 w-4", isWishlisted ? "fill-highlight text-highlight" : "")} />
            {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
          </Button>
        </div>
      </div>

      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-start space-x-3">
          <Truck className="h-5 w-5 text-primary" />
          <div>
            <h4 className="text-sm font-medium">Free Shipping</h4>
            <p className="text-xs text-muted-foreground">Free standard shipping on orders over $50</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <div>
            <h4 className="text-sm font-medium">30-Day Returns</h4>
            <p className="text-xs text-muted-foreground">Shop with confidence with our 30-day return policy</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button variant="outline" size="sm">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </div>
  )
}
