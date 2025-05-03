import { Header } from "@/organisms/header";
import { Footer } from "@/organisms/footer";
import { CartList } from "@/organisms/cart-list";

export function CartTemplate() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-8 pt-24">
        <CartList />
      </main>
      <Footer />
    </div>
  );
}
