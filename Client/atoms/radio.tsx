import { type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="radio"
        ref={ref}
        className={cn(
          "h-4 w-4 border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800",
          className,
        )}
        {...props}
      />
      {label && (
        <label htmlFor={props.id} className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
    </div>
  )
})

Radio.displayName = "Radio"

export { Radio }
