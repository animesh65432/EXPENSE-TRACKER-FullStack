import React from "react";
import "./ExpenseItem.css";
import usedeleteExpense from "../hooks/usedeleteExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExpensesItem = ({ obj }) => {
  const [loading, deletethexpenses] = usedeleteExpense();

  const Onclickdelete = (id) => {
    let result = deletethexpenses(id);

    if (result) {
      toast.success("Sucessfully delete it");
    } else {
      toast.error("Please try again");
    }
  };
  return (
    <>
      <div className="expenses-item">
        <div>
          <h3>Expenses Name: {obj.ExpensesName}</h3>
          <p>Description: {obj.description}</p>
          <p>Category: {obj.Category}</p>
          <button onClick={() => Onclickdelete(obj.id)}>
            {loading ? "laoding" : "Delete"}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ExpensesItem;
