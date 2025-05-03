import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"
import { ProductGrid } from "@/organisms/product-grid"
import { products, brands } from "@/lib/data/products"

interface BrandPageProps {
  params: {
    id: string
  }
}

export default function BrandPage({ params }: BrandPageProps) {
  const brandId = params.id
  const brand = brands.find((b) => b.id === brandId)
  const brandProducts = products.filter((p) => p.brand === brand?.name)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{brand?.name || "Brand"}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {brand?.description || `Browse our selection of ${brand?.name || "products"}`}
            </p>
          </div>

          <ProductGrid products={brandProducts} />
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
