"use client";

import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/atoms/status-badge";
import { CouponCode } from "@/atoms/coupon-code";
import {
  type PromotionType,
  PromotionTypeIcon,
} from "@/atoms/promotion-type-icon";
import { formatPrice } from "@/lib/utils/utils";

interface PromotionCardProps {
  promotion: {
    id: string;
    name: string;
    code: string;
    type: PromotionType;
    value: number;
    status: "active" | "scheduled" | "expired" | "draft" | "paused";
    startDate: string;
    endDate: string;
    usageCount: number;
    usageLimit: number;
  };
  onClick?: () => void;
}

export function PromotionCard({ promotion, onClick }: PromotionCardProps) {
  const formatValue = (type: PromotionType, value: number) => {
    switch (type) {
      case "percentage":
        return `${value}%`;
      case "fixed":
        return formatPrice(value);
      case "shipping":
        return "Free Shipping";
      case "bogo":
        return "Buy One Get One";
      default:
        return value.toString();
    }
  };

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {promotion.name}
            </h3>
            <div className="mt-1">
              <CouponCode code={promotion.code} />
            </div>
          </div>
          <StatusBadge status={promotion.status} />
        </div>

        <div className="mt-3 flex items-center text-sm text-gray-500 dark:text-gray-400">
          <PromotionTypeIcon type={promotion.type} className="mr-1" />
          <span className="font-medium">
            {formatValue(promotion.type, promotion.value)}
          </span>
        </div>

        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>
              Valid: {new Date(promotion.startDate).toLocaleDateString()} -{" "}
              {new Date(promotion.endDate).toLocaleDateString()}
            </span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>
              Usage: {promotion.usageCount}/{promotion.usageLimit || "∞"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
