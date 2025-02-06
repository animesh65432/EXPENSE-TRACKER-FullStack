import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getexpenses } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

type useGetExpensereturntypes = [
  loading: boolean,
  getTheAllExpenses: ({ currentPage }: { currentPage: number }) => Promise<{ totalPages: number }>
]

const useGetExpense = (): useGetExpensereturntypes => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch();

  const getTheAllExpenses = async ({ currentPage }: { currentPage: number }) => {
    setloading(true);
    console.log(currentPage)
    try {
      let response = await axios.get(
        `${backendurl}/Expenses/Get?page=${currentPage}&limit=4`,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );

      const expenseslist = response.data?.data;
      const { totalPages } = response.data
      dispatch(Getexpenses(expenseslist));
      return { totalPages: totalPages ?? 0 }
    } catch (error) {
      console.log(error);
      return { totalPages: 0 };
    } finally {
      setloading(false);
    }
  };

  return [loading, getTheAllExpenses];
};

export default useGetExpense;
