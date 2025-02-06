import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateexpense } from "../stroe/slices/expense";
import { Rootstate } from "@/stroe"
import { backendurl } from "@/utils"
type updateExpensespayload = {
  Category: string,
  Expenseamount: number,
  ExpensesName: string,
  _id: string,
  description: string
}

type useupdateexpensereturntypes = [
  loading: boolean,
  UpdateTheExpensefun: (obj: updateExpensespayload) => Promise<boolean>
]

const useupdateexpense = (): useupdateexpensereturntypes => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const idtoken = useSelector((state: Rootstate) => state.user.value);

  const UpdateTheExpensefun = async (obj: updateExpensespayload) => {
    setLoading(true);
    try {
      let response = await axios.put(
        `${backendurl}/Expenses/update/${obj._id}`,
        obj,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );
      console.log(response);

      const { UpdateExpense } = response.data
      dispatch(updateexpense(UpdateExpense))
      return true;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  return [loading, UpdateTheExpensefun];
};

export default useupdateexpense;
