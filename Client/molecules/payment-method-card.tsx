"use client";

import type React from "react";
import { cn } from "@/lib/utils/utils";
import { Check } from "lucide-react";

export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  description?: string;
  lastFour?: string;
  expiryDate?: string;
}

interface PaymentMethodCardProps {
  method: PaymentMethod;
  isSelected: boolean;
  onSelect: (method: PaymentMethod) => void;
}

export function PaymentMethodCard({
  method,
  isSelected,
  onSelect,
}: PaymentMethodCardProps) {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors",
        isSelected
          ? "border-primary bg-primary/5 dark:bg-primary/10"
          : "hover:border-primary/50 hover:bg-muted/50"
      )}
      onClick={() => onSelect(method)}
    >
      <div className="flex h-10 w-10 items-center justify-center">
        {method.icon}
      </div>
      <div className="flex-1">
        <h3 className="font-medium">{method.name}</h3>
        {method.description && (
          <p className="text-sm text-muted-foreground">{method.description}</p>
        )}
        {method.lastFour && (
          <p className="text-sm">
            •••• {method.lastFour}{" "}
            {method.expiryDate && `(Expires ${method.expiryDate})`}
          </p>
        )}
      </div>
      {isSelected && (
        <div className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}
    </div>
  );
}
