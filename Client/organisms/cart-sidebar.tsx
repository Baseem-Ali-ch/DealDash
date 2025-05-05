"use client";

import { useAppSelector, useAppDispatch } from "@/lib/hooks/use-redux";
import {
  toggleCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/store/slices/cartSlice";
import { Button } from "@/atoms/button";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";
import { useRouter } from "next/navigation";

export function CartSidebar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, isOpen } = useAppSelector((state) => state.cart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    dispatch(toggleCart()); // Close the cart sidebar
    router.push("/checkout");
  };

  const handleViewCart = () => {
    dispatch(toggleCart()); // Close the cart sidebar
    router.push("/cart");
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => dispatch(toggleCart())}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-background z-50 shadow-xl transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Your Cart ({totalItems})</h2>
            <button
              onClick={() => dispatch(toggleCart())}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button onClick={() => dispatch(toggleCart())}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b pb-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between text-base font-medium">
                        <h3 className="line-clamp-1">{item.name}</h3>
                        <p className="ml-4">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 text-sm"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: Math.max(1, item.quantity - 1),
                                })
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 py-1 text-sm">
                            {item.quantity}
                          </span>
                          <button
                            className="px-2 py-1 text-sm"
                            onClick={() =>
                              dispatch(
                                updateQuantity({
                                  id: item.id,
                                  quantity: item.quantity + 1,
                                })
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-muted-foreground hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-base font-medium">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="flex justify-center gap-2">
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout
                </Button>
                <Button className="w-full" onClick={handleViewCart}>
                  Cart
                </Button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => dispatch(toggleCart())}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
