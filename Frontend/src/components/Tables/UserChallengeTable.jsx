import ReusableTable from "../ReusableTable";
import ActionMenu from "../ActionMenu";
import { useState } from "react";

const initialUsers = Array(8).fill().map((_, i) => ({
  id: i + 1,
  name: "John Doe",
  email: "john@email.com",
  level: "Level 5",
  xp: "75%",
  avatar: "https://i.pravatar.cc/40?img=" + (i + 1),
  status: true,
}));

const UserChallengeTable = () => {
  const [users, setUsers] = useState(initialUsers);

  const toggleStatus = (index) => {
    const updated = [...users];
    updated[index].status = !updated[index].status;
    setUsers(updated);
  };

  const columns = [
    {
      header: "Challenge Name",
      accessor: "title"
    },
    { header: "Type", accessor: "type" },
    { header: "FQC Reward", accessor: "coins" },
    { header: "Progress", accessor: "progress" },
    {
      header: "Status",
      render: (user, index) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={user.status}
            onChange={() => toggleStatus(index)}
          />
          <div className={`w-11 h-6 rounded-full ${user.status ? "bg-green-500" : "bg-gray-300"} relative transition`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition ${user.status ? "translate-x-5" : ""}`} />
          </div>
        </label>
      ),
    },
  ];

  return (
    <ReusableTable
      title="User Management"
      columns={columns}
      data={users}
      onStatusToggle={toggleStatus}
      renderActions={(user) => (
        <ActionMenu
          data={user}
          onView={(u) => alert("Viewing " + u.name)}
          onEdit={(u) => alert("Editing " + u.name)}
          onDelete={(u) => alert("Deleting " + u.name)}
        />
      )}
    />
  );
};

export default UserChallengeTable;
