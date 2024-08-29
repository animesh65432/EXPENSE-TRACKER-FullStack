import { useNavigate } from "react-router-dom";

const PremiumButton = () => {
  const navigate = useNavigate();

  const gotoLeaderboards = () => {
    navigate("/leaderborads");
  };

  return (
    <button
      onClick={gotoLeaderboards}
      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
    >
      Show the Leaderboards
    </button>
  );
};

export default PremiumButton;
