"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowUp, ArrowDown } from "lucide-react"

// Sample data for top products
const topProducts = [
  {
    id: "prod_001",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    revenue: 12500,
    orders: 125,
    trend: "up",
    change: 15,
  },
  {
    id: "prod_002",
    name: "Premium Smartphone Case",
    category: "Accessories",
    revenue: 8750,
    orders: 350,
    trend: "up",
    change: 8,
  },
  {
    id: "prod_003",
    name: "Ultra HD Smart TV",
    category: "Electronics",
    revenue: 32000,
    orders: 40,
    trend: "down",
    change: 3,
  },
  {
    id: "prod_004",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    revenue: 6500,
    orders: 260,
    trend: "up",
    change: 12,
  },
  {
    id: "prod_005",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    revenue: 4800,
    orders: 240,
    trend: "down",
    change: 5,
  },
]

export function TopProducts() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
        <CardDescription>Products generating the highest revenue</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Trend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{product.category}</Badge>
                </TableCell>
                <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                <TableCell className="text-right">{product.orders}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <span
                      className={`inline-flex items-center ${
                        product.trend === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.trend === "up" ? (
                        <ArrowUp className="mr-1 h-4 w-4" />
                      ) : (
                        <ArrowDown className="mr-1 h-4 w-4" />
                      )}
                      {product.change}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
