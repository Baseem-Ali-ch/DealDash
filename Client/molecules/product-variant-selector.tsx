"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/atoms/button"
import { cn } from "@/lib/utils"

interface ColorOption {
  name: string
  value: string
}

interface ProductVariantSelectorProps {
  colors?: ColorOption[]
  sizes?: string[]
  onColorChange?: (color: ColorOption) => void
  onSizeChange?: (size: string) => void
}

export function ProductVariantSelector({ colors, sizes, onColorChange, onSizeChange }: ProductVariantSelectorProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(colors?.[0] || null)
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes?.[0] || null)

  const handleColorChange = (color: ColorOption) => {
    setSelectedColor(color)
    if (onColorChange) {
      onColorChange(color)
    }
  }

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    if (onSizeChange) {
      onSizeChange(size)
    }
  }

  return (
    <div className="space-y-6">
      {colors && colors.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Color: {selectedColor?.name}</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color.value}
                className={cn(
                  "relative h-8 w-8 rounded-full border",
                  selectedColor?.value === color.value && "ring-2 ring-primary ring-offset-2",
                )}
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorChange(color)}
                aria-label={`Select ${color.name} color`}
                aria-pressed={selectedColor?.value === color.value}
              >
                {selectedColor?.value === color.value && (
                  <Check
                    className={cn(
                      "absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2",
                      color.value === "#FFFFFF" || color.value === "#FFF" ? "text-black" : "text-white",
                    )}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {sizes && sizes.length > 0 && (
        <div>
          <h3 className="mb-3 text-sm font-medium">Size: {selectedSize}</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <Button
                key={size}
                variant={selectedSize === size ? "primary" : "outline"}
                className="min-w-[3rem]"
                onClick={() => handleSizeChange(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
