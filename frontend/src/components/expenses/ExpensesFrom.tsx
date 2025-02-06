import React, { useState } from "react";
import { useCreateExpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/Icon";



type Expenses = {
  ExpensesName: string;
  description: string;
  Category: string;
  Expenseamount: string;
};

const ExpensesForm: React.FC = () => {
  const [userInput, setUserInput] = useState<Expenses>({
    ExpensesName: "",
    description: "",
    Category: "",
    Expenseamount: "",
  });

  const { createexpenses, loading, error } = useCreateExpense();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ExpensesName, description, Category, Expenseamount } = userInput;

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      toast.error("Please fill out all fields");
      return;
    }

    let ConvertExpenseamount = Number(userInput.Expenseamount);
    if (isNaN(ConvertExpenseamount) || ConvertExpenseamount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    let data = { ...userInput, Expenseamount: ConvertExpenseamount };
    const success = await createexpenses(data);
    success ? toast.success("Successfully created expenses") : toast.error(error);
  };



  return <>
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 bg-white p-5 rounded-lg shadow-lg w-full max-w-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col">
        <label>Expense Name</label>
        <Input
          placeholder="Expense Name"
          className="border border-gray-300 focus:border-gray-900"
          onChange={(e) =>
            setUserInput((prev) => ({
              ...prev,
              ExpensesName: e.target.value,
            }))
          }
          value={userInput.ExpensesName}
        />
      </div>
      <div className="flex flex-col">
        <label>Description</label>
        <Input
          placeholder="Description"
          className="border border-gray-300 focus:border-gray-900"
          onChange={(e) =>
            setUserInput((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          value={userInput.description}
        />
      </div>
      <div className="flex flex-col">
        <label>Amount</label>
        <Input
          placeholder="Amount"
          className="border border-gray-300 focus:border-gray-900"
          onChange={(e) =>
            setUserInput((prev) => ({
              ...prev,
              Expenseamount: e.target.value,
            }))
          }
          value={userInput.Expenseamount}
        />
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <Input
          placeholder="Category"
          className="border border-gray-300 focus:border-gray-900"
          onChange={(e) =>
            setUserInput((prev) => ({
              ...prev,
              Category: e.target.value,
            }))
          }
          value={userInput.Category}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Button type="submit" className="bg-black hover:bg-gray-900">
          {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
    <Toaster position="top-right" reverseOrder={false} />
  </>
};

export default ExpensesForm;
