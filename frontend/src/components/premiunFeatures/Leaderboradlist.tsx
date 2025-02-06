import React from "react";

type usertypes = {
  _id: string,
  email: string,
  image: string
  ispremiumuser: boolean,
  totalexpenses: number,
  name: string
}

type Props = { user: usertypes }
const LeaderboardList: React.FC<Props> = ({ user }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-2">
        UserName: <span className="text-blue-600">{user.name}</span>
      </h3>
      <h3 className="text-lg font-medium">
        Total Expenses:{" "}
        <span className="text-red-600">${user.totalexpenses}</span>
      </h3>
    </div>
  );
};

export default LeaderboardList;
