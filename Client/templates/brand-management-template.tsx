"use client";

import { useEffect, useState } from "react";
import { BrandsTable } from "@/organisms/brands-table";
import { BrandsHeader } from "@/organisms/brands-header";
import { BrandForm } from "@/organisms/brand-form";
import { useToast } from "@/hooks/use-toast";
import {
  fetchBrands,
  createBrand,
  updateBrand,
  deleteBrand,
  toggleBrandStatus,
} from "@/lib/api/admin/brand";

export function BrandManagementTemplate() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadBrands = async () => {
    try {
      setIsLoading(true);
      const data = await fetchBrands();
      setBrands(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load brands",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadBrands();
  }, []);

  // Handle add brand
  const handleAddBrand = () => {
    setSelectedBrand(null);
    setIsFormOpen(true);
  };

  // Handle edit brand
  const handleEditBrand = (brand) => {
    setSelectedBrand(brand);
    setIsFormOpen(true);
  };

  // Handle view brand details
  const handleViewBrandDetails = (brand) => {
    setSelectedBrand(brand);
    setIsDetailsOpen(true);
  };

  // Handle save brand
  const handleSaveBrand = async (brandData) => {
    try {
      let response;

      if (brandData.id) {
        // Update existing brand
        response = await updateBrand(brandData.id, brandData);
      } else {
        // Create new brand
        response = await createBrand(brandData);
      }

      if (response.success) {
        toast({
          title: brandData.id ? "Brand Updated" : "Brand Created",
          description: `${brandData.name} has been ${
            brandData.id ? "updated" : "created"
          } successfully.`,
        });
        setIsFormOpen(false);
        loadBrands(); // Reload brands to reflect changes
      } else {
        toast({
          title: "Error",
          description: response.message || "Operation failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Handle delete brand
  const handleDeleteBrand = async (brandId) => {
    try {
      const response = await deleteBrand(brandId);

      if (response.success) {
        toast({
          title: "Brand Deleted",
          description: "The brand has been deleted successfully.",
        });
        loadBrands(); // Reload brands to reflect changes
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to delete brand",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Handle toggle status
  const handleToggleStatus = async (brandId, status) => {
    try {
      const newStatus = status === "active" ? "inactive" : "active";
      const response = await toggleBrandStatus(brandId, newStatus);

      if (response.success) {
        toast({
          title: "Status Updated",
          description: `Brand status changed to ${newStatus}.`,
        });
        loadBrands(); // Reload brands to reflect changes
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update status",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="space-y-6">
      <BrandsHeader onAddBrand={handleAddBrand} onSearch={handleSearch} />

      <BrandsTable
        brand={brands}
        searchTerm={searchTerm}
        onEdit={handleEditBrand}
        onDelete={handleDeleteBrand}
        onViewDetails={handleViewBrandDetails}
        onToggleStatus={handleToggleStatus}
        isLoading={isLoading}
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
            setIsDetailsOpen(false);
            setIsFormOpen(true);
          }}
        />
      )}
    </div>
  );
}
