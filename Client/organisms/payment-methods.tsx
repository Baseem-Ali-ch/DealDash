"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"

// Sample data for payment methods
const paymentData = [
  {
    name: "Credit Card",
    revenue: 45000,
    transactions: 450,
  },
  {
    name: "PayPal",
    revenue: 25000,
    transactions: 300,
  },
  {
    name: "Apple Pay",
    revenue: 15000,
    transactions: 200,
  },
  {
    name: "Google Pay",
    revenue: 10000,
    transactions: 150,
  },
  {
    name: "Bank Transfer",
    revenue: 5000,
    transactions: 50,
  },
]

export function PaymentMethods() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Revenue by Payment Method</CardTitle>
        <CardDescription>Distribution of revenue across different payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            transactions: {
              label: "Transactions",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="var(--color-revenue)" />
              <YAxis yAxisId="right" orientation="right" stroke="var(--color-transactions)" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="var(--color-revenue)" name="Revenue" />
              <Bar yAxisId="right" dataKey="transactions" fill="var(--color-transactions)" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
