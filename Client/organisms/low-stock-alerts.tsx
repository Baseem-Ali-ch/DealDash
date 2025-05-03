import Link from "next/link"
import { AlertTriangle } from "lucide-react"

// Sample data
const lowStockItems = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    sku: "WH-BT-001",
    stock: 5,
    threshold: 10,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PROD-002",
    name: "Smart Watch Series 5",
    sku: "SW-S5-002",
    stock: 3,
    threshold: 8,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PROD-003",
    name: "Bluetooth Speaker",
    sku: "BS-PRO-003",
    stock: 2,
    threshold: 10,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PROD-004",
    name: "USB-C Fast Charger",
    sku: "UC-FC-004",
    stock: 7,
    threshold: 15,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "PROD-005",
    name: "Wireless Mouse",
    sku: "WM-BT-005",
    stock: 4,
    threshold: 12,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function LowStockAlerts() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <h2 className="text-lg font-semibold">Low Stock Alerts</h2>
        </div>
        <Link href="/admin/products/inventory" className="text-sm text-primary hover:underline">
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                SKU
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Current Stock
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Threshold
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {lowStockItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover mr-3 bg-gray-100 dark:bg-gray-700"
                    />
                    <div className="font-medium">{item.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500">
                    {item.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {item.threshold} units
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Link href={`/admin/products/${item.id}`} className="text-primary hover:underline">
                    Restock
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
