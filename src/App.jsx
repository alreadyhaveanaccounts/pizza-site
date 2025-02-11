import { Header } from "./components/Header";
import { Routes, Route } from "react-router";

import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { createContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, test } from "./redux/slices/counterSlice";

//1.Создаём контекст
export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button aria-label="Decrement value" onClick={() => dispatch(test())}>
        555
      </button>
      {/* 2.Оборачиваем компоненты в контекст, передаём value - данные которые надо отслеживать */}
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider> */}
    </div>
  );
}

export default App;
