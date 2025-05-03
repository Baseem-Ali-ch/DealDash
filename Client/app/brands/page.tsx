import { BrandListingTemplate } from "@/templates/brand-listing-template"
import { Header } from "@/organisms/header"
import { Footer } from "@/organisms/footer"
import { CartSidebar } from "@/organisms/cart-sidebar"

export const metadata = {
  title: "Shop by Brands | DealDash",
  description: "Discover products from your favorite brands",
}

export default function BrandsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <BrandListingTemplate />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  )
}
