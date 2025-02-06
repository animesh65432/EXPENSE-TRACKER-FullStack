import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { makePremuinm } from "../stroe/slices/index";
import { backendurl } from "../utils";
import { Rootstate } from "@/stroe"

const useGettheuser = () => {
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch();

  const GetTheCurrentUser = async () => {
    try {
      let reponse = await axios.get(`${backendurl}/userdeatils/GetUser`, {
        headers: {
          idtoken: idtoken,
        },
      });
      let res = reponse?.data.data[0].ispremiumuser;
      dispatch(makePremuinm(res));
      return reponse?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return [GetTheCurrentUser];
};

export default useGettheuser;
