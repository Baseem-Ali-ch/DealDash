"use client";

import { X } from "lucide-react";
import { Button } from "@/atoms/button";
import { Badge } from "@/atoms/badge";
import { formatPrice } from "@/lib/utils/utils";

interface ActiveFiltersProps {
  categories?: string[];
  brands?: string[];
  priceRange?: { min: number; max: number };
  ratings?: number[];
  onRemoveCategory?: (category: string) => void;
  onRemoveBrand?: (brand: string) => void;
  onResetPriceRange?: () => void;
  onRemoveRating?: (rating: number) => void;
  onResetAll?: () => void;
  className?: string;
}

export function ActiveFilters({
  categories = [],
  brands = [],
  priceRange = { min: 0, max: 1000 },
  ratings = [],
  onRemoveCategory = () => {},
  onRemoveBrand = () => {},
  onResetPriceRange = () => {},
  onRemoveRating = () => {},
  onResetAll = () => {},
  className = "",
}: ActiveFiltersProps) {
  const hasActiveFilters =
    categories?.length > 0 ||
    brands?.length > 0 ||
    ratings?.length > 0 ||
    priceRange?.min > 0 ||
    priceRange?.max < 1000;

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className={`mb-6 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium">Active Filters</h3>
        <Button
          variant="link"
          size="sm"
          onClick={onResetAll}
          className="h-auto p-0 text-xs"
        >
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Badge
            key={category}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {category}
            <button
              onClick={() => onRemoveCategory(category)}
              className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={`Remove ${category} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {brands?.map((brand) => (
          <Badge
            key={brand}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {brand}
            <button
              onClick={() => onRemoveBrand(brand)}
              className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={`Remove ${brand} filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {(priceRange?.min > 0 || priceRange?.max < 1000) && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
            <button
              onClick={onResetPriceRange}
              className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Reset price range"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
        {ratings?.map((rating) => (
          <Badge
            key={rating}
            variant="secondary"
            className="flex items-center gap-1"
          >
            {rating}+ Stars
            <button
              onClick={() => onRemoveRating(rating)}
              className="ml-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label={`Remove ${rating}+ stars filter`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
