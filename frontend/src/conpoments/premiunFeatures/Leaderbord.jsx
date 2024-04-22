import Leaderboradlist from "./Leaderboradlist";
const Leaderbord = ({ leaderboard }) => {
  return (
    <div>
      {leaderboard.map((obj) => (
        <Leaderboradlist key={obj.id} obj={obj} />
      ))}
    </div>
  );
};

export default Leaderbord;
