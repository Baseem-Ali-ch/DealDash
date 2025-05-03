import { CategoryCard } from "@/molecules/category-card"

const categories = [
  {
    id: "1",
    name: "Women",
    image: "/placeholder.svg?height=400&width=300",
    slug: "women",
    count: 120,
  },
  {
    id: "2",
    name: "Men",
    image: "/placeholder.svg?height=400&width=300",
    slug: "men",
    count: 85,
  },
  {
    id: "3",
    name: "Kids",
    image: "/placeholder.svg?height=400&width=300",
    slug: "kids",
    count: 65,
  },
  {
    id: "4",
    name: "Accessories",
    image: "/placeholder.svg?height=400&width=300",
    slug: "accessories",
    count: 40,
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Explore our wide range of products</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              image={category.image}
              slug={category.slug}
              count={category.count}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
