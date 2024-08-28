import React, { useState } from "react";
import { useupdateexpense } from "../../hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Updatexpense = ({ expense }) => {
  const [userInput, setUserInput] = useState({
    ExpensesName: expense.ExpensesName,
    description: expense.description,
    Category: expense.Category,
    Expenseamount: expense.Expenseamount,
  });

  const [loading, updateTheExpensefun] = useupdateexpense();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInput.ExpensesName.length == "" ||
      userInput.description == "" ||
      userInput.Category == "" ||
      userInput.Expenseamount == ""
    ) {
      toast.error("Please Fill each and every thing");

      return;
    } else {
      try {
        let res = await updateTheExpensefun({
          ...userInput,
          _id: obj._id,
        });

        toast.success("Sucessfully update it");
      } catch (error) {
        toast.error("please try again");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        <div>
          <label htmlFor="expensename" className="block text-gray-700">
            Expense Name:
          </label>
          <input
            type="text"
            id="expensename"
            value={userInput.ExpensesName}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                ExpensesName: e.target.value,
              }))
            }
            className="border rounded w-full px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700">
            Description:
          </label>
          <input
            type="text"
            id="description"
            value={userInput.description}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="border rounded w-full px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700">
            Category:
          </label>
          <input
            type="text"
            id="category"
            value={userInput.Category}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                Category: e.target.value,
              }))
            }
            className="border rounded w-full px-3 py-2 mt-1"
          />
        </div>
        <div>
          <label htmlFor="amount" className="block text-gray-700">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            value={userInput.Expenseamount}
            onChange={(e) =>
              setUserInput((prev) => ({
                ...prev,
                Expenseamount: e.target.value,
              }))
            }
            className="border rounded w-full px-3 py-2 mt-1"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Updatexpense;
