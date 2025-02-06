import React, { useState } from "react";
import { useupdateexpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast"
import { Icons } from "@/Icon"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Expensestypes = {
  ExpensesName: string,
  description: string,
  Category: string,
  Expenseamount: number
  _id: string
}

type Props = {
  expense: Expensestypes
}

const Updatexpense: React.FC<Props> = ({ expense }) => {
  const [userInput, setUserInput] = useState({
    ExpensesName: expense.ExpensesName,
    description: expense.description,
    Category: expense.Category,
    Expenseamount: expense.Expenseamount,
  });

  const [loading, updateTheExpensefun] = useupdateexpense();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userInput.ExpensesName === "" ||
      userInput.description === "" ||
      userInput.Category === "" ||
      !userInput.Expenseamount
    ) {
      toast.error("Please fill each and every field");
      return;
    } else {
      try {
        const res = await updateTheExpensefun({
          ...userInput,
          _id: expense._id,
        });
        toast.success("Successfully updated");
      } catch (error) {
        console.error(error);
        toast.error("Please try again");
      }
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

                placeholder="ExpenseName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    ExpensesName: e.target.value
                  }))
                }
                value={userInput.ExpensesName}
              />
            </div>
            <div className="flex flex-col">
              Description:
              <Input

                placeholder="Description"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                value={userInput.description}
              />
            </div>
            <div className="flex flex-col">
              Amount

              <Input
                placeholder="Amount"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Expenseamount: Number(e.target.value)
                  }))
                }
                value={userInput.Expenseamount}
              />
            </div>
            <div className="flex flex-col">

              CateGory

              <Input
                placeholder="CateGory"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Category: e.target.value
                  }))
                }
                value={userInput.Category}
              />
            </div>
            <div className="flex flex-col gap-1 ">
              <Button type="submit" className="bg-black hover:bg-slate-900" >
                {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Update"}
              </Button>
            </div>
          </div>

        </form>
      </Card >
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
};

export default Updatexpense;
