"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import AdminButton from "@/atoms/admin-button"

interface TwoFactorAuthProps {
  onVerify: (code: string) => void
  onCancel: () => void
  isLoading: boolean
  error?: string
}

export default function TwoFactorAuth({ onVerify, onCancel, isLoading, error }: TwoFactorAuthProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste event
      const pastedValue = value.slice(0, 6).split("")
      const newCode = [...code]

      pastedValue.forEach((char, i) => {
        if (index + i < 6) {
          newCode[index + i] = char
        }
      })

      setCode(newCode)

      // Focus the appropriate input
      const nextIndex = Math.min(index + pastedValue.length, 5)
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus()
      }
    } else {
      // Handle single character input
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)

      // Auto-focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !code[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handleSubmit = () => {
    const fullCode = code.join("")
    if (fullCode.length === 6) {
      onVerify(fullCode)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Please enter the 6-digit verification code sent to your device.
      </p>

      <div className="flex justify-center space-x-2 mb-6">
        {code.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-14 text-center text-xl font-semibold border rounded-md focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        ))}
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex space-x-3">
        <AdminButton type="button" variant="outline" fullWidth onClick={onCancel} disabled={isLoading}>
          Cancel
        </AdminButton>
        <AdminButton
          type="button"
          fullWidth
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={code.join("").length !== 6}
        >
          Verify
        </AdminButton>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
        Didn't receive a code? <button className="text-primary hover:underline">Resend</button>
      </p>
    </motion.div>
  )
}
