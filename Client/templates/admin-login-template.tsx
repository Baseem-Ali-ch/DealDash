"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { Moon, Sun, Shield } from "lucide-react"
import AdminLoginForm from "@/organisms/admin-login-form"

export default function AdminLoginTemplate() {
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter()

  // Check for dark mode preference on mount
  useEffect(() => {
    setMounted(true)
    setIsDarkMode(document.documentElement.classList.contains("dark"))
  }, [])

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      setIsDarkMode(false)
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      setIsDarkMode(true)
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Left panel - Branding */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center">
              <div
                className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-highlight dark:from-primary dark:to-highlight cursor-pointer"
                onClick={() => router.push("/")}
              >
                DealDash
              </div>
              <div className="ml-2 px-2 py-1 bg-primary/10 dark:bg-primary/20 rounded text-xs font-semibold text-primary dark:text-highlight">
                ADMIN
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted &&
                (isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-primary" />)}
            </button>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Admin Login</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Sign in to access the admin dashboard and manage your e-commerce platform.
            </p>
          </div>

          <AdminLoginForm />
        </motion.div>
      </div>

      {/* Right panel - Illustration */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-primary/10 to-highlight/10 dark:from-primary/20 dark:to-highlight/20 justify-center items-center p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-lg"
        >
          <div className="relative w-full h-96">
            <Image
              src="/placeholder.svg?height=400&width=500"
              alt="Admin Dashboard Illustration"
              fill
              className="object-contain"
            />
          </div>
          <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Secure Admin Access</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              This admin panel provides powerful tools to manage your e-commerce platform. Enhanced security features
              protect your business data and customer information.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
