import axios from "axios";
import { backendurl } from "../utils";

type SentTheEmailtypes = {
  email: string
}

const useResetPassword = () => {
  const SentTheEmail = async (obj: SentTheEmailtypes) => {
    console.log(backendurl, obj);
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
