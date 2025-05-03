"use client"

import { motion } from "framer-motion"

interface SocialAuthButtonProps {
  provider: "google" | "facebook"
  onClick: () => void
  isLoading?: boolean
}

export default function SocialAuthButton({ provider, onClick, isLoading = false }: SocialAuthButtonProps) {
  const providers = {
    google: {
      name: "Google",
      icon: "/icons/google.png",
      className:
        "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white",
    },
    facebook: {
      name: "Facebook",
      icon: "/icons/facebook.png",
      className: "border-blue-600 bg-blue-600 hover:bg-blue-700 text-white",
    },
  }

  const { name, icon, className } = providers[provider]

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={isLoading}
      className={`flex items-center justify-center w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 ${className} ${
        isLoading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      <div className="w-5 h-5 mr-3 relative">
        <div className="w-5 h-5 bg-contain bg-no-repeat bg-center" style={{ backgroundImage: `url(${icon})` }}></div>
      </div>
      <span>Continue with {name}</span>
    </motion.button>
  )
}
