"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/lib/api/admin/category";

export function CategoryForm({
  category = null,
  onSave,
  onCancel,
}: CategoryFormProps) {
  const isEditing = !!category?._id;
  // Form state
  const [formData, setFormData] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    status: category?.status || "active",
    image: category?.image || null,
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const [isDirty, setIsDirty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    setFormData((prev) => ({
      ...prev,
      [name]: checked ? "active" : "inactive",
    }));
    setIsDirty(true);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, this would upload to a server
    // For demo, we'll create an object URL
    const imageUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      image: {
        url: imageUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      },
    }));
    setIsDirty(true);
  };

  // Handle image remove
  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
    setIsDirty(true);
  };

  // Generate slug from name
  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();

    setFormData((prev) => ({ ...prev, slug }));
    setIsDirty(true);

    // Clear error
    if (errors.slug) {
      setErrors((prev) => ({ ...prev, slug: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    }

    if (!formData.slug.trim()) {
      newErrors.slug = "Slug is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      setActiveTab("general"); // Switch to general tab if there are errors
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Ensure we have a valid category ID for editing
      let response;
      if (isEditing && category?._id) {
        console.log('category ID:', category._id);
        response = await updateCategory(category._id, formData);
      } else {
        response = await createCategory(formData);
      }

      if (response.success) {
        // Show success notification or handle success
        console.log("Category saved successfully:", response);
        toast.success(
          isEditing
            ? "Category updated successfully"
            : "Category created successfully"
        );
        onSave?.(response.data);
      } else {
        setErrors({
          general: response.message || "Failed to save category",
        });
        toast.error(response.message || "Failed to save category");
      }
    } catch (error) {
      console.error("Category save error:", error);
      setErrors({
        general: "An error occurred while saving the category",
      });
      toast.error("An error occurred while saving the category");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      console.log("Category data loaded:", category);
      setFormData({
        name: category.name || "",
        slug: category.slug || "",
        description: category.description || "",
        status: category.status || "active",
        image: category.image || null,
      });
      setIsDirty(false);
    }
  }, [category]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Category" : "Add Category"}</CardTitle>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <div>
              <Label
                htmlFor="name"
                className={cn(errors.name && "text-red-500")}
              >
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
                <Label
                  htmlFor="slug"
                  className={cn(errors.slug && "text-red-500")}
                >
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
                    <span className="text-sm text-gray-500">
                      Upload category image
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
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="status"
                checked={formData.status === "active"}
                onCheckedChange={(checked) =>
                  handleSwitchChange("status", checked)
                }
              />
              <Label htmlFor="status">
                {formData.status === "active" ? "Active" : "Inactive"}
              </Label>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!isDirty}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>{isEditing ? "Updating..." : "Creating..."}</span>
            </div>
          ) : isEditing ? (
            "Update Category"
          ) : (
            "Create Category"
          )}{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}
