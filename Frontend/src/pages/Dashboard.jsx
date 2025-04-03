import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome back, Admin 👋
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Users", value: "2,150" },
              { title: "Orders", value: "984" },
              { title: "Revenue", value: "$12,390" },
              { title: "Challenges", value: "24 Active" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition duration-300"
              >
                <p className="text-sm text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-700">
                  {card.value}
                </h3>
              </div>
            ))}
          </div>

          {/* XP Progress Chart */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              XP Progress Overview
            </h3>
            <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              [Chart Placeholder]
            </div>
          </div>

          {/* Latest Users Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Latest Users
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b text-gray-500">
                    <th className="py-2 px-3">User</th>
                    <th className="px-3">Email</th>
                    <th className="px-3">Level</th>
                    <th className="px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array(4)
                    .fill({
                      name: "John Doe",
                      email: "john@email.com",
                      level: "Level 5",
                      active: true,
                    })
                    .map((user, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-3 flex items-center gap-3">
                          <img
                            src="/avatar.png"
                            alt="avatar"
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span>{user.name}</span>
                        </td>
                        <td className="px-3">{user.email}</td>
                        <td className="px-3">{user.level}</td>
                        <td className="px-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.active
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-200 text-gray-500"
                            }`}
                          >
                            {user.active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
