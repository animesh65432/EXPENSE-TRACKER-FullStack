import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useGetExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setloading] = useState(false);
  const idtoken = useSelector((state) => state.user.value);

  const getTheAllExpenses = async () => {
    setloading(true);
    try {
      let response = await axios.get("http://localhost:3000/Expenses/Get", {
        headers: {
          idtoken: idtoken,
        },
      });
      setExpenses(response.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    getTheAllExpenses();
  }, []);

  return [expenses, loading];
};

export default useGetExpense;
