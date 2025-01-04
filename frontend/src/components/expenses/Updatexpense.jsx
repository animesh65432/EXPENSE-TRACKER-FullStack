import React, { useState } from "react";
import { useupdateexpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";

const Updatexpense = ({ expense }) => {
  const [userInput, setUserInput] = useState({
    ExpensesName: expense.ExpensesName,
    description: expense.description,
    Category: expense.Category,
    Expenseamount: expense.Expenseamount,
  });

  const [loading, updateTheExpensefun] = useupdateexpense();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInput.ExpensesName === "" ||
      userInput.description === "" ||
      userInput.Category === "" ||
      userInput.Expenseamount === ""
    ) {
      toast.error("Please fill each and every field");
      return;
    } else {
      try {
        await updateTheExpensefun({
          ...userInput,
          _id: expense._id,
        });
        toast.success("Successfully updated");
      } catch (error) {
        console.error(error);
        toast.error("Please try again");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="expensename">Expense Name:</label>
          <input
            type="text"
            id="expensename"
            value={userInput.ExpensesName}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                ExpensesName: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={userInput.description}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={userInput.Category}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                Category: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={userInput.Expenseamount}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                Expenseamount: e.target.value,
              }))
            }
          />
        </div>
        <button type="submit">{loading ? "Loading..." : "Update"}</button>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Updatexpense;
