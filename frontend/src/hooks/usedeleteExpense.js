// usedeleteExpense.js
import axios from "axios";
import { useState } from "react";

const usedeleteExpense = () => {
  const [loading, setLoading] = useState(false);

  const deletethexpenses = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/Expenses/delete/${id}`);
      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return [loading, deletethexpenses];
};

export default usedeleteExpense;
