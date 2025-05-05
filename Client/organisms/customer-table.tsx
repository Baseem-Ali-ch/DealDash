"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Pagination } from "@/molecules/pagination";
import { CustomerStatusBadge } from "@/molecules/customer-status-badge";
import { CustomerTag } from "@/molecules/customer-tag";
import { DateRangePicker } from "@/molecules/date-range-picker";
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Download,
  Mail,
  Eye,
  UserX,
  UserCheck,
  Filter,
} from "lucide-react";
import type { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils/utils";

type CustomerStatus = "active" | "inactive" | "banned";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
  status: CustomerStatus;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string | null;
  tags: string[];
}

interface CustomerTableProps {
  customers: Customer[];
  onStatusChange: (
    customerId: string,
    newStatus: CustomerStatus
  ) => Promise<void>;
}

export function CustomerTable({
  customers: initialCustomers,
  onStatusChange,
}: CustomerTableProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minOrders: "",
    maxOrders: "",
    minSpent: "",
    maxSpent: "",
    status: "all" as "all" | CustomerStatus,
  });

  // Apply filters and search
  const filteredCustomers = customers.filter((customer) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !customer.name.toLowerCase().includes(query) &&
        !customer.email.toLowerCase().includes(query) &&
        !customer.phone.includes(query)
      ) {
        return false;
      }
    }

    // Date range filter
    if (dateRange?.from) {
      const customerDate = new Date(customer.registrationDate);
      if (customerDate < dateRange.from) {
        return false;
      }
      if (dateRange.to && customerDate > dateRange.to) {
        return false;
      }
    }

    // Order count filter
    if (
      filters.minOrders &&
      customer.ordersCount < Number.parseInt(filters.minOrders)
    ) {
      return false;
    }
    if (
      filters.maxOrders &&
      customer.ordersCount > Number.parseInt(filters.maxOrders)
    ) {
      return false;
    }

    // Total spent filter
    if (
      filters.minSpent &&
      customer.totalSpent < Number.parseFloat(filters.minSpent)
    ) {
      return false;
    }
    if (
      filters.maxSpent &&
      customer.totalSpent > Number.parseFloat(filters.maxSpent)
    ) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && customer.status !== filters.status) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / perPage);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  // Handle status change
  const handleStatusChange = async (
    customerId: string,
    newStatus: CustomerStatus
  ) => {
    try {
      await onStatusChange(customerId, newStatus);
      setCustomers(
        customers.map((customer) =>
          customer.id === customerId
            ? { ...customer, status: newStatus }
            : customer
        )
      );
    } catch (error) {
      console.error("Failed to change customer status:", error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setDateRange(undefined);
    setFilters({
      minOrders: "",
      maxOrders: "",
      minSpent: "",
      maxSpent: "",
      status: "all",
    });
  };

  // Export customers
  const exportCustomers = () => {
    // In a real app, this would generate a CSV or Excel file
    console.log("Exporting customers:", filteredCustomers);
    alert(
      "Customer data export initiated. The file will be available for download shortly."
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
              placeholder="Search customers..."
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
          <Button variant="outline" size="sm" onClick={exportCustomers}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-muted/40 p-4 rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Registration Date
            </label>
            <DateRangePicker
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Orders Count</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minOrders}
                onChange={(e) =>
                  setFilters({ ...filters, minOrders: e.target.value })
                }
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxOrders}
                onChange={(e) =>
                  setFilters({ ...filters, maxOrders: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Total Spent ($)</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minSpent}
                onChange={(e) =>
                  setFilters({ ...filters, minSpent: e.target.value })
                }
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxSpent}
                onChange={(e) =>
                  setFilters({ ...filters, maxSpent: e.target.value })
                }
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block">Status</label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value as any })
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="banned">Banned</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="w-full mt-2"
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
              <TableHead className="w-[250px]">
                <div className="flex items-center gap-1">
                  Customer
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Orders
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  Total Spent
                  <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.length > 0 ? (
              paginatedCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {customer.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <CustomerStatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell>{customer.ordersCount}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>
                    {customer.lastOrderDate
                      ? new Date(customer.lastOrderDate).toLocaleDateString()
                      : "Never"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.slice(0, 2).map((tag) => (
                        <CustomerTag key={tag} tag={tag} />
                      ))}
                      {customer.tags.length > 2 && (
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          +{customer.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </TableCell>
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
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/customers/${customer.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Email Customer
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {customer.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "inactive")
                            }
                          >
                            <UserX className="h-4 w-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              handleStatusChange(customer.id, "active")
                            }
                          >
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activate
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
                  No customers found matching your filters.
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
    </div>
  );
}
