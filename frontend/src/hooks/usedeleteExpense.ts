import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteexpenses } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

type usedeleteExpensereturntypes = [
  loading: boolean,
  deletethexpenses: (id: string) => Promise<boolean>
]
const usedeleteExpense = (): usedeleteExpensereturntypes => {
  const [loading, setLoading] = useState(false);
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch();

  const deletethexpenses = async (id: string) => {
    setLoading(true);
    try {
      let response = await axios.delete(`${backendurl}/Expenses/delete/${id}`, {
        headers: {
          idtoken: idtoken,
        },
      });
      console.log(response);
      dispatch(deleteexpenses(id));
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);
      return false
    } finally {
      setLoading(false);
    }
  };

  return [loading, deletethexpenses];
};

export default usedeleteExpense;
