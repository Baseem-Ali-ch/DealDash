"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface AdminButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  variant?: "primary" | "secondary" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export default function AdminButton({
  type = "button",
  onClick,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
}: AdminButtonProps) {
  const baseStyles =
    "flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-primary hover:bg-opacity-90 text-white focus:ring-primary",
    secondary: "bg-accent hover:bg-opacity-90 text-white focus:ring-accent",
    outline: "border border-primary text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-600",
  }

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  }

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}
