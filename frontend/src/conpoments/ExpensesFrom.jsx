import { useState } from "react";
import "./ExpenseFrom.css";
import useCreateExpense from "../hooks/useCreateExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Expenses from "./Expenses";
import RazorpayPayment from "./RazorPay";

const ExpensesFrom = () => {
  const [userinput, setuserinput] = useState({
    ExpensesName: "",
    description: "",
    Category: "",
  });
  const { createexpenses, loading, error } = useCreateExpense();

  const handlesumbithandler = (e) => {
    e.preventDefault();
    if (
      userinput.ExpensesName == "" ||
      userinput.description == "" ||
      userinput.Category == ""
    ) {
      toast.error("Please Fill up Each and Everything");
    } else {
      let Sucessfully = createexpenses(userinput);

      if (Sucessfully) {
        toast.success("SucessFully Created Expesnes");
      } else {
        toast.error(error);
      }
    }
  };
  return (
    <>
      <div className="form-container">
        <form onSubmit={handlesumbithandler}>
          <label htmlFor="expensename">Expenses Name :</label>
          <input
            type="text"
            id="expensename"
            onChange={(e) => {
              setuserinput((prev) => {
                return { ...prev, ExpensesName: e.target.value };
              });
            }}
          ></input>
          <label htmlFor="description">DesCription :</label>
          <input
            type="text"
            id="description"
            onChange={(e) => {
              setuserinput((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          ></input>
          <label htmlFor=" Category">Category:</label>
          <input
            type="text"
            id="Category"
            onChange={(e) => {
              setuserinput((prev) => {
                return { ...prev, Category: e.target.value };
              });
            }}
          ></input>
          <button>{loading ? "loading" : "Create Expenses"}</button>
        </form>
        <RazorpayPayment />
      </div>
      <Expenses />
      <ToastContainer />
    </>
  );
};

export default ExpensesFrom;
