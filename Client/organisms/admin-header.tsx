"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import {
  Bell,
  Search,
  Menu,
  Plus,
  LogOut,
  User,
  Settings,
  HelpCircle,
  ShoppingBag,
  Package,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { NotificationBadge } from "@/atoms/notification-badge";
import type { RootState } from "@/lib/store/store";
import { ThemeToggle } from "@/molecules/theme-toggle";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New order received",
      message: "Order #12345 has been placed",
      time: "5 minutes ago",
      read: false,
      type: "order",
    },
    {
      id: 2,
      title: "Low stock alert",
      message: "Product 'Wireless Headphones' is running low",
      time: "1 hour ago",
      read: false,
      type: "inventory",
    },
    {
      id: 3,
      title: "New customer registration",
      message: "John Doe has created an account",
      time: "3 hours ago",
      read: true,
      type: "customer",
    },
    {
      id: 4,
      title: "New review",
      message: "5-star review for 'Smart Watch'",
      time: "Yesterday",
      read: true,
      type: "review",
    },
  ];

  const quickActions = [
    {
      icon: <Package className="h-4 w-4" />,
      label: "Add Product",
      href: "/admin/products",
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      label: "View Orders",
      href: "/admin/orders",
    },
    {
      icon: <User className="h-4 w-4" />,
      label: "Add Customer",
      href: "/admin/customers",
    },
    {
      icon: <BarChart3 className="h-4 w-4" />,
      label: "Analytics",
      href: "/admin/analytics/revenue",
    },
  ];

  // Add this at the top of the AdminHeader component to get the unread count
  const unreadCount = useSelector(
    (state: RootState) => state.notifications.unreadCount
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-30 flex items-center justify-between h-16 px-4 lg:px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-all duration-300",
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 lg:w-80 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Quick actions */}
        <div className="relative">
          <button
            onClick={() => {
              setShowQuickActions(!showQuickActions);
              setShowNotifications(false);
              setShowProfile(false);
            }}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Quick actions"
          >
            <Plus className="h-5 w-5" />
          </button>

          {showQuickActions && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700">
                  Quick Actions
                </div>
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    role="menuitem"
                    onClick={() => setShowQuickActions(false)}
                  >
                    <span className="mr-3 text-gray-500 dark:text-gray-400">
                      {action.icon}
                    </span>
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <ThemeToggle />

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
              setShowQuickActions(false);
            }}
            className="p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 relative"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <NotificationBadge
                count={unreadCount}
                className="absolute top-0 right-0"
              />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-700">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Notifications
                </h3>
                <Link
                  href="/admin/notifications"
                  className="text-xs text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700",
                      !notification.read && "bg-blue-50 dark:bg-blue-900/20"
                    )}
                  >
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {notification.title}
                      </h4>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-gray-50 dark:bg-gray-700 text-center">
                <Link
                  href="/admin/notifications"
                  className="text-sm text-primary hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
              setShowQuickActions(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="User menu"
          >
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
              AD
            </div>
            <span className="hidden md:block font-medium">Admin</span>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 font-medium border-b border-gray-200 dark:border-gray-700">
                  Admin User
                </div>
                <Link
                  href="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowProfile(false)}
                >
                  <User className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Profile
                </Link>
                <Link
                  href="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowProfile(false)}
                >
                  <Settings className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Settings
                </Link>
                <Link
                  href="/admin/help"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowProfile(false)}
                >
                  <HelpCircle className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  Help
                </Link>
                <div className="border-t border-gray-200 dark:border-gray-700"></div>
                <button
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setShowProfile(false)}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
