import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types/Types';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

// cartSlice.ts

function loadCartFromSession(): CartItem[] {
    const data = sessionStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  
  const initialState: CartState = {
    items: loadCartFromSession(),
  };


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    clearCart(state) {
      state.items = [];
    },
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;

// Save cart to sessionStorage whenever the state changes
export const persistCartMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = storeAPI.getState();
  sessionStorage.setItem("cart", JSON.stringify(state.cart.items));
  return result;
};
