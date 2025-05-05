import { cn } from "@/lib/utils/utils";

interface PriorityIndicatorProps {
  priority: "low" | "medium" | "high" | "critical";
  showLabel?: boolean;
}

export function PriorityIndicator({
  priority,
  showLabel = false,
}: PriorityIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "w-2 h-2 rounded-full",
          priority === "critical"
            ? "bg-red-500"
            : priority === "high"
            ? "bg-orange-500"
            : priority === "medium"
            ? "bg-yellow-500"
            : "bg-blue-500"
        )}
      />
      {showLabel && (
        <span
          className={cn(
            "text-xs font-medium",
            priority === "critical"
              ? "text-red-600 dark:text-red-400"
              : priority === "high"
              ? "text-orange-600 dark:text-orange-400"
              : priority === "medium"
              ? "text-yellow-600 dark:text-yellow-400"
              : "text-blue-600 dark:text-blue-400"
          )}
        >
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      )}
    </div>
  );
}
