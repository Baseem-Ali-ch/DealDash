import { NextResponse } from "next/server"
import type { Promotion } from "@/lib/store/slices/promotionsSlice"

// Mock database - in a real app, this would be a database connection
// Using the same mock data as in the main route file
const promotions: Promotion[] = [
  {
    id: "promo1",
    name: "Summer Sale 2023",
    code: "SUMMER20",
    type: "percentage",
    value: 20,
    status: "active",
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    usageCount: 145,
    usageLimit: 500,
    minOrderValue: 50,
    customerGroups: ["all"],
    productCategories: ["all"],
    firstTimeOnly: false,
  },
  {
    id: "promo2",
    name: "Welcome Discount",
    code: "WELCOME10",
    type: "fixed",
    value: 10,
    status: "active",
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    usageCount: 278,
    usageLimit: null,
    minOrderValue: 25,
    customerGroups: ["new"],
    productCategories: ["all"],
    firstTimeOnly: true,
  },
]

export async function GET(request: Request) {
  try {
    // Get filter parameters from query
    const url = new URL(request.url)
    const status = url.searchParams.get("status")
    const type = url.searchParams.get("type")

    // Apply filters
    let filteredPromotions = [...promotions]

    if (status) {
      filteredPromotions = filteredPromotions.filter((p) => p.status === status)
    }

    if (type) {
      filteredPromotions = filteredPromotions.filter((p) => p.type === type)
    }

    // Format for CSV
    const csvData = filteredPromotions.map((p) => ({
      ID: p.id,
      Name: p.name,
      Code: p.code,
      Type: p.type,
      Value: p.value,
      Status: p.status,
      "Start Date": p.startDate,
      "End Date": p.endDate,
      "Usage Count": p.usageCount,
      "Usage Limit": p.usageLimit || "Unlimited",
      "Min Order Value": p.minOrderValue || "None",
      "Customer Groups": p.customerGroups.join(", "),
      "Product Categories": p.productCategories.join(", "),
      "First Time Only": p.firstTimeOnly ? "Yes" : "No",
    }))

    return NextResponse.json(csvData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to export promotions" }, { status: 500 })
  }
}
