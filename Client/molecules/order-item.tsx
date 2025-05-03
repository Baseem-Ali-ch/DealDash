"use client"

import { useState } from "react"
import type { Order } from "@/lib/data/user-data"
import { ChevronDown, ChevronUp, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/atoms/button"
import { OrderStatusProgress } from "@/molecules/order-status-progress"

interface OrderItemProps {
  order: Order
}

export const OrderItem = ({ order }: OrderItemProps) => {
  const [expanded, setExpanded] = useState(false)

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "bg-yellow-500"
      case "shipped":
        return "bg-blue-500"
      case "delivered":
        return "bg-green-500"
      case "cancelled":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "processing":
        return "Processing"
      case "shipped":
        return "Shipped"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden mb-4">
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              getStatusColor(order.status),
            )}
          >
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-medium">{order.orderNumber}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{order.date}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 sm:mt-0">
          <div className="text-right">
            <span className="font-medium">${order.total.toFixed(2)}</span>
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-full ml-2",
                `bg-${order.status === "delivered" ? "green" : order.status === "cancelled" ? "red" : "blue"}-100`,
                `text-${order.status === "delivered" ? "green" : order.status === "cancelled" ? "red" : "blue"}-800`,
              )}
            >
              {getStatusText(order.status)}
            </span>
          </div>
          <div className="text-gray-400">
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </div>
        </div>
      </div>

      {expanded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          {order.status !== "cancelled" && (
            <OrderStatusProgress
              status={
                order.status === "processing"
                  ? "processing"
                  : order.status === "shipped"
                    ? "shipped"
                    : order.status === "delivered"
                      ? "delivered"
                      : "pending"
              }
              className="mb-6"
            />
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium mb-3">Order Items</h5>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h6 className="font-medium">{item.name}</h6>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.tracking && (
              <div>
                <h5 className="font-medium mb-3">Tracking Information</h5>
                <p className="text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Carrier:</span> {order.tracking.carrier}
                </p>
                <p className="text-sm mb-1">
                  <span className="text-gray-500 dark:text-gray-400">Tracking Number:</span>{" "}
                  {order.tracking.trackingNumber}
                </p>
                <p className="text-sm mb-3">
                  <span className="text-gray-500 dark:text-gray-400">Estimated Delivery:</span>{" "}
                  {order.tracking.estimatedDelivery}
                </p>

                <div className="space-y-4">
                  {order.tracking.timeline.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full mt-0.5",
                          event.completed ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600",
                        )}
                      ></div>
                      <div>
                        <p className="font-medium">{event.status}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{event.date || "Pending"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-4 gap-3">
            <Button variant="outline">Contact Support</Button>
            {order.tracking && <Button>Track Package</Button>}
          </div>
        </div>
      )}
    </div>
  )
}
