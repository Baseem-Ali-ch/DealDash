"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { brands } from "@/lib/data/products"
import { Pagination } from "@/molecules/pagination"
import Link from "next/link"

interface BrandListingTemplateProps {
  title?: string
  description?: string
}

export function BrandListingTemplate({
  title = "Shop by Brands",
  description = "Discover products from your favorite brands",
}: BrandListingTemplateProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filter brands based on search term
  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentBrands = filteredBrands.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredBrands.length / itemsPerPage)

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
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full md:w-64 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentBrands.map((brand) => (
          <Link href={`/brands/${brand.id}`} key={brand.id} className="group block">
            <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 p-6 h-full flex flex-col">
              <div className="flex-1">
                <div className="h-24 w-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">{brand.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center mb-2">{brand.name}</h3>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">{brand.count} Products</span>
                <span className="text-primary text-sm font-medium">View Products</span>
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
