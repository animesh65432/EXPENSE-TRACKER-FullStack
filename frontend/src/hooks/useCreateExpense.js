import { useState } from "react";
import axios from "axios";

const useCreateExpense = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createexpenses = async (obj) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(
        "http://localhost:3000/Expenses/Create",
        obj
      );
      console.log(response);
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
