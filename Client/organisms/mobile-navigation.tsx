"use client"
import { Bell, LayoutDashboard, Package, User, Wallet } from "lucide-react"
import { MobileNavItem } from "@/molecules/mobile-nav-item"

interface MobileNavigationProps {
  unreadNotifications: number
}

export const MobileNavigation = ({ unreadNotifications }: MobileNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-2 px-4 md:hidden z-50">
      <div className="flex items-center justify-between">
        <MobileNavItem href="/account" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
        <MobileNavItem href="/account/profile" icon={<User className="h-5 w-5" />} label="Profile" />
        <MobileNavItem href="/account/orders" icon={<Package className="h-5 w-5" />} label="Orders" />
        <MobileNavItem href="/account/wallet" icon={<Wallet className="h-5 w-5" />} label="Wallet" />
        <MobileNavItem
          href="/account/notifications"
          icon={<Bell className="h-5 w-5" />}
          label="Alerts"
          badge={unreadNotifications}
        />
      </div>
    </div>
  )
}
