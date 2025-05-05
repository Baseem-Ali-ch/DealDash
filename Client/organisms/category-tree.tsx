"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Edit,
  Trash,
  MoveVertical,
  Search,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils/utils";
import { toggleCategoryStatus } from "@/lib/api/admin/category";
import { toast } from "sonner";

export function CategoryTree({
  searchTerm = "",
  category,
  onAddSubcategory,
  onEditCategory,
  onDeleteCategory,
}) {
  const [categories, setCategories] = useState<{ _id: string; status: string; [key: string]: any }[]>([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category && category.data) {
      // Extract the data array from the response
      setCategories(category.data);
      console.log("Categories set:", category.data);
    }
    setLoading(false);
  }, [category]);

  // Filter categories based on search term
  const filterCategories = (categories, term) => {
    if (!Array.isArray(categories)) return [];
    if (!term) return categories;

    return categories.filter((category) => {
      const matchesName = category.name
        .toLowerCase()
        .includes(term.toLowerCase());
      const matchesDescription = category.description
        ?.toLowerCase()
        .includes(term.toLowerCase());

      if (matchesName || matchesDescription) return true;

      if (category.children && category.children.length > 0) {
        const filteredChildren = filterCategories(category.children, term);
        if (filteredChildren.length > 0) {
          setExpandedCategories((prev) => ({
            ...prev,
            [category._id]: true, // Note: using _id instead of id for MongoDB
          }));
          return true;
        }
      }

      return false;
    });
  };

  const filteredCategories = filterCategories(categories, searchTerm);
  // Toggle category expansion
  const toggleExpand = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const handleStatusToggle = async (
    categoryId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await toggleCategoryStatus(categoryId, newStatus);

      if (response.success) {
        // Update the local state to reflect the change
        setCategories((prevCategories) =>
          prevCategories.map((cat) =>
            cat._id === categoryId ? { ...cat, status: newStatus } : cat
          )
        );

        toast.success(`Category status updated to ${newStatus}`);
      } else {
        toast.error(response.message || "Failed to update category status");
      }
    } catch (error) {
      console.error("Status toggle error:", error);
      toast.error("Failed to update category status");
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (categoryToDelete) {
      onDeleteCategory(categoryToDelete._id);
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  // Render category item
  const renderCategoryItem = (category, level = 0) => {
    const isExpanded = expandedCategories[category._id];
    const hasChildren = category.children && category.children.length > 0;

    return (
      <div key={category._id} className="category-item">
        <div
          className={cn(
            "flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors",
            level > 0 && "ml-6"
          )}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpand(category._id)}
              className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>
          )}

          {!hasChildren && <div className="w-6 mr-2" />}

          <div className="flex-1 flex items-center">
            <div className="flex-1">
              <div className="font-medium">{category.name}</div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <span>{category.productsCount} products</span>
                <Badge
                  variant={
                    category.status === "active" ? "success" : "primary"
                  }
                  className="text-xs"
                >
                  {category.status === "active" ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={category.status === "active"}
                onCheckedChange={() =>
                  handleStatusToggle(category._id, category.status)
                }
                aria-label="Toggle category status"
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEditCategory(category)}
                title="Edit category"
              >
                <Edit className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setCategoryToDelete(category);
                  setDeleteDialogOpen(true);
                }}
                title="Delete category"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                title="Drag to reorder"
                className="cursor-move"
              >
                <MoveVertical className="h-4 w-4 text-gray-400" />
              </Button>
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="category-children">
            {category.children.map((child) =>
              renderCategoryItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredCategories.length === 0 ? (
            searchTerm ? (
              <div className="text-center py-8">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No categories found matching "{searchTerm}"
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No categories found. Add your first category to get started.
                </p>
                <Button onClick={() => onAddSubcategory(null)} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Root Category
                </Button>
              </div>
            )
          ) : (
            <div className="space-y-1">
              {filteredCategories.map((cat) => renderCategoryItem(cat))}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will delete the category "{categoryToDelete?.name}".
              {categoryToDelete?.children?.length > 0 && (
                <span className="text-red-500 block mt-2">
                  Warning: This category has {categoryToDelete.children.length}{" "}
                  subcategories that will also be deleted.
                </span>
              )}
              {categoryToDelete?.productsCount > 0 && (
                <span className="block mt-2">
                  {categoryToDelete.productsCount} products are assigned to this
                  category. What would you like to do with these products?
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
