import React, { useState } from "react";
import { useSelector } from "react-redux";
import ExpensesItem from "./ExpensesItem";
import { useGetExpense } from "../../hooks";

const Expenses = () => {
  const expenses = useSelector((state) => state.expenses.values) || [];
  const [page, setPage] = useState(0);
  const [loading] = useGetExpense();

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (expenses.length === 0) {
    return <div className="text-center">No expenses have been added</div>;
  }

  const totalPages = Math.ceil(expenses.length / 10);

  const selectPageHandler = (selectPage) => {
    if (selectPage >= 0 && selectPage < totalPages) {
      setPage(selectPage);
    }
  };

  return (
    <>
      <div>
        <div className="container mx-auto px-4">
          {expenses.slice(page * 10, page * 10 + 10).map((obj) => (
            <div key={obj.id}>
              <ExpensesItem obj={obj} />
            </div>
          ))}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              onClick={() => selectPageHandler(page - 1)}
              disabled={page === 0}
            >
              ⬅️
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => selectPageHandler(index)}
                className={`px-3 py-1 border rounded ${
                  index === page
                    ? "bg-primary text-white"
                    : "bg-white text-primary"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => selectPageHandler(page + 1)}
              disabled={page === totalPages - 1}
            >
              ➡️
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;
