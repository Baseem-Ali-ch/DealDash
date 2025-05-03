"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/atoms/button";
import { ProductCard } from "@/molecules/product-card";
import { products } from "@/lib/data/products";

export function ProductRecommendations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  // Get random products for recommendations
  const recommendedProducts = products.slice(0, 8);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(3);
      } else {
        setVisibleItems(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = recommendedProducts.length - visibleItems;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">You might also like</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="h-8 w-8"
            aria-label="Previous products"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8"
            aria-label="Next products"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
        >
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="w-full shrink-0 px-2"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0]}
                rating={product.rating}
                reviewCount={product.reviewCount}
                slug={product.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
