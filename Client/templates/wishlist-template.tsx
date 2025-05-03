import { Header } from "@/organisms/header";
import { Footer } from "@/organisms/footer";
import { WishlistList } from "@/organisms/wishlist-list";

export function WishlistTemplate() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-8 pt-24 ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-1">
            Save items you love and come back to them later.
          </p>
        </div>
        <WishlistList />
      </main>
      <Footer />
    </div>
  );
}
