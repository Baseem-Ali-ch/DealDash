"use client";

import Link from "next/link";
import { Button } from "@/atoms/button";
import { CheckoutSummary } from "@/molecules/checkout-summary";
import { AddressCard, type Address } from "@/molecules/address-card";
import { Check, Package, Printer, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils/utils";

interface CheckoutSuccessProps {
  orderNumber: string;
  orderDate: string;
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
  estimatedDelivery: string;
  shippingAddress: Address;
}

export function CheckoutSuccess({
  orderNumber,
  orderDate,
  items,
  subtotal,
  shipping,
  tax,
  discount,
  total,
  estimatedDelivery,
  shippingAddress,
}: CheckoutSuccessProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-green-200 bg-green-50 p-6 text-center dark:border-green-900 dark:bg-green-900/20">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold">Order Confirmed!</h2>
        <p className="mt-2 text-muted-foreground">
          Thank you for your order. We&apos;ve received your order and will
          begin processing it soon.
        </p>
      </div>

      <div className="rounded-lg border p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <div>
            <h3 className="text-lg font-semibold">Order #{orderNumber}</h3>
            <p className="text-sm text-muted-foreground">
              Placed on {orderDate}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Package className="h-4 w-4" />
              Track Order
            </Button>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium">Shipping Information</h4>
            <AddressCard address={shippingAddress} selectable={false} />
            <p className="mt-4 text-sm">
              <span className="font-medium">Estimated Delivery:</span>{" "}
              {estimatedDelivery}
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-medium">Payment Information</h4>
            <div className="rounded-lg border p-4">
              <p className="font-medium">Credit Card</p>
              <p className="text-sm text-muted-foreground">
                Ending in •••• 1234
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Billing Address:</span> Same as
                shipping
              </p>
              <p className="mt-2 text-sm">
                <span className="font-medium">Total Charged:</span>{" "}
                {formatPrice(total)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <CheckoutSummary
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        discount={discount}
        total={total}
      />

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button asChild className="flex-1">
          <Link href="/account/orders">
            <Package className="mr-2 h-4 w-4" />
            View Order Status
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}
