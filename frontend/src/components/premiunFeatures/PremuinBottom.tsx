import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"
import React from "react";

const PremiumButton: React.FC = () => {
  const navigate = useNavigate();

  const gotoLeaderboards = () => {
    navigate("/leaderborads");
  };

  return (
    <Button
      onClick={gotoLeaderboards}
      variant="ghost"

    >
      Show the Leaderboards
    </Button>
  );
};

export default PremiumButton;
