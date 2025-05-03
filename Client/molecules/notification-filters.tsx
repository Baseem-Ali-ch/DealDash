"use client"

import type React from "react"
import { Search, X, Filter } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { RootState } from "@/lib/store/store"
import {
  setSearchFilter,
  setCategoryFilter,
  setDateRangeFilter,
  setPriorityFilter,
  setStatusFilter,
  resetFilters,
} from "@/lib/store/slices/notificationsSlice"
import type { NotificationCategory, NotificationStatus } from "@/lib/types/notifications"

export function NotificationFilters() {
  const dispatch = useDispatch()
  const filters = useSelector((state: RootState) => state.notifications.filters)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchFilter(e.target.value))
  }

  const handleCategoryChange = (value: string) => {
    dispatch(setCategoryFilter(value as NotificationCategory | "all"))
  }

  const handleStatusChange = (value: string) => {
    dispatch(setStatusFilter(value as NotificationStatus | "all"))
  }

  const handlePriorityChange = (value: string, checked: boolean) => {
    const currentPriorities = [...filters.priority]

    if (checked) {
      dispatch(setPriorityFilter([...currentPriorities, value]))
    } else {
      dispatch(setPriorityFilter(currentPriorities.filter((p) => p !== value)))
    }
  }

  const handleDateFromChange = (date: Date | undefined) => {
    if (date) {
      dispatch(
        setDateRangeFilter({
          from: date.toISOString(),
          to: filters.dateRange.to,
        }),
      )
    }
  }

  const handleDateToChange = (date: Date | undefined) => {
    if (date) {
      dispatch(
        setDateRangeFilter({
          from: filters.dateRange.from,
          to: date.toISOString(),
        }),
      )
    }
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  const hasActiveFilters = () => {
    return (
      filters.search !== "" ||
      filters.category !== "all" ||
      filters.status !== "all" ||
      filters.priority.length > 0 ||
      filters.dateRange.from !== null ||
      filters.dateRange.to !== null
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search notifications..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
          {filters.search && (
            <button
              onClick={() => dispatch(setSearchFilter(""))}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={filters.category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="order">Orders</SelectItem>
              <SelectItem value="inventory">Inventory</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="review">Review</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">More Filters</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Priority</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priority-critical"
                      checked={filters.priority.includes("critical")}
                      onCheckedChange={(checked) => handlePriorityChange("critical", checked as boolean)}
                    />
                    <Label htmlFor="priority-critical">Critical</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priority-high"
                      checked={filters.priority.includes("high")}
                      onCheckedChange={(checked) => handlePriorityChange("high", checked as boolean)}
                    />
                    <Label htmlFor="priority-high">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priority-medium"
                      checked={filters.priority.includes("medium")}
                      onCheckedChange={(checked) => handlePriorityChange("medium", checked as boolean)}
                    />
                    <Label htmlFor="priority-medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priority-low"
                      checked={filters.priority.includes("low")}
                      onCheckedChange={(checked) => handlePriorityChange("low", checked as boolean)}
                    />
                    <Label htmlFor="priority-low">Low</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Date Range</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateRange.from && "text-muted-foreground",
                          )}
                        >
                          {filters.dateRange.from ? format(new Date(filters.dateRange.from), "PPP") : "From date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.from ? new Date(filters.dateRange.from) : undefined}
                          onSelect={handleDateFromChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !filters.dateRange.to && "text-muted-foreground",
                          )}
                        >
                          {filters.dateRange.to ? format(new Date(filters.dateRange.to), "PPP") : "To date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={filters.dateRange.to ? new Date(filters.dateRange.to) : undefined}
                          onSelect={handleDateToChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {hasActiveFilters() && (
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleResetFilters}>
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
