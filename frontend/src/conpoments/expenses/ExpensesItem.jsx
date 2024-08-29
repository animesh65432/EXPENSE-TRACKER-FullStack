import React, { useState } from "react";
import { usedeleteExpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import Updatexpense from "./Updatexpense";

const ExpensesItem = ({ obj }) => {
  const [loading, deletethexpenses] = usedeleteExpense();
  const [updateshow, setUpdateshow] = useState(false);

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
    <div className="bg-white p-4 mb-4 rounded shadow-md">
      <h3 className="text-xl font-semibold text-primary">
        Expenses Name: {obj.ExpensesName}
      </h3>
      <p className="text-secondary">Description: {obj.description}</p>
      <p className="text-secondary">Category: {obj.Category}</p>
      <p className="text-secondary">Expense Amount: {obj.Expenseamount}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onClickDelete(obj._id)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Delete
        </button>
        <button
          onClick={onToggle}
          className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700"
        >
          {updateshow ? "Hide Update" : "Show Update"}
        </button>
      </div>
      {updateshow && <Updatexpense expense={obj} />}
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default ExpensesItem;
