import { NextResponse } from "next/server"
import type { Promotion } from "@/lib/store/slices/promotionsSlice"

// Mock database
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

export async function GET() {
  return NextResponse.json(promotions)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.code || !data.type || !data.startDate || !data.endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check for duplicate code
    if (promotions.some((p) => p.code === data.code)) {
      return NextResponse.json({ error: "Promotion code already exists" }, { status: 400 })
    }

    // Create new promotion
    const newPromotion: Promotion = {
      id: `promo${Date.now()}`,
      name: data.name,
      code: data.code,
      type: data.type,
      value: data.value || 0,
      status: data.active ? "active" : "draft",
      startDate: data.startDate,
      endDate: data.endDate,
      usageCount: 0,
      usageLimit: data.usageLimitTotal || null,
      minOrderValue: data.minOrderValue || null,
      customerGroups: data.customerGroups || ["all"],
      productCategories: data.productCategories || ["all"],
      firstTimeOnly: data.firstTimeOnly || false,
    }

    promotions.push(newPromotion)

    return NextResponse.json(newPromotion, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create promotion" }, { status: 500 })
  }
}
