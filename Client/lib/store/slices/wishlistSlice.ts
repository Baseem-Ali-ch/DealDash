import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  addedAt?: string;
  addedPrice?: number;
}

interface WishlistState {
  items: WishlistItem[];
}

// Load initial state from localStorage if available
const getInitialState = (): WishlistState => {
  if (typeof window !== "undefined") {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        return JSON.parse(savedWishlist);
      } catch (e) {
        console.error("Failed to parse wishlist from localStorage", e);
      }
    }
  }
  return { items: [] };
};

const initialState: WishlistState = getInitialState();

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      if (!state.items.some((item) => item.id === action.payload.id)) {
        const newItem = {
          ...action.payload,
          addedAt: new Date().toISOString(),
          addedPrice: action.payload.price,
        };
        state.items.push(newItem);
        // Save to localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("wishlist", JSON.stringify(state));
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    clearWishlist: (state) => {
      state.items = [];
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        const newItem = {
          ...action.payload,
          addedAt: new Date().toISOString(),
          addedPrice: action.payload.price,
        };
        state.items.push(newItem);
      }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("wishlist", JSON.stringify(state));
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
