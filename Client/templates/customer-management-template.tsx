"use client"

import { useState } from "react"
import { CustomerTable } from "@/organisms/customer-table"

// Mock data for customers
const mockCustomers = [
  {
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
  },
  {
    id: "cust_002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    registrationDate: "2023-02-22",
    status: "active" as const,
    ordersCount: 5,
    totalSpent: 499.95,
    lastOrderDate: "2023-04-10",
    tags: ["New"],
  },
  {
    id: "cust_003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    registrationDate: "2022-11-05",
    status: "inactive" as const,
    ordersCount: 3,
    totalSpent: 189.97,
    lastOrderDate: "2023-01-15",
    tags: ["At Risk"],
  },
  {
    id: "cust_004",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 234-5678",
    registrationDate: "2023-03-10",
    status: "active" as const,
    ordersCount: 8,
    totalSpent: 879.92,
    lastOrderDate: "2023-05-18",
    tags: ["High Value"],
  },
  {
    id: "cust_005",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "+1 (555) 876-5432",
    registrationDate: "2022-09-18",
    status: "banned" as const,
    ordersCount: 2,
    totalSpent: 129.98,
    lastOrderDate: "2022-10-05",
    tags: [],
  },
  {
    id: "cust_006",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    phone: "+1 (555) 345-6789",
    registrationDate: "2023-04-05",
    status: "active" as const,
    ordersCount: 4,
    totalSpent: 349.96,
    lastOrderDate: "2023-05-15",
    tags: ["New"],
  },
  {
    id: "cust_007",
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "+1 (555) 654-3210",
    registrationDate: "2022-12-20",
    status: "active" as const,
    ordersCount: 15,
    totalSpent: 1599.85,
    lastOrderDate: "2023-05-22",
    tags: ["VIP", "Wholesale"],
  },
  {
    id: "cust_008",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    phone: "+1 (555) 789-0123",
    registrationDate: "2023-01-30",
    status: "active" as const,
    ordersCount: 7,
    totalSpent: 729.93,
    lastOrderDate: "2023-04-28",
    tags: ["Loyal"],
  },
  {
    id: "cust_009",
    name: "Christopher Anderson",
    email: "christopher.anderson@example.com",
    phone: "+1 (555) 321-0987",
    registrationDate: "2022-10-12",
    status: "inactive" as const,
    ordersCount: 1,
    totalSpent: 59.99,
    lastOrderDate: "2022-10-12",
    tags: ["Churned"],
  },
  {
    id: "cust_010",
    name: "Lisa Thomas",
    email: "lisa.thomas@example.com",
    phone: "+1 (555) 210-9876",
    registrationDate: "2023-03-25",
    status: "active" as const,
    ordersCount: 6,
    totalSpent: 599.94,
    lastOrderDate: "2023-05-10",
    tags: ["High Value"],
  },
]

export function CustomerManagementTemplate() {
  const [customers, setCustomers] = useState(mockCustomers)

  // Handle customer status change
  const handleStatusChange = async (customerId: string, newStatus: "active" | "inactive" | "banned") => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCustomers(
          customers.map((customer) => (customer.id === customerId ? { ...customer, status: newStatus } : customer)),
        )
        resolve()
      }, 500)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Management</h1>
        <p className="text-muted-foreground">View and manage all customer accounts, orders, and activity.</p>
      </div>

      <CustomerTable customers={customers} onStatusChange={handleStatusChange} />
    </div>
  )
}
