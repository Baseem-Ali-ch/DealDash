"use client"

import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, ExternalLink } from "lucide-react"

export function BrandDetails({ brand, isOpen, onClose, onEdit }) {
  if (!brand) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Brand Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-cover" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{brand.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant={brand.status === "active" ? "success" : "secondary"}>
                      {brand.status === "active" ? "Active" : "Inactive"}
                    </Badge>
                    {brand.featured && <Badge variant="default">Featured</Badge>}
                  </div>
                </div>

                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 mt-1"
                >
                  {brand.website}
                  <ExternalLink className="h-3 w-3" />
                </a>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{brand.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium">Contact Email</h4>
                <p className="text-sm">{brand.contactEmail || "Not provided"}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Contact Phone</h4>
                <p className="text-sm">{brand.contactPhone || "Not provided"}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Products Count</h4>
                <p className="text-sm">{brand.productsCount}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Created At</h4>
                <p className="text-sm">{new Date(brand.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="text-center py-8">
              <p className="text-gray-500">
                {brand.productsCount > 0
                  ? `This brand has ${brand.productsCount} products.`
                  : "No products associated with this brand yet."}
              </p>
              <Button className="mt-4">View Products</Button>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="text-center py-8">
              <p className="text-gray-500">Analytics data is not available in this demo.</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Brand
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
