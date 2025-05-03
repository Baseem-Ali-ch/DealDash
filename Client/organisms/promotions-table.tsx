"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { StatusBadge } from "@/atoms/status-badge"
import { CouponCode } from "@/atoms/coupon-code"
import { type PromotionType, PromotionTypeIcon } from "@/atoms/promotion-type-icon"
import { formatPrice } from "@/lib/utils"
import { MoreHorizontal, Copy, Edit, Trash, BarChart, Download } from "lucide-react"

export interface Promotion {
  id: string
  name: string
  code: string
  type: PromotionType
  value: number
  status: "active" | "scheduled" | "expired" | "draft" | "paused"
  startDate: string
  endDate: string
  usageCount: number
  usageLimit: number | null
  minOrderValue: number | null
  customerGroups: string[]
  productCategories: string[]
  firstTimeOnly: boolean
}

interface PromotionsTableProps {
  promotions: Promotion[]
  onEdit: (id: string) => void
  onDuplicate: (id: string) => void
  onDelete: (id: string) => void
  onViewAnalytics: (id: string) => void
}

export function PromotionsTable({ promotions, onEdit, onDuplicate, onDelete, onViewAnalytics }: PromotionsTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  const toggleSelectAll = () => {
    if (selectedRows.length === promotions.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(promotions.map((p) => p.id))
    }
  }

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const formatValue = (type: PromotionType, value: number) => {
    switch (type) {
      case "percentage":
        return `${value}%`
      case "fixed":
        return formatPrice(value)
      case "shipping":
        return "Free Shipping"
      case "bogo":
        return "Buy One Get One"
      default:
        return value.toString()
    }
  }

  const exportToCSV = () => {
    // Implementation for CSV export
    console.log("Exporting to CSV")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {selectedRows.length} of {promotions.length} selected
        </div>
        <div className="flex space-x-2">
          {selectedRows.length > 0 && (
            <Button variant="outline" size="sm" onClick={() => setSelectedRows([])}>
              Clear Selection
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={exportToCSV}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedRows.length === promotions.length && promotions.length > 0}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Validity</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.map((promotion) => (
              <TableRow key={promotion.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(promotion.id)}
                    onCheckedChange={() => toggleSelectRow(promotion.id)}
                    aria-label={`Select ${promotion.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{promotion.name}</TableCell>
                <TableCell>
                  <CouponCode code={promotion.code} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <PromotionTypeIcon type={promotion.type} className="mr-2" />
                    <span className="capitalize">{promotion.type}</span>
                  </div>
                </TableCell>
                <TableCell>{formatValue(promotion.type, promotion.value)}</TableCell>
                <TableCell>
                  <StatusBadge status={promotion.status} />
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{new Date(promotion.startDate).toLocaleDateString()}</div>
                    <div>{new Date(promotion.endDate).toLocaleDateString()}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {promotion.usageCount}/{promotion.usageLimit || "∞"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => onEdit(promotion.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDuplicate(promotion.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onViewAnalytics(promotion.id)}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => onDelete(promotion.id)}
                        className="text-red-600 dark:text-red-400"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
            {promotions.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  No promotions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
