import React, { useState } from "react";
import { useupdateexpense } from "../../hooks";
import { toast, Toaster } from "react-hot-toast"
import {
  Card,
  Input,
  Typography,
  Button,
  Spinner
} from "@material-tailwind/react";

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
      userInput.ExpensesName === "" ||
      userInput.description === "" ||
      userInput.Category === "" ||
      userInput.Expenseamount === ""
    ) {
      toast.error("Please fill each and every field");
      return;
    } else {
      try {
        await updateTheExpensefun({
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
            <div className="flex flex-col gap-1 ">
              <Button type="submit" >
                {loading ? <Spinner /> : "Update"}
              </Button>
            </div>
          </div>

        </form>
      </Card>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
};

export default Updatexpense;
