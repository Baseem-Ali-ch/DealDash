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
import { Checkbox } from "@/components/ui/checkbox";
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
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash,
  ArrowUpDown,
} from "lucide-react";
import { ProductCard } from "@/molecules/product-card";
import { Pagination } from "@/molecules/pagination";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/utils";
import { deleteProduct, toggleProductStatus } from "@/lib/api/admin/product";

export function ProductsTable({
  products = [],
  isLoading = false,
  page = 1,
  perPage = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
  onPageChange,
  onPerPageChange,
  onSort,
  onEdit,
  onDuplicate,
  onQuickView,
  selectedProducts = [],
  onSelectProducts,
  onDelete,
  onStatusToggle,
}) {
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);
  const [totalItems, setTotalItems] = useState(products.length);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Update totalItems when products change
  useEffect(() => {
    setTotalItems(products.length);
  }, [products]);

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectProducts(products.map((product) => product._id));
    } else {
      onSelectProducts([]);
    }
  };

  // Handle select one
  const handleSelectOne = (checked, productId) => {
    if (checked) {
      onSelectProducts([...selectedProducts, productId]);
    } else {
      onSelectProducts(selectedProducts.filter((id) => id !== productId));
    }
  };

  // Handle status toggle
  const handleStatusToggle = async (productId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "published" ? "draft" : "published";
      const response = await toggleProductStatus(productId, newStatus);

      if (response.success) {
        onStatusToggle(productId, newStatus); // Notify parent of status change
        toast({
          title: "Status Updated",
          description: `Product status changed to ${newStatus}.`,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      toast({
        title: "Error",
        description: "Failed to update product status",
        variant: "destructive",
      });
    }
  };

  // Handle delete
  const handleDelete = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await deleteProduct(productId);
      if (response.success) {
        onDelete(productId); // Notify parent of deletion
        toast({
          title: "Product Deleted",
          description: "The product has been successfully deleted.",
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
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

  // Handle sort
  const handleSort = (column) => {
    const newOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    onSort(column, newOrder);
  };

  // Render status badge
  const renderStatus = (status) => {
    return (
      <Badge variant={status === "published" ? "success" : "secondary"}>
        {status === "published" ? "Published" : "Draft"}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mobile view
  if (isMobile) {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isSelected={selectedProducts.includes(product._id)}
            onSelect={(checked) => handleSelectOne(checked, product._id)}
            onQuickView={() => onQuickView && onQuickView(product)}
            onEdit={() => onEdit && onEdit(product)}
            onDuplicate={() => onDuplicate && onDuplicate(product)}
            onDelete={() => handleDelete(product._id)}
            onStatusToggle={() =>
              handleStatusToggle(product._id, product.status)
            }
          />
        ))}

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalItems / perPage)}
          onPageChange={onPageChange}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          totalItems={totalItems}
        />
      </div>
    );
  }

  // Desktop view
  return (
    <div className="rounded-md border bg-white dark:bg-gray-800">
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={
                    selectedProducts.length === products.length &&
                    products.length > 0
                  }
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead className="w-[80px]">Image</TableHead>
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
                onClick={() => handleSort("sku")}
              >
                <div className="flex items-center">
                  SKU {renderSortIcon("sku")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center">
                  Category {renderSortIcon("category")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("stock")}
              >
                <div className="flex items-center">
                  Stock {renderSortIcon("stock")}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer"
                onClick={() => handleSort("price")}
              >
                <div className="flex items-center">
                  Price {renderSortIcon("price")}
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product._id)}
                    onCheckedChange={(checked) =>
                      handleSelectOne(checked, product._id)
                    }
                    aria-label={`Select ${product.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden">
                    <Image
                      src={product.images?.[0]?.url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>
                  {
                    product.category?.name ||
                      (typeof product.categoryId === "object" &&
                        product.categoryId?.name) ||
                      "Uncategorized"
                  }
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "font-medium",
                      product.stock < 10
                        ? "text-red-500"
                        : product.stock < 30
                        ? "text-amber-500"
                        : ""
                    )}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={product.status === "published"}
                      onCheckedChange={() =>
                        handleStatusToggle(product._id, product.status)
                      }
                    />
                    {renderStatus(product.status)}
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
                      <DropdownMenuItem
                        onClick={() => onQuickView && onQuickView(product)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        <span>Quick View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onEdit && onEdit(product)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="p-4 border-t">
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalItems / perPage)}
          onPageChange={onPageChange}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}