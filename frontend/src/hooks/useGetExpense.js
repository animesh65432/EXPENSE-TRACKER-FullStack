import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Getexpenses } from "../stroe/slices/expense/index";

const useGetExpense = () => {
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const getTheAllExpenses = async () => {
    setloading(true);
    try {
      let response = await axios.get("http://localhost:3000/Expenses/Get", {
        headers: {
          idtoken: idtoken,
        },
      });
      let expenseslist = response.data?.data;
      console.log(response?.data);
      dispatch(Getexpenses(expenseslist));
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getTheAllExpenses();
  }, []);

  return [loading];
};

export default useGetExpense;
