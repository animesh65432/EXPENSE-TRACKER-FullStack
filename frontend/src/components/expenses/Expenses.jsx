import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpensesItem from "./ExpensesItem";
import useGetExpense from "../../hooks/useGetExpense";
import ExpensesFrom from "./ExpensesFrom";
import { Button } from "@material-tailwind/react"

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
  const [loading, getTheAllExpenses] = useGetExpense();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 2;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { totalItems } = await getTheAllExpenses({ currentPage, limit });
        setTotalItems(totalItems);
        setTotalPages(Math.ceil(totalItems / limit));
      } catch {
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    fetchExpenses();
  }, [currentPage]);

  const PrevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const NextPageHandler = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (expenses.length === 0) {
    return <div className="text-center">
      <ExpensesFrom />

    </div>;
  }

  return (
    <div >
      {expenses.map((obj) => (
        <div key={obj._id}>
          <ExpensesItem obj={obj} />
        </div>
      ))}
      <div >
        <button onClick={PrevPageHandler} disabled={currentPage === 1}>
          ⬅️
        </button>
        <button onClick={NextPageHandler} disabled={currentPage === totalPages}>
          ➡️
        </button>
      </div>

    </div>
  );
};

export default Expenses;
