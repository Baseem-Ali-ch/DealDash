"use client";

import { cn } from "@/lib/utils/utils";
import { Check } from "lucide-react";
import { formatPrice } from "@/lib/utils/utils";

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
}

interface ShippingMethodCardProps {
  method: ShippingMethod;
  isSelected: boolean;
  onSelect: (method: ShippingMethod) => void;
}

export function ShippingMethodCard({
  method,
  isSelected,
  onSelect,
}: ShippingMethodCardProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
        isSelected
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : "hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={() => onSelect(method)}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{method.name}</h3>
          <p className="font-medium">
            {method.price === 0 ? "Free" : formatPrice(method.price)}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{method.description}</p>
        <p className="mt-1 text-sm">{method.estimatedDelivery}</p>
      </div>
      {isSelected && (
        <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}
