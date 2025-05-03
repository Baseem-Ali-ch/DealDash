import Link from "next/link"
import { Plus, ShoppingBag, Package, Users, Tag, BarChart3, MessageSquare, CreditCard } from "lucide-react"

const quickLinks = [
  {
    title: "Add Product",
    description: "Create a new product listing",
    icon: <Plus className="h-5 w-5" />,
    href: "/admin/products/new",
    color: "bg-blue-500",
  },
  {
    title: "View Orders",
    description: "Manage customer orders",
    icon: <ShoppingBag className="h-5 w-5" />,
    href: "/admin/orders",
    color: "bg-green-500",
  },
  {
    title: "Inventory",
    description: "Check stock levels",
    icon: <Package className="h-5 w-5" />,
    href: "/admin/products/inventory",
    color: "bg-amber-500",
  },
  {
    title: "Customers",
    description: "View customer profiles",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/customers",
    color: "bg-purple-500",
  },
  {
    title: "Categories",
    description: "Manage product categories",
    icon: <Tag className="h-5 w-5" />,
    href: "/admin/products/categories",
    color: "bg-indigo-500",
  },
  {
    title: "Analytics",
    description: "View sales reports",
    icon: <BarChart3 className="h-5 w-5" />,
    href: "/admin/analytics",
    color: "bg-red-500",
  },
  {
    title: "Reviews",
    description: "Manage product reviews",
    icon: <MessageSquare className="h-5 w-5" />,
    href: "/admin/reviews",
    color: "bg-teal-500",
  },
  {
    title: "Transactions",
    description: "View payment history",
    icon: <CreditCard className="h-5 w-5" />,
    href: "/admin/transactions",
    color: "bg-pink-500",
  },
]

export function QuickLinks() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Links</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className={`${link.color} p-2 rounded-lg text-white mr-3`}>{link.icon}</div>
            <div>
              <h3 className="font-medium">{link.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{link.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
