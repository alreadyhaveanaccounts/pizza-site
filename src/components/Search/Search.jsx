import React, { useCallback, useContext, useRef } from "react";
import cls from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

export default function Search() {
  //3.Используем контекст и деструктурируем "пропсы". Аргументом передаём созданный и импортированный контекст
  const { searchValue, setSearchValue } = useContext(SearchContext);

  const onClickClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  const inputRef = useRef();

  const debounsedSearch = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 350),
    [setSearchValue]
  );

  return (
    <div className={cls.container}>
      <img
        className={cls.SearchIcon}
        src="/search-icon.svg"
        alt="Search icon"
      />
      <input
        className={cls.input}
        placeholder="Начните вводить..."
        onChange={(e) => debounsedSearch(e.target.value)}
        ref={inputRef}
      ></input>

      <img
        onClick={() => {
          onClickClear();
        }}
        className={searchValue ? cls.CloseIcon : cls.CloseIconZero}
        src="/close-icon.svg"
        alt="Close icon"
      />
    </div>
  );
}
