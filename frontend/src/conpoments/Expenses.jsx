import React from "react";
import useGetExpense from "../hooks/useGetExpense";
import ExpensesItem from "./ExpensesItem";

const Expenses = () => {
  const [expenses, loading] = useGetExpense();
  console.log(expenses);

  if (loading) {
    return (
      <div className="loading-message">
        <p>Loading...</p>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="no-expenses-message">
        <p>No expenses have been added</p>
      </div>
    );
  }

  return (
    <>
      <div className="expenses-container">
        {expenses.map((obj) => (
          <div className="expenses-item" key={obj.id}>
            <ExpensesItem obj={obj} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Expenses;
