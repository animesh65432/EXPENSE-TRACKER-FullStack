import React, { useState } from "react";
import { useCreateExpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import StripePay from "../payment/StripePay";

const ExpensesFrom = () => {
  const [userInput, setUserInput] = useState({
    ExpensesName: "",
    description: "",
    Category: "",
    Expenseamount: "",
  });

  const { createexpenses, loading, error } = useCreateExpense();
  const isPremiumUser = useSelector((state) => state.user.ispremuinm);

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

      if (!ConvertExpenseamount) {
        toast.error("Please enter a valid amount");
        return;
      }
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
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="expensename">Expenses Name:</label>
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
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
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
              />
            </div>
            <div>
              <label htmlFor="money">Expense Amount:</label>
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
              />
            </div>
            <div>
              <label htmlFor="category">Category:</label>
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
              />
            </div>
            <button type="submit">
              {loading ? "Loading..." : "Create Expense"}
            </button>
          </form>
        </div>

        <div>
          {!isPremiumUser && <StripePay />}
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />


    </div>
  );
};

export default ExpensesFrom;
