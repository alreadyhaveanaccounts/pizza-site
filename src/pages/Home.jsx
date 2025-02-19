import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
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
  setPageCurrent,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import qs from "qs";
import { useNavigate } from "react-router";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  //useSelector - это слушатель состояния, он следит за ним и перерисовывает компонент когда состояние изменяется
  const { categoryId, sortId, sortDirection, pageCurrent } = useSelector(
    (state) => state.filter
  );
  const { pizzas, status } = useSelector((state) => state.pizza);
  const { searchValue } = useContext(SearchContext);
  // const [pizzas, setPizzas] = useState([]);
  const search = searchValue ? searchValue : "";

  //этим хуком получаем данные из юрл и диспатчим в редакс, который меняет состояние через экшн setFilters, и при обновлении страницы у нас загружаются старые параметры сортировки/фильтрации и тд. При загрузке страницы Redux берет данные из URL (useEffect с qs.parse).При изменении фильтров Redux обновляет URL (useEffect с navigate).Таким образом, при обновлении страницы фильтры загружаются из URL, а после изменений записываются обратно.

  // Весь процесс работает так:
  // Пользователь заходит на страницу первый раз - первый хук проверяет URL и, если находит параметры, устанавливает их в Redux
  // Когда пользователь меняет фильтры (например, выбирает категорию):
  // Действие отправляется в Redux для обновления состояния
  // Второй хук замечает изменение параметров
  // Формируется новая строка URL с обновленными параметрами
  // URL обновляется, но страница не перезагружается
  // Если пользователь обновляет страницу, процесс начинается заново с шага 1
  // A: если был первый рендер - то проверяем юрл параметры и сохраняем в редаксе
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        })
      );
      isSearch.current = true;
    }
  }, []);

  //этим хуком приводим к строке и вставляем в юрл наш запрос на бек, и чтобы юрл рендерился при изменении параметров в скобках
  //A: если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortId,
        categoryId,
        pageCurrent,
        sortDirection,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortId, pageCurrent, sortDirection]);

  const fetchPizza = async () => {
    // Вариант для поиска пицц через Бек. Сразу в запрос на бек вставляем search который берем из управляемого инпута
    dispatch(
      fetchPizzas({
        pageCurrent,
        categoryId,
        sortId,
        sortedTypes,
        sortDirection,
        search,
      })
    ).unwrap();
  };
  // Если был первый рендер - то запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [categoryId, sortId, sortDirection, searchValue, pageCurrent]);

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
        <Categories
          categoryId={categoryId}
          onClickChangeCategory={(state) => dispatch(setCategoryId(state))}
        />
        <Sort
          sortId={sortId}
          sortDirection={sortDirection}
          onClickChangeSort={(state) => dispatch(setSortId(state))}
          onClickChangeSortDirection={(state) =>
            dispatch(setSortDirection(state))
          }
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div>
        {status === "rejected" ? (
          <div className="content__error">
            <h1>Извините, у нас произошла ошибка</h1>
            <p>Повторите попытку позже</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "pending" ? skeletons : pizzaList}
          </div>
        )}
      </div>
      <Pagination
        onClickChangePagination={(state) => dispatch(setPageCurrent(state))}
      />
    </div>
  );
}
