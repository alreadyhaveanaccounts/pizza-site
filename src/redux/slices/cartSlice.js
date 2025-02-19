import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    setTotalPrice(state, action) {
      state.totalPrice = state.totalPrice + action.payload;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    deletePizza(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    plusPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      }
    },
    minusPizza(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const {
  setItems,
  setTotalPrice,
  clearItems,
  plusPizza,
  minusPizza,
  deletePizza,
} = cartSlice.actions;
export default cartSlice.reducer;
