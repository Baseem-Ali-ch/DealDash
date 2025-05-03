"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DateRangePicker } from "@/molecules/date-range-picker"
import { AnalyticsCard } from "@/molecules/analytics-card"
import { DollarSign, ShoppingCart, Users, Percent } from "lucide-react"
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
} from "recharts"
import type { DateRange } from "react-day-picker"

// Mock data for analytics
const usageData = [
  { date: "2023-05-01", count: 12 },
  { date: "2023-05-02", count: 18 },
  { date: "2023-05-03", count: 15 },
  { date: "2023-05-04", count: 25 },
  { date: "2023-05-05", count: 32 },
  { date: "2023-05-06", count: 28 },
  { date: "2023-05-07", count: 20 },
]

const revenueData = [
  { date: "2023-05-01", withPromotion: 1250, withoutPromotion: 1500 },
  { date: "2023-05-02", withPromotion: 1320, withoutPromotion: 1600 },
  { date: "2023-05-03", withPromotion: 1400, withoutPromotion: 1700 },
  { date: "2023-05-04", withPromotion: 1280, withoutPromotion: 1550 },
  { date: "2023-05-05", withPromotion: 1500, withoutPromotion: 1800 },
  { date: "2023-05-06", withPromotion: 1600, withoutPromotion: 1900 },
  { date: "2023-05-07", withPromotion: 1450, withoutPromotion: 1750 },
]

const customerSegmentData = [
  { name: "New Customers", value: 45 },
  { name: "Returning Customers", value: 35 },
  { name: "VIP Customers", value: 20 },
]

interface PromotionAnalyticsProps {
  promotionId: string
  promotionName: string
}

export function PromotionAnalytics({ promotionId, promotionName }: PromotionAnalyticsProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2023, 4, 1),
    to: new Date(2023, 4, 7),
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">{promotionName} Analytics</h2>
          <p className="text-gray-500 dark:text-gray-400">Performance metrics and insights for this promotion</p>
        </div>
        <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} className="w-full md:w-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Uses"
          value="150"
          change={{ value: 12.5, isPositive: true }}
          icon={<ShoppingCart className="h-4 w-4" />}
        />
        <AnalyticsCard
          title="Revenue Impact"
          value="$2,450"
          change={{ value: 8.3, isPositive: true }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <AnalyticsCard
          title="Unique Customers"
          value="87"
          change={{ value: 15.2, isPositive: true }}
          icon={<Users className="h-4 w-4" />}
        />
        <AnalyticsCard
          title="Conversion Rate"
          value="24.5%"
          change={{ value: 3.7, isPositive: true }}
          icon={<Percent className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="usage">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="usage">Usage Trends</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Impact</TabsTrigger>
          <TabsTrigger value="customers">Customer Segments</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Usage</CardTitle>
              <CardDescription>Number of times this promotion was used each day</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={usageData}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9A52FF" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9A52FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [value, "Uses"]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="count"
                    name="Usage Count"
                    stroke="#9A52FF"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Comparison</CardTitle>
              <CardDescription>Comparing revenue with and without this promotion</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) =>
                      new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })
                    }
                  />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `$${value}`,
                      name === "withPromotion" ? "With Promotion" : "Without Promotion",
                    ]}
                    labelFormatter={(label) => new Date(label).toLocaleDateString()}
                  />
                  <Legend />
                  <Bar dataKey="withPromotion" name="With Promotion" fill="#9A52FF" />
                  <Bar dataKey="withoutPromotion" name="Without Promotion" fill="#FFB2E6" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>Breakdown of customer types using this promotion</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={customerSegmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                  <Legend />
                  <Bar dataKey="value" name="Percentage" fill="#9A52FF" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
