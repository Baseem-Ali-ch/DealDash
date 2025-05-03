"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { OrderStatusBadge } from "@/molecules/order-status-badge"
import { PaymentStatusBadge } from "@/molecules/payment-status-badge"
import { Package, Truck, User, FileText, MessageSquare } from "lucide-react"

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded" | "on-hold"
type PaymentStatus = "paid" | "pending" | "failed" | "refunded" | "partially-refunded"

interface OrderItem {
  id: string
  name: string
  sku: string
  price: number
  quantity: number
  total: number
  image?: string
}

interface OrderAddress {
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
}

interface Order {
  id: string
  orderNumber: string
  customer: {
    id: string
    name: string
    email: string
  }
  date: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  total: number
  items: number
  lineItems?: OrderItem[]
  shippingAddress?: OrderAddress
  billingAddress?: OrderAddress
  notes?: string
}

interface OrderDetailProps {
  order: Order
  onStatusChange: (newStatus: OrderStatus) => Promise<void>
  onPaymentStatusChange: (newStatus: PaymentStatus) => Promise<void>
}

export function OrderDetail({ order, onStatusChange, onPaymentStatusChange }: OrderDetailProps) {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
  const [isUpdatingPayment, setIsUpdatingPayment] = useState(false)

  // Mock data for line items if not provided
  const lineItems = order.lineItems || [
    {
      id: "item1",
      name: "Premium Wireless Headphones",
      sku: "HDP-100",
      price: 79.99,
      quantity: 1,
      total: 79.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "item2",
      name: "Smartphone Fast Charger",
      sku: "CHG-200",
      price: 24.99,
      quantity: 2,
      total: 49.98,
      image: "/placeholder.svg?height=50&width=50",
    },
  ]

  // Mock data for addresses if not provided
  const shippingAddress = order.shippingAddress || {
    name: order.customer.name,
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "United States",
  }

  const billingAddress = order.billingAddress || {
    name: order.customer.name,
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
    country: "United States",
  }

  // Handle order status change
  const handleStatusChange = async (newStatus: OrderStatus) => {
    setIsUpdatingStatus(true)
    try {
      await onStatusChange(newStatus)
    } catch (error) {
      console.error("Failed to update order status:", error)
    } finally {
      setIsUpdatingStatus(false)
    }
  }

  // Handle payment status change
  const handlePaymentStatusChange = async (newStatus: PaymentStatus) => {
    setIsUpdatingPayment(true)
    try {
      await onPaymentStatusChange(newStatus)
    } catch (error) {
      console.error("Failed to update payment status:", error)
    } finally {
      setIsUpdatingPayment(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Order Status Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Order Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-1">Order Status</p>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <Select
                  defaultValue={order.status}
                  onValueChange={(value) => handleStatusChange(value as OrderStatus)}
                  disabled={isUpdatingStatus}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="on-hold">On Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Payment Status</p>
              <div className="flex items-center gap-3">
                <PaymentStatusBadge status={order.paymentStatus} />
                <Select
                  defaultValue={order.paymentStatus}
                  onValueChange={(value) => handlePaymentStatusChange(value as PaymentStatus)}
                  disabled={isUpdatingPayment}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Change status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                    <SelectItem value="refunded">Refunded</SelectItem>
                    <SelectItem value="partially-refunded">Partially Refunded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Tabs */}
      <Tabs defaultValue="items">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="items">
            <Package className="h-4 w-4 mr-2" />
            Items
          </TabsTrigger>
          <TabsTrigger value="customer">
            <User className="h-4 w-4 mr-2" />
            Customer
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            Shipping
          </TabsTrigger>
          <TabsTrigger value="notes">
            <MessageSquare className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Items Tab */}
        <TabsContent value="items" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                {lineItems.length} items, total ${order.total.toFixed(2)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lineItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 py-2">
                    {item.image && (
                      <div className="h-12 w-12 rounded overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm">
                          ${item.price.toFixed(2)} × {item.quantity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
                <Separator className="my-2" />
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${(order.total * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${(order.total * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${(order.total * 0.05).toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Print Invoice
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              Print Packing Slip
            </Button>
          </div>
        </TabsContent>

        {/* Customer Tab */}
        <TabsContent value="customer" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p>{order.customer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p>{order.customer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Customer ID</p>
                  <p>{order.customer.id}</p>
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm">
                    View Customer Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Shipping Tab */}
        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{shippingAddress.name}</p>
                <p>{shippingAddress.street}</p>
                <p>
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}
                </p>
                <p>{shippingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{billingAddress.name}</p>
                <p>{billingAddress.street}</p>
                <p>
                  {billingAddress.city}, {billingAddress.state} {billingAddress.zip}
                </p>
                <p>{billingAddress.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Shipping Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Shipping Method</p>
                  <p>Standard Shipping</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Tracking Number</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter tracking number"
                      className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button size="sm">Save</Button>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Carrier</p>
                  <Select defaultValue="fedex">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select carrier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedex">FedEx</SelectItem>
                      <SelectItem value="ups">UPS</SelectItem>
                      <SelectItem value="usps">USPS</SelectItem>
                      <SelectItem value="dhl">DHL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Order Notes</CardTitle>
              <CardDescription>Internal notes visible only to staff</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                className="min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Add notes about this order..."
                defaultValue={order.notes || ""}
              />
              <Button className="mt-2">Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
