"use client"

import { useState } from "react"
import type { Order } from "@/lib/data/user-data"
import { OrderItem } from "@/molecules/order-item"
import { Input } from "@/atoms/input"
import { Button } from "@/atoms/button"
import { Search } from "lucide-react"

interface OrdersSectionProps {
  orders: Order[]
}

export const OrdersSection = ({ orders }: OrdersSectionProps) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 pt-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-6">My Orders</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by order number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
              All
            </Button>
            <Button
              variant={statusFilter === "processing" ? "default" : "outline"}
              onClick={() => setStatusFilter("processing")}
            >
              Processing
            </Button>
            <Button
              variant={statusFilter === "shipped" ? "default" : "outline"}
              onClick={() => setStatusFilter("shipped")}
            >
              Shipped
            </Button>
            <Button
              variant={statusFilter === "delivered" ? "default" : "outline"}
              onClick={() => setStatusFilter("delivered")}
            >
              Delivered
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => <OrderItem key={order.id} order={order} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No orders found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
