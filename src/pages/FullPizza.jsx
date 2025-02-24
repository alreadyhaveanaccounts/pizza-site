import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function FullPizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(
          `https://67a201eb409de5ed5253ea27.mockapi.io/items/` + id
        );
        setPizza(data);
      } catch (error) {
        alert("Error");
        navigate("/");
      }
    };

    fetchPizza();
  }, []);

  if (!pizza) {
    return <p>Идёт загрузка</p>;
  }
  return (
    <div className="container">
      <h1>{pizza.title}</h1>
      <img
        style={{ height: "300px", width: "300px" }}
        src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
      />
      <p>{pizza.price}</p>
    </div>
  );
}
