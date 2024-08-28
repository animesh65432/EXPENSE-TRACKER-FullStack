import React from "react";

const LeaderboardList = ({ obj }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-2">
        UserName: <span className="text-blue-600">{obj.name}</span>
      </h3>
      <h3 className="text-lg font-medium">
        Total Expenses:{" "}
        <span className="text-red-600">${obj.totalexpenses}</span>
      </h3>
    </div>
  );
};

export default LeaderboardList;
