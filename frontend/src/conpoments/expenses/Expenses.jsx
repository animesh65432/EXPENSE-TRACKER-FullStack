import React, { useState } from "react";
import useGetExpense from "../../hooks/useGetExpense";
import ExpensesItem from "./ExpensesItem";
import { useSelector } from "react-redux";
import styles from "./expense.module.css";

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
  const [page, setPage] = useState(0);
  const [loading] = useGetExpense();

  if (loading) {
    return (
      <div className={styles.loadingmessage}>
        <p>Loading...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className={styles.noexpensesmessage}>
        <p>No expenses have been added</p>
      </div>
    );
  }

  const totalPages = Math.ceil(expenses.length);

  const selectPageHandler = (selectPage) => {
    if (selectPage >= 0 && selectPage < totalPages) {
      setPage(selectPage);
    }
  };

  return (
    <div className={styles.expensescontainer}>
      {expenses.slice(page, page + 1).map((obj) => (
        <div className={styles.expensesitem} key={obj.id}>
          <ExpensesItem obj={obj} />
        </div>
      ))}

      <div className={styles.pagination}>
        <span onClick={() => selectPageHandler(page - 1)}>⬅️</span>
        {[...Array(totalPages)].map((_, index) => (
          <div key={index}>
            <span onClick={() => selectPageHandler(index)}>{index + 1}</span>
          </div>
        ))}
        <span onClick={() => selectPageHandler(page + 1)}>➡️</span>
      </div>
    </div>
  );
};

export default Expenses;
