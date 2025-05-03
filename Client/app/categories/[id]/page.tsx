import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"
import { ProductGrid } from "@/organisms/product-grid"
import { products, categories } from "@/lib/data/products"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryId = params.id
  const category = categories.find((c) => c.id === categoryId)
  const categoryProducts = products.filter((p) => p.category === categoryId)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{category?.name || "Category"}</h1>
            <p className="text-gray-600 dark:text-gray-300">
              {category?.description || `Browse our selection of ${category?.name || "products"}`}
            </p>
          </div>

          <ProductGrid products={categoryProducts} />
        </div>
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
