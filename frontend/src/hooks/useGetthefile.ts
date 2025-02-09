import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";
import { Rootstate } from "@/stroe"
import { useToast } from "@/hooks/use-toast"
const useGetFile = () => {
  const idToken = useSelector((state: Rootstate) => state.user.value);
  const { toast } = useToast()

  const fetchData = async () => {
    try {
      const response = await axios.post(`${backendurl}/Expenses/dowaloadtheexpenses`, { idToken }, {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
          idtoken: idToken,
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "Expenses.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);


      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast({
        title: "something went wrong",
        variant: "destructive",
      })
      throw error;
    }
  };

  return [fetchData];
};

export default useGetFile;