import React, { useState } from "react";
import { useCreateExpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom"
import {
  Card,
  Input,
  Typography,
  Button,
  Spinner
} from "@material-tailwind/react";

const ExpensesFrom = ({ ontoggole }) => {
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

    console.log(userInput)

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
    createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
        <Card className="md:w-[45%] sm:w-[55%] w-[60%] p-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" >
                Expense Name
              </Typography>

              <Input
                size="lg"
                placeholder="ExpenseName"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
              <Typography variant="h6" color="blue-gray" >
                Description:
              </Typography>
              <Input
                size="lg"
                placeholder="Description"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
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
              <Typography variant="h6" color="blue-gray" >
                Amount
              </Typography>

              <Input
                size="lg"
                placeholder="Amount"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Expenseamount: e.target.value
                  }))
                }
                value={userInput.Expenseamount}
              />
            </div>
            <div className="flex flex-col">
              <Typography variant="h6" color="blue-gray" >
                CateGory
              </Typography>
              <Input
                size="lg"
                placeholder="CateGory"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={(e) =>
                  setUserInput((prev) => ({
                    ...prev,
                    Category: e.target.value
                  }))
                }
                value={userInput.Category}
              />


            </div>
            <div className="flex flex-col gap-1">
              <Button type="submit" >
                {loading ? <Spinner /> : "Create"}
              </Button>
              <Button onClick={ontoggole}>
                back
              </Button>
            </div>
          </form>

        </Card>


        <Toaster position="top-right" reverseOrder={false} />


      </div>, document.getElementById("from"))
  );
};

export default ExpensesFrom;
