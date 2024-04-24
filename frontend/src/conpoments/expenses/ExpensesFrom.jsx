import React, { useState } from "react";
import useCreateExpense from "../../hooks/useCreateExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Expenses from "./Expenses";
import styles from "./expenseFrom.module.css";

const ExpensesFrom = () => {
  const [userInput, setUserInput] = useState({
    ExpensesName: "",
    description: "",
    Category: "",
    Expenseamount: 0,
  });
  const { createexpenses, loading, error } = useCreateExpense();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { ExpensesName, description, Category, Expenseamount } = userInput;

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      toast.error("Please fill out all fields");
      setUserInput({
        ExpensesName: "",
        description: "",
        Category: "",
        Expenseamount: 0,
      });
    } else {
      const success = createexpenses(userInput);
      if (success) {
        toast.success("Successfully created expenses");
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <>
      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="expensename">Expenses Name:</label>
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
          <label htmlFor="money">Expense Price:</label>
          <input
            type="number"
            id="money"
            value={userInput.Expenseamount}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                Expenseamount: e.target.value,
              }))
            }
          />
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
          <button>{loading ? "Loading" : "Create Expenses"}</button>
        </form>
      </div>
      <Expenses />
      <ToastContainer />
    </>
  );
};

export default ExpensesFrom;
