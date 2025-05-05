"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/atoms/button";
import { ProductCard } from "@/molecules/product-card";
import { cn } from "@/lib/utils/utils";

interface ProductCarouselProps {
  title: string;
  products: Array<{
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
  }>;
}

export function ProductCarousel({ title, products }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const maxScroll = container.scrollWidth - container.clientWidth;

    let newPosition;
    if (direction === "left") {
      newPosition = Math.max(0, scrollPosition - scrollAmount);
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
    }

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });

    setScrollPosition(newPosition);
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = containerRef.current
    ? scrollPosition <
      containerRef.current.scrollWidth - containerRef.current.clientWidth
    : false;

  return (
    <div className="relative">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>

      <div className="relative">
        <div
          ref={containerRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-[250px] flex-shrink-0">
              <ProductCard
                id={product.id}
                name={product.name}
                slug={product.slug}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
                inStock={product.inStock}
                category={product.category}
                brand={product.brand}
              />
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md",
            !canScrollLeft && "hidden"
          )}
          onClick={() => handleScroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className={cn(
            "absolute -right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background shadow-md",
            !canScrollRight && "hidden"
          )}
          onClick={() => handleScroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
