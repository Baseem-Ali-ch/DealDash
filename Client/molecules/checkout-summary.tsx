"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/atoms/button";
import { OrderSummaryItem } from "@/molecules/order-summary-item";
import { formatPrice } from "@/lib/utils/utils";

interface CheckoutSummaryProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  isMobile?: boolean;
}

export function CheckoutSummary({
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  isMobile = false,
}: CheckoutSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  useEffect(() => {
    setIsExpanded(!isMobile);
  }, [isMobile]);

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Order Summary</h3>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls="order-summary-content"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              <span className="sr-only">
                {isExpanded ? "Collapse" : "Expand"} order summary
              </span>
            </Button>
          )}
        </div>

        <div
          id="order-summary-content"
          className={isMobile && !isExpanded ? "hidden" : "block"}
        >
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <OrderSummaryItem
                key={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                image={item.image}
              />
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Subtotal</p>
              <p>{formatPrice(subtotal)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Shipping</p>
              <p>{shipping === 0 ? "Free" : formatPrice(shipping)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-muted-foreground">Tax</p>
              <p>{formatPrice(tax)}</p>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <p className="text-muted-foreground">Discount</p>
                <p className="text-green-600 dark:text-green-400">
                  -{formatPrice(discount)}
                </p>
              </div>
            )}
            <div className="border-t pt-4 flex justify-between font-medium">
              <p>Total</p>
              <p>{formatPrice(total)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
