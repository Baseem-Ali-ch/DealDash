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

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { code, cartTotal, customerId, isFirstOrder, productCategories } = data

    // Find the promotion by code
    const promotion = promotions.find((p) => p.code === code && p.status === "active")

    if (!promotion) {
      return NextResponse.json({ valid: false, error: "Invalid or inactive promotion code" }, { status: 400 })
    }

    // Check if promotion is within valid date range
    const now = new Date()
    const startDate = new Date(promotion.startDate)
    const endDate = new Date(promotion.endDate)

    if (now < startDate || now > endDate) {
      return NextResponse.json({ valid: false, error: "Promotion is not active at this time" }, { status: 400 })
    }

    // Check usage limits
    if (promotion.usageLimit !== null && promotion.usageCount >= promotion.usageLimit) {
      return NextResponse.json({ valid: false, error: "Promotion usage limit has been reached" }, { status: 400 })
    }

    // Check minimum order value
    if (promotion.minOrderValue !== null && cartTotal < promotion.minOrderValue) {
      return NextResponse.json(
        {
          valid: false,
          error: `Order total must be at least $${promotion.minOrderValue} to use this promotion`,
        },
        { status: 400 },
      )
    }

    // Check first-time customer restriction
    if (promotion.firstTimeOnly && !isFirstOrder) {
      return NextResponse.json(
        { valid: false, error: "This promotion is for first-time customers only" },
        { status: 400 },
      )
    }

    // Check product category restrictions
    if (
      !promotion.productCategories.includes("all") &&
      !promotion.productCategories.some((cat) => productCategories.includes(cat))
    ) {
      return NextResponse.json(
        { valid: false, error: "This promotion does not apply to the items in your cart" },
        { status: 400 },
      )
    }

    // All checks passed, promotion is valid
    return NextResponse.json({
      valid: true,
      promotion: {
        id: promotion.id,
        code: promotion.code,
        type: promotion.type,
        value: promotion.value,
      },
    })
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Failed to validate promotion" }, { status: 500 })
  }
}
