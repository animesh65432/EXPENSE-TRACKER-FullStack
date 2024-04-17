import React, { useState } from "react";
import Leaderbord from "./Leaderbord";
import useGetTheLeadeBord from "../hooks/useGetTheLeadeBord";

const Button = () => {
  const [show, setshow] = useState(false);
  const [leaderboard, fecthingthedata] = useGetTheLeadeBord();
  const OnClick = () => {
    setshow((prev) => !prev);
    fecthingthedata();
  };
  return (
    <>
      <button onClick={OnClick}>Click Me</button>
      {show && <Leaderbord leaderboard={leaderboard} />}
    </>
  );
};

export default Button;
