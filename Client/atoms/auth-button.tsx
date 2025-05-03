"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

interface AuthButtonProps {
  type?: "button" | "submit" | "reset"
  onClick?: () => void
  fullWidth?: boolean
  isLoading?: boolean
  disabled?: boolean
  variant?: "primary" | "outline" | "ghost"
  children: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export default function AuthButton({
  type = "button",
  onClick,
  fullWidth = false,
  isLoading = false,
  disabled = false,
  variant = "primary",
  children,
  icon,
  className = "",
}: AuthButtonProps) {
  const baseStyles =
    "flex items-center justify-center px-6 py-2.5 rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2"

  const variantStyles = {
    primary: "bg-primary hover:bg-opacity-90 text-white focus:ring-primary",
    outline: "border border-primary text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary",
    ghost: "text-primary hover:bg-primary hover:bg-opacity-10 focus:ring-primary",
  }

  const widthClass = fullWidth ? "w-full" : ""

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${widthClass} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <span>Loading...</span>
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
