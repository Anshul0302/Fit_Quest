// import ReusableTable from "../ReusableTable";
// import ActionMenu from "../ActionMenu";
// import { useState } from "react";
// import { useNavigate } from 'react-router-dom';

// const initialUsers = Array(8).fill().map((_, i) => ({
//   id: i + 1,
//   name: "John Doe",
//   email: "john@email.com",
//   level: "Level 5",
//   xp: "75%",
//   avatar: "https://i.pravatar.cc/40?img=" + (i + 1),
//   status: true,
// }));

// const UserTable = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const navigate = useNavigate()


//   const toggleStatus = (index) => {
//     const updated = [...users];
//     updated[index].status = !updated[index].status;
//     setUsers(updated);
//   };

//   const columns = [
//     {
//       header: "User",
//       render: (user) => (
//         <div className="flex items-center gap-2">
//           <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
//           {user.name}
//         </div>
//       ),
//     },
//     { header: "Email", accessor: "email" },
//     { header: "Level", accessor: "level" },
//     { header: "XP Progress", accessor: "xp" },
//     {
//       header: "Status",
//       render: (user, index) => (
//         <label className="inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             className="sr-only"
//             checked={user.status}
//             onChange={() => toggleStatus(index)}
//           />
//           <div className={`w-11 h-6 rounded-full ${user.status ? "bg-green-500" : "bg-gray-300"} relative transition`}>
//             <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition ${user.status ? "translate-x-5" : ""}`} />
//           </div>
//         </label>
//       ),
//     },
//   ];

//   return (
//     <ReusableTable
//       title="User Management"
//       columns={columns}
//       data={users}
//       onStatusToggle={toggleStatus}
//       renderActions={(user) => (
//         <ActionMenu
//           data={user}
//           onView={(user) => navigate(`/user-management/details/${user.id}`)} // ✅ Navigate to details
//           onEdit={(u) => alert("Editing " + u.name)}
//           onDelete={(u) => alert("Deleting " + u.name)}
//         />
//       )}
//     />
//   );
// };

// export default UserTable;

import ReusableTable from "../ReusableTable";
import ActionMenu from "../ActionMenu";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    // ✅ Use Vite env variable here
  const baseUrl = import.meta.env.VITE_API_URL || "http://172.16.11.30:8000"; // fallback


  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/auth/allusers`);
      const data = await res.json();
      console.log('data ', data)
      setUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleStatus = async (index) => {
    const updated = [...users];
    const user = updated[index];
    user.status = !user.status;
    setUsers(updated);

    try {
      await fetch(`${BASE_URL}/api/users/${user.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: user.status }),
      });
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const columns = [
    {
      header: "User",
      render: (user) => (
        <div className="flex items-center gap-2">
          <img src={user.profilePicture} alt="user.name" className="w-8 h-8 rounded-full" />
          <span>{user.name}</span>
        </div>
      ),
    },
    { header: "Email", accessor: "email" },
    { header: "Level", accessor: "level" },
    { header: "XP Progress", accessor: "xp" },
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
          onView={(user) => navigate(`/user-management/details/${user._id}`)}
          onEdit={(user) => alert("Editing " + user.name)}
          onDelete={(user) => alert("Deleting " + user.name)}
        />
      )}
    />
  );
};

export default UserTable;

