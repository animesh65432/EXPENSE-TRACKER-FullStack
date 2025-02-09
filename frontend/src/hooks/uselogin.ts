import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addthetokens } from "../stroe/slices";
import { parseJwt } from "../utils";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../utils";
import { getuser } from "../stroe/slices/user"

type userlogintypes = {
  email: string,
  password: string
}

const uselogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logintheuser = async (obj: userlogintypes) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(`${backendurl}/users/loginuser`, obj);

      console.log(response);
      console.log(response?.data);
      let token = response?.data?.idtoken;
      dispatch(addthetokens(token));
      dispatch(getuser(response?.data?.user))
      console.log(parseJwt(token));
      navigate("/");
      return true;
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.log(error);

      if (error.response?.data?.message) {
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
