"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/atoms/button";
import { Checkbox } from "@/atoms/checkbox";
import { PriceRangeSlider } from "@/molecules/price-range-slider";
import { RatingFilter } from "@/molecules/rating-filter";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import {
  toggleCategory,
  toggleBrand,
  setPriceRange,
  toggleRating,
  resetFilters,
} from "@/lib/store/slices/filterSlice";
import { categories, brands } from "@/lib/data/products";
import { cn } from "@/lib/utils/utils";

interface FilterSidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({
  isMobile = false,
  isOpen = false,
  onClose,
}: FilterSidebarProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filter);

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    if (isMobile && isOpen) {
      const handleOutsideClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains("mobile-sidebar-overlay")) {
          if (onClose) onClose();
        }
      };

      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }
  }, [isMobile, isOpen, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobile, isOpen]);

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const handleBrandToggle = (brand: string) => {
    dispatch(toggleBrand(brand));
  };

  const handlePriceRangeChange = (range: { min: number; max: number }) => {
    dispatch(setPriceRange(range));
  };

  const handleRatingToggle = (rating: number) => {
    dispatch(toggleRating(rating));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Filters</h2>
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          {/* Categories */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.categories.includes(category.name)}
                    onChange={() => handleCategoryToggle(category.name)}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className="ml-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                  >
                    {category.name} ({category.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={filters.brands.includes(brand.name)}
                    onChange={() => handleBrandToggle(brand.name)}
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className="ml-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300"
                  >
                    {brand.name} ({brand.count})
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Price Range</h3>
            <PriceRangeSlider
              min={0}
              max={1000}
              value={filters.priceRange}
              onChange={handlePriceRangeChange}
            />
          </div>

          {/* Ratings */}
          <div>
            <h3 className="mb-3 text-sm font-medium">Ratings</h3>
            <RatingFilter
              ratings={filters.ratings}
              onChange={handleRatingToggle}
            />
          </div>
        </div>
      </div>

      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleResetFilters}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity mobile-sidebar-overlay",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 top-0 w-80 max-w-full bg-background transition-transform",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarContent}
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-20 h-[calc(100vh-5rem)] w-64 overflow-hidden border-r bg-background">
      {sidebarContent}
    </div>
  );
}
