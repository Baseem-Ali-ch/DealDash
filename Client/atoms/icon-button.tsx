import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
          {
            "bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90":
              variant === "primary",
            "bg-secondary text-primary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90":
              variant === "secondary",
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "h-8 w-8": size === "sm",
            "h-10 w-10": size === "md",
            "h-12 w-12": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
