import Link from "next/link"
import { Users } from "lucide-react"

// Sample data
const latestCustomers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    date: "2023-05-15",
    orders: 3,
    spent: 249.97,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    date: "2023-05-14",
    orders: 1,
    spent: 79.99,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    date: "2023-05-13",
    orders: 5,
    spent: 599.95,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    date: "2023-05-12",
    orders: 2,
    spent: 149.98,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "CUST-005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    date: "2023-05-11",
    orders: 4,
    spent: 349.96,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function LatestCustomers() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Latest Customers</h2>
        </div>
        <Link href="/admin/customers" className="text-sm text-primary hover:underline">
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
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Joined
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Orders
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Spent
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
            {latestCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img
                      src={customer.avatar || "/placeholder.svg"}
                      alt={customer.name}
                      className="h-10 w-10 rounded-full object-cover mr-3 bg-gray-100 dark:bg-gray-700"
                    />
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {customer.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{customer.orders}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">${customer.spent.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <Link href={`/admin/customers/${customer.id}`} className="text-primary hover:underline">
                    View Profile
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
