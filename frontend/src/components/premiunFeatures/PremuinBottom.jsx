import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react"

const PremiumButton = () => {
  const navigate = useNavigate();

  const gotoLeaderboards = () => {
    navigate("/leaderborads");
  };

  return (
    <Button
      onClick={gotoLeaderboards}
      variant="text"

    >
      Show the Leaderboards
    </Button>
  );
};

export default PremiumButton;
