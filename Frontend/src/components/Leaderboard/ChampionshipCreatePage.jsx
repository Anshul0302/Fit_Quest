import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Upload } from "lucide-react";

function ChampionshipCreatePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    entryCost: "",
    totalPrize: "",
    xpRange: "",
    fromDate: "",
    toDate: "",
    firstPrize: "",
    secondPrize: "",
    thirdPrize: "",
    description: "",
    taskName: "",
    caloriesBurned: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle submission
    navigate("/");
  };

  return (
    <div className="p-6 max-w-6xl mx-auto my-3 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-6">Create Championship</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload */}
        <div className="border border-dashed rounded-lg p-4 text-center cursor-pointer text-blue-500">
          <Upload className="inline-block mr-2" />
          <span>Upload Banner</span>
          <p className="text-xs text-gray-400 mt-1">
            Recommended size: 400x400px
          </p>
        </div>

        {/* Grid Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Championship Name"
            value={form.title}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="entryCost"
            placeholder="Entry FQC Cost"
            value={form.entryCost}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="totalPrize"
            placeholder="Total Prize Pool"
            value={form.totalPrize}
            onChange={handleChange}
            className="input"
          />

          <input
            type="text"
            name="xpRange"
            placeholder="League XP Ranges"
            value={form.xpRange}
            onChange={handleChange}
            className="input"
          />
          <div className="relative">
            <input
              type="date"
              name="fromDate"
              value={form.fromDate}
              onChange={handleChange}
              className="input pr-10"
            />
            <CalendarDays className="w-4 h-4 text-gray-500 absolute top-3 right-3" />
          </div>
          <div className="relative">
            <input
              type="date"
              name="toDate"
              value={form.toDate}
              onChange={handleChange}
              className="input pr-10"
            />
            <CalendarDays className="w-4 h-4 text-gray-500 absolute top-3 right-3" />
          </div>

          <input
            type="text"
            name="firstPrize"
            placeholder="1st FQC Prize"
            value={form.firstPrize}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="secondPrize"
            placeholder="2nd FQC Prize"
            value={form.secondPrize}
            onChange={handleChange}
            className="input"
          />
          <input
            type="text"
            name="thirdPrize"
            placeholder="3rd FQC Prize"
            value={form.thirdPrize}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          placeholder="Championship Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2 text-sm"
        />

        {/* Task Info */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2 border-b pb-1">
            Task Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <input
              type="text"
              name="taskName"
              placeholder="Task Name"
              value={form.taskName}
              onChange={handleChange}
              className="input"
            />
            <input
              type="text"
              name="caloriesBurned"
              placeholder="Calories Burned"
              value={form.caloriesBurned}
              onChange={handleChange}
              className="input"
            />
            <button
              type="button"
              className="border px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100"
            >
              + Add Task
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/leaderboard")}
            className="px-6 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// Tailwind input style
const inputClass =
  "w-full border border-gray-300 rounded-lg px-4 py-2 text-sm placeholder-gray-500";

export default ChampionshipCreatePage;
