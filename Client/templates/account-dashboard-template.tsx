"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AccountSidebar } from "@/organisms/account-sidebar"
import { MobileNavigation } from "@/organisms/mobile-navigation"
import { DashboardOverview } from "@/organisms/dashboard-overview"
import { ProfileSection } from "@/organisms/profile-section"
import { OrdersSection } from "@/organisms/orders-section"
import { AddressesSection } from "@/organisms/addresses-section"
import { PaymentMethodsSection } from "@/organisms/payment-methods-section"
import { WalletSection } from "@/organisms/wallet-section"
import { NotificationsSection } from "@/organisms/notifications-section"
import {
  userData,
  ordersData,
  addressesData,
  paymentMethodsData,
  walletTransactionsData,
  notificationsData,
} from "@/lib/data/user-data"
import { Header } from "@/organisms/header"

export const AccountDashboardTemplate = () => {
  const pathname = usePathname()
  const [unreadNotifications, setUnreadNotifications] = useState(0)

  // Calculate unread notifications
  useEffect(() => {
    const count = notificationsData.filter((notification) => !notification.read).length
    setUnreadNotifications(count)
  }, [])

  // Render the appropriate section based on the current path
  const renderSection = () => {
    switch (pathname) {
      case "/account/profile":
        return <ProfileSection user={userData} />
      case "/account/orders":
        return <OrdersSection orders={ordersData} />
      case "/account/addresses":
        return <AddressesSection addresses={addressesData} />
      case "/account/payment":
        return <PaymentMethodsSection paymentMethods={paymentMethodsData} />
      case "/account/wallet":
        return <WalletSection transactions={walletTransactionsData} />
      case "/account/notifications":
        return <NotificationsSection notifications={notificationsData} />
      case "/account/settings":
        return <div>Settings Section (Coming Soon)</div>
      default:
        return <DashboardOverview user={userData} recentOrders={ordersData.slice(0, 2)} />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex flex-1">
        <AccountSidebar unreadNotifications={unreadNotifications} />

        <main className="flex-1 pb-16 md:pb-0">
          <div className="container mx-auto px-4 py-6">{renderSection()}</div>
        </main>

        <MobileNavigation unreadNotifications={unreadNotifications} />
      </div>
    </div>
  )
}
