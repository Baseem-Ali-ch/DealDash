"use client";

import { useState } from "react";
import { Trash2, Heart, AlertTriangle, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/atoms/button";
import { formatPrice } from "@/lib/utils/utils";
import { useAppDispatch } from "@/lib/hooks/use-redux";
import { removeFromCart, updateQuantity } from "@/lib/store/slices/cartSlice";
import { addToWishlist } from "@/lib/store/slices/wishlistSlice";

export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
  slug: string;
  inStock?: boolean;
  maxQuantity?: number;
}

export function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  color,
  size,
  slug,
  inStock = true,
  maxQuantity = 10,
}: CartItemProps) {
  const dispatch = useAppDispatch();
  const [isRemoving, setIsRemoving] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleRemove = () => {
    setIsRemoving(true);
    // Delay removal to allow animation to complete
    setTimeout(() => {
      dispatch(removeFromCart(id));
    }, 300);
  };

  const handleSaveForLater = () => {
    dispatch(addToWishlist({ id, name, price, image }));
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return;
    setLocalQuantity(newQuantity);
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const lowStock = maxQuantity <= 3 && maxQuantity > 0;

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
              {(color || size) && (
                <span className="text-sm text-muted-foreground">
                  {color && `Color: ${color}`}
                  {color && size && " | "}
                  {size && `Size: ${size}`}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-start">
            <div className="flex items-center border rounded-md">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-l-md"
                onClick={() => handleQuantityChange(localQuantity - 1)}
                disabled={localQuantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <div className="flex h-8 w-10 items-center justify-center text-sm">
                {localQuantity}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-none rounded-r-md"
                onClick={() => handleQuantityChange(localQuantity + 1)}
                disabled={localQuantity >= maxQuantity}
                aria-label="Increase quantity"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleRemove}
              aria-label="Remove from cart"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={handleSaveForLater}
              aria-label="Save for later"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {!inStock && (
          <div className="mt-2 flex items-center text-sm text-destructive">
            <AlertTriangle className="mr-1 h-4 w-4" />
            <span>Out of stock</span>
          </div>
        )}
        {lowStock && inStock && (
          <div className="mt-2 flex items-center text-sm text-amber-500 dark:text-amber-400">
            <AlertTriangle className="mr-1 h-4 w-4" />
            <span>Only {maxQuantity} left in stock</span>
          </div>
        )}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Subtotal: {formatPrice(price * localQuantity)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
