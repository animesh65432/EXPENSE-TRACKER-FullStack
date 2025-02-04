import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteexpenses } from "../stroe/slices/expense/index";
import { backendurl } from "../utils";

const usedeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const idtoken = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  const deletethexpenses = async (id) => {
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
    } catch (error) {
      throw new Error(error)
    } finally {
      setLoading(false);
    }
  };

  return [loading, deletethexpenses];
};

export default usedeleteExpense;
