// ViewParticipants.jsx (updated)
import { Link } from "react-router-dom";

const participants = [
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  {
    id: 1,
    name: "John Doe",
    level: 98,
    fqc: "12,000",
    xp: "12,000",
    tasks: "15/30",
    avatar: "/avatar.png",
  },
  // ...more static participants
];

const ViewParticipants = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Participants List</h2>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-md"
        />
      </div>

      <table className="w-full text-sm text-left">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-2">Participant Name</th>
            <th>Level</th>
            <th>FQC Earned</th>
            <th>XP Earned</th>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="py-3 flex items-center gap-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                <Link
                  to={`/admin/user/${user.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {user.name}
                </Link>
              </td>
              <td>{user.level}</td>
              <td>{user.fqc}</td>
              <td>{user.xp}</td>
              <td>{user.tasks}</td>
              <td>View</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewParticipants;
