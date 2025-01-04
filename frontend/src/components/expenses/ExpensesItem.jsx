import React, { useState } from "react";
import { usedeleteExpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import Updatexpense from "./Updatexpense";

const ExpensesItem = ({ obj }) => {
  const [loading, deletethexpenses] = usedeleteExpense();
  const [updateshow, setUpdateshow] = useState(false);
  const { ExpensesName, description, Category, Expenseamount, _id } = obj;

  const onClickDelete = async (id) => {
    console.log(id);
    let result = await deletethexpenses(id);
    if (result) {
      toast.success("Successfully deleted");
    } else {
      toast.error("Please try again");
    }
  };

  const onToggle = () => {
    setUpdateshow((prev) => !prev);
  };

  return (
    <div>
      <h3>Expenses Name: {ExpensesName}</h3>
      <p>Description: {description}</p>
      <p>Category: {Category}</p>
      <p>Expense Amount: {Expenseamount}</p>
      <div>
        <button onClick={() => onClickDelete(_id)}>
          Delete
        </button>
        <button onClick={onToggle}>
          {updateshow ? "Hide Update" : "Show Update"}
        </button>
      </div>
      {updateshow && <Updatexpense expense={obj} />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ExpensesItem;
