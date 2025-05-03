import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./slices/cartSlice"
import wishlistReducer from "./slices/wishlistSlice"
import themeReducer from "./slices/themeSlice"
import filterReducer from "./slices/filterSlice"
import notificationsReducer from "./slices/notificationsSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    theme: themeReducer,
    filter: filterReducer,
    notifications: notificationsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
