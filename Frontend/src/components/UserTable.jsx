import { useState } from "react";
import { MoreVertical } from "lucide-react";

const UserTable = () => {
  const [users, setUsers] = useState(
    Array(8).fill({
      name: "John Doe",
      email: "john@email.com",
      level: "Level 5",
      xp: 75,
      active: true,
    })
  );

  const toggleStatus = (index) => {
    const updated = users.map((u, i) =>
      i === index ? { ...u, active: !u.active } : u
    );
    setUsers(updated);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">User Management</h3>
        <input
          type="text"
          placeholder="Search"
          className="border px-3 py-1 rounded-md"
        />
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b text-gray-500 text-sm">
            <th className="py-2">Task ID</th>
            <th>Email</th>
            <th>Level</th>
            <th>XP Progress</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-3 flex items-center gap-2">
                <img
                  src="/avatar.png"
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
                {user.name}
              </td>
              <td>{user.email}</td>
              <td>{user.level}</td>
              <td>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${user.xp}%` }}
                  ></div>
                </div>
              </td>
              <td>
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={user.active}
                    onChange={() => toggleStatus(index)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500"></div>
                </label>
              </td>
              <td className="relative">
                <button className="p-2">
                  <MoreVertical size={18} />
                </button>
                {/* Dropdown on hover or click can be added here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
