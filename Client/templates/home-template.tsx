import { Header } from "@/organisms/header"
import { HeroSlider } from "@/organisms/hero-slider"
import { FeaturedCategories } from "@/organisms/featured-categories"
import { ProductCarousel } from "@/organisms/product-carousel"
import { SpecialOffers } from "@/organisms/special-offers"
import { Newsletter } from "@/organisms/newsletter"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"
import { products } from "@/lib/data/products"

export function HomeTemplate() {
  // Filter products for different sections
  // Add default values for featured, isNew, and sales properties
  const productsWithDefaults = products.map((product) => ({
    ...product,
    featured: product.featured || false,
    isNew: product.isNew || false,
    sales: product.sales || 0,
  }))

  // Filter products for different sections
  const featuredProducts = productsWithDefaults.filter((product) => product.featured).slice(0, 8)
  const newArrivals = productsWithDefaults.filter((product) => product.isNew).slice(0, 8)
  const bestSellers = [...productsWithDefaults].sort((a, b) => b.sales - a.sales).slice(0, 8)

  // If we don't have enough products in each category, use some defaults
  const ensureMinimumProducts = (productList: any[], count: number) => {
    if (productList.length >= count) return productList

    // Add some default products if we don't have enough
    return [...productList, ...productsWithDefaults.slice(0, count - productList.length)]
  }

  const finalFeaturedProducts = ensureMinimumProducts(featuredProducts, 4)
  const finalNewArrivals = ensureMinimumProducts(newArrivals, 4)
  const finalBestSellers = ensureMinimumProducts(bestSellers, 4)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <HeroSlider />
        <div className="container px-4 py-8 mx-auto">
          <FeaturedCategories />

          {/* Product Carousels */}
          <div className="space-y-12 my-12">
            <ProductCarousel title="Featured Products" products={finalFeaturedProducts} />

            <ProductCarousel title="New Arrivals" products={finalNewArrivals} />

            <ProductCarousel title="Best Sellers" products={finalBestSellers} />
          </div>

          <SpecialOffers />
        </div>
        <Newsletter />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
