"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  MoreHorizontal,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";

// Sample data
const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    date: "2023-05-15",
    total: 129.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    date: "2023-05-15",
    total: 79.95,
    status: "shipped",
    items: 1,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    date: "2023-05-14",
    total: 249.5,
    status: "processing",
    items: 2,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    date: "2023-05-14",
    total: 349.99,
    status: "cancelled",
    items: 4,
  },
  {
    id: "ORD-005",
    customer: "Michael Wilson",
    date: "2023-05-13",
    total: 59.99,
    status: "delivered",
    items: 1,
  },
];

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

interface OrderRowProps {
  order: {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: OrderStatus;
    items: number;
  };
}

const OrderRow = ({ order }: OrderRowProps) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-500";
      case "shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-500";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-500";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-500";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "processing":
        return <Clock className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
            <Package className="h-4 w-4" />
          </div>
          <div>
            <div className="font-medium">{order.id}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {order.date}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">{order.customer}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="font-medium">${order.total.toFixed(2)}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {order.items} item{order.items !== 1 ? "s" : ""}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={cn(
            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium",
            getStatusColor(order.status)
          )}
        >
          {getStatusIcon(order.status)}
          <span className="capitalize">{order.status}</span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowActions(false)}
                >
                  <Eye className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  View Details
                </Link>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowActions(false)}
                >
                  <Truck className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Update Status
                </button>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowActions(false)}
                >
                  <Package className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Print Invoice
                </button>
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export function RecentOrders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Recent Orders</h2>
        <Link
          href="/admin/orders"
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {recentOrders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
