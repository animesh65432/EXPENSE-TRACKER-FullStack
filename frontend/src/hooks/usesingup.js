import { useState } from "react";
import axios from "axios";
import { backendurl } from "../utils";
const usesingup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createtheuser = async (obj) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(`${backendurl}/users/singuptheuser`, obj);
      console.log(response);
      return true;
    } catch (error) {
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

  return { createtheuser, loading, error };
};

export default usesingup;
