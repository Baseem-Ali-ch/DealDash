"use client"

import type React from "react"

import { Check } from "lucide-react"

interface AdminCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function AdminCheckbox({ id, label, checked, onChange, className = "" }: AdminCheckboxProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input id={id} type="checkbox" className="sr-only" checked={checked} onChange={onChange} />
        <div
          className={`w-5 h-5 border rounded mr-2 flex items-center justify-center transition-colors ${
            checked
              ? "bg-primary border-primary dark:bg-primary dark:border-primary"
              : "border-gray-300 dark:border-gray-600"
          }`}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
        <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          {label}
        </label>
      </div>
    </div>
  )
}
