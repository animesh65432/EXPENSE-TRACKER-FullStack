import React, { useEffect } from "react";
import LeaderboardList from "./Leaderboradlist";
import { useGetTheLeadeBord } from "../../hooks";

const Leaderbord = () => {
  const [leaderboard, fetchingData] = useGetTheLeadeBord();

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Leaderboard</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {leaderboard.map((obj) => (
          <LeaderboardList key={obj.id} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default Leaderbord;
