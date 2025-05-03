"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"
import { DateRangePicker } from "@/molecules/date-range-picker"
import { Download } from "lucide-react"
import type { DateRange } from "react-day-picker"

// Sample data for the revenue chart
const revenueData = {
  daily: [
    { date: "2023-05-01", revenue: 1200, previousRevenue: 1000 },
    { date: "2023-05-02", revenue: 1500, previousRevenue: 1300 },
    { date: "2023-05-03", revenue: 1100, previousRevenue: 1200 },
    { date: "2023-05-04", revenue: 1800, previousRevenue: 1400 },
    { date: "2023-05-05", revenue: 2000, previousRevenue: 1600 },
    { date: "2023-05-06", revenue: 1700, previousRevenue: 1500 },
    { date: "2023-05-07", revenue: 1900, previousRevenue: 1700 },
  ],
  weekly: [
    { date: "Week 1", revenue: 8500, previousRevenue: 7500 },
    { date: "Week 2", revenue: 9200, previousRevenue: 8200 },
    { date: "Week 3", revenue: 8700, previousRevenue: 8000 },
    { date: "Week 4", revenue: 9500, previousRevenue: 8800 },
  ],
  monthly: [
    { date: "Jan", revenue: 35000, previousRevenue: 32000 },
    { date: "Feb", revenue: 32000, previousRevenue: 30000 },
    { date: "Mar", revenue: 38000, previousRevenue: 34000 },
    { date: "Apr", revenue: 40000, previousRevenue: 36000 },
    { date: "May", revenue: 42000, previousRevenue: 38000 },
  ],
  yearly: [
    { date: "2019", revenue: 420000, previousRevenue: 380000 },
    { date: "2020", revenue: 450000, previousRevenue: 420000 },
    { date: "2021", revenue: 480000, previousRevenue: 450000 },
    { date: "2022", revenue: 520000, previousRevenue: 480000 },
    { date: "2023", revenue: 550000, previousRevenue: 520000 },
  ],
}

export function RevenueChart() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Compare current revenue with previous periods</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker dateRange={dateRange} onDateRangeChange={setDateRange} />
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <ChartContainer
              config={{
                revenue: {
                  label: "Current Period",
                  color: "hsl(var(--chart-1))",
                },
                previousRevenue: {
                  label: "Previous Period",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData.daily} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Current Period"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="previousRevenue"
                    stroke="var(--color-previousRevenue)"
                    name="Previous Period"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="weekly">
            <ChartContainer
              config={{
                revenue: {
                  label: "Current Period",
                  color: "hsl(var(--chart-1))",
                },
                previousRevenue: {
                  label: "Previous Period",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData.weekly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Current Period"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="previousRevenue"
                    stroke="var(--color-previousRevenue)"
                    name="Previous Period"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="monthly">
            <ChartContainer
              config={{
                revenue: {
                  label: "Current Period",
                  color: "hsl(var(--chart-1))",
                },
                previousRevenue: {
                  label: "Previous Period",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Current Period"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="previousRevenue"
                    stroke="var(--color-previousRevenue)"
                    name="Previous Period"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>

          <TabsContent value="yearly">
            <ChartContainer
              config={{
                revenue: {
                  label: "Current Period",
                  color: "hsl(var(--chart-1))",
                },
                previousRevenue: {
                  label: "Previous Period",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[350px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData.yearly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-revenue)"
                    name="Current Period"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="previousRevenue"
                    stroke="var(--color-previousRevenue)"
                    name="Previous Period"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
