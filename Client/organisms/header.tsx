"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Menu, X, User, LogInIcon } from "lucide-react";
import { ThemeToggle } from "@/molecules/theme-toggle";
import { SearchBar } from "@/molecules/search-bar";
import { IconButton } from "@/atoms/icon-button";
import { useAppSelector, useAppDispatch } from "@/lib/hooks/use-redux";
import { toggleCart } from "@/lib/store/slices/cartSlice";
import { cn } from "@/lib/utils/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Home",
    slug: "/",
  },
  {
    name: "Products",
    slug: "products",
  },
  {
    name: "Categories",
    slug: "categories",
  },
  {
    name: "Brands",
    slug: "brands",
  },
  {
    name: "Contact",
    slug: "contact",
  },
];

export function Header() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const router = useRouter();

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const token = Cookies.get("auth_token");
  //   console.log("token", token);
  //   setIsLoggedIn(!!token);
  // }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-highlight dark:from-primary dark:to-highlight cursor-pointer"
          >
            DealDash
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.slug}
                className="relative group"
                onMouseEnter={() => setActiveCategory(category.slug)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link
                  href={`${category.slug}`}
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <SearchBar />

            <Link href="/wishlist" className="relative">
              <IconButton variant="ghost" aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </IconButton>
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <div className="relative">
              <IconButton
                variant="ghost"
                onClick={() => dispatch(toggleCart())}
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
              </IconButton>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-highlight text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </div>

            {isLoggedIn ? (
              <Link href="/account">
                <IconButton variant="ghost" aria-label="Account">
                  <User className="h-5 w-5" />
                </IconButton>
              </Link>
            ) : (
              <Link href="/login">
                <IconButton variant="ghost" aria-label="Account">
                  <LogInIcon className="h-5 w-5" />
                </IconButton>
              </Link>
            )}

            <ThemeToggle />

            {/* Mobile menu button */}
            <IconButton
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </IconButton>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <div key={category.slug} className="space-y-2">
                  <Link
                    href={`/category/${category.slug}`}
                    className="text-sm font-medium block"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-2 border-l-2 border-primary/20">
                    {category.subCategories.map((subCategory) => (
                      <Link
                        key={subCategory}
                        href={`/category/${category.slug}/${subCategory
                          .toLowerCase()
                          .replace(" ", "-")}`}
                        className="text-xs block text-muted-foreground"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subCategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
