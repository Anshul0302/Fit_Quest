// import ReusableTable from "../ReusableTable";
// import ActionMenu from "../ActionMenu";
// import { useState } from "react";

// const initialUsers = Array(8).fill().map((_, i) => ({
//   id: i + 1,
//   name: "John Doe",
//   email: "john@email.com",
//   level: "Level 5",
//   xp: "75%",
//   avatar: "https://i.pravatar.cc/40?img=" + (i + 1),
//   status: true,
// }));

// const UserChallengeTable = () => {
//   const [users, setUsers] = useState(initialUsers);

//   const toggleStatus = (index) => {
//     const updated = [...users];
//     updated[index].status = !updated[index].status;
//     setUsers(updated);
//   };

//   const columns = [
//     {
//       header: "Challenge Name",
//       accessor: "title"
//     },
//     { header: "Type", accessor: "type" },
//     { header: "FQC Reward", accessor: "coins" },
//     { header: "Progress", accessor: "progress" },
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
//           onView={(u) => alert("Viewing " + u.name)}
//           onEdit={(u) => alert("Editing " + u.name)}
//           onDelete={(u) => alert("Deleting " + u.name)}
//         />
//       )}
//     />
//   );
// };

// export default UserChallengeTable;


import { useState } from "react";
import ReusableTable from "../ReusableTable";
import ActionMenu from "../ActionMenu";
import { useNavigate } from 'react-router-dom';


const initialChallenges = [
  {
    id: 1,
    name: "30-Day Fat Burn",
    type: "Weight Loss",
    reward: "100 FQC",
    progress: "40%",
    status: "Running",
  },
  {
    id: 2,
    name: "Strength Challenge",
    type: "Muscle Gain",
    reward: "50 FQC",
    progress: "100%",
    status: "Completed",
  },
  {
    id: 3,
    name: "HIIT 7-Day Challenge",
    type: "Endurance",
    reward: "0 FQC",
    progress: "N/A",
    status: "Quit",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Running":
      return "bg-yellow-100 text-yellow-700";
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Quit":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const ChallengeTable = () => {
  const [challenges, setChallenges] = useState(initialChallenges);
  const navigate = useNavigate()


  const columns = [
    { header: "Challenge Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "FQC Reward", accessor: "reward" },
    { header: "Progress", accessor: "progress" },
    {
      header: "Status",
      render: (row) => (
        <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyle(row.status)}`}>
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <ReusableTable
      title="Challenge List"
      columns={columns}
      data={challenges}
      renderActions={(row) => (
        <ActionMenu
          data={row}
          onView={(row) => navigate(`/user-management/user-challenge-details/${row.id}`)} // ✅ Navigate to details
          onEdit={() => alert("Editing " + row.name)}
          onDelete={() => alert("Deleting " + row.name)}
        />
      )}
    />
  );
};

export default ChallengeTable;
