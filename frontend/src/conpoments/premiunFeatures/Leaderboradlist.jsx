import React from "react";
import styles from "./LeaderboardList.module.css";

const LeaderboardList = ({ obj }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.userName}>UserName: {obj.name}</h3>
      <h3 className={styles.totalExpenses}>Total Expenses: {obj.totalexpenses}</h3>
    </div>
  );
};

export default LeaderboardList;

