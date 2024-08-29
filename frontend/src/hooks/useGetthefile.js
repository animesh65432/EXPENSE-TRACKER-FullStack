import { useSelector } from "react-redux";
import { backendurl } from "../utils";
const useGetthefile = () => {
  const idtoken = useSelector((state) => state.user.value);

  const Fechdata = async () => {
    try {
      const response = await fetch(
        `${backendurl}/Expenses/dowaloadtheexpenses`,
        {
          method: "POST",
          headers: {
            idtoken: idtoken,
          },
        }
      );

      console.log(response);
      if (response.ok) {
        const data = await response.json();
        const link = document.createElement("a");
        link.href = data.dowanloadurl;
        link.download = "";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return [Fechdata];
};

export default useGetthefile;
