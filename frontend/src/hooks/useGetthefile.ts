import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";
import { Rootstate } from "@/stroe"

const useGetFile = () => {
  const idToken = useSelector((state: Rootstate) => state.user.value);

  const fetchData = async () => {
    try {
      const response = await axios.post(`${backendurl}/Expenses/dowaloadtheexpenses`, { idToken }, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          idtoken: idToken,
        }
      });

      console.log(response?.data)
    } catch (error) {
      console.error("Error downloading PDF:", error);
      throw error;
    }
  };

  return [fetchData];
};

export default useGetFile;