"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { X, Plus, ImagePlus, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils/utils";

// Mock categories and brands - would come from API in real app
const mockCategories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home" },
  { id: "cat4", name: "Books" },
  { id: "cat5", name: "Toys" },
];

const mockBrands = [
  { id: "brand1", name: "Apple" },
  { id: "brand2", name: "Samsung" },
  { id: "brand3", name: "Nike" },
  { id: "brand4", name: "Adidas" },
  { id: "brand5", name: "Sony" },
];

// Available sizes
const availableSizes = [
  { id: "xs", label: "XS" },
  { id: "s", label: "S" },
  { id: "m", label: "M" },
  { id: "l", label: "L" },
  { id: "xl", label: "XL" },
  { id: "xxl", label: "XXL" },
];

// Available colors
const availableColors = [
  { id: "black", label: "Black", hex: "#000000" },
  { id: "white", label: "White", hex: "#FFFFFF" },
  { id: "red", label: "Red", hex: "#FF0000" },
  { id: "blue", label: "Blue", hex: "#0000FF" },
  { id: "green", label: "Green", hex: "#00FF00" },
  { id: "yellow", label: "Yellow", hex: "#FFFF00" },
  { id: "purple", label: "Purple", hex: "#800080" },
  { id: "orange", label: "Orange", hex: "#FFA500" },
  { id: "pink", label: "Pink", hex: "#FFC0CB" },
  { id: "gray", label: "Gray", hex: "#808080" },
];

export function ProductForm({ product = null, isOpen, onClose, onSave }) {
  const isEditing = !!product?.id;

  // Form state
  const [formData, setFormData] = useState({
    id: product?.id || null,
    name: product?.name || "",
    sku: product?.sku || "",
    description: product?.description || "",
    price: product?.price || "",
    compareAtPrice: product?.compareAtPrice || "",
    cost: product?.cost || "",
    categoryId: product?.categoryId || "",
    brandId: product?.brandId || "",
    stock: product?.stock || "",
    weight: product?.weight || "",
    dimensions: product?.dimensions || { length: "", width: "", height: "" },
    status: product?.status || "draft",
    images: product?.images || [],
    variants: product?.variants || [],
    seo: product?.seo || { title: "", description: "", keywords: "" },
    taxable: product?.taxable !== undefined ? product.taxable : true,
    shippingRequired:
      product?.shippingRequired !== undefined ? product.shippingRequired : true,
    hasVariants: product?.variants?.length > 0 || false,
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const [isDirty, setIsDirty] = useState(false);
  const [activeVariantTab, setActiveVariantTab] = useState(0);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle nested object change
  const handleNestedChange = (object, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [object]: { ...prev[object], [field]: value },
    }));
    setIsDirty(true);

    // Clear error
    if (errors[`${object}.${field}`]) {
      setErrors((prev) => ({ ...prev, [`${object}.${field}`]: null }));
    }
  };

  // Handle switch change
  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
    setIsDirty(true);
  };

  // Handle image upload
  const handleImageUpload = (e, variantIndex = -1) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // In a real app, this would upload to a server
    // For demo, we'll create object URLs
    const newImages = files.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    if (variantIndex === -1) {
      // Main product images
      // Limit to 4 images
      const updatedImages = [...formData.images, ...newImages].slice(0, 4);

      setFormData((prev) => ({
        ...prev,
        images: updatedImages,
      }));
    } else {
      // Variant images
      // Limit to 4 images per variant
      const updatedVariants = [...formData.variants];
      const currentVariantImages = updatedVariants[variantIndex].images || [];
      updatedVariants[variantIndex].images = [
        ...currentVariantImages,
        ...newImages,
      ].slice(0, 4);

      setFormData((prev) => ({
        ...prev,
        variants: updatedVariants,
      }));
    }
    setIsDirty(true);
  };

  // Handle image remove
  const handleRemoveImage = (imageId, variantIndex = -1) => {
    if (variantIndex === -1) {
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img.id !== imageId),
      }));
    } else {
      const updatedVariants = [...formData.variants];
      updatedVariants[variantIndex].images = updatedVariants[
        variantIndex
      ].images.filter((img) => img.id !== imageId);

      setFormData((prev) => ({
        ...prev,
        variants: updatedVariants,
      }));
    }
    setIsDirty(true);
  };

  // Handle variant add
  const handleAddVariant = () => {
    const newVariant = {
      id: `var-${Date.now()}`,
      color: "",
      size: "",
      sku: `${formData.sku}-${formData.variants.length + 1}`,
      price: formData.price,
      stock: formData.stock,
      images: [],
    };

    setFormData((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
      hasVariants: true,
    }));
    setActiveVariantTab(formData.variants.length);
    setIsDirty(true);
  };

  // Handle variant remove
  const handleRemoveVariant = (variantIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(variantIndex, 1);

    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
      hasVariants: updatedVariants.length > 0,
    }));

    // Adjust active tab if needed
    if (activeVariantTab >= updatedVariants.length) {
      setActiveVariantTab(Math.max(0, updatedVariants.length - 1));
    }

    setIsDirty(true);
  };

  // Handle variant change
  const handleVariantChange = (variantIndex, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex][field] = value;

    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
    }));
    setIsDirty(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Valid price is required";
    }

    if (
      !formData.stock ||
      isNaN(formData.stock) ||
      Number(formData.stock) < 0
    ) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    // Validate variants if they exist
    if (formData.hasVariants && formData.variants.length > 0) {
      formData.variants.forEach((variant, index) => {
        if (!variant.sku) {
          newErrors[`variant-${index}-sku`] = "Variant SKU is required";
        }
        if (
          !variant.price ||
          isNaN(variant.price) ||
          Number(variant.price) <= 0
        ) {
          newErrors[`variant-${index}-price`] =
            "Valid variant price is required";
        }
        if (
          !variant.stock ||
          isNaN(variant.stock) ||
          Number(variant.stock) < 0
        ) {
          newErrors[`variant-${index}-stock`] =
            "Valid variant stock is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = () => {
    if (!validateForm()) {
      // Switch to tab with errors
      const errorFields = Object.keys(errors);

      if (
        errorFields.some((field) =>
          ["name", "sku", "price", "stock", "categoryId", "brandId"].includes(
            field
          )
        )
      ) {
        setActiveTab("general");
      } else if (errorFields.some((field) => field.startsWith("variant"))) {
        setActiveTab("variants");
      } else if (errorFields.some((field) => field.startsWith("seo"))) {
        setActiveTab("seo");
      }

      return;
    }

    onSave(formData);
  };

  // Toggle variants
  const handleToggleVariants = (checked) => {
    setFormData((prev) => ({
      ...prev,
      hasVariants: checked,
      variants: checked
        ? prev.variants.length
          ? prev.variants
          : [
              {
                id: `var-${Date.now()}`,
                color: "",
                size: "",
                sku: `${prev.sku}-1`,
                price: prev.price,
                stock: prev.stock,
                images: [],
              },
            ]
        : [],
    }));
    setIsDirty(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className={cn(errors.name && "text-red-500")}
                  >
                    Product Name*
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
                  <Label
                    htmlFor="sku"
                    className={cn(errors.sku && "text-red-500")}
                  >
                    SKU*
                  </Label>
                  <Input
                    id="sku"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className={cn(errors.sku && "border-red-500")}
                  />
                  {errors.sku && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.sku}
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
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Pricing</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="price"
                      className={cn(errors.price && "text-red-500")}
                    >
                      Price*
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <Input
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={cn("pl-7", errors.price && "border-red-500")}
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    {errors.price && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.price}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="compareAtPrice">Compare at Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <Input
                        id="compareAtPrice"
                        name="compareAtPrice"
                        value={formData.compareAtPrice}
                        onChange={handleChange}
                        className="pl-7"
                        type="number"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cost">Cost per Item</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2">
                      $
                    </span>
                    <Input
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      className="pl-7"
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="stock"
                      className={cn(errors.stock && "text-red-500")}
                    >
                      Stock*
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      className={cn(errors.stock && "border-red-500")}
                      type="number"
                      min="0"
                    />
                    {errors.stock && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.stock}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Organization</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label
                      htmlFor="categoryId"
                      className={cn(errors.categoryId && "text-red-500")}
                    >
                      Category*
                    </Label>
                    <Select
                      value={formData.categoryId}
                      onValueChange={(value) => {
                        setFormData((prev) => ({ ...prev, categoryId: value }));
                        setIsDirty(true);
                        if (errors.categoryId) {
                          setErrors((prev) => ({ ...prev, categoryId: null }));
                        }
                      }}
                    >
                      <SelectTrigger
                        className={cn(errors.categoryId && "border-red-500")}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockCategories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.categoryId && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.categoryId}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="brandId">Brand</Label>
                    <Select
                      value={formData.brandId}
                      onValueChange={(value) => {
                        setFormData((prev) => ({ ...prev, brandId: value }));
                        setIsDirty(true);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockBrands.map((brand) => (
                          <SelectItem key={brand.id} value={brand.id}>
                            {brand.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Options</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="taxable"
                      checked={formData.taxable}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("taxable", checked)
                      }
                    />
                    <Label htmlFor="taxable">Taxable</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="shippingRequired"
                      checked={formData.shippingRequired}
                      onCheckedChange={(checked) =>
                        handleSwitchChange("shippingRequired", checked)
                      }
                    />
                    <Label htmlFor="shippingRequired">Requires Shipping</Label>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="hasVariants"
                    checked={formData.hasVariants}
                    onCheckedChange={handleToggleVariants}
                  />
                  <Label htmlFor="hasVariants">
                    This product has multiple options, like different sizes or
                    colors
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="status"
                    checked={formData.status === "published"}
                    onCheckedChange={(checked) => {
                      setFormData((prev) => ({
                        ...prev,
                        status: checked ? "published" : "draft",
                      }));
                      setIsDirty(true);
                    }}
                  />
                  <Label htmlFor="status">
                    {formData.status === "published" ? "Published" : "Draft"}
                  </Label>
                  <Badge
                    variant={
                      formData.status === "published" ? "success" : "secondary"
                    }
                  >
                    {formData.status === "published" ? "Live" : "Draft"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Product Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, index) => {
                    const image = formData.images[index];

                    return (
                      <div
                        key={index}
                        className="border rounded-md p-4 flex flex-col items-center justify-center aspect-square relative"
                      >
                        {image ? (
                          <>
                            <div className="relative w-full h-full">
                              <Image
                                src={image.url || "/placeholder.svg"}
                                alt={image.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(image.id)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                            <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">
                              Add Image {index + 1}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                          </label>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-sm text-gray-500 mt-4 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  You can add up to 4 images. First image will be used as the
                  main product image.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Product Variants</h3>
                  <Button
                    onClick={handleAddVariant}
                    size="sm"
                    disabled={!formData.hasVariants}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variant
                  </Button>
                </div>

                {!formData.hasVariants ? (
                  <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This product doesn't have variants. Enable variants in the
                      General tab if you need to create options like different
                      sizes or colors.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleToggleVariants(true);
                        setActiveTab("general");
                      }}
                    >
                      Enable Variants
                    </Button>
                  </div>
                ) : formData.variants.length === 0 ? (
                  <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">
                      No variants added yet. Add variants for different colors,
                      sizes, etc.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Tabs
                      value={String(activeVariantTab)}
                      onValueChange={(value) =>
                        setActiveVariantTab(Number(value))
                      }
                    >
                      <TabsList className="mb-4 flex flex-wrap">
                        {formData.variants.map((variant, index) => (
                          <TabsTrigger
                            key={variant.id}
                            value={String(index)}
                            className="relative pr-8"
                          >
                            Variant {index + 1}
                            {index > 0 && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveVariant(index);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {formData.variants.map((variant, index) => (
                        <TabsContent
                          key={variant.id}
                          value={String(index)}
                          className="space-y-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`variant-${index}-color`}>
                                Color
                              </Label>
                              <Select
                                value={variant.color}
                                onValueChange={(value) =>
                                  handleVariantChange(index, "color", value)
                                }
                              >
                                <SelectTrigger id={`variant-${index}-color`}>
                                  <SelectValue placeholder="Select color" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableColors.map((color) => (
                                    <SelectItem key={color.id} value={color.id}>
                                      <div className="flex items-center">
                                        <div
                                          className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                                          style={{ backgroundColor: color.hex }}
                                        />
                                        {color.label}
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label htmlFor={`variant-${index}-size`}>
                                Size
                              </Label>
                              <Select
                                value={variant.size}
                                onValueChange={(value) =>
                                  handleVariantChange(index, "size", value)
                                }
                              >
                                <SelectTrigger id={`variant-${index}-size`}>
                                  <SelectValue placeholder="Select size" />
                                </SelectTrigger>
                                <SelectContent>
                                  {availableSizes.map((size) => (
                                    <SelectItem key={size.id} value={size.id}>
                                      {size.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <Label
                                htmlFor={`variant-${index}-sku`}
                                className={cn(
                                  errors[`variant-${index}-sku`] &&
                                    "text-red-500"
                                )}
                              >
                                SKU*
                              </Label>
                              <Input
                                id={`variant-${index}-sku`}
                                value={variant.sku}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "sku",
                                    e.target.value
                                  )
                                }
                                className={cn(
                                  errors[`variant-${index}-sku`] &&
                                    "border-red-500"
                                )}
                              />
                              {errors[`variant-${index}-sku`] && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {errors[`variant-${index}-sku`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label
                                htmlFor={`variant-${index}-price`}
                                className={cn(
                                  errors[`variant-${index}-price`] &&
                                    "text-red-500"
                                )}
                              >
                                Price*
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                  $
                                </span>
                                <Input
                                  id={`variant-${index}-price`}
                                  value={variant.price}
                                  onChange={(e) =>
                                    handleVariantChange(
                                      index,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                  className={cn(
                                    "pl-7",
                                    errors[`variant-${index}-price`] &&
                                      "border-red-500"
                                  )}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                />
                              </div>
                              {errors[`variant-${index}-price`] && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {errors[`variant-${index}-price`]}
                                </p>
                              )}
                            </div>

                            <div>
                              <Label
                                htmlFor={`variant-${index}-stock`}
                                className={cn(
                                  errors[`variant-${index}-stock`] &&
                                    "text-red-500"
                                )}
                              >
                                Stock*
                              </Label>
                              <Input
                                id={`variant-${index}-stock`}
                                value={variant.stock}
                                onChange={(e) =>
                                  handleVariantChange(
                                    index,
                                    "stock",
                                    e.target.value
                                  )
                                }
                                type="number"
                                min="0"
                                className={cn(
                                  errors[`variant-${index}-stock`] &&
                                    "border-red-500"
                                )}
                              />
                              {errors[`variant-${index}-stock`] && (
                                <p className="text-red-500 text-sm mt-1 flex items-center">
                                  <AlertCircle className="h-4 w-4 mr-1" />
                                  {errors[`variant-${index}-stock`]}
                                </p>
                              )}
                            </div>
                          </div>

                          <div>
                            <Label className="mb-2 block">Variant Images</Label>
                            <div className="grid grid-cols-4 gap-2">
                              {Array.from({ length: 4 }).map((_, imgIndex) => {
                                const image = variant.images?.[imgIndex];

                                return (
                                  <div
                                    key={imgIndex}
                                    className="border rounded-md p-2 flex flex-col items-center justify-center aspect-square relative"
                                  >
                                    {image ? (
                                      <>
                                        <div className="relative w-full h-full">
                                          <Image
                                            src={
                                              image.url || "/placeholder.svg"
                                            }
                                            alt={image.name}
                                            fill
                                            className="object-contain"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleRemoveImage(image.id, index)
                                          }
                                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </>
                                    ) : (
                                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <ImagePlus className="h-6 w-6 text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">
                                          Add
                                        </span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) =>
                                            handleImageUpload(e, index)
                                          }
                                        />
                                      </label>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TabsContent>
                      ))}
                    </Tabs>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">
                  Search Engine Optimization
                </h3>
                <div>
                  <Label htmlFor="seo-title">SEO Title</Label>
                  <Input
                    id="seo-title"
                    value={formData.seo.title}
                    onChange={(e) =>
                      handleNestedChange("seo", "title", e.target.value)
                    }
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seo.title.length} / 60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo-description">Meta Description</Label>
                  <Textarea
                    id="seo-description"
                    value={formData.seo.description}
                    onChange={(e) =>
                      handleNestedChange("seo", "description", e.target.value)
                    }
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.seo.description.length} / 160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="seo-keywords">Meta Keywords</Label>
                  <Input
                    id="seo-keywords"
                    value={formData.seo.keywords}
                    onChange={(e) =>
                      handleNestedChange("seo", "keywords", e.target.value)
                    }
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Separate keywords with commas
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            {isEditing ? "Update Product" : "Create Product"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
