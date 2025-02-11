import React, { useContext } from "react";
import cls from "./Search.module.scss";
import { SearchContext } from "../../App";

export default function Search() {
  //3.Используем контекст и деструктурируем "пропсы". Аргументом передаём созданный и импортированный контекст
  const { searchValue, setSearchValue } = useContext(SearchContext);
  return (
    <div className={cls.container}>
      <img
        className={cls.SearchIcon}
        src="/search-icon.svg"
        alt="Search icon"
      />
      <input
        value={searchValue}
        className={cls.input}
        placeholder="Начните вводить..."
        onChange={(e) => setSearchValue(e.target.value)}
      ></input>
      <img
        onMouseDown={() => {
          setSearchValue("");
        }}
        className={searchValue ? cls.CloseIcon : cls.CloseIconZero}
        src="/close-icon.svg"
        alt="Close icon"
      />
    </div>
  );
}
