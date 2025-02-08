import React, { useState } from "react";
import { useCreateExpense } from "../../hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/Icon";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"





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
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { ExpensesName, description, Category, Expenseamount } = userInput;

    if (!ExpensesName || !description || !Category || !Expenseamount) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "Please put everything",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        variant: "destructive"
      })
      return;
    }

    let ConvertExpenseamount = Number(userInput.Expenseamount);
    if (isNaN(ConvertExpenseamount) || ConvertExpenseamount <= 0) {
      toast({ title: "Please enter a valid amount", variant: "destructive" })
      return;
    }

    let data = { ...userInput, Expenseamount: ConvertExpenseamount };
    const success = await createexpenses(data);
    success ? toast({ title: "Successfully created expenses" }) : toast({ title: error ?? "please try agin later", variant: "destructive" });
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
        <Select
          onValueChange={(value) =>
            setUserInput((prev) => ({
              ...prev,
              Category: value,
            }))
          }
        >
          <SelectTrigger >
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
        <Button type="submit" className="bg-black hover:bg-gray-900">
          {loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : "Create"}
        </Button>
      </div>
    </form>
  </>
};

export default ExpensesForm;
