import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin" />
        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Loading admin panel...</p>
      </div>
    </div>
  )
}
