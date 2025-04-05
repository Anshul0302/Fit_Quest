import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Plus } from "lucide-react";

const AddChallenge = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    type: "",
    difficulty: "",
    duration: "",
    startDate: "",
    endDate: "",
    xp: "",
    coins: "",
    description: "",
    dietProduct: "",
    tasks: [],
    taskName: "",
    calories: "",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addTask = () => {
    if (form.taskName && form.calories) {
      setForm((prev) => ({
        ...prev,
        tasks: [...prev.tasks, { name: form.taskName, calories: form.calories }],
        taskName: "",
        calories: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Challenge Data:", form);
    navigate("/challenges");
  };

  return (
    <div className="max-w-5xl my-5 mx-auto p-6 bg-white rounded-xl shadow-md relative">
      <h2 className="text-xl font-semibold mb-6">Create Challenge</h2>

      {/* Upload Banner */}
      <div className="mb-4 border border-dashed border-gray-300 p-4 rounded-md text-center text-sm text-blue-500">
        + Upload Banner
        <div className="text-gray-400 text-xs">Recommend size: 400x400px</div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Challenge Name"
            className="border px-3 py-2 rounded-md w-full max-w-xs"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded-md w-full max-w-xs"
            value={form.type}
            onChange={(e) => updateField("type", e.target.value)}
          >
            <option value="">Challenge Type</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <select
            className="border px-3 py-2 rounded-md w-full max-w-xs"
            value={form.difficulty}
            onChange={(e) => updateField("difficulty", e.target.value)}
          >
            <option value="">Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <select
            className="border px-3 py-2 rounded-md w-full max-w-xs"
            value={form.duration}
            onChange={(e) => updateField("duration", e.target.value)}
          >
            <option value="">Duration</option>
            <option value="7">7 Days</option>
            <option value="14">14 Days</option>
            <option value="30">30 Days</option>
          </select>
          <div className="relative max-w-xs w-full">
            <input
              type="date"
              className="border px-3 py-2 rounded-md w-full"
              value={form.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
            />
            <CalendarDays className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
          <div className="relative max-w-xs w-full">
            <input
              type="date"
              className="border px-3 py-2 rounded-md w-full"
              value={form.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
            />
            <CalendarDays className="absolute right-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-98">
          <div className="relative max-w-xs w-full">
            <input
              type="number"
              placeholder="Enter XP"
              className="border px-3 py-2 rounded-md w-full"
              value={form.xp}
              onChange={(e) => updateField("xp", e.target.value)}
            />
            <span className="absolute right-4 top-2.5 text-sm text-gray-400">XP</span>
          </div>
          <div className="relative max-w-xs w-full">
            <input
              type="number"
              placeholder="Enter Coin"
              className="border px-3 py-2 rounded-md w-full"
              value={form.coins}
              onChange={(e) => updateField("coins", e.target.value)}
            />
            <span className="absolute right-4 top-2.5 text-sm text-gray-400">FQC</span>
          </div>
        </div>

        {/* Description */}
        <textarea
          placeholder="Challenge Description"
          className="w-full border px-3 py-2 rounded-md"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
        />

        {/* Task Info */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Task Information</h4>
          <div className="grid grid-cols-3 gap-4 items-center">
            <input
              type="text"
              placeholder="Task Name"
              className="border px-3 py-2 rounded-md max-w-xs"
              value={form.taskName}
              onChange={(e) => updateField("taskName", e.target.value)}
            />
            <input
              type="number"
              placeholder="Calories Burned"
              className="border px-3 py-2 rounded-md max-w-xs"
              value={form.calories}
              onChange={(e) => updateField("calories", e.target.value)}
            />
            <button
              type="button"
              onClick={addTask}
              className="flex justify-center items-center border px-3 py-2 rounded-md text-sm bg-purple-100 text-purple-600 hover:bg-purple-200"
            >
              <Plus size={16} className="mr-1" /> Add Task
            </button>
          </div>
        </div>

        {/* Diet Product */}
        <div>
          <h4 className="text-sm font-semibold mb-2">Diet Product</h4>
          <select
            className="border px-3 py-2 rounded-md max-w-xs w-full"
            value={form.dietProduct}
            onChange={(e) => updateField("dietProduct", e.target.value)}
          >
            <option value="">Select Diet</option>
            <option value="protein">Protein Shake</option>
            <option value="keto">Keto Pack</option>
            <option value="vitamins">Vitamins Pack</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 gap-3">
          <button
            type="button"
            onClick={() => navigate("/challenges")}
            className="border px-5 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddChallenge;
