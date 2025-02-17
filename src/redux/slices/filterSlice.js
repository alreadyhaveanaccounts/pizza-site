import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sortId: 0,
  sortDirection: "desc",
  pageCurrent: 1,
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
    setSortDirection(state, action) {
      state.sortDirection = action.payload;
    },
    setPageCurrent(state, action) {
      state.pageCurrent = action.payload;
    },
    setFilters(state, action) {
      state.pageCurrent = Number(action.payload.pageCurrent);
      state.sortId = Number(action.payload.sortId);
      state.categoryId = Number(action.payload.categoryId);
      state.sortDirection = action.payload.sortDirection;
    },
  },
});

export const {
  setCategoryId,
  setSortId,
  setSortDirection,
  setPageCurrent,
  setFilters,
} = filterSlice.actions;
export default filterSlice.reducer;
