"use client"

import type React from "react"
import { forwardRef } from "react"
import { Input } from "@/atoms/input"
import { cn } from "@/lib/utils"

interface InputMaskProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask: string
  onChange?: (value: string) => void
}

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, value = "", onChange, className, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      let maskedValue = ""
      let valueIndex = 0

      // Simple masking logic
      for (let i = 0; i < mask.length && valueIndex < inputValue.length; i++) {
        if (mask[i] === "0") {
          // Digit placeholder
          if (/\d/.test(inputValue[valueIndex])) {
            maskedValue += inputValue[valueIndex]
            valueIndex++
          } else {
            valueIndex++
            i--
          }
        } else {
          maskedValue += mask[i]
          if (mask[i] === inputValue[valueIndex]) {
            valueIndex++
          }
        }
      }

      onChange?.(maskedValue)
    }

    return <Input ref={ref} type="text" value={value} onChange={handleChange} className={cn(className)} {...props} />
  },
)

InputMask.displayName = "InputMask"
