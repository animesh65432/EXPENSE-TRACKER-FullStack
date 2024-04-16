import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const usedeleteExpense = () => {
  const [loading, setLoading] = useState(false);
  const idtoken = useSelector((state) => state.user.value);

  const deletethexpenses = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/Expenses/delete/${id}`, {
        headers: {
          idtoken: idtoken,
        },
      });
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
