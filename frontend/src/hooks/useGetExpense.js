import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getexpenses } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";

const useGetExpense = () => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const getTheAllExpenses = async ({ currentPage, limit }) => {
    setloading(true);
    console.log(currentPage, limit)
    try {
      let response = await axios.get(
        `${backendurl}/Expenses/Get?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );

      let expenseslist = response.data?.data;
      let totalItems = response.data?.totalItems;

      dispatch(Getexpenses(expenseslist));
      return { totalItems };
    } catch (error) {
      console.log(error);
      return { totalItems: 0 };
    } finally {
      setloading(false);
    }
  };

  return [loading, getTheAllExpenses];
};

export default useGetExpense;
