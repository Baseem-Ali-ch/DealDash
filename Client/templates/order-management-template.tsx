"use client"

import { useState } from "react"
import { OrderTable } from "@/organisms/order-table"

// Mock data for orders
const mockOrders = [
  {
    id: "ord_001",
    orderNumber: "ORD-2023-0001",
    customer: {
      id: "cust_001",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    date: "2023-05-20",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "Credit Card",
    total: 129.99,
    items: 2,
  },
  {
    id: "ord_002",
    orderNumber: "ORD-2023-0002",
    customer: {
      id: "cust_004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    date: "2023-05-18",
    status: "shipped" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "PayPal",
    total: 249.95,
    items: 3,
  },
  {
    id: "ord_003",
    orderNumber: "ORD-2023-0003",
    customer: {
      id: "cust_007",
      name: "David Miller",
      email: "david.miller@example.com",
    },
    date: "2023-05-22",
    status: "processing" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "Credit Card",
    total: 349.99,
    items: 1,
  },
  {
    id: "ord_004",
    orderNumber: "ORD-2023-0004",
    customer: {
      id: "cust_006",
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
    },
    date: "2023-05-15",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "Credit Card",
    total: 89.99,
    items: 1,
  },
  {
    id: "ord_005",
    orderNumber: "ORD-2023-0005",
    customer: {
      id: "cust_010",
      name: "Lisa Thomas",
      email: "lisa.thomas@example.com",
    },
    date: "2023-05-10",
    status: "delivered" as const,
    paymentStatus: "refunded" as const,
    paymentMethod: "Credit Card",
    total: 199.99,
    items: 2,
  },
  {
    id: "ord_006",
    orderNumber: "ORD-2023-0006",
    customer: {
      id: "cust_002",
      name: "Jane Smith",
      email: "jane.smith@example.com",
    },
    date: "2023-04-10",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "PayPal",
    total: 149.95,
    items: 2,
  },
  {
    id: "ord_007",
    orderNumber: "ORD-2023-0007",
    customer: {
      id: "cust_008",
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
    },
    date: "2023-04-28",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "Credit Card",
    total: 129.99,
    items: 1,
  },
  {
    id: "ord_008",
    orderNumber: "ORD-2023-0008",
    customer: {
      id: "cust_001",
      name: "John Doe",
      email: "john.doe@example.com",
    },
    date: "2023-05-05",
    status: "delivered" as const,
    paymentStatus: "paid" as const,
    paymentMethod: "Credit Card",
    total: 299.97,
    items: 3,
  },
  {
    id: "ord_009",
    orderNumber: "ORD-2023-0009",
    customer: {
      id: "cust_007",
      name: "David Miller",
      email: "david.miller@example.com",
    },
    date: "2023-05-21",
    status: "pending" as const,
    paymentStatus: "pending" as const,
    paymentMethod: "Bank Transfer",
    total: 499.95,
    items: 5,
  },
  {
    id: "ord_010",
    orderNumber: "ORD-2023-0010",
    customer: {
      id: "cust_004",
      name: "Emily Davis",
      email: "emily.davis@example.com",
    },
    date: "2023-05-17",
    status: "cancelled" as const,
    paymentStatus: "refunded" as const,
    paymentMethod: "Credit Card",
    total: 79.99,
    items: 1,
  },
]

export function OrderManagementTemplate() {
  const [orders, setOrders] = useState(mockOrders)

  // Handle order status change
  const handleStatusChange = async (
    orderId: string,
    newStatus: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "on-hold",
  ) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
        resolve()
      }, 500)
    })
  }

  // Handle payment status change
  const handlePaymentStatusChange = async (
    orderId: string,
    newStatus: "paid" | "pending" | "failed" | "refunded" | "partially-refunded",
  ) => {
    // In a real app, this would be an API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setOrders(orders.map((order) => (order.id === orderId ? { ...order, paymentStatus: newStatus } : order)))
        resolve()
      }, 500)
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>
        <p className="text-muted-foreground">
          View and manage all customer orders, process payments, and update order statuses.
        </p>
      </div>

      <OrderTable
        orders={orders}
        onStatusChange={handleStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
      />
    </div>
  )
}
