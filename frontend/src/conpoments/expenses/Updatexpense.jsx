import React, { useState } from "react";
import useupdateexpense from "../../hooks/useupdateexpense";
import styles from "./Updatexpense.module.css";

const Updatexpense = ({ obj }) => {
  const [userInput, setUserInput] = useState({
    ExpensesName: obj.ExpensesName,
    description: obj.description,
    Category: obj.Category,
    Expenseamount: obj.Expenseamount,
  });

  const [loading, updateTheExpensefun] = useupdateexpense();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await updateTheExpensefun({
        ...userInput,
        id: obj.id,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.updateform}>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">{loading ? "Loading" : "Update"}</button>
      </form>
    </div>
  );
};

export default Updatexpense;
