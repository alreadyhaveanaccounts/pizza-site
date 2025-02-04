import { useEffect, useState } from "react";
import { Categories } from "./components/Categories";
import { Header } from "./components/Header";
import { PizzaBlock } from "./components/PizzaBlock";
import { Sort } from "./components/Sort";
import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = useState([]);
  useEffect(() => {
    fetch("https://67a201eb409de5ed5253ea27.mockapi.io/items")
      .then((res) => res.json())
      .then((pizzaArr) => setPizzas(pizzaArr));
  }, []);

  console.log(pizzas);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
