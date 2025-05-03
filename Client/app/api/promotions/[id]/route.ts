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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const promotion = promotions.find((p) => p.id === params.id)

  if (!promotion) {
    return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
  }

  return NextResponse.json(promotion)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json()
    const index = promotions.findIndex((p) => p.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
    }

    // Check for duplicate code (excluding the current promotion)
    if (data.code !== promotions[index].code && promotions.some((p) => p.code === data.code)) {
      return NextResponse.json({ error: "Promotion code already exists" }, { status: 400 })
    }

    // Update promotion
    const updatedPromotion: Promotion = {
      ...promotions[index],
      name: data.name || promotions[index].name,
      code: data.code || promotions[index].code,
      type: data.type || promotions[index].type,
      value: data.value !== undefined ? data.value : promotions[index].value,
      status: data.active ? "active" : "draft",
      startDate: data.startDate || promotions[index].startDate,
      endDate: data.endDate || promotions[index].endDate,
      usageLimit: data.usageLimitTotal !== undefined ? data.usageLimitTotal : promotions[index].usageLimit,
      minOrderValue: data.minOrderValue !== undefined ? data.minOrderValue : promotions[index].minOrderValue,
      customerGroups: data.customerGroups || promotions[index].customerGroups,
      productCategories: data.productCategories || promotions[index].productCategories,
      firstTimeOnly: data.firstTimeOnly !== undefined ? data.firstTimeOnly : promotions[index].firstTimeOnly,
    }

    promotions[index] = updatedPromotion

    return NextResponse.json(updatedPromotion)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update promotion" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const index = promotions.findIndex((p) => p.id === params.id)

  if (index === -1) {
    return NextResponse.json({ error: "Promotion not found" }, { status: 404 })
  }

  // Remove the promotion
  promotions.splice(index, 1)

  return NextResponse.json({ success: true })
}
