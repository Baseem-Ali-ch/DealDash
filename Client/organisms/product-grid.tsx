"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/molecules/product-card";
import { Pagination } from "@/molecules/pagination";
import { useAppSelector } from "@/lib/hooks/use-redux";
import { getFilteredProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils/utils";

interface ProductGridProps {
  className?: string;
}

export function ProductGrid({ className }: ProductGridProps) {
  const filters = useAppSelector((state) => state.filter);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const filteredProducts = getFilteredProducts(filters);

      // Calculate pagination
      const totalProducts = filteredProducts.length;
      const totalPages = Math.ceil(totalProducts / filters.perPage);

      // Get current page products
      const startIndex = (filters.page - 1) * filters.perPage;
      const endIndex = startIndex + filters.perPage;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      setProducts(paginatedProducts);
      setTotalPages(totalPages);
      setIsLoading(false);
    };

    fetchProducts();
  }, [filters]);

  if (isLoading) {
    return (
      <div
        className={cn("grid gap-4 sm:grid-cols-2 md:grid-cols-3", className)}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border bg-background"
          >
            <div className="aspect-square rounded-t-lg bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-3">
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-8 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center rounded-lg border bg-background p-8 text-center">
        <h3 className="mb-2 text-xl font-medium">No products found</h3>
        <p className="mb-6 text-muted-foreground">
          Try adjusting your filters or search criteria to find what you're
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div
        className={cn(
          filters.view === "grid"
            ? "grid gap-4 sm:grid-cols-2 md:grid-cols-3"
            : "flex flex-col space-y-4",
          className
        )}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
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
            isGridView={filters.view === "grid"}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => {
            // Scroll to top when changing pages
            window.scrollTo({ top: 0, behavior: "smooth" });
            // Page change is handled by the filter slice
          }}
        />
      )}
    </div>
  );
}
