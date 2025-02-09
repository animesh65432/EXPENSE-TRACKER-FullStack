import React from "react";
import { Card } from "@/components/ui/card"

type leaderboradtypes = {
  _id: string,
  totalexpenses: number,
  name: string
}

type Props = { leaderborad: leaderboradtypes }
const LeaderboardList: React.FC<Props> = ({ leaderborad }) => {
  return (
    <Card className="p-5">
      <h3 className="text-xl  mb-2">
        UserName: <span className="font-bold">{leaderborad.name}</span>
      </h3>
      <h3 className="text-lg font-medium">
        Total Expenses:{" "}
        <span className="font-bold">${leaderborad.totalexpenses}</span>
      </h3>
    </Card>
  );
};

export default LeaderboardList;
