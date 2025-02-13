import { Header } from "./components/Header";
import { Routes, Route } from "react-router";

import "./scss/app.scss";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { createContext, useState } from "react";

//1.Создаём контекст
export const SearchContext = createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="wrapper">
      {/* 2.Оборачиваем компоненты в контекст, передаём value - данные которые надо отслеживать */}
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
