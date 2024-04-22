import React, { useState } from "react";
import Leaderbord from "./Leaderbord";
import useGetTheLeadeBord from "../../hooks/useGetTheLeadeBord";

const PremiunButton = () => {
  const [show, setshow] = useState(false);
  const [leaderboard, fecthingthedata] = useGetTheLeadeBord();
  const OnClick = () => {
    setshow((prev) => !prev);
    fecthingthedata();
  };
  return (
    <>
      <button onClick={OnClick}>Show The LeaderBoards</button>
      {show && <Leaderbord leaderboard={leaderboard} />}
    </>
  );
};

export default PremiunButton;
