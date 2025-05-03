import { AdminLayout } from "@/templates/admin-layout"

export default function AdminDashboardLoading() {
  return (
    <AdminLayout>
      <div className="space-y-6 animate-pulse">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 w-96 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
          </div>
          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
                </div>
                <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
          <div className="h-80 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded-md mb-4"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded-md mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
