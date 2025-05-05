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
  Copy,
  Trash,
  ArrowUpDown,
} from "lucide-react";
import { ProductCard } from "@/molecules/product-card";
import { Pagination } from "@/molecules/pagination";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils/utils";

// Mock data - would come from API in real app
const mockProducts = Array.from({ length: 50 }).map((_, i) => ({
  id: `prod-${i + 1}`,
  image: `/placeholder.svg?height=80&width=80&text=Product ${i + 1}`,
  name: `Product ${i + 1}`,
  sku: `SKU-${1000 + i}`,
  category:
    i % 5 === 0
      ? "Electronics"
      : i % 4 === 0
      ? "Clothing"
      : i % 3 === 0
      ? "Home"
      : i % 2 === 0
      ? "Books"
      : "Toys",
  stock: Math.floor(Math.random() * 100),
  price: (Math.random() * 100 + 10).toFixed(2),
  status: i % 3 === 0 ? "draft" : "published",
  createdAt: new Date(
    Date.now() - Math.floor(Math.random() * 10000000000)
  ).toISOString(),
}));

export function ProductsTable({
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
}) {
  const { toast } = useToast();
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch products - simulated API call
  useEffect(() => {
    setLoading(true);

    // Sort function
    const sortProducts = (a, b) => {
      if (sortBy === "price" || sortBy === "stock") {
        return sortOrder === "asc"
          ? Number(a[sortBy]) - Number(b[sortBy])
          : Number(b[sortBy]) - Number(a[sortBy]);
      }

      return sortOrder === "asc"
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
    };

    // Simulate API delay
    setTimeout(() => {
      const sortedProducts = [...mockProducts].sort(sortProducts);
      const paginatedProducts = sortedProducts.slice(
        (page - 1) * perPage,
        page * perPage
      );

      setProducts(paginatedProducts);
      setTotalItems(mockProducts.length);
      setLoading(false);
    }, 500);
  }, [page, perPage, sortBy, sortOrder]);

  // Handle select all
  const handleSelectAll = (checked) => {
    if (checked) {
      onSelectProducts(products.map((product) => product.id));
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
  const handleStatusToggle = (productId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    // In a real app, this would be an API call
    setProducts(
      products.map((product) =>
        product.id === productId ? { ...product, status: newStatus } : product
      )
    );

    toast({
      title: "Status Updated",
      description: `Product status changed to ${newStatus}.`,
    });
  };

  // Handle delete
  const handleDelete = (productId) => {
    // In a real app, this would be an API call
    toast({
      title: "Product Deleted",
      description: "The product has been deleted successfully.",
    });
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

  if (loading) {
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
            key={product.id}
            product={product}
            isSelected={selectedProducts.includes(product.id)}
            onSelect={(checked) => handleSelectOne(checked, product.id)}
            onQuickView={() => onQuickView && onQuickView(product)}
            onEdit={() => onEdit && onEdit(product)}
            onDuplicate={() => onDuplicate && onDuplicate(product)}
            onDelete={() => handleDelete(product.id)}
            onStatusToggle={() =>
              handleStatusToggle(product.id, product.status)
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
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={(checked) =>
                      handleSelectOne(checked, product.id)
                    }
                    aria-label={`Select ${product.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="relative h-10 w-10 rounded-md overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product.category}</TableCell>
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
                        handleStatusToggle(product.id, product.status)
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
                        onClick={() => onDuplicate && onDuplicate(product)}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Duplicate</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-600"
                        onClick={() => handleDelete(product.id)}
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
