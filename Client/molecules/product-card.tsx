"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import { addToCart } from "@/lib/store/slices/cartSlice";
import { toggleWishlist } from "@/lib/store/slices/wishlistSlice";
import { formatPrice } from "@/lib/utils/utils";
import { cn } from "@/lib/utils/utils";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  brand: string;
  isGridView?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  price,
  originalPrice,
  image,
  rating,
  reviewCount,
  inStock,
  category,
  brand,
  isGridView = true,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === id);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddingToCart(true);
    dispatch(
      addToCart({
        id,
        name,
        price,
        image,
      })
    );
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      toggleWishlist({
        id,
        name,
        price,
        image,
      })
    );
  };

  if (isGridView) {
    return (
      <Link
        href={`/product/${slug}`}
        className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discountPercentage && (
            <Badge variant="destructive" className="absolute left-2 top-2">
              {discountPercentage}% OFF
            </Badge>
          )}
          {!inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <span className="text-lg font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
          <div
            className={cn(
              "absolute right-2 top-2 flex flex-col gap-2 transition-opacity",
              isHovered ? "opacity-100" : "opacity-0 md:opacity-100"
            )}
          >
            <Button
              variant={isWishlisted ? "secondary" : "outline"}
              size="icon"
              className="h-8 w-8 bg-white/80 dark:bg-gray-800/80"
              onClick={handleToggleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted
                    ? "fill-highlight text-highlight"
                    : "text-gray-600 dark:text-white"
                )}
              />
            </Button>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{category}</span>
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">
                {rating} ({reviewCount})
              </span>
            </div>
          </div>
          <h3 className="mb-2 flex-1 text-sm font-medium line-clamp-2">
            {name}
          </h3>
          <div className="mb-3 flex items-center">
            <span className="font-semibold text-primary">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={handleAddToCart}
            disabled={!inStock || isAddingToCart}
          >
            {isAddingToCart ? (
              "Added!"
            ) : (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </Link>
    );
  }

  // List view
  return (
    <Link
      href={`/product/${slug}`}
      className="group relative flex overflow-hidden rounded-lg border bg-background transition-all duration-300 hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden bg-gray-100 sm:h-48 sm:w-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 160px, 192px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discountPercentage && (
          <Badge variant="destructive" className="absolute left-2 top-2">
            {discountPercentage}% OFF
          </Badge>
        )}
        {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-lg font-semibold text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex gap-2">
            <span className="text-xs text-muted-foreground">{category}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{brand}</span>
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium">
              {rating} ({reviewCount})
            </span>
          </div>
        </div>
        <h3 className="mb-2 text-base font-medium">{name}</h3>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore.
        </p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold text-primary">
              {formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant={isWishlisted ? "secondary" : "outline"}
              size="sm"
              onClick={handleToggleWishlist}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isWishlisted
                    ? "fill-highlight text-highlight"
                    : "text-gray-600"
                )}
              />
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              disabled={!inStock || isAddingToCart}
            >
              {isAddingToCart ? (
                "Added!"
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
