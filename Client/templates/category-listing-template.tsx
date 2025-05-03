"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { categories } from "@/lib/data/products"
import { Pagination } from "@/molecules/pagination"
import Link from "next/link"

interface CategoryListingTemplateProps {
  title?: string
  description?: string
}

export function CategoryListingTemplate({
  title = "Shop by Categories",
  description = "Browse our wide selection of product categories",
}: CategoryListingTemplateProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  // Filter categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </div>
        <div className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentCategories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id} className="group block">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{category.count} Products</span>
                  <span className="text-primary text-sm font-medium">View Products</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </div>
  )
}
