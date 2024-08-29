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

      if (response.ok) {
        const data = await response.json();
        const downloadUrl = data.dowanloadurl;
        try {
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "expenses_file";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.warn("Direct download failed, trying Blob approach:", e);
          const fileResponse = await fetch(downloadUrl);
          if (fileResponse.ok) {
            const blob = await fileResponse.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = "expenses_file"; // Set default file name
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            window.URL.revokeObjectURL(url); // Clean up the URL object
          } else {
            console.error(
              "Failed to fetch the file from S3:",
              fileResponse.statusText
            );
          }
        }
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return [Fechdata];
};

export default useGetthefile;
