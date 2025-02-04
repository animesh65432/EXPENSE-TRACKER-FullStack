import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetExpense from "../../hooks/useGetExpense";
import { Spinner } from "@material-tailwind/react"
import { ExpenseTable, EmptyExpense, ExpenseSerchandCreate } from "../expenses"


const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
  const [loading, getTheAllExpenses] = useGetExpense();

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const reponse = await getTheAllExpenses({ currentPage, limit });
        console.log(reponse)
      } catch (error) {
        console.log(error)
      }
    };

    fetchExpenses();
  }, []);


  if (loading) {
    return <div className="flex justify-center items-center min-h-dvh bg-white">
      <Spinner />
    </div>
  }

  return (
    <div className="bg-white h-[78vh]" >
      <div className="flex lg:flex-col">
        <div className="lg:w-[70vw] w-full">
          <ExpenseSerchandCreate />

          {expenses.length === 0 ?
            <div className=" flex justify-center items-center  bg-white mt-[150px]">
              <EmptyExpense />
            </div> :
            <>
              <div className=" lg:mt-[80px] mt-[40px] lg:p-0 p-2 ">
                <div >
                  <ExpenseTable expenses={expenses} />
                </div>
                <div>

                </div>
              </div>
            </>
          }
        </div>
        <div></div>
      </div>

    </div>
  );
};

export default Expenses;
