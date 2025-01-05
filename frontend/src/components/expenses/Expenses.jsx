import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetExpense from "../../hooks/useGetExpense";
import { Spinner } from "@material-tailwind/react"
import { ExpenseTable, EmptyExpense, ExpenseSerchandCreate } from "../expenses"


const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
  const [loading, getTheAllExpenses] = useGetExpense();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { totalItems } = await getTheAllExpenses({ currentPage, limit });
        setTotalItems(totalItems);
        setTotalPages(Math.ceil(totalItems / limit));
      } catch {
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    fetchExpenses();
  }, [currentPage]);


  if (loading) {
    return <div className="flex justify-center items-center min-h-dvh bg-white">
      <Spinner />
    </div>
  }

  console.log(expenses)

  return (
    <div className="bg-white min-h-dvh " >

      <ExpenseSerchandCreate />

      {expenses.length === 0 ?
        <div className=" flex justify-center items-center  bg-white mt-[150px]">
          <EmptyExpense />
        </div> :
        <>
          <div className="grid grid-cols-12 mt-[80px] p-2 ">
            <div className="col-span-7">
              <ExpenseTable expenses={expenses} />
            </div>
            <div>

            </div>
          </div>
        </>
      }

    </div>
  );
};

export default Expenses;
