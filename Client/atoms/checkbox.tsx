import { type InputHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ className, label, ...props }, ref) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800",
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

Checkbox.displayName = "Checkbox"

export { Checkbox }
