"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ImagePlus, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock categories for parent selection - would come from API in real app
const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home & Kitchen" },
]

export function CategoryForm({ category = null, onSave, onCancel }) {
  const isEditing = !!category?.id

  // Form state
  const [formData, setFormData] = useState({
    id: category?.id || null,
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    parentId: category?.parentId || "",
    status: category?.status || "active",
    image: category?.image || null,
    seo: category?.seo || { title: "", description: "", keywords: "" },
  })

  // Validation state
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState("general")
  const [isDirty, setIsDirty] = useState(false)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsDirty(true)

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  // Handle nested object change
  const handleNestedChange = (object, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [object]: { ...prev[object], [field]: value },
    }))
    setIsDirty(true)

    // Clear error
    if (errors[`${object}.${field}`]) {
      setErrors((prev) => ({ ...prev, [`${object}.${field}`]: null }))
    }
  }

  // Handle switch change
  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked ? "active" : "inactive" }))
    setIsDirty(true)
  }

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // In a real app, this would upload to a server
    // For demo, we'll create an object URL
    const imageUrl = URL.createObjectURL(file)

    setFormData((prev) => ({
      ...prev,
      image: {
        url: imageUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      },
    }))
    setIsDirty(true)
  }

  // Handle image remove
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }))
    setIsDirty(true)
  }

  // Generate slug from name
  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()

    setFormData((prev) => ({ ...prev, slug }))
    setIsDirty(true)

    // Clear error
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: null }))
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required"
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle save
  const handleSave = () => {
    if (!validateForm()) {
      // Switch to tab with errors
      const errorFields = Object.keys(errors)

      if (errorFields.some((field) => ["name", "slug", "description", "parentId"].includes(field))) {
        setActiveTab("general")
      } else if (errorFields.some((field) => field.startsWith("seo"))) {
        setActiveTab("seo")
      }

      return
    }

    onSave(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Category" : "Add Category"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
                Category Name*
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={cn(errors.name && "border-red-500")}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="slug" className={cn(errors.slug && "text-red-500")}>
                  Slug*
                </Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={generateSlug}
                  className="h-6 text-xs"
                  disabled={!formData.name}
                >
                  Generate from name
                </Button>
              </div>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={cn(errors.slug && "border-red-500")}
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.slug}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="parentId">Parent Category</Label>
              <Select
                value={formData.parentId}
                onValueChange={(value) => {
                  setFormData((prev) => ({ ...prev, parentId: value }))
                  setIsDirty(true)
                }}
              >
                <SelectTrigger id="parentId">
                  <SelectValue placeholder="No parent (root category)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No parent (root category)</SelectItem>
                  {mockCategories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} disabled={cat.id === formData.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">Select a parent category or leave empty for a root category</p>
            </div>

            <div>
              <Label>Category Image</Label>
              <div className="mt-2 border rounded-md p-4">
                {formData.image ? (
                  <div className="relative">
                    <div className="relative h-40 w-full">
                      <Image
                        src={formData.image.url || "/placeholder.svg"}
                        alt={formData.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                    <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Upload category image</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) => handleSwitchChange("status", checked)}
              />
              <Label htmlFor="status">{formData.status === "active" ? "Active" : "Inactive"}</Label>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <div>
              <Label htmlFor="seo-title">SEO Title</Label>
              <Input
                id="seo-title"
                value={formData.seo.title}
                onChange={(e) => handleNestedChange("seo", "title", e.target.value)}
                placeholder={formData.name}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.seo.title.length} / 60 characters</p>
            </div>

            <div>
              <Label htmlFor="seo-description">Meta Description</Label>
              <Textarea
                id="seo-description"
                value={formData.seo.description}
                onChange={(e) => handleNestedChange("seo", "description", e.target.value)}
                rows={3}
                placeholder={formData.description}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.seo.description.length} / 160 characters</p>
            </div>

            <div>
              <Label htmlFor="seo-keywords">Meta Keywords</Label>
              <Input
                id="seo-keywords"
                value={formData.seo.keywords}
                onChange={(e) => handleNestedChange("seo", "keywords", e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
              />
              <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isDirty}>
          {isEditing ? "Update Category" : "Create Category"}
        </Button>
      </CardFooter>
    </Card>
  )
}
