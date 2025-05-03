"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Filter, Download, Upload, ChevronDown, Trash, Tag, Eye, EyeOff, Copy } from "lucide-react"

export function ProductsHeader({ onAddProduct, onImport, onExport, onFilter, selectedCount = 0, onBulkAction }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground">Manage your product inventory, pricing, and availability.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {selectedCount > 0 ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{selectedCount} selected</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onBulkAction("delete")}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete Selected</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction("category")}>
                  <Tag className="mr-2 h-4 w-4" />
                  <span>Change Category</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction("publish")}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>Publish</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction("draft")}>
                  <EyeOff className="mr-2 h-4 w-4" />
                  <span>Set to Draft</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkAction("duplicate")}>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={onFilter}>
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onExport("csv")}>Export as CSV</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onExport("excel")}>Export as Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={onImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>

            <Button onClick={onAddProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
