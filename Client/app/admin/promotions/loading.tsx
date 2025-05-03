import { Skeleton } from "@/components/ui/skeleton"

export default function PromotionsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>

      <Skeleton className="h-20 w-full" />

      <div className="space-y-4">
        <div className="flex justify-between">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-10 w-24" />
        </div>

        <Skeleton className="h-12 w-full" />

        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    </div>
  )
}
