"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/molecules/product-card";
import { IconButton } from "@/atoms/icon-button";
import { Button } from "@/atoms/button";
import { ProductQuickView } from "@/organisms/product-quick-view";
import { cn } from "@/lib/utils/utils";
import { products } from "@/lib/data/products";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  productIds?: string[];
  viewAllLink?: string;
  className?: string;
}

export function ProductSection({
  title,
  subtitle,
  productIds,
  viewAllLink,
  className,
}: ProductSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Filter products based on provided IDs or use first 6 products
  const displayProducts = productIds
    ? products.filter((p) => productIds.includes(p.id))
    : products.slice(0, 6);

  const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById(
      `product-container-${title.replace(/\s+/g, "-").toLowerCase()}`
    );
    if (!container) return;

    const scrollAmount = 300;
    const newPosition =
      direction === "left"
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(
            container.scrollWidth - container.clientWidth,
            scrollPosition + scrollAmount
          );

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-2">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Button
              variant="outline"
              className="mt-4 md:mt-0"
              onClick={() => (window.location.href = viewAllLink)}
            >
              View All
            </Button>
          )}
        </div>

        <div className="relative">
          <div
            id={`product-container-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {displayProducts.map((product) => (
              <div key={product.id} className="min-w-[250px] md:min-w-[280px]">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  image={product.images[0]}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  inStock={product.inStock}
                  category={product.category}
                  brand={product.brand}
                  onQuickView={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>

          {/* Scroll Controls (only visible on larger screens) */}
          <div className="hidden md:block">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-5">
              <IconButton
                onClick={() => handleScroll("left")}
                disabled={scrollPosition === 0}
                aria-label="Scroll left"
                className={
                  scrollPosition === 0 ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                <ChevronLeft className="h-6 w-6" />
              </IconButton>
            </div>
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-5">
              <IconButton
                onClick={() => handleScroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
