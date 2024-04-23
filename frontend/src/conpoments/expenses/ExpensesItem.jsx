import React, { useState } from "react";
import usedeleteExpense from "../../hooks/usedeleteExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updatexpense from "./Updatexpense";

const ExpensesItem = ({ obj }) => {
  const [loading, deletethexpenses] = usedeleteExpense();
  const [updateshow, setupdateshow] = useState(false);

  const Onclickdelete = (id) => {
    let result = deletethexpenses(id);

    if (result) {
      toast.success("Sucessfully delete it");
    } else {
      toast.error("Please try again");
    }
  };

  const Ontoogle = () => {
    setupdateshow((prev) => !prev);
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
          <button onClick={Ontoogle}>update</button>
        </div>
        {updateshow && <Updatexpense obj={obj} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default ExpensesItem;
