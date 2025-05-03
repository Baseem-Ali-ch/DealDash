"use client"

import { useState } from "react"
import { CategoryTree } from "@/organisms/category-tree"
import { CategoryForm } from "@/organisms/category-form"
import { CategoryHeader } from "@/organisms/category-header"
import { useToast } from "@/hooks/use-toast"

export function CategoryManagementTemplate() {
  const { toast } = useToast()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Handle add category
  const handleAddCategory = (parentId = null) => {
    setSelectedCategory(parentId ? { parentId } : null)
    setIsFormOpen(true)
  }

  // Handle edit category
  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setIsFormOpen(true)
  }

  // Handle save category
  const handleSaveCategory = (category) => {
    // API call would go here
    toast({
      title: category.id ? "Category Updated" : "Category Created",
      description: `${category.name} has been ${category.id ? "updated" : "created"} successfully.`,
    })
    setIsFormOpen(false)
  }

  // Handle delete category
  const handleDeleteCategory = (categoryId) => {
    // API call would go here
    toast({
      title: "Category Deleted",
      description: "The category has been deleted successfully.",
    })
  }

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  return (
    <div className="space-y-6">
      <CategoryHeader onAddCategory={() => handleAddCategory()} onSearch={handleSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CategoryTree
            searchTerm={searchTerm}
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
              onCancel={() => setIsFormOpen(false)}
            />
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg border p-6 h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-lg font-medium mb-2">Category Management</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Select a category to edit or add a new category to get started.
              </p>
              <button onClick={() => handleAddCategory()} className="text-primary hover:underline">
                + Add Root Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
