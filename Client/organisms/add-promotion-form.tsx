"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CouponGenerator } from "@/molecules/coupon-generator";
import { cn } from "@/lib/utils/utils";

// Mock data for dropdowns
const customerGroups = [
  { id: "all", name: "All Customers" },
  { id: "vip", name: "VIP" },
  { id: "regular", name: "Regular Customers" },
  { id: "new", name: "New Customers" },
];

const productCategories = [
  { id: "all", name: "All Categories" },
  { id: "electronics", name: "Electronics" },
  { id: "clothing", name: "Clothing" },
  { id: "home", name: "Home & Kitchen" },
  { id: "beauty", name: "Beauty & Personal Care" },
];

const formSchema = z.object({
  promotionType: z.enum(["offer", "coupon"]),
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z.string().optional(),
  code: z
    .string()
    .min(3, { message: "Code must be at least 3 characters" })
    .optional(),
  discountType: z.enum(["fixed", "percentage", "shipping", "bogo"] as const),
  value: z.number().min(0).optional(),
  startDate: z.date(),
  endDate: z.date(),
  usageLimitPerCustomer: z.number().int().min(0).optional(),
  usageLimitTotal: z.number().int().min(0).optional(),
  minOrderValue: z.number().min(0).optional(),
  customerGroups: z.array(z.string()).optional(),
  offerType: z.enum(["product", "category", "brand"]).optional(),
  productIds: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(),
  brandIds: z.array(z.string()).optional(),
  firstTimeOnly: z.boolean().default(false),
  active: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

interface AddPromotionFormProps {
  onSubmit: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
  isEditing?: boolean;
}

// Changed to default export
export default function AddPromotionForm({
  onSubmit,
  initialData,
  isEditing = false,
}: AddPromotionFormProps) {
  const [tab, setTab] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promotionType: initialData?.promotionType || "coupon",
      name: initialData?.name || "",
      description: initialData?.description || "",
      code: initialData?.code || "",
      discountType: initialData?.discountType || "percentage",
      value: initialData?.value || 0,
      startDate: initialData?.startDate || new Date(),
      endDate:
        initialData?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
      usageLimitPerCustomer: initialData?.usageLimitPerCustomer || 1,
      usageLimitTotal: initialData?.usageLimitTotal || 100,
      minOrderValue: initialData?.minOrderValue || 0,
      customerGroups: initialData?.customerGroups || [],
      offerType: initialData?.offerType || "product",
      productIds: initialData?.productIds || [],
      categoryIds: initialData?.categoryIds || [],
      brandIds: initialData?.brandIds || [],
      firstTimeOnly: initialData?.firstTimeOnly || false,
      active: initialData?.active !== undefined ? initialData.active : true,
    },
  });

  const promotionType = form.watch("promotionType");
  const discountType = form.watch("discountType");
  const offerType = form.watch("offerType");

  // Mock data for products, categories, and brands
  const mockProducts = [
    {
      id: "p1",
      name: "Premium Headphones",
      price: 199.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p2",
      name: "Wireless Earbuds",
      price: 129.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p3",
      name: "Smart Watch",
      price: 249.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p4",
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p5",
      name: "Laptop Pro",
      price: 1299.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p6",
      name: "Smartphone X",
      price: 899.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p7",
      name: "Tablet Ultra",
      price: 499.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p8",
      name: "Gaming Console",
      price: 399.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p9",
      name: "Camera DSLR",
      price: 699.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p10",
      name: "Fitness Tracker",
      price: 79.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p11",
      name: "Smart Home Hub",
      price: 129.99,
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      id: "p12",
      name: "Wireless Charger",
      price: 39.99,
      image: "/placeholder.svg?height=50&width=50",
    },
  ];

  const mockCategories = [
    { id: "c1", name: "Electronics", productCount: 156 },
    { id: "c2", name: "Audio", productCount: 78 },
    { id: "c3", name: "Wearables", productCount: 42 },
    { id: "c4", name: "Smartphones", productCount: 63 },
    { id: "c5", name: "Computers", productCount: 91 },
    { id: "c6", name: "Gaming", productCount: 47 },
    { id: "c7", name: "Photography", productCount: 35 },
    { id: "c8", name: "Smart Home", productCount: 29 },
  ];

  const mockBrands = [
    { id: "b1", name: "TechMaster", productCount: 87 },
    { id: "b2", name: "SoundWave", productCount: 42 },
    { id: "b3", name: "FitLife", productCount: 31 },
    { id: "b4", name: "MobileX", productCount: 56 },
    { id: "b5", name: "ComputeWare", productCount: 63 },
    { id: "b6", name: "GameZone", productCount: 28 },
    { id: "b7", name: "PhotoPro", productCount: 19 },
    { id: "b8", name: "SmartLiving", productCount: 24 },
  ];

  // Filter and paginate products based on search term
  const filteredProducts = mockProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Filter and paginate categories based on search term
  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalCategoryPages = Math.ceil(
    filteredCategories.length / itemsPerPage
  );

  // Filter and paginate brands based on search term
  const filteredBrands = mockBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBrands = filteredBrands.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalBrandPages = Math.ceil(filteredBrands.length / itemsPerPage);

  // Handle product selection
  const toggleProductSelection = (product: any) => {
    if (selectedProducts.some((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  // Handle category selection
  const toggleCategorySelection = (category: any) => {
    if (selectedCategories.some((c) => c.id === category.id)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c.id !== category.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handle brand selection
  const toggleBrandSelection = (brand: any) => {
    if (selectedBrands.some((b) => b.id === brand.id)) {
      setSelectedBrands(selectedBrands.filter((b) => b.id !== brand.id));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Update form values when selections change
  useEffect(() => {
    form.setValue(
      "productIds",
      selectedProducts.map((p) => p.id)
    );
  }, [selectedProducts, form]);

  useEffect(() => {
    form.setValue(
      "categoryIds",
      selectedCategories.map((c) => c.id)
    );
  }, [selectedCategories, form]);

  useEffect(() => {
    form.setValue(
      "brandIds",
      selectedBrands.map((b) => b.id)
    );
  }, [selectedBrands, form]);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="promotionType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Promotion Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="coupon" id="coupon" />
                    <label
                      htmlFor="coupon"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Coupon (Code-based discount)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="offer" id="offer" />
                    <label
                      htmlFor="offer"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Offer (Automatically applied)
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Choose whether this is a coupon code that customers enter at
                checkout or an automatic offer
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
            {promotionType === "offer" && (
              <TabsTrigger value="products">Products</TabsTrigger>
            )}
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promotion Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Summer Sale 2023" {...field} />
                    </FormControl>
                    <FormDescription>
                      Internal name for this promotion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {promotionType === "coupon" && (
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <div className="flex space-x-2">
                          <Input
                            placeholder="SUMMER20"
                            className="uppercase"
                            {...field}
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" type="button">
                                Generate
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                              <CouponGenerator
                                onGenerate={(code) =>
                                  form.setValue("code", code)
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Code customers will enter at checkout
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe this promotion..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Internal notes about this promotion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select discount type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="percentage">
                          Percentage Discount
                        </SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="shipping">Free Shipping</SelectItem>
                        <SelectItem value="bogo">Buy One Get One</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Type of discount to apply</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {(discountType === "percentage" || discountType === "fixed") && (
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {discountType === "percentage"
                          ? "Discount Percentage"
                          : "Discount Amount"}
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          {discountType === "fixed" && (
                            <span className="absolute left-3 top-1/2 -translate-y-1/2">
                              $
                            </span>
                          )}
                          <Input
                            type="number"
                            className={discountType === "fixed" ? "pl-7" : ""}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number.parseFloat(e.target.value))
                            }
                          />
                          {discountType === "percentage" && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                              %
                            </span>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        {discountType === "percentage"
                          ? "Percentage off the order total"
                          : "Fixed amount off the order total"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When the promotion becomes active
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      When the promotion expires
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active Status</FormLabel>
                    <FormDescription>
                      Enable or disable this promotion
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="restrictions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="minOrderValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Value</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          $
                        </span>
                        <Input
                          type="number"
                          className="pl-7"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Minimum cart value required to use this promotion
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {promotionType === "coupon" && (
                <FormField
                  control={form.control}
                  name="usageLimitTotal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Usage Limit</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Maximum number of times this promotion can be used (0 =
                        unlimited)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {promotionType === "coupon" && (
              <FormField
                control={form.control}
                name="usageLimitPerCustomer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usage Limit Per Customer</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum times a customer can use this promotion (0 =
                      unlimited)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </TabsContent>

          {promotionType === "offer" && (
            <TabsContent value="products" className="space-y-6">
              <FormField
                control={form.control}
                name="offerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Applies To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select what this offer applies to" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="product">
                          Specific Products
                        </SelectItem>
                        <SelectItem value="category">
                          Product Categories
                        </SelectItem>
                        <SelectItem value="brand">Brands</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose what this offer will apply to
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center">
                  <Input
                    placeholder={`Search ${
                      offerType === "product"
                        ? "products"
                        : offerType === "category"
                        ? "categories"
                        : "brands"
                    }...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon" className="ml-2">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {offerType === "product" && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProducts.map((product) => (
                        <Badge
                          key={product.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {product.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => toggleProductSelection(product)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <ScrollArea className="h-60 border rounded-md p-4">
                      <div className="space-y-4">
                        {paginatedProducts.length > 0 ? (
                          paginatedProducts.map((product) => (
                            <div
                              key={product.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                                selectedProducts.some(
                                  (p) => p.id === product.id
                                ) && "bg-primary/10"
                              )}
                              onClick={() => toggleProductSelection(product)}
                            >
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-10 h-10 rounded-md object-cover"
                                />
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={selectedProducts.some(
                                  (p) => p.id === product.id
                                )}
                                onCheckedChange={() =>
                                  toggleProductSelection(product)
                                }
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            No products found
                          </p>
                        )}
                      </div>
                    </ScrollArea>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalPages)
                            )
                          }
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {offerType === "category" && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedCategories.map((category) => (
                        <Badge
                          key={category.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {category.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => toggleCategorySelection(category)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <ScrollArea className="h-60 border rounded-md p-4">
                      <div className="space-y-4">
                        {paginatedCategories.length > 0 ? (
                          paginatedCategories.map((category) => (
                            <div
                              key={category.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                                selectedCategories.some(
                                  (c) => c.id === category.id
                                ) && "bg-primary/10"
                              )}
                              onClick={() => toggleCategorySelection(category)}
                            >
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="font-medium">{category.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {category.productCount} products
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={selectedCategories.some(
                                  (c) => c.id === category.id
                                )}
                                onCheckedChange={() =>
                                  toggleCategorySelection(category)
                                }
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            No categories found
                          </p>
                        )}
                      </div>
                    </ScrollArea>

                    {totalCategoryPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalCategoryPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalCategoryPages)
                            )
                          }
                          disabled={currentPage === totalCategoryPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}

                {offerType === "brand" && (
                  <>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedBrands.map((brand) => (
                        <Badge
                          key={brand.id}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {brand.name}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => toggleBrandSelection(brand)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>

                    <ScrollArea className="h-60 border rounded-md p-4">
                      <div className="space-y-4">
                        {paginatedBrands.length > 0 ? (
                          paginatedBrands.map((brand) => (
                            <div
                              key={brand.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                                selectedBrands.some((b) => b.id === brand.id) &&
                                  "bg-primary/10"
                              )}
                              onClick={() => toggleBrandSelection(brand)}
                            >
                              <div className="flex items-center gap-3">
                                <div>
                                  <p className="font-medium">{brand.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {brand.productCount} products
                                  </p>
                                </div>
                              </div>
                              <Switch
                                checked={selectedBrands.some(
                                  (b) => b.id === brand.id
                                )}
                                onCheckedChange={() =>
                                  toggleBrandSelection(brand)
                                }
                              />
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            No brands found
                          </p>
                        )}
                      </div>
                    </ScrollArea>

                    {totalBrandPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                          }
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalBrandPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, totalBrandPages)
                            )
                          }
                          disabled={currentPage === totalBrandPages}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>
          )}

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customerGroups"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Groups</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange([value])}
                      defaultValue={field.value?.[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select customer group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="regular">
                          Regular Customers
                        </SelectItem>
                        <SelectItem value="new">New Customers</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Restrict promotion to specific customer groups
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstTimeOnly"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        First-Time Customers Only
                      </FormLabel>
                      <FormDescription>
                        Limit to customers who have never placed an order
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Promotion" : "Create Promotion"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
