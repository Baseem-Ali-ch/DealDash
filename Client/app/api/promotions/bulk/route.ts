import { NextResponse } from "next/server"
import type { Promotion } from "@/lib/store/slices/promotionsSlice"

// Mock database
let promotions: Promotion[] = []

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { codes, promotionTemplate } = data

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ error: "No coupon codes provided" }, { status: 400 })
    }

    if (!promotionTemplate) {
      return NextResponse.json({ error: "Promotion template is required" }, { status: 400 })
    }

    // Check for duplicate codes
    const existingCodes = promotions.map((p) => p.code)
    const duplicates = codes.filter((code) => existingCodes.includes(code))

    if (duplicates.length > 0) {
      return NextResponse.json(
        {
          error: "Some codes already exist",
          duplicates,
        },
        { status: 400 },
      )
    }

    // Create new promotions
    const newPromotions = codes.map((code) => ({
      id: `promo${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: `${promotionTemplate.name} - ${code}`,
      code,
      type: promotionTemplate.type,
      value: promotionTemplate.value || 0,
      status: promotionTemplate.active ? "active" : "draft",
      startDate: promotionTemplate.startDate,
      endDate: promotionTemplate.endDate,
      usageCount: 0,
      usageLimit: promotionTemplate.usageLimitPerCustomer || 1,
      minOrderValue: promotionTemplate.minOrderValue || null,
      customerGroups: promotionTemplate.customerGroups || ["all"],
      productCategories: promotionTemplate.productCategories || ["all"],
      firstTimeOnly: promotionTemplate.firstTimeOnly || false,
    }))

    // Add to mock database
    promotions = [...promotions, ...newPromotions]

    return NextResponse.json({
      success: true,
      count: newPromotions.length,
      promotions: newPromotions,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create bulk promotions" }, { status: 500 })
  }
}
