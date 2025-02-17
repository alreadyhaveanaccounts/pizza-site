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
  },
});

export const { setCategoryId, setSortId, setSortDirection, setPageCurrent } =
  filterSlice.actions;
export default filterSlice.reducer;
