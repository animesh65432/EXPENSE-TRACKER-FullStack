import { useSelector, useDispatch } from "react-redux";
import { backendurl } from "../utils";
import axios from "axios";
import { Rootstate } from "@/stroe"
import { addtheleaderboards } from "@/stroe/slices/leaderBoard"
import { useState } from "react";


type useGetTheLeadeBordreturntypes = [
  fecthingthedata: () => Promise<void>,
  loading: boolean
]
const useGetTheLeadeBord = (): useGetTheLeadeBordreturntypes => {
  const [loading, setloading] = useState<boolean>(false)
  const idtoken = useSelector((state: Rootstate) => state.user.value);
  const dispatch = useDispatch()
  const fecthingthedata = async () => {
    setloading(true)
    try {
      let res = await axios.get(
        `${backendurl}/paymentFeatures/ShowTheLeadersboard`,
        {
          headers: {
            idtoken: idtoken,
          },
        }
      );
      const leaderboard = res?.data?.data
      dispatch(addtheleaderboards(leaderboard))
    } catch (error) {
      console.log(error)
    }
    finally {
      setloading(false)
    }

  };

  return [fecthingthedata, loading];
};

export default useGetTheLeadeBord;
