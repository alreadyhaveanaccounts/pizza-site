import React from "react";
import cls from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
  return (
    <div className={cls.main}>
      <h1>Ничего не найдено</h1>
      <p className={cls.description}>
        К сожалению в нашем интернет-магазине отсутствует данная страница
      </p>
    </div>
  );
}
