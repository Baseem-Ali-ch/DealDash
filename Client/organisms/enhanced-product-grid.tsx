"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import type { Product } from "@/lib/data/products"
import { Pagination } from "@/molecules/pagination"

interface EnhancedProductGridProps {
  products: Product[]
  itemsPerPage?: number
}

export function EnhancedProductGrid({ products, itemsPerPage = 12 }: EnhancedProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(products.length / itemsPerPage)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative">
              {/* Product image and hover actions */}
              <div className="relative h-64 overflow-hidden">
                <Link href={`/product/${product.slug}`}>
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                {/* Quick action buttons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                  <button
                    className="flex items-center justify-center h-9 w-9 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                    aria-label="Add to wishlist"
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <button
                    className="flex items-center justify-center h-9 w-9 bg-white dark:bg-gray-800 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                    aria-label="Quick view"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                {/* Discount badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-4">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.category}</div>
                <Link href={`/product/${product.slug}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{product.name}</h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mt-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to cart button */}
                  <button
                    className="flex items-center justify-center h-10 w-10 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                    aria-label="Add to cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
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
