"use client"

import { useState } from "react"
import { BrandsTable } from "@/organisms/brands-table"
import { BrandsHeader } from "@/organisms/brands-header"
import { BrandForm } from "@/organisms/brand-form"
import { BrandDetails } from "@/organisms/brand-details"
import { useToast } from "@/hooks/use-toast"

export function BrandManagementTemplate() {
  const { toast } = useToast()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Handle add brand
  const handleAddBrand = () => {
    setSelectedBrand(null)
    setIsFormOpen(true)
  }

  // Handle edit brand
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand)
    setIsFormOpen(true)
  }

  // Handle view brand details
  const handleViewBrandDetails = (brand) => {
    setSelectedBrand(brand)
    setIsDetailsOpen(true)
  }

  // Handle save brand
  const handleSaveBrand = (brand) => {
    // API call would go here
    toast({
      title: brand.id ? "Brand Updated" : "Brand Created",
      description: `${brand.name} has been ${brand.id ? "updated" : "created"} successfully.`,
    })
    setIsFormOpen(false)
  }

  // Handle delete brand
  const handleDeleteBrand = (brandId) => {
    // API call would go here
    toast({
      title: "Brand Deleted",
      description: "The brand has been deleted successfully.",
    })
  }

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="space-y-6">
      <BrandsHeader onAddBrand={handleAddBrand} onSearch={handleSearch} />

      <BrandsTable
        searchTerm={searchTerm}
        onEdit={handleEditBrand}
        onDelete={handleDeleteBrand}
        onViewDetails={handleViewBrandDetails}
      />

      {isFormOpen && (
        <BrandForm
          brand={selectedBrand}
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveBrand}
        />
      )}

      {isDetailsOpen && (
        <BrandDetails
          brand={selectedBrand}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={() => {
            setIsDetailsOpen(false)
            setIsFormOpen(true)
          }}
        />
      )}
    </div>
  )
}
