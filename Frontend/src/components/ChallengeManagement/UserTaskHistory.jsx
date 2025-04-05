import { useState } from "react";
import ProofImageModal from "./ProofImageModal";
import { Eye } from "lucide-react";

const UserTaskHistory = () => {
  const tasks = Array(7).fill({
    task: "Jump Squats (3 sets, 15 reps)",
    date: "Mar 12, 2025",
    day: 1,
    fqc: 100,
    xp: 200,
    calories: "200 kcal",
    status: "Completed",
  });
  const [showProof, setShowProof] = useState(false);


  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-6xl mx-auto mt-8">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Task History</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-2 px-3">Task Name</th>
              <th className="py-2 px-3">Workout Date</th>
              <th className="py-2 px-3">Day</th>
              <th className="py-2 px-3">FQC</th>
              <th className="py-2 px-3">XP</th>
              <th className="py-2 px-3">Calories Burned</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{t.task}</td>
                <td className="px-3 py-2">{t.date}</td>
                <td className="px-3 py-2">{t.day + i}</td>
                <td className="px-3 py-2">{t.fqc}</td>
                <td className="px-3 py-2">{t.xp}</td>
                <td className="px-3 py-2">{t.calories}</td>
                <td className="px-3 py-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      i % 2 === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {i % 2 === 0 ? "Completed" : "Missed"}
                  </span>
                </td>
                <td className="px-3 py-3">
                  <button
                    className="text-gray-600 hover:text-blue-600"
                    onClick={() => setShowProof(true)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showProof && (
          <ProofImageModal
            isOpen={true}
            onClose={() => setShowProof(false)}
            onAccept={() => alert("Accepted")}
            onReject={() => alert("Rejected")}
          />
        )}
      </div>
    </div>
  );
};

export default UserTaskHistory;
