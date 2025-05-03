import { AdminLayout } from "@/templates/admin-layout"
import { CustomerDetail } from "@/organisms/customer-detail"

// Mock data for a single customer
const mockCustomer = {
  id: "cust_001",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  registrationDate: "2023-01-15",
  status: "active" as const,
  ordersCount: 12,
  totalSpent: 1249.99,
  lastOrderDate: "2023-05-20",
  tags: ["VIP", "Loyal"],
  addresses: [
    {
      id: "addr_001",
      type: "Shipping",
      line1: "123 Main St",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postalCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr_002",
      type: "Billing",
      line1: "456 Park Ave",
      city: "New York",
      state: "NY",
      postalCode: "10022",
      country: "United States",
      isDefault: false,
    },
  ],
}

// Mock orders for this customer
const mockOrders = [
  {
    id: "ord_001",
    orderNumber: "ORD-2023-0001",
    date: "2023-05-20",
    total: 129.99,
    status: "completed",
    items: 2,
  },
  {
    id: "ord_008",
    orderNumber: "ORD-2023-0008",
    date: "2023-05-05",
    total: 299.97,
    status: "completed",
    items: 3,
  },
  {
    id: "ord_011",
    orderNumber: "ORD-2023-0011",
    date: "2023-04-18",
    total: 89.99,
    status: "completed",
    items: 1,
  },
  {
    id: "ord_015",
    orderNumber: "ORD-2023-0015",
    date: "2023-03-22",
    total: 149.99,
    status: "completed",
    items: 1,
  },
  {
    id: "ord_019",
    orderNumber: "ORD-2023-0019",
    date: "2023-02-10",
    total: 199.98,
    status: "completed",
    items: 2,
  },
]

// Mock notes for this customer
const mockNotes = [
  {
    id: "note_001",
    content: "Customer requested a refund for order #ORD-2023-0015 due to late delivery. Approved and processed.",
    createdAt: "2023-03-25T14:30:00Z",
    createdBy: "Admin User",
  },
  {
    id: "note_002",
    content: "VIP status granted due to high purchase volume over the past 3 months.",
    createdAt: "2023-04-10T09:15:00Z",
    createdBy: "System",
  },
  {
    id: "note_003",
    content: "Customer called about upcoming promotions. Informed about the summer sale starting next week.",
    createdAt: "2023-05-15T11:45:00Z",
    createdBy: "Support Agent",
  },
]

// Mock activities for this customer
const mockActivities = [
  {
    id: "act_001",
    type: "purchase",
    title: "Placed an order",
    description: "Purchased 2 items for $129.99",
    timestamp: "2 days ago",
    date: new Date("2023-05-20"),
    link: {
      text: "View Order #ORD-2023-0001",
      href: "/admin/orders/ord_001",
    },
  },
  {
    id: "act_002",
    type: "login",
    title: "Logged in",
    description: "Logged in from New York, USA (Chrome/Windows)",
    timestamp: "2 days ago",
    date: new Date("2023-05-20"),
  },
  {
    id: "act_003",
    type: "purchase",
    title: "Placed an order",
    description: "Purchased 3 items for $299.97",
    timestamp: "2 weeks ago",
    date: new Date("2023-05-05"),
    link: {
      text: "View Order #ORD-2023-0008",
      href: "/admin/orders/ord_008",
    },
  },
  {
    id: "act_004",
    type: "review",
    title: "Left a review",
    description: "Rated Premium Wireless Headphones 5 stars",
    timestamp: "3 weeks ago",
    date: new Date("2023-04-30"),
  },
  {
    id: "act_005",
    type: "wishlist",
    title: "Added to wishlist",
    description: "Added Smart Watch Series 5 to wishlist",
    timestamp: "1 month ago",
    date: new Date("2023-04-22"),
  },
  {
    id: "act_006",
    type: "support",
    title: "Contacted support",
    description: "Inquired about upcoming promotions",
    timestamp: "1 week ago",
    date: new Date("2023-05-15"),
  },
  {
    id: "act_007",
    type: "login",
    title: "Logged in",
    description: "Logged in from New York, USA (Safari/iOS)",
    timestamp: "1 week ago",
    date: new Date("2023-05-15"),
  },
]

// Mock analytics data
const mockAnalytics = {
  purchaseHistory: [
    { month: "Jan", amount: 199.99 },
    { month: "Feb", amount: 199.98 },
    { month: "Mar", amount: 149.99 },
    { month: "Apr", amount: 89.99 },
    { month: "May", amount: 429.96 },
  ],
  categoryBreakdown: [
    { name: "Electronics", value: 649.97 },
    { name: "Clothing", value: 199.98 },
    { name: "Home", value: 149.99 },
    { name: "Accessories", value: 69.97 },
  ],
  visitFrequency: [
    { day: "Mon", visits: 2 },
    { day: "Tue", visits: 0 },
    { day: "Wed", visits: 1 },
    { day: "Thu", visits: 3 },
    { day: "Fri", visits: 1 },
    { day: "Sat", visits: 4 },
    { day: "Sun", visits: 2 },
  ],
}

export default function CustomerDetailPage({ params }: { params: { id: string } }) {
  // In a real app, fetch customer data based on params.id

  // Mock handlers
  const handleStatusChange = async (customerId: string, newStatus: "active" | "inactive" | "banned") => {
    console.log(`Changing status for customer ${customerId} to ${newStatus}`)
    return Promise.resolve()
  }

  const handleAddTag = async (customerId: string, tag: string) => {
    console.log(`Adding tag ${tag} to customer ${customerId}`)
    return Promise.resolve()
  }

  const handleRemoveTag = async (customerId: string, tag: string) => {
    console.log(`Removing tag ${tag} from customer ${customerId}`)
    return Promise.resolve()
  }

  const handleAddNote = async (content: string) => {
    console.log(`Adding note: ${content}`)
    return Promise.resolve()
  }

  const handleDeleteNote = async (id: string) => {
    console.log(`Deleting note: ${id}`)
    return Promise.resolve()
  }

  return (
    <AdminLayout>
      <CustomerDetail
        customer={mockCustomer}
        orders={mockOrders}
        notes={mockNotes}
        activities={mockActivities}
        analytics={mockAnalytics}
        onStatusChange={handleStatusChange}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
        onAddNote={handleAddNote}
        onDeleteNote={handleDeleteNote}
      />
    </AdminLayout>
  )
}
