import { useState } from "react";
import "./ExpenseFrom.css";
import useCreateExpense from "../hooks/useCreateExpense";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Expenses from "./Expenses";
import RazorpayPayment from "./RazorPay";
import { useSelector, useStore } from "react-redux";
import Button from "./Button";

const ExpensesFrom = () => {
  const [userinput, setuserinput] = useState({
    ExpensesName: "",
    description: "",
    Category: "",
    Expenseamount: 0,
  });
  const { createexpenses, loading, error } = useCreateExpense();
  const ispremuinuser = useSelector((state) => state.user.ispremuinm);
  console.log(ispremuinuser);

  const handlesumbithandler = (e) => {
    e.preventDefault();
    if (
      userinput.ExpensesName == "" ||
      userinput.description == "" ||
      userinput.Category == "" ||
      !userinput.Expenseamount
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
    <div>
      {ispremuinuser && (
        <div className="premium-user">You Are Premiun-User</div>
      )}
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
          <label htmlFor="money">ExpensePrice:</label>
          <input
            type="number"
            id="money"
            onChange={(e) => {
              setuserinput((prev) => {
                return { ...prev, Expenseamount: e.target.value };
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
      <Button />
    </div>
  );
};

export default ExpensesFrom;
