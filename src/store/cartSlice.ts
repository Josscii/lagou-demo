import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../api/product";

export interface CartItem {
  id: string;
  count: number;
  product: Product;
  selected: boolean;
}

export interface CartState {
  count: number;
  items: { [id: string]: CartItem };
  ids: string[];
}

const initialState: CartState = {
  count: 0,
  items: {},
  ids: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      if (state.items[action.payload._id]) {
        state.items[action.payload._id].count++;
      } else {
        state.items[action.payload._id] = {
          id: action.payload._id,
          count: 1,
          product: action.payload,
          selected: true,
        };
        state.ids.push(action.payload._id);
      }
      state.count++;
    },
    changeCartItemCount: (
      state,
      action: PayloadAction<{ id: string; count: number }>
    ) => {
      state.items[action.payload.id].count = action.payload.count;
      state.count = Object.values(state.items).reduce(
        (count, item) => count + item.count,
        0
      );
    },
    deleteCartItem: (state, action: PayloadAction<string>) => {
      delete state.items[action.payload];
      state.ids = state.ids.filter((id) => id !== action.payload);
      state.count = Object.values(state.items).reduce(
        (count, item) => count + item.count,
        0
      );
    },
    selectCartItems: (state, action: PayloadAction<string[]>) => {
      state.ids.forEach((id) => {
        if (action.payload.includes(id)) {
          state.items[id].selected = true;
        } else {
          state.items[id].selected = false;
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  changeCartItemCount,
  deleteCartItem,
  selectCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
