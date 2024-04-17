import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const useGetTheLeadeBord = () => {
  const [leaderboard, setleaderboard] = useState([]);
  const idtoken = useSelector((state) => state.user.value);
  console.log(idtoken);

  const fecthingthedata = async () => {
    let res = await axios.get(
      `http://localhost:3000/paymentFeatures/ShowTheLeadersboard`,
      {
        headers: {
          idtoken: idtoken,
        },
      }
    );
    setleaderboard(res?.data?.data);
  };

  return [leaderboard, fecthingthedata];
};

export default useGetTheLeadeBord;
