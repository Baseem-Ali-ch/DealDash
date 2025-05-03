import { ShoppingCart, ShoppingBag } from "lucide-react";
import { Button } from "@/atoms/button";
import Link from "next/link";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <ShoppingCart className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="mb-2 text-2xl font-semibold">Your cart is empty</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Looks like you haven't added anything to your cart yet. Start shopping
        and add items you like!
      </p>
      <Button>
        <Link href="/products" className="flex items-center">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Start Shopping
        </Link>
      </Button>
    </div>
  );
}
