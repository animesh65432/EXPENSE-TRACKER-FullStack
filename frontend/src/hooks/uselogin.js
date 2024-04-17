import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addthetokens, makePremuinm } from "../stroe/slices";
import { parseJwt } from "../utils";
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

      console.log(response);
      let token = response?.data?.idtoken;
      dispatch(addthetokens(token));
      console.log(parseJwt(token));
      let result = parseJwt(token).ispremiumuser;
      dispatch(makePremuinm(result));

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
