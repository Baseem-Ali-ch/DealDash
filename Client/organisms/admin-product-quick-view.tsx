"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Edit, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/utils";

interface ProductQuickViewProps {
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    compareAtPrice?: number;
    cost?: number;
    images: Array<{
      url: string;
      name?: string;
      id?: string;
    }>;
    stock: number;
    status: string;
    categoryId?: {
      _id: string;
      name: string;
    };
    brandId?: {
      _id: string;
      name: string;
    };
    sku: string;
    weight?: number;
    dimensions?: {
      length?: string | number;
      width?: string | number;
      height?: string | number;
    };
    shippingRequired?: boolean;
    variants?: Array<{
      id: string;
      color?: string;
      size?: string;
      sku: string;
      price: number;
      stock: number;
      images?: Array<{
        url: string;
        name?: string;
        id?: string;
      }>;
    }>;
    hasVariants?: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
}

// Available colors mapping
const colorMap = {
  black: { label: "Black", hex: "#000000" },
  white: { label: "White", hex: "#FFFFFF" },
  red: { label: "Red", hex: "#FF0000" },
  blue: { label: "Blue", hex: "#0000FF" },
  green: { label: "Green", hex: "#00FF00" },
  yellow: { label: "Yellow", hex: "#FFFF00" },
  purple: { label: "Purple", hex: "#800080" },
  orange: { label: "Orange", hex: "#FFA500" },
  pink: { label: "Pink", hex: "#FFC0CB" },
  gray: { label: "Gray", hex: "#808080" },
};

// Available sizes mapping
const sizeMap = {
  xs: "XS",
  s: "S",
  m: "M",
  l: "L",
  xl: "XL",
  xxl: "XXL",
};

export function AdminProductQuickView({
  product,
  isOpen,
  onClose,
  onEdit,
}: ProductQuickViewProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [activeVariant, setActiveVariant] = useState(0);

  if (!isOpen || !product) return null;

  // Combine product images and variant images into a single gallery
  const allImages = [
    ...(product.images || []),
    ...(product.hasVariants && product.variants
      ? product.variants.flatMap((variant) => variant.images || [])
      : []),
  ];

  const mainImage = allImages[activeImage]?.url || "/placeholder.svg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden border">
              <Image
                src={mainImage}
                alt={product.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((image, index) => (
                  <div
                    key={image.id || index}
                    className={cn(
                      "relative aspect-square rounded-md overflow-hidden border cursor-pointer",
                      activeImage === index && "ring-2 ring-primary"
                    )}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 25vw, 20vw"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <Badge
                  variant={product.status === "published" ? "success" : "secondary"}
                  className={cn(
                    "ml-2",
                    product.status === "published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  )}
                >
                  {product.status === "published" ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-muted-foreground">SKU: {product.sku}</p>
            </div>

            <div className="space-y-3 border-t border-b py-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-semibold">${product.price.toFixed(2)}</span>
              </div>
              {product.compareAtPrice && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Compare At</span>
                  <span className="line-through text-muted-foreground">${product.compareAtPrice.toFixed(2)}</span>
                </div>
              )}
              {product.cost && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cost</span>
                  <span>${product.cost.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stock</span>
                <span
                  className={cn(
                    "font-semibold",
                    product.stock < 10
                      ? "text-red-500"
                      : product.stock < 30
                      ? "text-amber-500"
                      : ""
                  )}
                >
                  {product.stock} units
                </span>
              </div>
              {product.weight && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Weight</span>
                  <span>{product.weight} kg</span>
                </div>
              )}
              {product.dimensions && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span>
                    {product.dimensions.length || '–'} × {product.dimensions.width || '–'} × {product.dimensions.height || '–'}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category</span>
                <span>{product.categoryId?.name || "Uncategorized"}</span>
              </div>
              {product.brandId && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Brand</span>
                  <span>{product.brandId.name}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping Required</span>
                <span>{product.shippingRequired !== false ? "Yes" : "No"}</span>
              </div>
            </div>

            {product.description && (
              <div className="space-y-2 border-t pt-3">
                <h4 className="font-semibold">Description</h4>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.hasVariants && product.variants && product.variants.length > 0 && (
              <div className="space-y-3 border-t pt-3">
                <h4 className="font-semibold">Variants</h4>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <Badge
                      key={variant.id}
                      className={cn(
                        "cursor-pointer px-3 py-1",
                        activeVariant === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary hover:bg-secondary/80"
                      )}
                      onClick={() => setActiveVariant(index)}
                    >
                      {variant.color && colorMap[variant.color] ? (
                        <span className="flex items-center">
                          <span
                            className="w-3 h-3 rounded-full mr-1"
                            style={{ backgroundColor: colorMap[variant.color].hex }}
                          />
                          {colorMap[variant.color].label}
                        </span>
                      ) : null}
                      {variant.size && sizeMap[variant.size] ? (
                        <span className="ml-1">{variant.color ? " / " : ""}{sizeMap[variant.size]}</span>
                      ) : null}
                    </Badge>
                  ))}
                </div>

                {product.variants[activeVariant] && (
                  <div className="space-y-2 border rounded-md p-3 bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Variant SKU</span>
                      <span>{product.variants[activeVariant].sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-semibold">${product.variants[activeVariant].price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stock</span>
                      <span
                        className={cn(
                          "font-semibold",
                          product.variants[activeVariant].stock < 10
                            ? "text-red-500"
                            : product.variants[activeVariant].stock < 30
                            ? "text-amber-500"
                            : ""
                        )}
                      >
                        {product.variants[activeVariant].stock} units
                      </span>
                    </div>
                    {product.variants[activeVariant].images?.length > 0 && (
                      <div className="mt-2">
                        <span className="text-muted-foreground block mb-1">Variant Images</span>
                        <div className="grid grid-cols-3 gap-2">
                          {product.variants[activeVariant].images.map((image, imgIndex) => (
                            <div
                              key={image.id || imgIndex}
                              className="relative aspect-square rounded-md overflow-hidden border"
                            >
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`${product.name} variant ${imgIndex + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 33vw, 20vw"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-4 mt-2">
              {onEdit && (
                <Button onClick={onEdit} className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>
              )}
              <Button variant="outline" onClick={onClose} className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}