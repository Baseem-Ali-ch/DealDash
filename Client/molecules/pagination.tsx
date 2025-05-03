"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  perPage = 10,
  onPerPageChange,
  totalItems = 0,
}) {
  // Calculate start and end item numbers
  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalItems)

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push("ellipsis1")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pages.push("ellipsis2")
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Showing <span className="font-medium">{totalItems > 0 ? startItem : 0}</span> to{" "}
        <span className="font-medium">{endItem}</span> of <span className="font-medium">{totalItems}</span> results
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <Select value={String(perPage)} onValueChange={(value) => onPerPageChange(Number(value))}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder={perPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="25">25 per page</SelectItem>
              <SelectItem value="50">50 per page</SelectItem>
              <SelectItem value="100">100 per page</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="hidden sm:flex items-center gap-1 mx-1">
            {pageNumbers.map((page, index) => {
              if (page === "ellipsis1" || page === "ellipsis2") {
                return (
                  <div key={page} className="px-2">
                    ...
                  </div>
                )
              }

              return (
                <Button
                  key={index}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => onPageChange(page)}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </Button>
              )
            })}
          </div>

          <div className="sm:hidden mx-2">
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
