import axios from "axios";
import { backendurl } from "../utils";

type updatepasswordtypes = {
  newPassword: string, id: string | null
}

type useSetPasswordreturntypes = [
  SetThePassWord: (obj: updatepasswordtypes) => Promise<boolean>
]

const useSetPassword = (): useSetPasswordreturntypes => {
  const SetThePassWord = async (obj: updatepasswordtypes) => {
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
