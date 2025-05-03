"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RevenueOverview } from "@/organisms/revenue-overview"
import { RevenueChart } from "@/organisms/revenue-chart"
import { CategoryRevenue } from "@/organisms/category-revenue"
import { TopProducts } from "@/organisms/top-products"
import { PaymentMethods } from "@/organisms/payment-methods"
import { DateRangePicker } from "@/molecules/date-range-picker"
import { Download, Filter, RefreshCw } from "lucide-react"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

// Sample data for revenue metrics
const revenueMetrics = {
  daily: [
    {
      title: "Gross Sales",
      value: "$2,350",
      change: {
        value: 12.5,
        trend: "up" as const,
      },
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Net Sales",
      value: "$1,950",
      change: {
        value: 10.2,
        trend: "up" as const,
      },
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Refunds",
      value: "$150",
      change: {
        value: 3.1,
        trend: "down" as const,
      },
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Average Order",
      value: "$78.50",
      change: {
        value: 5.3,
        trend: "up" as const,
      },
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ],
  weekly: [
    {
      title: "Gross Sales",
      value: "$15,750",
      change: {
        value: 8.3,
        trend: "up" as const,
      },
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Net Sales",
      value: "$13,200",
      change: {
        value: 7.5,
        trend: "up" as const,
      },
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Refunds",
      value: "$950",
      change: {
        value: 2.1,
        trend: "down" as const,
      },
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Average Order",
      value: "$82.30",
      change: {
        value: 3.7,
        trend: "up" as const,
      },
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ],
  monthly: [
    {
      title: "Gross Sales",
      value: "$68,500",
      change: {
        value: 15.2,
        trend: "up" as const,
      },
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Net Sales",
      value: "$58,200",
      change: {
        value: 12.8,
        trend: "up" as const,
      },
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Refunds",
      value: "$3,850",
      change: {
        value: 1.5,
        trend: "down" as const,
      },
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Average Order",
      value: "$85.60",
      change: {
        value: 4.2,
        trend: "up" as const,
      },
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ],
  yearly: [
    {
      title: "Gross Sales",
      value: "$845,000",
      change: {
        value: 22.5,
        trend: "up" as const,
      },
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      title: "Net Sales",
      value: "$720,000",
      change: {
        value: 18.7,
        trend: "up" as const,
      },
      icon: <CreditCard className="h-4 w-4" />,
    },
    {
      title: "Refunds",
      value: "$42,500",
      change: {
        value: 2.3,
        trend: "down" as const,
      },
      icon: <BarChart className="h-4 w-4" />,
    },
    {
      title: "Average Order",
      value: "$92.30",
      change: {
        value: 6.8,
        trend: "up" as const,
      },
      icon: <TrendingUp className="h-4 w-4" />,
    },
  ],
}

import { DollarSign, CreditCard, BarChart, TrendingUp } from "lucide-react"

export function RevenueAnalyticsTemplate() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Revenue Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analysis of your store's revenue and sales performance</p>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <RevenueOverview metrics={revenueMetrics} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <RevenueChart />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CategoryRevenue />
        <TopProducts />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PaymentMethods />
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Revenue Forecast</CardTitle>
            <CardDescription>Projected revenue based on historical data and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <p className="text-muted-foreground">Revenue forecast visualization coming soon</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
