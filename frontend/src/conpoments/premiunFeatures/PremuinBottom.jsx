import { Link, useNavigate } from "react-router-dom";
import styles from "./PremiunButton.module.css";

const PremiunButton = () => {
  const navigate = useNavigate();

  const GotoLeaderBorads = () => {
    navigate("/leaderborads");
  };
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={GotoLeaderBorads}>
        Show The Leaderboards
      </button>
    </div>
  );
};

export default PremiunButton;
