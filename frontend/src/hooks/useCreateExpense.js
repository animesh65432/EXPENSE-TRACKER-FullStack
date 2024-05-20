import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addexpensefromExpenseFrom } from "../stroe/slices/expense/index";

const useCreateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const createexpenses = async (obj) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(
        "http://localhost:3000/Expenses/Create",
        obj,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );
      console.log(response);
      dispatch(
        addexpensefromExpenseFrom({ ...obj, _id: response?.data?.data?._id })
      );
      return true;
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
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
