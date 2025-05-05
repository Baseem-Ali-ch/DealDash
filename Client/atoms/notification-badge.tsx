import { cn } from "@/lib/utils/utils";

interface NotificationBadgeProps {
  count: number;
  max?: number;
  className?: string;
}

export function NotificationBadge({
  count,
  max = 99,
  className,
}: NotificationBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span
      className={cn(
        "absolute -top-1 -right-1 flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-xs font-medium text-white bg-primary",
        className
      )}
    >
      {displayCount}
    </span>
  );
}
