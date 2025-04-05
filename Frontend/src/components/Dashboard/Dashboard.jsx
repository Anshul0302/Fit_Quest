
const Dashboard = () => {
    return (
                <div className="flex-1 p-6">
                    <h2 className="text-2xl font-bold mb-6">Welcome back, Admin 👋</h2>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { title: "Total Users", value: "2,150" },
                            { title: "Orders", value: "984" },
                            { title: "Revenue", value: "$12,390" },
                            { title: "Challenges", value: "24 Active" },
                        ].map((card, i) => (
                            <div
                                key={i}
                                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                            >
                                <p className="text-sm text-gray-500">{card.title}</p>
                                <h3 className="text-xl font-semibold mt-2">{card.value}</h3>
                            </div>
                        ))}
                    </div>

                    {/* XP Progress Chart Placeholder */}
                    <div className="bg-white p-6 rounded-xl shadow mb-8">
                        <h3 className="text-lg font-semibold mb-4">XP Progress Overview</h3>
                        <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                            [Chart Placeholder]
                        </div>
                    </div>

                    {/* Latest Users Table */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-lg font-semibold mb-4">Latest Users</h3>
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b text-gray-500">
                                    <th className="py-2">User</th>
                                    <th>Email</th>
                                    <th>Level</th>
                                    <th>Status</th>
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
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs ${user.active
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
    );
};

export default Dashboard;
