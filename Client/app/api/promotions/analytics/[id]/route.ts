import { NextResponse } from "next/server"

// Mock analytics data
const generateMockAnalytics = (id: string, startDate: string, endDate: string) => {
  // In a real app, this would query a database for actual analytics data
  const start = new Date(startDate)
  const end = new Date(endDate)
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

  // Generate daily usage data
  const usageData = Array.from({ length: days }, (_, i) => {
    const date = new Date(start)
    date.setDate(date.getDate() + i)
    return {
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 30) + 5,
    }
  })

  // Generate revenue data
  const revenueData = usageData.map((item) => {
    const baseRevenue = Math.floor(Math.random() * 1000) + 500
    return {
      date: item.date,
      withPromotion: baseRevenue,
      withoutPromotion: baseRevenue * (1 + Math.random() * 0.3),
    }
  })

  // Generate customer segment data
  const customerSegmentData = [
    { name: "New Customers", value: Math.floor(Math.random() * 40) + 30 },
    { name: "Returning Customers", value: Math.floor(Math.random() * 30) + 20 },
  ]

  // Ensure percentages add up to 100%
  const vipValue = 100 - (customerSegmentData[0].value + customerSegmentData[1].value)
  customerSegmentData.push({ name: "VIP Customers", value: vipValue })

  // Summary metrics
  const totalUses = usageData.reduce((sum, item) => sum + item.count, 0)
  const revenueImpact = revenueData.reduce((sum, item) => sum + (item.withoutPromotion - item.withPromotion), 0)
  const uniqueCustomers = Math.floor(totalUses * 0.7) // Assuming 70% of uses are from unique customers
  const conversionRate = Math.round((uniqueCustomers / (uniqueCustomers * 1.3)) * 100 * 10) / 10

  return {
    summary: {
      totalUses,
      revenueImpact: Math.round(revenueImpact),
      uniqueCustomers,
      conversionRate,
    },
    usageData,
    revenueData,
    customerSegmentData,
  }
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Get date range from query parameters
  const url = new URL(request.url)
  const startDate = url.searchParams.get("startDate") || "2023-05-01"
  const endDate = url.searchParams.get("endDate") || "2023-05-31"

  try {
    const analytics = generateMockAnalytics(params.id, startDate, endDate)
    return NextResponse.json(analytics)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch promotion analytics" }, { status: 500 })
  }
}
