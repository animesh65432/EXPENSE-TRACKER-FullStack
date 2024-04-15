import { useEffect, useState } from "react";
import axios from "axios";

const useGetExpense = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setloading] = useState(false);

  const getTheAllExpenses = async () => {
    setloading(true);
    try {
      let response = await axios.get("http://localhost:3000/Expenses/Get");
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
