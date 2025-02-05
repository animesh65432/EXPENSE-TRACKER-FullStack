import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useGetExpense from "../../hooks/useGetExpense";
import { Spinner } from "@material-tailwind/react";
import { ExpenseTable, EmptyExpense, ExpenseSerchandCreate } from "../expenses";

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
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
              <Spinner />
            </div>
          )}

          {!loading && expenses.length === 0 ? (
            <div className="flex justify-center items-center bg-white mt-[150px]">
              <EmptyExpense />
            </div>
          ) : (
            <>
              <div className="lg:mt-[80px] mt-[40px] lg:p-0 p-2">
                <ExpenseTable expenses={expenses} />
                <div className="flex justify-center items-center gap-4 mt-4">
                  <button
                    onClick={() => setcurrentpage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 bg-gray-300 text-black rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Previous
                  </button>
                  <span className="text-lg font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setcurrentpage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 bg-gray-300 text-black rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Expenses;
