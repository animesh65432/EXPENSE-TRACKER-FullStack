import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ExpensesItem from "./ExpensesItem";
import useGetExpense from "../../hooks/useGetExpense";

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
        setTotalPages(1); // Ensuring at least 1 page
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
    return <div className="text-center">No expenses have been added</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {expenses.map((obj) => (
        <div key={obj._id}>
          <ExpensesItem obj={obj} />
        </div>
      ))}
      <div className="flex justify-center space-x-2 mt-4">
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
