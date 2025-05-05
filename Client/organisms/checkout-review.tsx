"use client";

import { useState } from "react";
import { Button } from "@/atoms/button";
import { Spinner } from "@/atoms/spinner";
import { CheckoutSummary } from "@/molecules/checkout-summary";
import { AddressCard, type Address } from "@/molecules/address-card";
import type { ShippingMethod } from "@/molecules/shipping-method-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { formatPrice } from "@/lib/utils/utils";

interface CheckoutReviewProps {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: string;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export function CheckoutReview({
  items,
  shippingAddress,
  billingAddress,
  shippingMethod,
  paymentMethod,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  onPlaceOrder,
  onBack,
}: CheckoutReviewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    // Simulate API call delay
    setTimeout(() => {
      onPlaceOrder();
      setIsSubmitting(false);
    }, 2000);
  };

  // Format payment method name for display
  const getPaymentMethodName = () => {
    if (paymentMethod === "credit-card") return "Credit Card";
    if (paymentMethod === "paypal") return "PayPal";
    return paymentMethod;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Review Your Order</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Please review your order details before placing your order
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-8">
          <div>
            <h3 className="font-medium">Shipping Address</h3>
            <div className="mt-2">
              <AddressCard address={shippingAddress} selectable={false} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">Billing Address</h3>
            <div className="mt-2">
              <AddressCard address={billingAddress} selectable={false} />
            </div>
          </div>

          <div>
            <h3 className="font-medium">Shipping Method</h3>
            <div className="mt-2 rounded-lg border p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{shippingMethod.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {shippingMethod.description}
                  </p>
                  <p className="mt-1 text-sm">
                    {shippingMethod.estimatedDelivery}
                  </p>
                </div>
                <p className="font-medium">
                  {shippingMethod.price === 0
                    ? "Free"
                    : formatPrice(shippingMethod.price)}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium">Payment Method</h3>
            <div className="mt-2 rounded-lg border p-4">
              <p className="font-medium">{getPaymentMethodName()}</p>
              {paymentMethod === "credit-card" && (
                <p className="text-sm text-muted-foreground">
                  Ending in •••• 1234
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            discount={discount}
            total={total}
          />

          <Alert className="mt-6">
            <AlertDescription>
              By clicking "Place Order", you agree to purchase your items and
              that you have reviewed all the details above.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
        <Button variant="outline" onClick={onBack} disabled={isSubmitting}>
          Back
        </Button>
        <Button
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
          className="mt-4 sm:mt-0"
        >
          {isSubmitting ? <Spinner className="mr-2" size="sm" /> : null}
          {isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}
