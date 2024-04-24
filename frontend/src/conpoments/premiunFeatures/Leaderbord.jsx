import React, { useEffect } from "react";
import LeaderboardList from "./Leaderboradlist";
import styles from "./Leaderbord.module.css";
import useGetTheLeadeBord from "../../hooks/useGetTheLeadeBord";

const Leaderbord = () => {
  const [leaderboard, fetchingData] = useGetTheLeadeBord();
  useEffect(() => {
    fetchingData();
  }, []);
  return (
    <div className={styles.container}>
      {leaderboard.map((obj) => (
        <LeaderboardList key={obj.id} obj={obj} />
      ))}
    </div>
  );
};

export default Leaderbord;
