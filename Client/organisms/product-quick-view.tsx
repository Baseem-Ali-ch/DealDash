"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Heart, ShoppingCart, Check } from "lucide-react";
import { Button } from "@/atoms/button";
import { IconButton } from "@/atoms/icon-button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { toggleWishlist } from "@/lib/store/slices/wishlistSlice";
import { cn } from "@/lib/utils/utils";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
}

interface ProductQuickViewProps {
  product: Product;
  onClose: () => void;
}

export function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div
        className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end p-4">
          <IconButton variant="ghost" onClick={onClose} aria-label="Close">
            <X className="h-5 w-5" />
          </IconButton>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6 pt-0">
          <div className="relative aspect-square">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">{product.name}</h2>

            <div className="flex items-center mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-sm ${
                    i < product.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating.toFixed(1)} out of 5
              </span>
            </div>

            <div className="mt-4">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <p className="mt-4 text-muted-foreground">
              {product.description || "No description available."}
            </p>

            <div className="mt-6 flex items-center">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-1 border-r"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 border-l"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                className="flex-1"
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                {isAdded ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                className={cn(
                  "flex-1",
                  isWishlisted && "bg-secondary/20 border-secondary"
                )}
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={cn(
                    "mr-2 h-4 w-4",
                    isWishlisted && "fill-highlight text-highlight"
                  )}
                />
                {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
