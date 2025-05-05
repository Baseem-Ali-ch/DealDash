import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils/utils";

interface CategoryCardProps {
  name: string;
  image: string;
  slug: string;
  count: number;
  className?: string;
}

export function CategoryCard({
  name,
  image,
  slug,
  count,
  className,
}: CategoryCardProps) {
  return (
    <Link
      href={`/category/${slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="relative aspect-square md:aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-sm opacity-90">{count} products</p>
      </div>
    </Link>
  );
}
