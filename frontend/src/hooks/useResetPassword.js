import axios from "axios";
import { backendurl } from "../utils";

const useResetPassword = () => {
  const SentTheEmail = async (obj) => {
    try {
      await axios.post(`${backendurl}/Resest/forgetpassword`, obj);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SentTheEmail];
};

export default useResetPassword;
