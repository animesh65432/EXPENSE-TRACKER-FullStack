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
        console.log(data);
        const downloadUrl = data.dowanloadurl;
        window.open(downloadUrl, "_blank");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return [Fechdata];
};

export default useGetthefile;
