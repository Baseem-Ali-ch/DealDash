import { cn } from "@/lib/utils/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "accent" | "success" | "warning" | "danger";
  showLabel?: boolean;
}

export const ProgressBar = ({
  progress,
  className,
  size = "md",
  color = "primary",
  showLabel = false,
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  // Size classes
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  // Color classes
  const colorClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={cn(
            "transition-all duration-300 ease-in-out rounded-full",
            sizeClasses[size],
            colorClasses[color]
          )}
          style={{ width: `${normalizedProgress}%` }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
          {normalizedProgress}%
        </div>
      )}
    </div>
  );
};
