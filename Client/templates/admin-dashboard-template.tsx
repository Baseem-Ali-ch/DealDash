"use client"

import { DollarSign, ShoppingBag, Users, TrendingUp } from "lucide-react"
import { MetricCard } from "@/molecules/metric-card"
import { SalesChart } from "@/organisms/sales-chart"
import { RecentOrders } from "@/organisms/recent-orders"
import { LowStockAlerts } from "@/organisms/low-stock-alerts"
import { TopProducts } from "@/organisms/top-products"
import { LatestCustomers } from "@/organisms/latest-customers"
import { SystemNotifications } from "@/organisms/system-notifications"
import { QuickLinks } from "@/organisms/quick-links"
import { DashboardTabs } from "@/molecules/dashboard-tabs"

export function AdminDashboardTemplate() {
  const overviewTab = (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$24,567.89"
          icon={<DollarSign className="h-6 w-6" />}
          change={{ value: 12.5, isPositive: true }}
        />
        <MetricCard
          title="Orders"
          value="356"
          icon={<ShoppingBag className="h-6 w-6" />}
          change={{ value: 8.2, isPositive: true }}
        />
        <MetricCard
          title="Customers"
          value="1,245"
          icon={<Users className="h-6 w-6" />}
          change={{ value: 5.3, isPositive: true }}
        />
        <MetricCard
          title="Conversion Rate"
          value="3.2%"
          icon={<TrendingUp className="h-6 w-6" />}
          change={{ value: 1.1, isPositive: false }}
        />
      </div>

      {/* Sales Chart */}
      <SalesChart />

      {/* Quick Links */}
      <QuickLinks />

      {/* Orders and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentOrders />
        <SystemNotifications />
      </div>
    </div>
  )

  const productsTab = (
    <div className="space-y-6">
      <TopProducts />
      <LowStockAlerts />
    </div>
  )

  const customersTab = (
    <div className="space-y-6">
      <LatestCustomers />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, Admin! Here's what's happening with your store today.
          </p>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Last updated: May 15, 2023, 10:30 AM</div>
      </div>

      <DashboardTabs
        tabs={[
          { id: "overview", label: "Overview", content: overviewTab },
          { id: "products", label: "Products", content: productsTab },
          { id: "customers", label: "Customers", content: customersTab },
        ]}
      />
    </div>
  )
}
