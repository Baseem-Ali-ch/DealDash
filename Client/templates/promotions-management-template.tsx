"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PromotionsTable, type Promotion } from "@/organisms/promotions-table"
import { PromotionAnalytics } from "@/organisms/promotion-analytics"
import { BulkCouponCreator } from "@/organisms/bulk-coupon-creator"
import { PromotionFilters, type PromotionFilters as PromotionFiltersType } from "@/organisms/promotion-filters"
import { PromotionCard } from "@/molecules/promotion-card"
import { PromotionSlideOver } from "@/organisms/promotion-slide-over"
import { Plus, Grid, List, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for promotions
const mockPromotions: Promotion[] = [
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
  {
    id: "promo3",
    name: "Free Shipping Weekend",
    code: "FREESHIP",
    type: "shipping",
    value: 0,
    status: "scheduled",
    startDate: "2023-07-15",
    endDate: "2023-07-17",
    usageCount: 0,
    usageLimit: 200,
    minOrderValue: 75,
    customerGroups: ["all"],
    productCategories: ["all"],
    firstTimeOnly: false,
  },
  {
    id: "promo4",
    name: "Buy One Get One Free",
    code: "BOGO2023",
    type: "bogo",
    value: 0,
    status: "draft",
    startDate: "2023-09-01",
    endDate: "2023-09-30",
    usageCount: 0,
    usageLimit: 100,
    minOrderValue: 100,
    customerGroups: ["vip"],
    productCategories: ["clothing"],
    firstTimeOnly: false,
  },
  {
    id: "promo5",
    name: "Holiday Special",
    code: "HOLIDAY25",
    type: "percentage",
    value: 25,
    status: "expired",
    startDate: "2022-12-01",
    endDate: "2022-12-31",
    usageCount: 432,
    usageLimit: 500,
    minOrderValue: 50,
    customerGroups: ["all"],
    productCategories: ["all"],
    firstTimeOnly: false,
  },
]

export function PromotionsManagementTemplate() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions)
  const [filteredPromotions, setFilteredPromotions] = useState<Promotion[]>(mockPromotions)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAnalyticsDialogOpen, setIsAnalyticsDialogOpen] = useState(false)
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

  const handleFilterChange = (filters: PromotionFiltersType) => {
    let filtered = [...promotions]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (promo) => promo.name.toLowerCase().includes(searchLower) || promo.code.toLowerCase().includes(searchLower),
      )
    }

    if (filters.status) {
      filtered = filtered.filter((promo) => promo.status === filters.status)
    }

    if (filters.type) {
      filtered = filtered.filter((promo) => promo.type === filters.type)
    }

    if (filters.dateRange?.from && filters.dateRange?.to) {
      const fromDate = filters.dateRange.from.getTime()
      const toDate = filters.dateRange.to.getTime()

      filtered = filtered.filter((promo) => {
        const promoStart = new Date(promo.startDate).getTime()
        const promoEnd = new Date(promo.endDate).getTime()

        return (
          (promoStart >= fromDate && promoStart <= toDate) ||
          (promoEnd >= fromDate && promoEnd <= toDate) ||
          (promoStart <= fromDate && promoEnd >= toDate)
        )
      })
    }

    setFilteredPromotions(filtered)
  }

  const handleAddPromotion = (data: any) => {
    const newPromotion: Promotion = {
      id: `promo${promotions.length + 1}`,
      name: data.name,
      code: data.promotionType === "coupon" ? data.code : `AUTO-${Date.now().toString(36).toUpperCase()}`,
      type: data.discountType,
      value: data.value || 0,
      status: data.active ? "active" : "draft",
      startDate: data.startDate.toISOString().split("T")[0],
      endDate: data.endDate.toISOString().split("T")[0],
      usageCount: 0,
      usageLimit: data.usageLimitTotal || null,
      minOrderValue: data.minOrderValue || null,
      customerGroups: data.customerGroups || ["all"],
      productCategories: data.offerType === "category" ? data.categoryIds : ["all"],
      firstTimeOnly: data.firstTimeOnly || false,
    }

    const updatedPromotions = [...promotions, newPromotion]
    setPromotions(updatedPromotions)
    setFilteredPromotions(updatedPromotions)
    setIsAddDialogOpen(false)
  }

  const handleEditPromotion = (id: string) => {
    const promotion = promotions.find((p) => p.id === id)
    if (promotion) {
      setSelectedPromotion(promotion)
      setIsEditDialogOpen(true)
    }
  }

  const handleUpdatePromotion = (data: any) => {
    if (!selectedPromotion) return

    const updatedPromotion: Promotion = {
      ...selectedPromotion,
      name: data.name,
      code: data.promotionType === "coupon" ? data.code : selectedPromotion.code,
      type: data.discountType,
      value: data.value || 0,
      status: data.active ? "active" : "draft",
      startDate: data.startDate.toISOString().split("T")[0],
      endDate: data.endDate.toISOString().split("T")[0],
      usageLimit: data.usageLimitTotal || null,
      minOrderValue: data.minOrderValue || null,
      customerGroups: data.customerGroups || ["all"],
      productCategories: data.offerType === "category" ? data.categoryIds : ["all"],
      firstTimeOnly: data.firstTimeOnly || false,
    }

    const updatedPromotions = promotions.map((p) => (p.id === selectedPromotion.id ? updatedPromotion : p))

    setPromotions(updatedPromotions)
    setFilteredPromotions(updatedPromotions)
    setIsEditDialogOpen(false)
    setSelectedPromotion(null)
  }

  const handleDuplicatePromotion = (id: string) => {
    const promotion = promotions.find((p) => p.id === id)
    if (promotion) {
      const duplicatedPromotion: Promotion = {
        ...promotion,
        id: `promo${promotions.length + 1}`,
        name: `${promotion.name} (Copy)`,
        code: `${promotion.code}_COPY`,
        status: "draft",
        usageCount: 0,
      }

      const updatedPromotions = [...promotions, duplicatedPromotion]
      setPromotions(updatedPromotions)
      setFilteredPromotions(updatedPromotions)
    }
  }

  const handleDeletePromotion = (id: string) => {
    const updatedPromotions = promotions.filter((p) => p.id !== id)
    setPromotions(updatedPromotions)
    setFilteredPromotions(updatedPromotions)
  }

  const handleViewAnalytics = (id: string) => {
    const promotion = promotions.find((p) => p.id === id)
    if (promotion) {
      setSelectedPromotion(promotion)
      setIsAnalyticsDialogOpen(true)
    }
  }

  const handleBulkCouponGenerate = (codes: string[]) => {
    console.log("Generated bulk coupons:", codes)
    // In a real app, you would save these to the database
    setIsBulkDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Promotions & Coupons</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your store's promotional offers and discount codes</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Dialog open={isBulkDialogOpen} onOpenChange={setIsBulkDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Bulk Generate Coupons</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Bulk Coupon Generator</DialogTitle>
                <DialogDescription>Generate multiple coupon codes for marketing campaigns</DialogDescription>
              </DialogHeader>
              <BulkCouponCreator onGenerate={handleBulkCouponGenerate} />
            </DialogContent>
          </Dialog>

          <>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Promotion
            </Button>
            <PromotionSlideOver
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              onSubmit={handleAddPromotion}
            />
          </>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Promotion Conflict Detection</AlertTitle>
        <AlertDescription>
          The system automatically checks for conflicting promotions. Overlapping promotions may not stack as expected.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="active" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
            <TabsTrigger value="all">All Promotions</TabsTrigger>
          </TabsList>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-primary/10" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-primary/10" : ""}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <PromotionFilters onFilterChange={handleFilterChange} />

        <TabsContent value="active">
          {viewMode === "list" ? (
            <PromotionsTable
              promotions={filteredPromotions.filter((p) => p.status === "active")}
              onEdit={handleEditPromotion}
              onDuplicate={handleDuplicatePromotion}
              onDelete={handleDeletePromotion}
              onViewAnalytics={handleViewAnalytics}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPromotions
                .filter((p) => p.status === "active")
                .map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    onClick={() => handleEditPromotion(promotion.id)}
                  />
                ))}
              {filteredPromotions.filter((p) => p.status === "active").length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                  No active promotions found.
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled">
          {viewMode === "list" ? (
            <PromotionsTable
              promotions={filteredPromotions.filter((p) => p.status === "scheduled")}
              onEdit={handleEditPromotion}
              onDuplicate={handleDuplicatePromotion}
              onDelete={handleDeletePromotion}
              onViewAnalytics={handleViewAnalytics}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPromotions
                .filter((p) => p.status === "scheduled")
                .map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    onClick={() => handleEditPromotion(promotion.id)}
                  />
                ))}
              {filteredPromotions.filter((p) => p.status === "scheduled").length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                  No scheduled promotions found.
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="expired">
          {viewMode === "list" ? (
            <PromotionsTable
              promotions={filteredPromotions.filter((p) => p.status === "expired")}
              onEdit={handleEditPromotion}
              onDuplicate={handleDuplicatePromotion}
              onDelete={handleDeletePromotion}
              onViewAnalytics={handleViewAnalytics}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPromotions
                .filter((p) => p.status === "expired")
                .map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    promotion={promotion}
                    onClick={() => handleEditPromotion(promotion.id)}
                  />
                ))}
              {filteredPromotions.filter((p) => p.status === "expired").length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                  No expired promotions found.
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all">
          {viewMode === "list" ? (
            <PromotionsTable
              promotions={filteredPromotions}
              onEdit={handleEditPromotion}
              onDuplicate={handleDuplicatePromotion}
              onDelete={handleDeletePromotion}
              onViewAnalytics={handleViewAnalytics}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPromotions.map((promotion) => (
                <PromotionCard
                  key={promotion.id}
                  promotion={promotion}
                  onClick={() => handleEditPromotion(promotion.id)}
                />
              ))}
              {filteredPromotions.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500 dark:text-gray-400">
                  No promotions found.
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Promotion Dialog */}
      <PromotionSlideOver
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleUpdatePromotion}
        initialData={
          selectedPromotion
            ? {
                promotionType: selectedPromotion.code.startsWith("AUTO-") ? "offer" : "coupon",
                name: selectedPromotion.name,
                code: selectedPromotion.code,
                discountType: selectedPromotion.type,
                value: selectedPromotion.value,
                startDate: new Date(selectedPromotion.startDate),
                endDate: new Date(selectedPromotion.endDate),
                usageLimitPerCustomer: 1,
                usageLimitTotal: selectedPromotion.usageLimit || 0,
                minOrderValue: selectedPromotion.minOrderValue || 0,
                customerGroups: selectedPromotion.customerGroups,
                offerType: "product",
                productIds: [],
                categoryIds: selectedPromotion.productCategories,
                brandIds: [],
                firstTimeOnly: selectedPromotion.firstTimeOnly,
                active: selectedPromotion.status === "active",
              }
            : undefined
        }
        isEditing={!!selectedPromotion}
      />

      {/* Analytics Dialog */}
      <Dialog open={isAnalyticsDialogOpen} onOpenChange={setIsAnalyticsDialogOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Promotion Analytics</DialogTitle>
            <DialogDescription>View performance metrics for this promotion</DialogDescription>
          </DialogHeader>
          {selectedPromotion && (
            <PromotionAnalytics promotionId={selectedPromotion.id} promotionName={selectedPromotion.name} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
