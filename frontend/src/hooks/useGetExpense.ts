import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getexpenses } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

type useGetExpensereturntypes = [
  loading: boolean,
  getTheAllExpenses: () => Promise<boolean>
]

const useGetExpense = (): useGetExpensereturntypes => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch();

  const getTheAllExpenses = async () => {
    setloading(true);
    try {
      let response = await axios.get(
        `${backendurl}/Expenses/Get`,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );

      const expenseslist = response.data?.data;
      dispatch(Getexpenses(expenseslist));
      return true
    } catch (error) {
      console.log(error);
      return false
    } finally {
      setloading(false);
    }
  };

  return [loading, getTheAllExpenses];
};

export default useGetExpense;
