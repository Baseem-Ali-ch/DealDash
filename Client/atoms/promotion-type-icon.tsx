import { Tag, Percent, Truck, Gift } from "lucide-react";
import { cn } from "@/lib/utils/utils";

export type PromotionType = "fixed" | "percentage" | "shipping" | "bogo";

interface PromotionTypeIconProps {
  type: PromotionType;
  className?: string;
  size?: number;
}

export function PromotionTypeIcon({
  type,
  className,
  size = 16,
}: PromotionTypeIconProps) {
  const iconMap = {
    fixed: <Tag size={size} className="text-blue-500 dark:text-blue-400" />,
    percentage: (
      <Percent size={size} className="text-green-500 dark:text-green-400" />
    ),
    shipping: (
      <Truck size={size} className="text-purple-500 dark:text-purple-400" />
    ),
    bogo: <Gift size={size} className="text-pink-500 dark:text-pink-400" />,
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      {iconMap[type]}
    </div>
  );
}
