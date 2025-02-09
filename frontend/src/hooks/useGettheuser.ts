import axios from "axios";
import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

const useGettheuser = () => {
  const idtoken = useSelector((state: Rootstate) => state.user.value);

  const GetTheCurrentUser = async () => {
    try {
      let reponse = await axios.get(`${backendurl}/userdeatils/GetUser`, {
        headers: {
          idtoken: idtoken,
        },
      });
      reponse?.data.data[0].ispremiumuser;
      return reponse?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return [GetTheCurrentUser];
};

export default useGettheuser;
