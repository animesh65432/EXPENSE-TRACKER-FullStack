import { useState } from "react";
import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";

const useGetTheLeadeBord = () => {
  const [leaderboard, setleaderboard] = useState([]);
  const idtoken = useSelector((state) => state.user.value);
  const fecthingthedata = async () => {
    let res = await axios.get(
      `${backendurl}/paymentFeatures/ShowTheLeadersboard`,
      {
        headers: {
          idtoken: idtoken,
        },
      }
    );
    setleaderboard(res?.data?.data);
  };

  console.log(leaderboard);
  return [leaderboard, fecthingthedata];
};

export default useGetTheLeadeBord;
