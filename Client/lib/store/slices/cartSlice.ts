import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Load initial state from localStorage if available
const getInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }
  }
  return { items: [], isOpen: false };
};

const initialState: CartState = getInitialState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    clearCart: (state) => {
      state.items = [];
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
