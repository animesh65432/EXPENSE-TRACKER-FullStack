import { useSelector } from "react-redux";

const useGetthefile = () => {
  const idtoken = useSelector((state) => state.user.value);
  console.log(idtoken);

  const Fechdata = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/Expenses/dowaloadtheexpenses",
        {
          method: "POST",
          headers: {
            idtoken: idtoken,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
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
