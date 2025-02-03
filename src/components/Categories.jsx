import React, { useState } from "react";
import { use } from "react";

export const Categories = () => {
  const types = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  const [active, setActive] = useState(types[0]);
  return (
    <div className="categories">
      <ul>
        {types.map((elem) => (
          <li
            key={elem}
            onClick={() => setActive(elem)}
            className={elem === active ? "active" : ""}
          >
            {elem}
          </li>
        ))}
      </ul>
    </div>
  );
};
