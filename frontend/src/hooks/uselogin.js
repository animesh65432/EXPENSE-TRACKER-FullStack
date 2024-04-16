import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addthetokens } from "../stroe/slices";
const uselogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const logintheuser = async (obj) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(
        "http://localhost:3000/users/loginuser",
        obj
      );
      let token = response?.data?.idtoken;
      dispatch(addthetokens(token));
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

  return { logintheuser, loading, error };
};

export default uselogin;
