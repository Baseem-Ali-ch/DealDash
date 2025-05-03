"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DateRangePicker } from "@/molecules/date-range-picker"
import { Search, X } from "lucide-react"
import type { DateRange } from "react-day-picker"

interface PromotionFiltersProps {
  onFilterChange: (filters: PromotionFilters) => void
}

export interface PromotionFilters {
  search: string
  status: string
  type: string
  dateRange: DateRange | undefined
}

export function PromotionFilters({ onFilterChange }: PromotionFiltersProps) {
  const [filters, setFilters] = useState<PromotionFilters>({
    search: "",
    status: "",
    type: "",
    dateRange: undefined,
  })

  const handleFilterChange = (key: keyof PromotionFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const resetFilters = () => {
    const resetFilters = {
      search: "",
      status: "",
      type: "",
      dateRange: undefined,
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters = filters.status || filters.type || filters.dateRange

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search promotions..."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="percentage">Percentage</SelectItem>
              <SelectItem value="fixed">Fixed Amount</SelectItem>
              <SelectItem value="shipping">Free Shipping</SelectItem>
              <SelectItem value="bogo">Buy One Get One</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DateRangePicker
          dateRange={filters.dateRange}
          onDateRangeChange={(range) => handleFilterChange("dateRange", range)}
          className="w-full sm:w-auto"
        />

        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <X className="mr-2 h-4 w-4" />
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
