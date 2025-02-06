import { useState } from "react";
import axios, { AxiosError } from "axios";
import { backendurl } from "../utils";

type createusertypes = {
  name: string,
  email: string,
  password: string
}
const usesingup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createtheuser = async (obj: createusertypes) => {
    setLoading(true);
    setError(null);
    try {
      let response = await axios.post(`${backendurl}/users/singuptheuser`, obj);
      console.log(response);
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

  return { createtheuser, loading, error };
};

export default usesingup;
