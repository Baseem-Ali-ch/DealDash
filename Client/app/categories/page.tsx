import { CategoryListingTemplate } from "@/templates/category-listing-template"
import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"

export const metadata = {
  title: "Shop by Categories | DealDash",
  description: "Browse our wide selection of product categories",
}

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <CategoryListingTemplate />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
