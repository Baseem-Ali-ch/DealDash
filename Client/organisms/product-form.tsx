"use client";

import { useEffect, useState, useCallback } from "react";
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
import { fetchBrands } from "@/lib/api/admin/brand";
import { fetchCategories } from "@/lib/api/admin/category";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/lib/api/admin/product";

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
  const isEditing = !!product?._id;

  // Form state
  const [formData, setFormData] = useState({
    id: product?._id || null,
    name: product?.name || "",
    sku: product?.sku || "",
    description: product?.description || "",
    price: product?.price ? product.price.toString() : "",
    compareAtPrice: product?.compareAtPrice ? product.compareAtPrice.toString() : "",
    cost: product?.cost ? product.cost.toString() : "",
    categoryId: product?.categoryId?._id || product?.categoryId || "",
    brandId: product?.brandId?._id || product?.brandId || "",
    stock: product?.stock ? product.stock.toString() : "",
    weight: product?.weight ? product.weight.toString() : "",
    dimensions: product?.dimensions || { length: "", width: "", height: "" },
    status: product?.status || "draft",
    images: product?.images?.map((img) => ({
      id: img.id || `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url: img.url,
      name: img.name || "Existing Image",
    })) || [],
    variants: product?.variants?.map((variant) => ({
      id: variant.id || `var-${Date.now()}`,
      color: variant.color || "",
      size: variant.size || "",
      sku: variant.sku || "",
      price: variant.price ? variant.price.toString() : "",
      stock: variant.stock ? variant.stock.toString() : "",
      images: variant.images?.map((img) => ({
        id: img.id || `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        url: img.url,
        name: img.name || "Existing Variant Image",
      })) || [],
    })) || [],
    shippingRequired: product?.shippingRequired !== undefined ? product.shippingRequired : true,
    hasVariants: product?.variants?.length > 0 || false,
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const [isDirty, setIsDirty] = useState(false);
  const [activeVariantTab, setActiveVariantTab] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [brandsRes, categoryRes] = await Promise.all([fetchBrands(), fetchCategories()]);
        if (brandsRes.success) {
          setBrands(brandsRes.data.data || brandsRes.data);
        }
        if (categoryRes.success) {
          setCategories(categoryRes.data.data || categoryRes.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load categories or brands");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Cleanup image previews
  useEffect(() => {
    return () => {
      formData.images.forEach((img) => {
        if (img.preview) URL.revokeObjectURL(img.preview);
      });
      formData.variants.forEach((variant) => {
        variant.images?.forEach((img) => {
          if (img.preview) URL.revokeObjectURL(img.preview);
        });
      });
    };
  }, [formData.images, formData.variants]);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  // Handle nested object change
  const handleNestedChange = useCallback((object, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [object]: { ...prev[object], [field]: value },
    }));
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, [`${object}.${field}`]: null }));
  }, []);

  // Handle switch change
  const handleSwitchChange = useCallback((name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
    setIsDirty(true);
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((e, variantIndex = -1) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const newImages = files.map((file) => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setFormData((prev) => {
      if (variantIndex === -1) {
        const updatedImages = [...prev.images, ...newImages].slice(0, 4);
        return { ...prev, images: updatedImages };
      }
      const updatedVariants = [...prev.variants];
      const currentVariantImages = updatedVariants[variantIndex].images || [];
      updatedVariants[variantIndex].images = [...currentVariantImages, ...newImages].slice(0, 4);
      return { ...prev, variants: updatedVariants };
    });
    setIsDirty(true);
  }, []);

  // Handle image remove
  const handleRemoveImage = useCallback((imageId, variantIndex = -1) => {
    setFormData((prev) => {
      if (variantIndex === -1) {
        const updatedImages = prev.images.filter((img) => img.id !== imageId);
        updatedImages.forEach((img) => {
          if (img.preview && !updatedImages.includes(img)) URL.revokeObjectURL(img.preview);
        });
        return { ...prev, images: updatedImages };
      }
      const updatedVariants = [...prev.variants];
      const updatedVariantImages = updatedVariants[variantIndex].images.filter(
        (img) => img.id !== imageId
      );
      updatedVariantImages.forEach((img) => {
        if (img.preview && !updatedVariantImages.includes(img)) URL.revokeObjectURL(img.preview);
      });
      updatedVariants[variantIndex].images = updatedVariantImages;
      return { ...prev, variants: updatedVariants };
    });
    setIsDirty(true);
  }, []);

  // Handle variant add
  const handleAddVariant = useCallback(() => {
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
  }, [formData.sku, formData.variants.length, formData.price, formData.stock]);

  // Handle variant remove
  const handleRemoveVariant = useCallback((variantIndex) => {
    const updatedVariants = [...formData.variants];
    const removedVariant = updatedVariants.splice(variantIndex, 1)[0];
    removedVariant.images?.forEach((img) => {
      if (img.preview) URL.revokeObjectURL(img.preview);
    });
    setFormData((prev) => ({
      ...prev,
      variants: updatedVariants,
      hasVariants: updatedVariants.length > 0,
    }));
    if (activeVariantTab >= updatedVariants.length) {
      setActiveVariantTab(Math.max(0, updatedVariants.length - 1));
    }
    setIsDirty(true);
  }, [formData.variants, activeVariantTab]);

  // Handle variant change
  const handleVariantChange = useCallback((variantIndex, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex][field] = value;
    setFormData((prev) => ({ ...prev, variants: updatedVariants }));
    setIsDirty(true);
    setErrors((prev) => ({ ...prev, [`variant-${variantIndex}-${field}`]: null }));
  }, [formData.variants]);

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    }

    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.stock || isNaN(formData.stock) || Number(formData.stock) < 0) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Category is required";
    }

    if (formData.dimensions) {
      const { length, width, height } = formData.dimensions;
      if (length && (isNaN(length) || Number(length) <= 0)) {
        newErrors["dimensions.length"] = "Valid length is required";
      }
      if (width && (isNaN(width) || Number(width) <= 0)) {
        newErrors["dimensions.width"] = "Valid width is required";
      }
      if (height && (isNaN(height) || Number(height) <= 0)) {
        newErrors["dimensions.height"] = "Valid height is required";
      }
    }

    // Check for duplicate SKUs
    const allSkus = [formData.sku, ...formData.variants.map((v) => v.sku)];
    const uniqueSkus = new Set(allSkus);
    if (uniqueSkus.size !== allSkus.length) {
      newErrors.sku = "SKUs must be unique across product and variants";
    }

    if (formData.hasVariants && formData.variants.length > 0) {
      formData.variants.forEach((variant, index) => {
        if (!variant.sku) {
          newErrors[`variant-${index}-sku`] = "Variant SKU is required";
        }
        if (!variant.price || isNaN(variant.price) || Number(variant.price) <= 0) {
          newErrors[`variant-${index}-price`] = "Valid variant price is required";
        }
        if (!variant.stock || isNaN(variant.stock) || Number(variant.stock) < 0) {
          newErrors[`variant-${index}-stock`] = "Valid variant stock is required";
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();

      // Prepare product data
      const productData = {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        price: Number(formData.price),
        compareAtPrice: formData.compareAtPrice ? Number(formData.compareAtPrice) : undefined,
        cost: formData.cost ? Number(formData.cost) : undefined,
        categoryId: formData.categoryId,
        brandId: formData.brandId || undefined,
        stock: Number(formData.stock),
        weight: formData.weight ? Number(formData.weight) : undefined,
        dimensions: {
          length: formData.dimensions.length ? Number(formData.dimensions.length) : undefined,
          width: formData.dimensions.width ? Number(formData.dimensions.width) : undefined,
          height: formData.dimensions.height ? Number(formData.dimensions.height) : undefined,
        },
        status: formData.status,
        variants: formData.hasVariants
          ? formData.variants.map((variant) => ({
              id: variant.id,
              color: variant.color || undefined,
              size: variant.size || undefined,
              sku: variant.sku,
              price: Number(variant.price),
              stock: Number(variant.stock),
            }))
          : [],
        hasVariants: formData.hasVariants,
        shippingRequired: formData.shippingRequired,
      };

      formDataToSend.append("productData", JSON.stringify(productData));

      // Append product images
      const existingProductImages = formData.images
        .filter((img) => img.url && !img.file)
        .map((img) => ({ id: img.id, url: img.url }));
      const newProductImages = formData.images.filter((img) => img.file);
      newProductImages.forEach((img) => {
        formDataToSend.append("images", img.file);
      });

      // Append variant images
      const existingVariantImages = {};
      const newVariantImages = {};
      if (formData.hasVariants) {
        formData.variants.forEach((variant, variantIndex) => {
          existingVariantImages[variantIndex] = (variant.images || [])
            .filter((img) => img.url && !img.file)
            .map((img) => ({ id: img.id, url: img.url }));
          newVariantImages[variantIndex] = (variant.images || []).filter((img) => img.file);
          newVariantImages[variantIndex].forEach((img, imageIndex) => {
            formDataToSend.append("variantImages", img.file);
            formDataToSend.append(
              "variantImageMappings",
              JSON.stringify({ variantIndex, imageIndex })
            );
          });
        });
      }

      // Include existing images in productData to preserve them
      productData.existingImages = existingProductImages;
      if (formData.hasVariants) {
        productData.variants.forEach((variant, index) => {
          variant.existingImages = existingVariantImages[index] || [];
        });
      }
      formDataToSend.set("productData", JSON.stringify(productData));

      const response = isEditing
        ? await updateProduct(product._id, formDataToSend)
        : await createProduct(formDataToSend);

      if (response.success) {
        toast.success(isEditing ? "Product updated successfully" : "Product created successfully");
        onSave(response.data);
        setIsDirty(false);
        onClose();
      } else {
        throw new Error(response.message || "Failed to save product");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle variants
  const handleToggleVariants = useCallback((checked) => {
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
  }, [formData.sku, formData.price, formData.stock]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-2xl w-full overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>{isEditing ? "Edit Product" : "Add New Product"}</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="name" className={cn(errors.name && "text-red-500")}>
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
                  <Label htmlFor="sku" className={cn(errors.sku && "text-red-500")}>
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
                    <Label htmlFor="price" className={cn(errors.price && "text-red-500")}>
                      Price*
                    </Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
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
                    <Label htmlFor="compareAtPrice">Compare At Price</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
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

                  <div>
                    <Label htmlFor="cost">Cost per Item</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
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
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Inventory</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="stock" className={cn(errors.stock && "text-red-500")}>
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
                <h3 className="text-lg font-medium mb-2">Dimensions</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="dimensions.length" className={cn(errors["dimensions.length"] && "text-red-500")}>
                      Length (cm)
                    </Label>
                    <Input
                      id="dimensions.length"
                      value={formData.dimensions.length}
                      onChange={(e) => handleNestedChange("dimensions", "length", e.target.value)}
                      className={cn(errors["dimensions.length"] && "border-red-500")}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                    {errors["dimensions.length"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors["dimensions.length"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dimensions.width" className={cn(errors["dimensions.width"] && "text-red-500")}>
                      Width (cm)
                    </Label>
                    <Input
                      id="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={(e) => handleNestedChange("dimensions", "width", e.target.value)}
                      className={cn(errors["dimensions.width"] && "border-red-500")}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                    {errors["dimensions.width"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors["dimensions.width"]}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="dimensions.height" className={cn(errors["dimensions.height"] && "text-red-500")}>
                      Height (cm)
                    </Label>
                    <Input
                      id="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={(e) => handleNestedChange("dimensions", "height", e.target.value)}
                      className={cn(errors["dimensions.height"] && "border-red-500")}
                      type="number"
                      min="0"
                      step="0.01"
                    />
                    {errors["dimensions.height"] && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors["dimensions.height"]}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-medium mb-2">Organization</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="categoryId" className={cn(errors.categoryId && "text-red-500")}>
                      Category*
                    </Label>
                    <Select
                      value={formData.categoryId || "none"}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          categoryId: value === "none" ? "" : value,
                        }));
                        setIsDirty(true);
                        setErrors((prev) => ({ ...prev, categoryId: null }));
                      }}
                    >
                      <SelectTrigger className={cn(errors.categoryId && "border-red-500")} disabled={isLoading}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>Select a category</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
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
                      value={formData.brandId || "none"}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          brandId: value === "none" ? "" : value,
                        }));
                        setIsDirty(true);
                      }}
                    >
                      <SelectTrigger disabled={isLoading}>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" disabled>Select a brand</SelectItem>
                        {brands.map((brand) => (
                          <SelectItem key={brand._id} value={brand._id}>
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
                <div className="space-y-4">
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
                    <Badge variant={formData.status === "published" ? "success" : "secondary"}>
                      {formData.status === "published" ? "Live" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hasVariants"
                      checked={formData.hasVariants}
                      onCheckedChange={handleToggleVariants}
                    />
                    <Label htmlFor="hasVariants">Enable Variants</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="shippingRequired"
                      checked={formData.shippingRequired}
                      onCheckedChange={(checked) => handleSwitchChange("shippingRequired", checked)}
                    />
                    <Label htmlFor="shippingRequired">Shipping Required</Label>
                  </div>
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
                                src={image.url || image.preview || "/placeholder.svg"}
                                alt={image.name || `Product image ${index + 1}`}
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
                            <span className="text-sm text-gray-500">Add Image {index + 1}</span>
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
                  You can add up to 4 images. The first image will be used as the main product image.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Product Variants</h3>
                  <Button onClick={handleAddVariant} size="sm" disabled={!formData.hasVariants}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Variant
                  </Button>
                </div>

                {!formData.hasVariants ? (
                  <div className="text-center py-8 border rounded-md bg-gray-50 dark:bg-gray-800">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      This product doesn't have variants. Enable variants in the General tab.
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
                      No variants added yet. Add variants for different colors, sizes, etc.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Tabs
                      value={String(activeVariantTab)}
                      onValueChange={(value) => setActiveVariantTab(Number(value))}
                    >
                      <TabsList className="mb-4 flex flex-wrap">
                        {formData.variants.map((variant, index) => (
                          <TabsTrigger key={variant.id} value={String(index)} className="relative pr-8">
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
                        <TabsContent key={variant.id} value={String(index)} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`variant-${index}-color`}>Color</Label>
                              <Select
                                value={variant.color}
                                onValueChange={(value) => handleVariantChange(index, "color", value)}
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
                              <Label htmlFor={`variant-${index}-size`}>Size</Label>
                              <Select
                                value={variant.size}
                                onValueChange={(value) => handleVariantChange(index, "size", value)}
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
                                className={cn(errors[`variant-${index}-sku`] && "text-red-500")}
                              >
                                SKU*
                              </Label>
                              <Input
                                id={`variant-${index}-sku`}
                                value={variant.sku}
                                onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                                className={cn(errors[`variant-${index}-sku`] && "border-red-500")}
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
                                className={cn(errors[`variant-${index}-price`] && "text-red-500")}
                              >
                                Price*
                              </Label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                                <Input
                                  id={`variant-${index}-price`}
                                  value={variant.price}
                                  onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                                  className={cn("pl-7", errors[`variant-${index}-price`] && "border-red-500")}
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
                                className={cn(errors[`variant-${index}-stock`] && "text-red-500")}
                              >
                                Stock*
                              </Label>
                              <Input
                                id={`variant-${index}-stock`}
                                value={variant.stock}
                                onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                                type="number"
                                min="0"
                                className={cn(errors[`variant-${index}-stock`] && "border-red-500")}
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
                                            src={image.url || image.preview || "/placeholder.svg"}
                                            alt={image.name || `Variant image ${imgIndex + 1}`}
                                            fill
                                            className="object-contain"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          onClick={() => handleRemoveImage(image.id, index)}
                                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                                        >
                                          <X className="h-3 w-3" />
                                        </button>
                                      </>
                                    ) : (
                                      <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <ImagePlus className="h-6 w-6 text-gray-400 mb-1" />
                                        <span className="text-xs text-gray-500">Add</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => handleImageUpload(e, index)}
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
        </Tabs>

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!isDirty || isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>{isEditing ? "Updating..." : "Creating..."}</span>
              </div>
            ) : isEditing ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}