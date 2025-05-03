import { type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}

const Slider = forwardRef<HTMLInputElement, SliderProps>(({ className, ...props }, ref) => {
  return (
    <input
      type="range"
      ref={ref}
      className={cn(
        "h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700",
        "accent-primary focus:outline-none focus:ring-2 focus:ring-primary/50",
        className,
      )}
      {...props}
    />
  )
})

Slider.displayName = "Slider"

export { Slider }
