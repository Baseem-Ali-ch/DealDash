"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ProductsTable } from "@/organisms/products-table";
import { ProductsHeader } from "@/organisms/products-header";
import { ProductsFilters } from "@/organisms/products-filters";
import { ProductForm } from "@/organisms/product-form";
import { AdminProductQuickView } from "@/organisms/admin-product-quick-view";
import { ImportProductsModal } from "@/organisms/import-products-modal";
import { BulkActionsModal } from "@/organisms/bulk-actions-modal";
import { useToast } from "@/hooks/use-toast";
import { fetchProduct } from "@/lib/api/admin/product";

export function ProductsManagementTemplate() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  // States for modals and sidebars
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isProductFormOpen, setIsProductFormOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isBulkActionModalOpen, setIsBulkActionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  // Product states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState("");

  // Table states from URL params
  const page = Number(searchParams.get("page") || "1");
  const perPage = Number(searchParams.get("perPage") || "10");
  const search = searchParams.get("search") || "";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minStock = searchParams.get("minStock") || "";
  const maxStock = searchParams.get("maxStock") || "";

  // Update URL params
  const updateParams = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value.toString());
      } else {
        newParams.delete(key);
      }
    });
    router.push(`?${newParams.toString()}`);
  };

  // Handle product form open
  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsProductFormOpen(true);
  };

  // Handle product edit
  const handleEditProduct = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    setIsProductFormOpen(true);
  };

  // Handle product duplicate
  const handleDuplicateProduct = (product) => {
    if (!product) return;
    setSelectedProduct({
      ...product,
      _id: null,
      name: `Copy of ${product.name}`,
    });
    setIsProductFormOpen(true);
  };

  // Handle product quick view
  const handleQuickView = (product) => {
    if (!product) return;
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  // Handle product save
  const handleSaveProduct = (updatedProduct) => {
    if (!updatedProduct) return;
    setIsProductFormOpen(false);
    if (updatedProduct._id) {
      // Update existing product
      setProducts((prev) =>
        prev.map((p) =>
          p._id === updatedProduct._id ? { ...p, ...updatedProduct } : p
        )
      );
    } else {
      // Add new product
      setProducts((prev) => [updatedProduct, ...prev]);
    }
  };

  // Handle product delete
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p._id !== productId));
  };

  // Handle status toggle
  const handleStatusToggle = (productId, newStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === productId ? { ...p, status: newStatus } : p))
    );
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    setBulkAction(action);
    setIsBulkActionModalOpen(true);
  };

  // Handle confirm bulk action
  const handleConfirmBulkAction = (data) => {
    toast({
      title: "Bulk Action Completed",
      description: `${selectedProducts.length} products have been updated.`,
    });
    setSelectedProducts([]);
    setIsBulkActionModalOpen(false);
    // Optionally refresh products here if bulk action affects product data
  };

  // Handle export
  const handleExport = (format) => {
    toast({
      title: "Export Started",
      description: `Your products are being exported to ${format.toUpperCase()}.`,
    });
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchProduct({
          page,
          perPage,
          search,
          sortBy,
          sortOrder,
          category,
          status,
          minPrice,
          maxPrice,
          minStock,
          maxStock,
        });

        if (response.success) {
          setProducts(response.data);
          console.log("Fetched products:", response.data);
        } else {
          toast({
            title: "Error",
            description: response.message || "Failed to fetch products",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast({
          title: "Error",
          description: "Failed to load products",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [
    page,
    perPage,
    search,
    sortBy,
    sortOrder,
    category,
    status,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
  ]);

  return (
    <div className="space-y-6">
      <ProductsHeader
        onAddProduct={handleAddProduct}
        onImport={() => setIsImportModalOpen(true)}
        onExport={handleExport}
        onFilter={() => setIsFilterOpen(true)}
        selectedCount={selectedProducts.length}
        onBulkAction={handleBulkAction}
      />

      <ProductsFilters
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={{
          category,
          status,
          minPrice,
          maxPrice,
          minStock,
          maxStock,
          search,
        }}
        onApplyFilters={(filters) => {
          updateParams({ ...filters, page: 1 });
          setIsFilterOpen(false);
        }}
      />

      <ProductsTable
        products={products}
        isLoading={isLoading}
        page={page}
        perPage={perPage}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onPageChange={(newPage) => updateParams({ page: newPage })}
        onPerPageChange={(newPerPage) =>
          updateParams({ perPage: newPerPage, page: 1 })
        }
        onSort={(column, order) =>
          updateParams({ sortBy: column, sortOrder: order })
        }
        onEdit={handleEditProduct}
        onDuplicate={handleDuplicateProduct}
        onQuickView={handleQuickView}
        selectedProducts={selectedProducts}
        onSelectProducts={setSelectedProducts}
        onDelete={handleDeleteProduct}
        onStatusToggle={handleStatusToggle}
      />

      {isProductFormOpen && (
        <ProductForm
          product={selectedProduct}
          isOpen={isProductFormOpen}
          onClose={() => setIsProductFormOpen(false)}
          onSave={handleSaveProduct}
        />
      )}

      {isQuickViewOpen && selectedProduct && (
        <AdminProductQuickView
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
          onEdit={() => {
            setIsQuickViewOpen(false);
            setIsProductFormOpen(true);
          }}
        />
      )}

      {isImportModalOpen && (
        <ImportProductsModal
          isOpen={isImportModalOpen}
          onClose={() => setIsImportModalOpen(false)}
        />
      )}

      {isBulkActionModalOpen && (
        <BulkActionsModal
          isOpen={isBulkActionModalOpen}
          onClose={() => setIsBulkActionModalOpen(false)}
          action={bulkAction}
          count={selectedProducts.length}
          onConfirm={handleConfirmBulkAction}
        />
      )}
    </div>
  );
}
