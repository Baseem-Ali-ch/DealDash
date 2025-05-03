"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/atoms/button";
import { CartItem } from "@/molecules/cart-item";
import { CartEmpty } from "@/molecules/cart-empty";
import { WishlistConfirmationModal } from "@/organisms/wishlist-confirmation-modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import { clearCart } from "@/lib/store/slices/cartSlice";
import { CartSummary } from "@/molecules/cart-summary";
import { ProductRecommendations } from "@/molecules/product-recommendations";

export function CartList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleClearCart = () => {
    dispatch(clearCart());
    setIsConfirmModalOpen(false);
  };

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-semibold">
          Shopping Cart ({items.length} items)
        </h2>
        <Button
          variant="outline"
          className="text-destructive hover:text-destructive"
          onClick={() => setIsConfirmModalOpen(true)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div layout className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  quantity={item.quantity}
                  color={item.color}
                  size={item.size}
                  slug={item.id} // In a real app, you'd have the slug
                  inStock={true} // Mock in stock status
                  maxQuantity={10} // Mock max quantity
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline">
              <a href="/products" className="flex items-center">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </a>
            </Button>
          </div>
        </div>

        <div>
          <CartSummary />
        </div>
      </div>

      <div className="mt-12">
        <ProductRecommendations />
      </div>

      <WishlistConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleClearCart}
        title="Clear Cart"
        description="Are you sure you want to remove all items from your cart? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </div>
  );
}
