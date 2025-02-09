import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetExpense from "../../hooks/useGetExpense";
import { ExpenseSerchandCreate } from "../expenses";
import { Rootstate } from "@/stroe"
import { Icons } from "@/Icon"
import { ExpenseDataTable } from "./ExpensDataTable"
import { ExpensesColumn } from "./ExpenseColumn"
import ExpenseChart from "./ExpenseChart";
import { groupTheExpense } from "@/utils"

const Expenses: React.FC = () => {
  const expenses = useSelector((state: Rootstate) => state.expenses.values) || [];
  const [loading, getTheAllExpenses] = useGetExpense();
  const Group_Expense = groupTheExpense(expenses)


  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        await getTheAllExpenses();
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return <div className="flex h-[80vh] justify-center items-center">
      <Icons.spinner className="mr-2 h-[20vh] w-[20vw] animate-spin" />
    </div>
  }

  return (
    <div className="bg-white h-[78vh]">
      <div className="flex lg:flex-col">
        <div className="lg:w-[70vw] w-full">
          <ExpenseSerchandCreate />
        </div>
      </div>
      <div className="md:grid grid-cols-12  lg:gap-2 gap-0 ">
        <div className="lg:col-span-9 md:col-span-7 grid-cols-12 ">
          <ExpenseDataTable data={expenses} columns={ExpensesColumn} />
        </div>
        <div className=" lg:col-span-3 md:col-span-5 col-span-12">
          <ExpenseChart Group_Expense={Group_Expense} />
        </div>
      </div>
    </div>
  );
};

export default Expenses;
