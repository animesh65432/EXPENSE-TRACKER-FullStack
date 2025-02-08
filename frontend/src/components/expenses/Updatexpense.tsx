import React, { useState } from "react";
import { useupdateexpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { Icons } from "@/Icon";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ExpenseTypes = {
  _id: string;
  Category: "dress" | "grocery" | "books" | "others";
  Expenseamount: number;
  ExpensesName: string;
  description: string;
  createdAt: string;
}
type Props = {
  expense: ExpenseTypes;
  onSuccess: () => void;
};

const Updatexpense: React.FC<Props> = ({ expense, onSuccess }) => {
  const [userInput, setUserInput] = useState<ExpenseTypes>({
    ExpensesName: expense.ExpensesName,
    description: expense.description,
    Category: expense.Category,
    Expenseamount: expense.Expenseamount,
    _id: expense._id,
    createdAt: expense.createdAt,
  });

  const [loading, updateTheExpensefun] = useupdateexpense();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userInput.ExpensesName.trim() === "" ||
      userInput.description.trim() === "" ||
      !userInput.Expenseamount
    ) {
      toast.error("Please fill each and every field");
      return;
    }

    try {
      await updateTheExpensefun(userInput);
      onSuccess()
      toast.success("Successfully updated");
    } catch (error) {
      console.error(error);
      toast.error("Please try again");
    }
  };

  return (
    <>
      <Card className="p-2">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              Expense Name
              <Input
                placeholder="Expense Name"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
              Description:
              <Input
                placeholder="Description"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
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
              Amount
              <Input
                type="number"
                placeholder="Amount"
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Expenseamount: Number(e.target.value),
                  }))
                }
                value={userInput.Expenseamount}
              />
            </div>

            <div className="flex flex-col">
              <label>Category</label>
              <Select
                value={userInput.Category} // ✅ Ensure value is controlled
                onValueChange={(value) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Category: value as "dress" | "grocery" | "books" | "others" // ✅ Cast value
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dress">Dress</SelectItem>
                  <SelectItem value="grocery">Grocery</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                  <SelectItem value="others">Others</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Button type="submit" className="bg-black hover:bg-slate-900">
                {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default Updatexpense;
