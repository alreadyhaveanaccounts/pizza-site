import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//асинхр функция в редаксе
const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasList",
  async (
    { pageCurrent, categoryId, sortId, sortedTypes, sortDirection, search },
    thunkAPI
  ) => {
    const { data } = await axios.get(
      `https://67a201eb409de5ed5253ea27.mockapi.io/items?page=${pageCurrent}&limit=4&${
        categoryId ? `category=${categoryId}` : ``
      }&sortBy=${
        sortedTypes[sortId].sortBy
      }&order=${sortDirection}&search=${search}`
    );
    return data;
  }
);

const initialState = {
  pizzas: [],
  status: "loading",
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzas(state, action) {
      state.pizzas = action.payload;
    },
  },
  //наша асинхр ф fetchPizzas возвращает три статуса: фулфил,пендинг,режектед и выполняется код в зависимости от исхода функции. таким образом с помощью одной функции можем сделать три разных действия а не прописывать каждый раз новый редюсер. В этом плюс AsyncThunk. Экстраредюсер это замена try/catch в редаксе. Когда использовать thunk - когда хочешь сделать запрос на бекенд и еще что-то поменять в редаксе.
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.pizzas = action.payload;
        state.status = "ready";
      })
      .addCase(fetchPizzas.pending, (state) => {
        state.pizzas = [];
        state.status = "pending";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.pizzas = [];
        state.status = "rejected";
      });
  },
});

export const selectCart = (state) => state.cart;
export const selectCartPrice = (state) => state.cart.items;
export const { setPizzas } = pizzaSlice.actions;
export { fetchPizzas };
export default pizzaSlice.reducer;
