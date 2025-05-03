"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/organisms/admin-sidebar"
import { AdminHeader } from "@/organisms/admin-header"
import { ThemeToggle } from "@/molecules/theme-toggle"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Handle responsive sidebar
  useEffect(() => {
    const checkSize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
        setIsMobile(true)
      } else {
        setSidebarOpen(true)
        setIsMobile(false)
      }
    }

    // Initial check
    checkSize()

    // Add event listener
    window.addEventListener("resize", checkSize)

    // Cleanup
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [pathname, isMobile])

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main
          className={cn(
            "flex-1 overflow-y-auto p-4 lg:p-6 transition-all duration-300",
            sidebarOpen ? "lg:ml-64" : "lg:ml-20",
          )}
        >
          <div className="container mx-auto">{children}</div>
        </main>

        {/* Mobile theme toggle */}
        <div className="fixed bottom-4 right-4 lg:hidden z-50">
          <div className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  )
}
