"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  Settings,
  BarChart3,
  Tag,
  MessageSquare,
  Bell,
  CreditCard,
  ChevronDown,
  ChevronRight,
  X,
  Layers,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { ThemeToggle } from "@/molecules/theme-toggle";

interface AdminSidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number;
}

interface SidebarGroupProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  isCollapsed: boolean;
  defaultOpen?: boolean;
}

const SidebarItem = ({
  icon,
  title,
  href,
  isActive,
  isCollapsed,
  badge,
}: SidebarItemProps) => (
  <Link
    href={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
      isActive
        ? "bg-primary/10 text-primary dark:bg-primary/20"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
      isCollapsed && "justify-center"
    )}
  >
    <span
      className={cn(
        "text-xl",
        isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
      )}
    >
      {icon}
    </span>
    {!isCollapsed && (
      <>
        <span className="font-medium">{title}</span>
        {badge !== undefined && badge > 0 && (
          <span className="ml-auto bg-primary text-white text-xs font-medium px-2 py-0.5 rounded-full">
            {badge > 99 ? "99+" : badge}
          </span>
        )}
      </>
    )}
    {isCollapsed && badge !== undefined && badge > 0 && (
      <span className="absolute top-0 right-0 bg-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
        {badge > 9 ? "9+" : badge}
      </span>
    )}
  </Link>
);

const SidebarGroup = ({
  icon,
  title,
  children,
  isCollapsed,
  defaultOpen = false,
}: SidebarGroupProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
          isCollapsed && "justify-center"
        )}
      >
        <span className="text-xl text-gray-500 dark:text-gray-400">{icon}</span>
        {!isCollapsed && (
          <>
            <span className="font-medium">{title}</span>
            <span className="ml-auto">
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </span>
          </>
        )}
      </button>
      {!isCollapsed && isOpen && (
        <div className="pl-10 pr-3 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};

export function AdminSidebar({ open, setOpen }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-800 transition-all duration-300 shadow-md",
          open ? "w-64" : "w-20",
          !open && "lg:w-20",
          !open && "hidden lg:block"
        )}
      >
        {/* Mobile close button */}
        <button
          className="absolute top-4 right-4 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        <div className="flex flex-col h-full py-6">
          {/* Logo */}
          <div
            className={cn(
              "px-6 mb-6 flex items-center",
              !open && "justify-center px-0"
            )}
          >
            {open ? (
              <Link
                href="/admin/dashboard"
                className="text-2xl font-bold text-primary"
              >
                DealDash
              </Link>
            ) : (
              <Link
                href="/admin/dashboard"
                className="text-2xl font-bold text-primary"
              >
                DD
              </Link>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            <SidebarItem
              icon={<LayoutDashboard />}
              title="Dashboard"
              href="/admin/dashboard"
              isActive={pathname === "/admin/dashboard"}
              isCollapsed={!open}
            />

            <SidebarItem
              icon={<ShoppingBag />}
              title="Orders"
              href="/admin/orders"
              isActive={pathname === "/admin/orders"}
              isCollapsed={!open}
              badge={12}
            />

            <SidebarGroup
              icon={<Package />}
              title="Catalog"
              isCollapsed={!open}
              defaultOpen={
                pathname.includes("/admin/products") ||
                pathname.includes("/admin/categories") ||
                pathname.includes("/admin/brands")
              }
            >
              <SidebarItem
                icon={<Package />}
                title="Products"
                href="/admin/products"
                isActive={pathname === "/admin/products"}
                isCollapsed={false}
              />
              <SidebarItem
                icon={<Layers />}
                title="Categories"
                href="/admin/categories"
                isActive={pathname === "/admin/categories"}
                isCollapsed={false}
              />
              <SidebarItem
                icon={<Award />}
                title="Brands"
                href="/admin/brands"
                isActive={pathname === "/admin/brands"}
                isCollapsed={false}
              />
            </SidebarGroup>

            <SidebarItem
              icon={<Users />}
              title="Customers"
              href="/admin/customers"
              isActive={pathname === "/admin/customers"}
              isCollapsed={!open}
            />

            <SidebarItem
              icon={<BarChart3 />}
              title="Analytics"
              href="/admin/analytics/revenue"
              isActive={pathname === "/admin/analytics/revenue"}
              isCollapsed={!open}
            />

            <SidebarItem
              icon={<CreditCard />}
              title="Promotions"
              href="/admin/promotions"
              isActive={pathname === "/admin/promotions"}
              isCollapsed={!open}
            />

            <SidebarItem
              icon={<Bell />}
              title="Notifications"
              href="/admin/notifications"
              isActive={pathname === "/admin/notifications"}
              isCollapsed={!open}
              badge={8}
            />
          </nav>
        </div>
      </aside>
    </>
  );
}
