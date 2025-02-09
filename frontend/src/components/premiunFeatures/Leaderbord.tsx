import React, { useEffect } from "react";
import LeaderboardList from "./Leaderboradlist";
import { useGetTheLeadeBord } from "../../hooks";
import { Icons } from "@/Icon"
import { Rootstate } from "@/stroe"
import { useSelector } from "react-redux"
const Leaderbord: React.FC = () => {
  const [fecthingthedata, loading] = useGetTheLeadeBord();
  const Leaderborads = useSelector((state: Rootstate) => state.leaderBoard.LeaderBorad)
  console.log(Leaderborads)
  useEffect(() => {
    fecthingthedata();
  }, []);

  if (loading) {
    return <div className="h-[80vh] flex items-center justify-center">
      <div>
        <Icons.spinner className="mr-2 h-10 w-10 animate-spin" />
      </div>
    </div>
  }

  return (
    <div className="p-4 flex flex-col gap-5">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="flex flex-col gap-7  h-[70vh] overflow-auto">
        {
          Leaderborads.length > 0 ? Leaderborads.map((leaderborad) => <LeaderboardList leaderborad={leaderborad} />) : <div className="flex h-[70vh] justify-center items-center">
            <h1>No users</h1>
          </div>
        }
      </div>

    </div>
  );
};

export default Leaderbord;
