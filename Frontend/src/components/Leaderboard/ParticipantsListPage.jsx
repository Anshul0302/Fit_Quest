import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const initialParticipants = [
  {
    id: 1,
    name: "John Doe",
    avatar: "/proof img.png",
    xp: "12,000",
    rank: 1,
    level: 98,
    xpRange: "10,000-15,000",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "/proof img.png",
    xp: "12,000",
    rank: 2,
    level: 90,
    xpRange: "15,001-20,000",
  },
  // Add more dummy participants
];

function ParticipantsListPage() {
  const [participants] = useState(initialParticipants);
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Participants List</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50"
          />
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Participant Name</th>
              <th className="px-4 py-2">XP Earned</th>
              <th className="px-4 py-2">Rank</th>
              <th className="px-4 py-2">Level</th>
              <th className="px-4 py-2">XP Range</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center gap-2">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {p.name}
                </td>
                <td className="px-4 py-3">{p.xp}</td>
                <td className="px-4 py-3">{p.rank}</td>
                <td className="px-4 py-3">{p.level}</td>
                <td className="px-4 py-3">{p.xpRange}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/usersParticipants/${p.id}`)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ParticipantsListPage;
