import { useState } from "react";
import ReusableTable from "../UI/ReusableTable";

const initialLeaderboard = [
  { id: 1, name: "Alice", points: 150 },
  { id: 2, name: "Bob", points: 120 },
  // More dummy data…
];

function LeaderboardPage() {
  const [leaderboard] = useState(initialLeaderboard);

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Points", accessor: "points" },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <ReusableTable title="" columns={columns} data={leaderboard} />
    </div>
  );
}

export default LeaderboardPage;
