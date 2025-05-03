"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"

interface CustomerAnalyticsProps {
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

const COLORS = ["#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", "#d0ed57", "#ffc658"]

export function CustomerAnalytics({ purchaseHistory, categoryBreakdown, visitFrequency }: CustomerAnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="purchases">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="purchases">Purchase History</TabsTrigger>
            <TabsTrigger value="categories">Category Breakdown</TabsTrigger>
            <TabsTrigger value="visits">Visit Frequency</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={purchaseHistory} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Amount"]}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="amount" fill="#8884d8" name="Purchase Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="visits" className="pt-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitFrequency} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
