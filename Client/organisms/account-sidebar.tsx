"use client";
import {
  Bell,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { SidebarItem } from "@/molecules/sidebar-item";
import { ThemeToggle } from "@/molecules/theme-toggle";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/atoms/button";

interface AccountSidebarProps {
  unreadNotifications: number;
  className?: string;
}

export const AccountSidebar = ({
  unreadNotifications,
  className,
}: AccountSidebarProps) => {
  return (
    <aside
      className={cn(
        "w-64 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 overflow-y-auto py-6 px-3 hidden md:block",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="px-3 mb-6">
          <h2 className="text-xl font-bold">My Account</h2>
        </div>

        <nav className="space-y-1 flex-1">
          <SidebarItem
            href="/account"
            icon={<LayoutDashboard />}
            label="Dashboard"
          />
          <SidebarItem
            href="/account/profile"
            icon={<User />}
            label="Profile"
          />
          <SidebarItem
            href="/account/orders"
            icon={<Package />}
            label="Orders"
          />
          <SidebarItem
            href="/account/addresses"
            icon={<MapPin />}
            label="Addresses"
          />
          <SidebarItem
            href="/account/payment"
            icon={<CreditCard />}
            label="Payment Methods"
          />
          <SidebarItem
            href="/account/wallet"
            icon={<Wallet />}
            label="Wallet"
          />
          <SidebarItem
            href="/account/notifications"
            icon={<Bell />}
            label="Notifications"
            badge={unreadNotifications}
          />
          <SidebarItem
            href="/account/settings"
            icon={<Settings />}
            label="Settings"
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between px-3 mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Theme
            </span>
            <ThemeToggle />
          </div>
          <Button variant="outline" className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </aside>
  );
};
