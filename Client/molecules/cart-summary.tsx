"use client";

import { useState } from "react";
import { Check, CreditCard } from "lucide-react";
import { Button } from "@/atoms/button";
import { Input } from "@/atoms/input";
import { formatPrice } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks/use-redux";
import { toast } from "sonner";

export function CartSummary() {
  const { items } = useAppSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingEstimate = subtotal > 100 ? 0 : 10.99;
  const taxEstimate = subtotal * 0.08;
  const total = subtotal + shippingEstimate + taxEstimate - couponDiscount;

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }

    setIsApplyingCoupon(true);

    // Simulate API call
    setTimeout(() => {
      // Mock coupon validation
      if (couponCode.toUpperCase() === "SAVE10") {
        const discount = subtotal * 0.1;
        setCouponDiscount(discount);
        setAppliedCoupon(couponCode);
        toast.success("Coupon applied successfully!");
      } else if (couponCode.toUpperCase() === "FREESHIP") {
        setCouponDiscount(shippingEstimate);
        setAppliedCoupon(couponCode);
        toast.success("Free shipping coupon applied!");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setCouponCode("");
    toast.success("Coupon removed");
  };

  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">Order Summary</h3>
      <div className="mt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping estimate</span>
          <span>
            {shippingEstimate === 0 ? "Free" : formatPrice(shippingEstimate)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax estimate</span>
          <span>{formatPrice(taxEstimate)}</span>
        </div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center">
              Discount
              <button
                onClick={handleRemoveCoupon}
                className="ml-2 text-xs text-destructive hover:underline"
              >
                (Remove)
              </button>
            </span>
            <span className="text-green-600 dark:text-green-400">
              -{formatPrice(couponDiscount)}
            </span>
          </div>
        )}
        <div className="border-t pt-4 flex justify-between font-medium">
          <span>Order total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {!appliedCoupon ? (
          <div className="flex gap-2">
            <Input
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="h-9"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !couponCode.trim()}
              className="h-9 whitespace-nowrap"
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between rounded-md bg-muted p-2 text-sm">
            <div className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>
                Coupon <span className="font-medium">{appliedCoupon}</span>{" "}
                applied
              </span>
            </div>
          </div>
        )}

        <Button className="w-full" disabled={items.length === 0}>
          <CreditCard className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </div>

      <div className="mt-6 text-center text-xs text-muted-foreground">
        <p>Shipping and taxes calculated at checkout</p>
        <p className="mt-1">Free shipping on orders over $100</p>
      </div>
    </div>
  );
}
