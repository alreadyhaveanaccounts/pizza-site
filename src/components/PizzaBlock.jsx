import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setItems, setTotalPrice } from "../redux/slices/cartSlice";
import { Link } from "react-router";
import { useEffect } from "react";

export const PizzaBlock = ({ title, price, sizes, types, id }) => {
  const [counter, setCounter] = useState(0);
  const [activeSize, setActiveSize] = useState(sizes[0]);
  const [activeType, setActiveType] = useState(types[0]);
  const pizzaTypes = ["обычное", "традиционное"];
  const dispatch = useDispatch();
  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        {" "}
        <img
          className="pizza-block__image"
          src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
          alt="Pizza"
        />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveType(type)}
              className={type === activeType ? "active" : ""}
            >
              {pizzaTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveSize(size)}
              className={size === activeSize ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={() => {
            setCounter(counter + 1);
            dispatch(setItems({ title, price, activeSize, activeType, id }));
            dispatch(setTotalPrice(price));
          }}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{counter}</i>
        </button>
      </div>
    </div>
  );
};
