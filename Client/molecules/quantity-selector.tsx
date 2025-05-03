"use client"

import type React from "react"

import { useState } from "react"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/atoms/button"

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export function QuantitySelector({ initialQuantity = 1, min = 1, max = 99, onChange }: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleDecrease = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      if (onChange) {
        onChange(newQuantity)
      }
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      if (onChange) {
        onChange(newQuantity)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value)
      if (onChange) {
        onChange(value)
      }
    }
  }

  return (
    <div className="flex h-10 items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-full rounded-r-none"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="h-full w-12 border-y border-input bg-transparent text-center text-sm focus:outline-none"
        aria-label="Quantity"
      />
      <Button
        variant="outline"
        size="icon"
        className="h-full rounded-l-none"
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
