"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductImageGallery } from "@/molecules/product-image-gallery"
import { ProductDetails } from "@/organisms/product-details"
import { ProductTabs } from "@/organisms/product-tabs"
import { ProductCarousel } from "@/organisms/product-carousel"
import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"
import { getProductBySlug, getRelatedProducts, getProductReviews } from "@/lib/data/products"

interface ProductDetailTemplateProps {
  slug: string
}

export function ProductDetailTemplate({ slug }: ProductDetailTemplateProps) {
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const productData = getProductBySlug(slug)

      if (productData) {
        setProduct(productData)

        const relatedProductsData = getRelatedProducts(productData.relatedProducts)
        setRelatedProducts(relatedProductsData)

        const reviewsData = getProductReviews(productData.id)
        setReviews(reviewsData)
      }

      setIsLoading(false)
    }

    fetchProduct()
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-24">
          <div className="animate-pulse">
            <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div className="aspect-square rounded bg-gray-200 dark:bg-gray-700" />
              <div className="space-y-4">
                <div className="h-8 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-24 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-10 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto flex h-[60vh] items-center justify-center px-4 py-8 text-center">
          <div>
            <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="container mx-auto px-4 py-8 pt-24 flex-1">
        <nav className="mb-8 flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-8 md:grid-cols-2">
          <ProductImageGallery images={product.images} name={product.name} />
          <ProductDetails product={product} />
        </div>

        <div className="mt-16">
          <ProductTabs product={product} reviews={reviews} />
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <ProductCarousel title="Related Products" products={relatedProducts} />
          </div>
        )}

        <div className="mt-16">
          <h2 className="mb-4 text-xl font-bold">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-800" />
            ))}
          </div>
        </div>
      </div>

      <Footer />
      <CartSidebar />
    </div>
  )
}
