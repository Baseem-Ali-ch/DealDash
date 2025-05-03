"use client"

import { useState, useEffect } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/atoms/button"
import { SortSelect } from "@/molecules/sort-select"
import { ViewToggle } from "@/molecules/view-toggle"
import { ActiveFilters } from "@/molecules/active-filters"
import { FilterSidebar } from "@/organisms/filter-sidebar"
import { ProductGrid } from "@/organisms/product-grid"
import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux"
import {
  toggleCategory,
  toggleBrand,
  setPriceRange,
  toggleRating,
  setSortBy,
  setView,
  resetFilters,
  type SortOption,
} from "@/lib/store/slices/filterSlice"
import { useUrlFilters } from "@/lib/hooks/use-url-filters"
import { getFilteredProducts } from "@/lib/data/products"

export function ProductListingTemplate() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.filter)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [productCount, setProductCount] = useState(0)
  const { updateUrl } = useUrlFilters()

  useEffect(() => {
    const filteredProducts = getFilteredProducts(filters)
    setProductCount(filteredProducts.length)
    updateUrl()
  }, [filters, updateUrl])

  const handleSortChange = (value: SortOption) => {
    dispatch(setSortBy(value))
  }

  const handleViewChange = (view: "grid" | "list") => {
    dispatch(setView(view))
  }

  const handleRemoveCategory = (category: string) => {
    dispatch(toggleCategory(category))
  }

  const handleRemoveBrand = (brand: string) => {
    dispatch(toggleBrand(brand))
  }

  const handleResetPriceRange = () => {
    dispatch(setPriceRange({ min: 0, max: 1000 }))
  }

  const handleRemoveRating = (rating: number) => {
    dispatch(toggleRating(rating))
  }

  const handleResetAllFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24 flex-1">
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">All Products</h1>
          <p className="mt-1 text-muted-foreground">Browse our collection of products</p>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Sidebar */}
          <FilterSidebar isMobile isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Button variant="outline" className="lg:hidden" onClick={() => setIsMobileSidebarOpen(true)}>
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>

              <div className="flex items-center">
                <span className="mr-4 text-sm text-muted-foreground">
                  {productCount} {productCount === 1 ? "product" : "products"}
                </span>
              </div>

              <div className="ml-auto flex items-center space-x-4">
                <SortSelect value={filters.sortBy} onChange={handleSortChange} />
                <ViewToggle view={filters.view} onChange={handleViewChange} />
              </div>
            </div>

            <ActiveFilters
              categories={filters.categories}
              brands={filters.brands}
              priceRange={filters.priceRange}
              ratings={filters.ratings}
              onRemoveCategory={handleRemoveCategory}
              onRemoveBrand={handleRemoveBrand}
              onResetPriceRange={handleResetPriceRange}
              onRemoveRating={handleRemoveRating}
              onResetAll={handleResetAllFilters}
            />

            <ProductGrid />
          </div>
        </div>
      </div>

      <Footer />
      <CartSidebar />
    </div>
  )
}
