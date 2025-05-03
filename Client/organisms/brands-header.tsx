"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export function BrandsHeader({ onAddBrand, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Brands</h1>
        <p className="text-muted-foreground">Manage your product brands and their details.</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <form onSubmit={handleSearch} className="flex w-full sm:w-auto">
          <Input
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-r-none"
          />
          <Button type="submit" variant="secondary" className="rounded-l-none">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        <Button onClick={onAddBrand}>
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </Button>
      </div>
    </div>
  )
}
