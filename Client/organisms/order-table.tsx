"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pagination } from "@/molecules/pagination";
import { OrderStatusBadge } from "@/molecules/order-status-badge";
import { PaymentStatusBadge } from "@/molecules/payment-status-badge";
import { DateRangePicker } from "@/molecules/date-range-picker";
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Filter,
  Eye,
  Printer,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { OrderDetail } from "@/organisms/order-detail";

type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded"
  | "on-hold";
type PaymentStatus =
  | "paid"
  | "pending"
  | "failed"
  | "refunded"
  | "partially-refunded";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  date: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  total: number;
  items: number;
}

interface OrderTableProps {
  orders: Order[];
  onStatusChange: (orderId: string, newStatus: OrderStatus) => Promise<void>;
  onPaymentStatusChange: (
    orderId: string,
    newStatus: PaymentStatus
  ) => Promise<void>;
}

export function OrderTable({
  orders: initialOrders,
  onStatusChange,
  onPaymentStatusChange,
}: OrderTableProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatus | "all">(
    "all"
  );
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Apply filters and search
  const filteredOrders = orders.filter((order) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !order.orderNumber.toLowerCase().includes(query) &&
        !order.customer.name.toLowerCase().includes(query) &&
        !order.customer.email.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false;
    }

    // Payment status filter
    if (paymentFilter !== "all" && order.paymentStatus !== paymentFilter) {
      return false;
    }

    // Date range filter
    if (dateRange?.from) {
      const orderDate = new Date(order.date);
      if (orderDate < dateRange.from) {
        return false;
      }
      if (dateRange.to && orderDate > dateRange.to) {
        return false;
      }
    }

    return true;
  });

  // Pagination
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Handle status change
  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await onStatusChange(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to change order status:", error);
    }
  };

  // Handle payment status change
  const handlePaymentStatusChange = async (
    orderId: string,
    newStatus: PaymentStatus
  ) => {
    try {
      await onPaymentStatusChange(orderId, newStatus);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Failed to change payment status:", error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setDateRange(undefined);
    setStatusFilter("all");
    setPaymentFilter("all");
  };

  // Export orders
  const exportOrders = () => {
    // In a real app, this would generate a CSV or Excel file
    console.log("Exporting orders:", filteredOrders);
    alert(
      "Order data export initiated. The file will be available for download shortly."
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search orders by ID, customer name, or email..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={cn(showFilters && "bg-accent")}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button variant="outline" size="sm" onClick={exportOrders}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="all"
        className="w-full"
        onValueChange={(value) => {
          if (value === "all") {
            setStatusFilter("all");
          } else {
            setStatusFilter(value as OrderStatus);
          }
        }}
      >
        <TabsList className="grid grid-cols-4 md:grid-cols-7 lg:w-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
        </TabsList>
      </Tabs>

      {showFilters && (
        <div className="bg-muted/40 p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Order Date</label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Payment Status</label>
            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value as PaymentStatus | "all")
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Payment Statuses</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="partially-refunded">Partially Refunded</option>
            </select>
          </div>

          <div className="space-y-2 sm:col-span-2 md:col-span-1">
            <label className="text-sm font-medium block">Actions</label>
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                <div className="flex items-center gap-1">
                  Order #
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Date
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Total
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {order.customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <PaymentStatusBadge status={order.paymentStatus} />
                      <div className="text-xs text-muted-foreground">
                        {order.paymentMethod}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="h-4 w-4 mr-2" />
                          Print Invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Print Packing Slip
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        {order.status !== "processing" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "processing")
                            }
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            Mark as Processing
                          </DropdownMenuItem>
                        )}
                        {order.status !== "shipped" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "shipped")
                            }
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Mark as Shipped
                          </DropdownMenuItem>
                        )}
                        {order.status !== "delivered" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "delivered")
                            }
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Mark as Delivered
                          </DropdownMenuItem>
                        )}
                        {order.status !== "cancelled" && (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(order.id, "cancelled")
                            }
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Cancel Order
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No orders found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        perPage={perPage}
        onPerPageChange={setPerPage}
        totalItems={totalItems}
      />
      {selectedOrder && (
        <Sheet
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
        >
          <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl overflow-y-auto">
            <SheetHeader className="mb-4">
              <SheetTitle>Order #{selectedOrder.orderNumber}</SheetTitle>
              <SheetDescription>
                Placed on {new Date(selectedOrder.date).toLocaleDateString()}
              </SheetDescription>
            </SheetHeader>
            <OrderDetail
              order={selectedOrder}
              onStatusChange={(newStatus) =>
                handleStatusChange(selectedOrder.id, newStatus)
              }
              onPaymentStatusChange={(newStatus) =>
                handlePaymentStatusChange(selectedOrder.id, newStatus)
              }
            />
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
