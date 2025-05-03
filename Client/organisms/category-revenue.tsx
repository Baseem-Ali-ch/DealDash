"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data for category revenue
const categoryData = [
  { name: "Electronics", value: 35000, color: "#8884d8" },
  { name: "Clothing", value: 25000, color: "#82ca9d" },
  { name: "Home & Kitchen", value: 18000, color: "#ffc658" },
  { name: "Beauty", value: 12000, color: "#ff8042" },
  { name: "Books", value: 10000, color: "#0088fe" },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function CategoryRevenue() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue by Category</CardTitle>
        <CardDescription>Distribution of revenue across product categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
