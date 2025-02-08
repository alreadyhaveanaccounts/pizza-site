import React, { useState } from "react";
import { use } from "react";

export const Categories = ({ categoryId, onClickChangeCategory }) => {
  const types = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {types.map((elem, i) => (
          <li
            key={elem}
            onClick={() => onClickChangeCategory(i)}
            className={categoryId === i ? "active" : ""}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};
