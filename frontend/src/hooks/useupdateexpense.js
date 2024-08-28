import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateexpense } from "../stroe/slices/expense";
import { backendurl } from "../utils";

const useupdateexpense = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const idtoken = useSelector((state) => state.user.value);

  const UpdateTheExpensefun = async (obj) => {
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
      dispatch(updateexpense(obj));
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
