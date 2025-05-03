import { ShoppingBag } from "lucide-react";
import { Button } from "@/atoms/button";
import Link from "next/link";

export function WishlistEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <Heart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Your wishlist is empty</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Items added to your wishlist will appear here. Start exploring and save
        items you love for later!
      </p>
      <Button>
        <Link href="/products" className="flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Continue Shopping
        </Link>
      </Button>
    </div>
  );
}

import { Heart } from "lucide-react";
