import React, { useState } from "react";
import usedeleteExpense from "../../hooks/usedeleteExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updatexpense from "./Updatexpense";
import styles from "./ExpensesItem.module.css";

const ExpensesItem = ({ obj }) => {
  const [loading, deletethexpenses] = usedeleteExpense();
  const [updateshow, setUpdateshow] = useState(false);

  const onClickDelete = (id) => {
    let result = deletethexpenses(id);

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
    <>
      <div className={styles.expensesitem}>
        <div>
          <h3>Expenses Name: {obj.ExpensesName}</h3>
          <p>Description: {obj.description}</p>
          <p>Category: {obj.Category}</p>
          <button onClick={() => onClickDelete(obj.id)}>
            {loading ? "Loading" : "Delete"}
          </button>
          <button onClick={onToggle}>Update</button>
        </div>
        {updateshow && <Updatexpense obj={obj} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default ExpensesItem;
