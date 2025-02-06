import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetExpense from "../../hooks/useGetExpense";
import { ExpenseSerchandCreate } from "../expenses";
import { Rootstate } from "@/stroe"
import { Icons } from "@/Icon"

const Expenses: React.FC = () => {
  const expenses = useSelector((state: Rootstate) => state.expenses.values) || [];
  const [loading, getTheAllExpenses] = useGetExpense();
  const [currentPage, setcurrentpage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const { totalPages } = await getTheAllExpenses({ currentPage });
        setTotalPages(totalPages);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExpenses();
  }, [currentPage]);

  console.log(expenses)

  return (
    <div className="bg-white h-[78vh]">
      <div className="flex lg:flex-col">
        <div className="lg:w-[70vw] w-full">
          <ExpenseSerchandCreate />

          {loading && (
            <div className="flex justify-center items-center min-h-dvh bg-white">
              <Icons.spinner className="mr-2 h-[20vh] w-[20vw] animate-spin" />
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default Expenses;
