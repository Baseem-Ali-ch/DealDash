"use client";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { fetchCategories } from "@/lib/api/admin/category";
import { toast } from "sonner";
import { cn } from "@/lib/utils/utils";

interface ProductsFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category?: string;
    status?: string;
    minPrice?: string;
    maxPrice?: string;
    minStock?: string;
    maxStock?: string;
    search?: string;
  };
  onApplyFilters: (filters: any) => void;
}

export function ProductsFilters({
  isOpen,
  onClose,
  filters = {},
  onApplyFilters,
}: ProductsFiltersProps) {
  const [localFilters, setLocalFilters] = useState({
    category: filters.category || "all",
    status: filters.status || "all",
    minPrice: filters.minPrice || "",
    maxPrice: filters.maxPrice || "",
    minStock: filters.minStock || "",
    maxStock: filters.maxStock || "",
    search: filters.search || "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await fetchCategories();
        if (response.success) {
          setCategories(response.data.data || response.data);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Update local filters when props change
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        category: filters.category || "",
        status: filters.status || "",
        minPrice: filters.minPrice || "",
        maxPrice: filters.maxPrice || "",
        minStock: filters.minStock || "",
        maxStock: filters.maxStock || "",
        search: filters.search || "",
      });
      setErrors({});
    }
  }, [filters, isOpen]);

  // Validate filters
  const validateFilters = () => {
    const newErrors = {};

    // Price validation
    if (localFilters.minPrice && !/^\d*\.?\d*$/.test(localFilters.minPrice)) {
      newErrors.minPrice = "Minimum price must be a valid number";
    }
    if (localFilters.maxPrice && !/^\d*\.?\d*$/.test(localFilters.maxPrice)) {
      newErrors.maxPrice = "Maximum price must be a valid number";
    }
    if (
      localFilters.minPrice &&
      localFilters.maxPrice &&
      Number(localFilters.minPrice) > Number(localFilters.maxPrice)
    ) {
      newErrors.price = "Minimum price cannot exceed maximum price";
    }

    // Stock validation
    if (localFilters.minStock && !/^\d+$/.test(localFilters.minStock)) {
      newErrors.minStock = "Minimum stock must be a valid integer";
    }
    if (localFilters.maxStock && !/^\d+$/.test(localFilters.maxStock)) {
      newErrors.maxStock = "Maximum stock must be a valid integer";
    }
    if (
      localFilters.minStock &&
      localFilters.maxStock &&
      Number(localFilters.minStock) > Number(localFilters.maxStock)
    ) {
      newErrors.stock = "Minimum stock cannot exceed maximum stock";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only allow valid number inputs for price fields
    if ((name === "minPrice" || name === "maxPrice") && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }

    // Only allow integers for stock fields
    if ((name === "minStock" || name === "maxStock") && value !== "") {
      if (!/^\d*$/.test(value)) return;
    }

    setLocalFilters((prev) => ({ ...prev, [name]: value }));

    // Clear related errors
    const relatedErrors = {};
    if (name === "minPrice" || name === "maxPrice") {
      relatedErrors.minPrice = null;
      relatedErrors.maxPrice = null;
      relatedErrors.price = null;
    }

    if (name === "minStock" || name === "maxStock") {
      relatedErrors.minStock = null;
      relatedErrors.maxStock = null;
      relatedErrors.stock = null;
    }

    setErrors((prev) => ({ ...prev, [name]: null, ...relatedErrors }));
  };

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      const currentFilters = { ...localFilters, search: searchValue };
      onApplyFilters(currentFilters);
    }, 500),
    [localFilters, onApplyFilters]
  );

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalFilters((prev) => ({ ...prev, search: value }));
    debouncedSearch(value);
  };

  // Handle select change
  const handleSelectChange = (name, value) => {
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handle reset filters
  const handleReset = () => {
    const resetFilters = {
      category: "all",
      status: "all",
      minPrice: "",
      maxPrice: "",
      minStock: "",
      maxStock: "",
      search: "",
    };
    setLocalFilters(resetFilters);
    setErrors({});
    onApplyFilters(resetFilters);
    toast.success("Filters have been reset");
  };

  // Handle apply filters
  const handleApply = () => {
    if (validateFilters()) {
      const cleanedFilters = {};

      Object.entries(localFilters).forEach(([key, value]) => {
        // Skip "all" values as they mean no filter
        if (value !== "all" && value !== "") {
          // Convert numeric strings to numbers for API
          if (["minPrice", "maxPrice", "minStock", "maxStock"].includes(key)) {
            cleanedFilters[key] = Number(value);
          } else {
            cleanedFilters[key] = value;
          }
        }
      });

      onApplyFilters(cleanedFilters);
      toast.success("Filters applied");
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
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
              onChange={handleSearchChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              Search by product name, SKU, or description
            </p>
          </div>

          <Separator />

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={localFilters.category}
              onValueChange={(value) => handleSelectChange("category", value)}
              disabled={loading || categories.length === 0}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loading && (
              <p className="text-xs text-gray-500 mt-1">
                Loading categories...
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={localFilters.status}
              onValueChange={(value) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="minPrice"
                    name="minPrice"
                    type="text"
                    inputMode="decimal"
                    placeholder="Min"
                    className={cn("pl-7", errors.minPrice && "border-red-500")}
                    value={localFilters.minPrice}
                    onChange={handleChange}
                  />
                </div>
                {errors.minPrice && (
                  <p className="text-red-500 text-xs mt-1">{errors.minPrice}</p>
                )}
              </div>
              <div>
                <Label htmlFor="maxPrice" className="text-xs">
                  Max Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    $
                  </span>
                  <Input
                    id="maxPrice"
                    name="maxPrice"
                    type="text"
                    inputMode="decimal"
                    placeholder="Max"
                    className={cn("pl-7", errors.maxPrice && "border-red-500")}
                    value={localFilters.maxPrice}
                    onChange={handleChange}
                  />
                </div>
                {errors.maxPrice && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxPrice}</p>
                )}
              </div>
            </div>
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
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
                  type="text"
                  inputMode="numeric"
                  placeholder="Min"
                  className={cn(errors.minStock && "border-red-500")}
                  value={localFilters.minStock}
                  onChange={handleChange}
                />
                {errors.minStock && (
                  <p className="text-red-500 text-xs mt-1">{errors.minStock}</p>
                )}
              </div>
              <div>
                <Label htmlFor="maxStock" className="text-xs">
                  Max Stock
                </Label>
                <Input
                  id="maxStock"
                  name="maxStock"
                  type="text"
                  inputMode="numeric"
                  placeholder="Max"
                  className={cn(errors.maxStock && "border-red-500")}
                  value={localFilters.maxStock}
                  onChange={handleChange}
                />
                {errors.maxStock && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxStock}</p>
                )}
              </div>
            </div>
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">{errors.stock}</p>
            )}
          </div>
        </div>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleReset} type="button">
            Reset Filters
          </Button>
          <Button onClick={handleApply} type="button">
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
