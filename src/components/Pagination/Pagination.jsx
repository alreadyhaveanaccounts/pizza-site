import React from "react";
import ReactPaginate from "react-paginate";
import cls from "./Pagination.module.scss";

export default function Pagination({ changeCurrentPage }) {
  return (
    <>
      <ReactPaginate
        className={cls.main}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
          console.log(e);
          changeCurrentPage(e.selected + 1);
        }}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
