"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Calendar, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample data
const dailyData = [
  { date: "Mon", sales: 4000, orders: 24 },
  { date: "Tue", sales: 3000, orders: 18 },
  { date: "Wed", sales: 5000, orders: 30 },
  { date: "Thu", sales: 2780, orders: 16 },
  { date: "Fri", sales: 1890, orders: 11 },
  { date: "Sat", sales: 6390, orders: 38 },
  { date: "Sun", sales: 3490, orders: 21 },
]

const weeklyData = [
  { date: "Week 1", sales: 24000, orders: 145 },
  { date: "Week 2", sales: 21000, orders: 126 },
  { date: "Week 3", sales: 30000, orders: 180 },
  { date: "Week 4", sales: 18000, orders: 108 },
]

const monthlyData = [
  { date: "Jan", sales: 85000, orders: 510 },
  { date: "Feb", sales: 72000, orders: 432 },
  { date: "Mar", sales: 93000, orders: 558 },
  { date: "Apr", sales: 99000, orders: 594 },
  { date: "May", sales: 86000, orders: 516 },
  { date: "Jun", sales: 105000, orders: 630 },
  { date: "Jul", sales: 110000, orders: 660 },
  { date: "Aug", sales: 98000, orders: 588 },
  { date: "Sep", sales: 92000, orders: 552 },
  { date: "Oct", sales: 102000, orders: 612 },
  { date: "Nov", sales: 115000, orders: 690 },
  { date: "Dec", sales: 130000, orders: 780 },
]

type TimeRange = "daily" | "weekly" | "monthly"

export function SalesChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily")
  const [showRangeSelector, setShowRangeSelector] = useState(false)

  const getData = () => {
    switch (timeRange) {
      case "daily":
        return dailyData
      case "weekly":
        return weeklyData
      case "monthly":
        return monthlyData
      default:
        return dailyData
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-lg font-semibold">Sales Overview</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowRangeSelector(!showRangeSelector)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium"
            >
              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span>
                {timeRange === "daily" && "Last 7 days"}
                {timeRange === "weekly" && "Last 4 weeks"}
                {timeRange === "monthly" && "Last 12 months"}
              </span>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>

            {showRangeSelector && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    className={cn(
                      "block px-4 py-2 text-sm w-full text-left",
                      timeRange === "daily"
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    )}
                    onClick={() => {
                      setTimeRange("daily")
                      setShowRangeSelector(false)
                    }}
                  >
                    Last 7 days
                  </button>
                  <button
                    className={cn(
                      "block px-4 py-2 text-sm w-full text-left",
                      timeRange === "weekly"
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    )}
                    onClick={() => {
                      setTimeRange("weekly")
                      setShowRangeSelector(false)
                    }}
                  >
                    Last 4 weeks
                  </button>
                  <button
                    className={cn(
                      "block px-4 py-2 text-sm w-full text-left",
                      timeRange === "monthly"
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700",
                    )}
                    onClick={() => {
                      setTimeRange("monthly")
                      setShowRangeSelector(false)
                    }}
                  >
                    Last 12 months
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Sales</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Orders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={getData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={{ stroke: "#e5e7eb" }} />
            <YAxis
              yAxisId="left"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              tickFormatter={(value) => `$${value}`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderColor: "#e5e7eb",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value, name) => {
                if (name === "sales") {
                  return [formatCurrency(value as number), "Sales"]
                }
                return [value, "Orders"]
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "0.5rem" }}
            />
            <Legend display={false} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#9A52FF"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#60a5fa"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
