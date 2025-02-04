import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";

const useGetFile = () => {
  const idToken = useSelector((state) => state.user.value);

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
      const url = window.URL.createObjectURL(new Blob([response.data]), { type: "application/pdf" });
      console.log(url, "the url")
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Expenses.pdf`);
      document.body.appendChild(link);
      link.click()
      link.remove()
    } catch (error) {
      console.error("Error downloading PDF:", error);
      throw error;
    }
  };

  return [fetchData];
};

export default useGetFile;