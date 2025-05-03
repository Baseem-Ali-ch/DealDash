import { ProductDetailTemplate } from "@/templates/product-detail-template"
import { getProductBySlug } from "@/lib/data/products"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: "Product Not Found | DealDash",
      description: "The product you are looking for does not exist or has been removed.",
    }
  }

  return {
    title: `${product.name} | DealDash`,
    description: product.description,
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetailTemplate slug={params.slug} />
}
