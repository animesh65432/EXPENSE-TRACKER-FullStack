import Leaderboradlist from "./Leaderboradlist";
const Leaderbord = ({ leaderboard }) => {
  return (
    <div>
      {leaderboard.map((obj, index) => (
        <Leaderboradlist key={index} obj={obj} />
      ))}
    </div>
  );
};

export default Leaderbord;
