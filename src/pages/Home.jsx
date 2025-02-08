import React from "react";
import { useEffect, useState } from "react";
import { Categories } from "../components/Categories";
import { Sort } from "../components/Sort";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { sortedTypes } from "../components/Sort";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortId, setSortId] = useState(0);
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67a201eb409de5ed5253ea27.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ``
      }&sortBy=${sortedTypes[sortId].sortBy}&order=${sortDirection}`
    )
      .then((res) => res.json())
      .then((pizzaArr) => {
        setPizzas(pizzaArr);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortId, sortDirection]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort
          sortId={sortId}
          sortDirection={sortDirection}
          onClickChangeSort={(i) => setSortId(i)}
          onClickChangeSortDirection={(i) => setSortDirection(i)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}
