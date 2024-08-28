import React, { useState } from "react";
import { useCreateExpense } from "../../hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import PremiunBottom from "../premiunFeatures/PremuinBottom";
import RazorPay from "../payment/RazorPay";
import { useGetthefile } from "../../hooks";
import Expenses from "./Expenses";

const ExpensesFrom = () => {
  const [userInput, setUserInput] = useState({
    ExpensesName: "",
    description: "",
    Category: "",
    Expenseamount: "",
  });
  const { createexpenses, loading, error } = useCreateExpense();
  const isPremiumUser = useSelector((state) => state.user.ispremuinm);

  const [fetchData] = useGetthefile();

  console.log(isPremiumUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { ExpensesName, description, Category, Expenseamount } = userInput;

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      toast.error("Please fill out all fields");
      setUserInput({
        ExpensesName: "",
        description: "",
        Category: "",
        Expenseamount: "",
      });
    } else {
      let ConvertExpenseamount = Number(userInput.Expenseamount);

      let data = { ...userInput, Expenseamount: ConvertExpenseamount };
      console.log(data);
      const success = createexpenses(data);
      if (success) {
        toast.success("Successfully created expenses");
      } else {
        toast.error(error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex-1">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="expensename"
                className="block text-gray-700 font-medium mb-1"
              >
                Expenses Name:
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
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-1"
              >
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
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="money"
                className="block text-gray-700 font-medium mb-1"
              >
                Expense Amount:
              </label>
              <input
                type="text"
                id="money"
                value={userInput.Expenseamount}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Expenseamount: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-gray-700 font-medium mb-1"
              >
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
                className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
            >
              {loading ? "Loading..." : "Create Expense"}
            </button>
          </form>
        </div>

        <div className="flex-none space-y-4">
          {isPremiumUser && <PremiunBottom />}
          {!isPremiumUser && <RazorPay />}

          {isPremiumUser && (
            <button
              onClick={fetchData}
              className="bg-white text-indigo-800 px-4 py-2 rounded-md hover:bg-indigo-100 transition duration-300"
            >
              Upload Expense File
            </button>
          )}
        </div>
      </div>
      <Expenses />
      <ToastContainer />
    </div>
  );
};

export default ExpensesFrom;
