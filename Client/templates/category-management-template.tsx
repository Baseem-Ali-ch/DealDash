"use client";
import { useEffect, useState } from "react";
import { CategoryTree } from "@/organisms/category-tree";
import { CategoryForm } from "@/organisms/category-form";
import { CategoryHeader } from "@/organisms/category-header";
import { useToast } from "@/hooks/use-toast";
import { fetchCategories, deleteCategory } from "@/lib/api/admin/category";

export function CategoryManagementTemplate() {
  const { toast } = useToast();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories
  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCategories();
      console.log("Fetched categories:", data);
      setCategories(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load categories",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadCategories();
  }, []);

  // Handle add category
  const handleAddCategory = (parentId = null) => {
    setSelectedCategory(parentId ? { parentId } : null);
    setIsFormOpen(true);
  };

  // Handle edit category
  const handleEditCategory = (category) => {
    console.log("Editing category:", category);
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  // Handle save category (both create and update)
  const handleSaveCategory = (savedCategory) => {
    console.log("Category saved:", savedCategory);
    
    // Refresh categories to get the latest data
    loadCategories();
    
    toast({
      title: selectedCategory?.id ? "Category Updated" : "Category Created",
      description: `${savedCategory.name} has been ${
        selectedCategory?.id ? "updated" : "created"
      } successfully.`,
    });
    
    setIsFormOpen(false);
    setSelectedCategory(null);
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      
      // Refresh categories after deletion
      loadCategories();
      
      toast({
        title: "Category Deleted",
        description: "The category has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete category",
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
      <CategoryHeader
        onAddCategory={() => handleAddCategory()}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryTree
            searchTerm={searchTerm}
            category={categories}
            onAddSubcategory={handleAddCategory}
            onEditCategory={handleEditCategory}
            onDeleteCategory={handleDeleteCategory}
          />
        </div>
        <div className="lg:col-span-1">
          {isFormOpen ? (
            <CategoryForm
              category={selectedCategory}
              onSave={handleSaveCategory}
              onCancel={() => {
                setIsFormOpen(false);
                setSelectedCategory(null);
              }}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-medium mb-2">Category Management</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Select a category to edit or add a new category to get started.
              </p>
              <button
                onClick={() => handleAddCategory()}
                className="text-primary hover:underline"
              >
                + Add Root Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}