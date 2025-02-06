import { useState } from "react";
import { useSelector } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";
import { Rootstate } from "@/stroe"

type User = {
  _id: string,
  email: string,
  image: string
  ispremiumuser: boolean,
  totalexpenses: number,
  name: string
}
type useGetTheLeadeBordreturntypes = [
  leaderboard: User[],
  fecthingthedata: () => Promise<void>
]
const useGetTheLeadeBord = (): useGetTheLeadeBordreturntypes => {
  const [leaderboard, setleaderboard] = useState<User[]>([]);
  const idtoken = useSelector((state: Rootstate) => state.user.value);
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
