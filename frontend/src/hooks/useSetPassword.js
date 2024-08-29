import axios from "axios";
import { backendurl } from "../utils";
const useSetPassword = () => {
  const SetThePassWord = async (obj) => {
    try {
      await axios.put(`${backendurl}/Resest/updatePasswords?id=${obj.id}`, obj);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return [SetThePassWord];
};

export default useSetPassword;
