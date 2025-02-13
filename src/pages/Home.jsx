import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { sortedTypes } from "../components/Sort";
import Pagination from "../components/Pagination/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryId,
  setSortId,
  setSortDirection,
} from "../redux/slices/filterSlice";

export default function Home() {
  const dispatch = useDispatch();

  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortId = useSelector((state) => state.filter.sortId);
  const sortDirection = useSelector((state) => state.filter.sortDirection);
  const { searchValue } = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const search = searchValue ? searchValue : "";
  const onClickChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };
  const onClickChangeSort = (id) => {
    dispatch(setSortId(id));
  };
  const onClickChangeSortDirection = () => {
    dispatch(setSortDirection());
  };

  useEffect(() => {
    setIsLoading(true);
    // Вариант для поиска пицц через Бек. Сразу в запрос на бек вставляем search который берем из управляемого инпута
    fetch(
      `https://67a201eb409de5ed5253ea27.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId ? `category=${categoryId}` : ``
      }&sortBy=${
        sortedTypes[sortId].sortBy
      }&order=${sortDirection}&search=${search}`
    )
      .then((res) => res.json())
      .then((pizzaArr) => {
        setPizzas(Array.isArray(pizzaArr) ? pizzaArr : []);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortId, sortDirection, searchValue, currentPage]);

  const pizzaList = pizzas
    // Вариант для поиска пицц без Бека, через js. Принимаем массив с бека, фильтруем js-ом и отрисовываем
    // .filter((obj) => {
    //   if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
    //     return true;
    //   } else return false;
    // })
    .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories onClickChangeCategory={onClickChangeCategory} />
        <Sort
          sortId={sortId}
          sortDirection={sortDirection}
          onClickChangeSort={onClickChangeSort}
          onClickChangeSortDirection={onClickChangeSortDirection}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzaList}</div>
      <Pagination changeCurrentPage={(num) => setCurrentPage(num)} />
    </div>
  );
}
