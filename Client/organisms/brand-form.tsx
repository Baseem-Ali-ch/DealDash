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
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { toast } from "sonner";
import { createBrand, updateBrand } from "@/lib/api/admin/brand";

export function BrandForm({ brand = null, isOpen, onClose, onSave }) {
  const isEditing = !!brand?._id;
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: brand?.name || "",
    description: brand?.description || "",
    website: brand?.website || "",
    logo: brand?.logo || null,
    status: brand?.status || "active",
    featured: brand?.featured || false,
    contactEmail: brand?.contactEmail || "",
    contactPhone: brand?.contactPhone || "",
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("general");
  const [isDirty, setIsDirty] = useState(false);

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

  // Handle switch change
  const handleSwitchChange = (name, checked) => {
    if (name === "status") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? "active" : "inactive",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    }
    setIsDirty(true);
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // In a real app, this would upload to a server
    // For demo, we'll create an object URL
    const logoUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      logo: {
        url: logoUrl,
        name: file.name,
        size: file.size,
        type: file.type,
      },
    }));
    setIsDirty(true);
  };

  // Handle logo remove
  const handleRemoveLogo = () => {
    setFormData((prev) => ({
      ...prev,
      logo: null,
    }));
    setIsDirty(true);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Brand name is required";
    }

    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = "Please enter a valid URL";
    }

    if (formData.contactEmail && !isValidEmail(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Validate email
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      const errorFields = Object.keys(errors);
      if (
        errorFields.some((field) =>
          ["name", "website", "description"].includes(field)
        )
      ) {
        setActiveTab("general");
      } else if (
        errorFields.some((field) =>
          ["contactEmail", "contactPhone"].includes(field)
        )
      ) {
        setActiveTab("contact");
      }
      return;
    }

    try {
      setIsLoading(true);

      const response = isEditing
        ? await updateBrand(brand._id, formData)
        : await createBrand(formData);

      if (response.success) {
        toast.success(
          isEditing
            ? "Brand updated successfully"
            : "Brand created successfully"
        );
        onSave?.(response.data);
        onClose();
      } else {
        toast.error(response.message || "Failed to save brand");
        setErrors({ general: response.message });
      }
    } catch (error) {
      console.error("Brand save error:", error);
      toast.error("An error occurred while saving the brand");
      setErrors({ general: "An error occurred while saving the brand" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md w-full overflow-y-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>{isEditing ? "Edit Brand" : "Add New Brand"}</SheetTitle>
        </SheetHeader>

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
                Brand Name*
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
                htmlFor="website"
                className={cn(errors.website && "text-red-500")}
              >
                Website
              </Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className={cn(errors.website && "border-red-500")}
              />
              {errors.website && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.website}
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
              <Label>Brand Logo</Label>
              <div className="mt-2 border rounded-md p-4">
                {formData.logo ? (
                  <div className="relative">
                    <div className="relative h-40 w-full">
                      <Image
                        src={formData.logo.url || "/placeholder.svg"}
                        alt={formData.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-40 cursor-pointer border-2 border-dashed rounded-md border-gray-300 hover:border-gray-400 transition-colors">
                    <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      Upload brand logo
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
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

        <SheetFooter className="mt-6 flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isDirty}>
            {isEditing ? "Update Brand" : "Create Brand"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
