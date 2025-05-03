"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerStatusToggle } from "@/organisms/customer-status-toggle"
import { CustomerSegmentation } from "@/organisms/customer-segmentation"
import { CustomerNotes } from "@/organisms/customer-notes"
import { CustomerActivityTimeline } from "@/organisms/customer-activity-timeline"
import { CustomerAnalytics } from "@/organisms/customer-analytics"
import { ArrowLeft, Mail, Phone, Calendar, ShoppingBag, CreditCard, MapPin, Download } from "lucide-react"

type CustomerStatus = "active" | "inactive" | "banned"

interface CustomerOrder {
  id: string
  orderNumber: string
  date: string
  total: number
  status: string
  items: number
}

interface CustomerAddress {
  id: string
  type: string
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
}

interface CustomerNote {
  id: string
  content: string
  createdAt: string
  createdBy: string
}

interface CustomerActivity {
  id: string
  type: any // Using the ActivityType from ActivityTimelineItem
  title: string
  description: string
  timestamp: string
  date: Date
  link?: {
    text: string
    href: string
  }
}

interface CustomerDetailProps {
  customer: {
    id: string
    name: string
    email: string
    phone: string
    registrationDate: string
    status: CustomerStatus
    ordersCount: number
    totalSpent: number
    lastOrderDate: string | null
    tags: string[]
    addresses: CustomerAddress[]
  }
  orders: CustomerOrder[]
  notes: CustomerNote[]
  activities: CustomerActivity[]
  analytics: {
    purchaseHistory: {
      month: string
      amount: number
    }[]
    categoryBreakdown: {
      name: string
      value: number
    }[]
    visitFrequency: {
      day: string
      visits: number
    }[]
  }
  onStatusChange: (customerId: string, newStatus: CustomerStatus) => Promise<void>
  onAddTag: (customerId: string, tag: string) => Promise<void>
  onRemoveTag: (customerId: string, tag: string) => Promise<void>
  onAddNote: (content: string) => Promise<void>
  onDeleteNote: (id: string) => Promise<void>
}

export function CustomerDetail({
  customer,
  orders,
  notes,
  activities,
  analytics,
  onStatusChange,
  onAddTag,
  onRemoveTag,
  onAddNote,
  onDeleteNote,
}: CustomerDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <Link
            href="/admin/customers"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Customers
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{customer.name}</h1>
          <p className="text-muted-foreground">Customer ID: {customer.id}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email Customer
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(customer.registrationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                <span>{customer.ordersCount} orders</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>${customer.totalSpent.toFixed(2)} total spent</span>
              </div>
            </div>

            <div className="pt-2">
              <CustomerStatusToggle
                customerId={customer.id}
                initialStatus={customer.status}
                onStatusChange={onStatusChange}
              />
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Customer Segmentation</h4>
              <CustomerSegmentation
                customerId={customer.id}
                initialTags={customer.tags}
                onAddTag={onAddTag}
                onRemoveTag={onRemoveTag}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Addresses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {customer.addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 rounded-lg border ${address.isDefault ? "border-primary" : "border-border"}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{address.type}</h4>
                      {address.isDefault && <span className="text-xs text-primary">Default</span>}
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                  <div className="mt-2 text-sm space-y-1">
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                    <p>{address.country}</p>
                  </div>
                </div>
              ))}

              {customer.addresses.length === 0 && (
                <div className="col-span-full text-center py-6 text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No addresses on file</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <CustomerAnalytics
            purchaseHistory={analytics.purchaseHistory}
            categoryBreakdown={analytics.categoryBreakdown}
            visitFrequency={analytics.visitFrequency}
          />
        </TabsContent>

        <TabsContent value="orders" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Showing all {orders.length} orders for this customer</CardDescription>
            </CardHeader>
            <CardContent>
              {orders.length > 0 ? (
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Order #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Items
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{order.orderNumber}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                order.status === "completed"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : order.status === "processing"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                    : order.status === "cancelled"
                                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">{order.items}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/orders/${order.id}`}>View</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerActivityTimeline activities={activities} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="pt-4">
          <CustomerNotes initialNotes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
