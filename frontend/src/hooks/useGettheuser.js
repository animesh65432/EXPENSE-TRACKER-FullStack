import axios from "axios";
import { useSelector } from "react-redux";

const useGettheuser = () => {
  const idtoken = useSelector((state) => state.user.value);

  const GetTheCurrentUser = async () => {
    try {
      let reponse = await axios.get(
        "http://localhost:3000/userdeatils/GetUser",
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );
      return reponse?.data?.data;
    } catch (error) {
      console.log(error);
    }
  };
  return [GetTheCurrentUser];
};

export default useGettheuser;
