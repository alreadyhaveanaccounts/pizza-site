import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortId: 0,
  sortDirection: "desc",
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortId(state, action) {
      state.sortId = action.payload;
    },
    setSortDirection(state) {
      state.sortDirection = state.sortDirection === "desc" ? "asc" : "desc";
    },
  },
});

export const { setCategoryId, setSortId, setSortDirection } =
  filterSlice.actions;
export default filterSlice.reducer;
