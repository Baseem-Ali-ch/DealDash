"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Pagination } from "@/molecules/pagination";

export function BrandsTable({
  brand,
  searchTerm = "",
  onEdit,
  onDelete,
  onViewDetails,
  onToggleStatus,
  isLoading = false,
}: BrandsTableProps) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Process brands when the prop changes
  useEffect(() => {
    if (!brand?.data || isLoading) return;

    // Filter function
    const filterBrands = (brands: Brand[], term: string) => {
      if (!term) return brands;

      return brands.filter(
        (brand) =>
          brand.name?.toLowerCase().includes(term.toLowerCase()) ||
          brand.description?.toLowerCase().includes(term.toLowerCase()) ||
          brand.website?.toLowerCase().includes(term.toLowerCase())
      );
    };

    // Sort function
    const sortBrands = (a: Brand, b: Brand) => {
      if (sortBy === "productsCount") {
        return sortOrder === "asc"
          ? (a.productsCount || 0) - (b.productsCount || 0)
          : (b.productsCount || 0) - (a.productsCount || 0);
      }

      const aValue = a[sortBy as keyof Brand] || "";
      const bValue = b[sortBy as keyof Brand] || "";

      return sortOrder === "asc"
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    };

    const filteredBrands = filterBrands(brand.data, searchTerm);
    const sortedBrands = [...filteredBrands].sort(sortBrands);
    const paginatedBrands = sortedBrands.slice(
      (page - 1) * perPage,
      page * perPage
    );

    setBrands(paginatedBrands);
    setTotalItems(filteredBrands.length);
  }, [brand, page, perPage, searchTerm, sortBy, sortOrder, isLoading]);

  // Handle sort
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  // Render sort icon
  const renderSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />;
    return sortOrder === "asc" ? (
      <ChevronUp className="ml-2 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-2 h-4 w-4" />
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white dark:bg-gray-800">
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Logo</TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name {renderSortIcon("name")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("website")}
              >
                <div className="flex items-center">
                  Website {renderSortIcon("website")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("productsCount")}
              >
                <div className="flex items-center">
                  Products {renderSortIcon("productsCount")}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  {searchTerm ? (
                    <p className="text-gray-500">
                      No brands found matching "{searchTerm}"
                    </p>
                  ) : (
                    <p className="text-gray-500">
                      No brands found. Add your first brand to get started.
                    </p>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              brands.map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell>
                    <div className="relative h-10 w-10 rounded-md overflow-hidden">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{brand.name}</TableCell>
                  <TableCell>
                    <a
                      href={brand.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {brand.website?.replace(/^https?:\/\//, "") || "-"}
                    </a>
                  </TableCell>
                  <TableCell>{brand.productsCount || 0}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={brand.status === "active"}
                        onCheckedChange={() =>
                          onToggleStatus(brand._id, brand.status)
                        }
                      />
                      <Badge
                        variant={
                          brand.status === "active" ? "success" : "secondary"
                        }
                      >
                        {brand.status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(brand)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600"
                          onClick={() => onDelete(brand._id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalItems / perPage)}
          onPageChange={setPage}
          perPage={perPage}
          onPerPageChange={setPerPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}
