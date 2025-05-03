"use client"

import { useState, useEffect } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

// Mock categories - would come from API in real app
const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home" },
  { id: "cat4", name: "Books" },
  { id: "cat5", name: "Toys" },
]

export function ProductsFilters({ isOpen, onClose, filters = {}, onApplyFilters }) {
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || "",
    status: filters.status || "",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    minStock: filters.minStock || "",
    maxStock: filters.maxStock || "",
    search: filters.search || "",
  })

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters({
      category: filters.category || "",
      status: filters.status || "",
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
      minStock: filters.minStock || "",
      maxStock: filters.maxStock || "",
      search: filters.search || "",
    })
  }, [filters])

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select change
  const handleSelectChange = (name, value) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }))
  }

  // Handle reset filters
  const handleReset = () => {
    setLocalFilters({
      category: "",
      status: "",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
      search: "",
    })
  }

  // Handle apply filters
  const handleApply = () => {
    onApplyFilters(localFilters)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>Filter Products</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          <div>
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              name="search"
              placeholder="Search products..."
              value={localFilters.search}
              onChange={handleChange}
            />
            <p className="text-xs text-gray-500 mt-1">Search by product name, SKU, or description</p>
          </div>

          <Separator />

          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={localFilters.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {mockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={localFilters.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div>
            <Label>Price Range</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="minPrice" className="text-xs">
                  Min Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input
                    id="minPrice"
                    name="minPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Min"
                    className="pl-7"
                    value={localFilters.minPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="maxPrice" className="text-xs">
                  Max Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                  <Input
                    id="maxPrice"
                    name="maxPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Max"
                    className="pl-7"
                    value={localFilters.maxPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label>Stock Level</Label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <Label htmlFor="minStock" className="text-xs">
                  Min Stock
                </Label>
                <Input
                  id="minStock"
                  name="minStock"
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={localFilters.minStock}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="maxStock" className="text-xs">
                  Max Stock
                </Label>
                <Input
                  id="maxStock"
                  name="maxStock"
                  type="number"
                  min="0"
                  placeholder="Max"
                  value={localFilters.maxStock}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset}>
            Reset Filters
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
