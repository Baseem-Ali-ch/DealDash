"use client"

import { ChevronDown } from "lucide-react"
import type { SortOption } from "@/lib/store/slices/filterSlice"

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  const options = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest" },
    { value: "price-low-to-high", label: "Price: Low to High" },
    { value: "price-high-to-low", label: "Price: High to Low" },
    { value: "top-rated", label: "Top Rated" },
    { value: "best-selling", label: "Best Selling" },
  ]

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Sort products"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
    </div>
  )
}
