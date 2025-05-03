"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/atoms/button";
import { WishlistItem } from "@/molecules/wishlist-item";
import { WishlistEmpty } from "@/molecules/wishlist-empty";
import { WishlistConfirmationModal } from "@/organisms/wishlist-confirmation-modal";
import { Pagination } from "@/molecules/pagination";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/use-redux";
import { clearWishlist } from "@/lib/store/slices/wishlistSlice";

const ITEMS_PER_PAGE = 5;

export function WishlistList() {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.wishlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, endIndex);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    setIsConfirmModalOpen(false);
  };

  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex gap-2 ml-auto"> 
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={() => setIsConfirmModalOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Wishlist
          </Button>
        </div>
      </div>


      <motion.div layout className="space-y-4">
        <AnimatePresence>
          {currentItems.map((item) => (
            <WishlistItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              slug={item.id} // In a real app, you'd have the slug
              addedPrice={item.price * 0.9} // Mock price change for demonstration
              inStock={true} // Mock in stock status
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <WishlistConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleClearWishlist}
        title="Clear Wishlist"
        description="Are you sure you want to remove all items from your wishlist? This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
      />
    </div>
  );
}
