import React from "react";

const Leaderboradlist = ({ obj }) => {
  return (
    <>
      <div>
        <h3> UserName :{obj.name}</h3>
        <h3>Total Expenses : {obj.total_expense}</h3>
      </div>
    </>
  );
};

export default Leaderboradlist;