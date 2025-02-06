import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addexpensefromExpenseFrom } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

type Expensespayload = {
  Category: string,
  Expenseamount: number,
  ExpensesName: string,
  description: string
}

type useCreateExpensereturntypes = {
  createexpenses: (data: Expensespayload) => Promise<boolean>,
  loading: boolean,
  error: string | null
}

const useCreateExpense = (): useCreateExpensereturntypes => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch();

  const createexpenses = async (data: Expensespayload) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(`${backendurl}/Expenses/Create`, data, {
        headers: {
          idtoken: idtoken,
        },
      });
      console.log(response);
      dispatch(
        addexpensefromExpenseFrom({ ...data, _id: response?.data?.data?._id })
      );
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createexpenses, loading, error };
};

export default useCreateExpense;
