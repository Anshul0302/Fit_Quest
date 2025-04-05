// pages/admin/challenges/EditChallenge.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditChallenge = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "30-Day Fat Burn",
    type: "Muscle Gain",
    difficulty: "Intermediate",
    duration: "30 Days",
    startDate: "2025-03-05",
    endDate: "2025-04-05",
    xp: 500,
    coin: 100,
    description: "Burn fat with HIIT & diet tracking!",
    taskName: "Jump Squats (3 sets, 15 reps)",
    calories: "1,500 kcal",
    dietProduct: "Nandrolone Phenylpropionate",
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Challenge:", form);
    navigate("/admin/challenges");
  };

  return (
    <div className="max-w-6xl my-4 mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-6">Edit Challenge</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Challenge Name"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          value={form.type}
          onChange={(e) => updateField("type", e.target.value)}
          placeholder="Challenge Type"
          className="border rounded px-3 py-2"
        />
        <select
          value={form.difficulty}
          onChange={(e) => updateField("difficulty", e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
        <input
          type="text"
          value={form.duration}
          onChange={(e) => updateField("duration", e.target.value)}
          placeholder="Duration"
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={form.startDate}
          onChange={(e) => updateField("startDate", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="date"
          value={form.endDate}
          onChange={(e) => updateField("endDate", e.target.value)}
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          value={form.xp}
          onChange={(e) => updateField("xp", e.target.value)}
          placeholder="Enter XP"
          className="border rounded px-3 py-2"
        />
        <input
          type="number"
          value={form.coin}
          onChange={(e) => updateField("coin", e.target.value)}
          placeholder="Enter Coin"
          className="border rounded px-3 py-2"
        />
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Challenge Description"
          className="col-span-2 border rounded px-3 py-2"
        />

        <h3 className="col-span-2 text-lg font-medium mt-4">
          Task Information
        </h3>
        <input
          type="text"
          value={form.taskName}
          onChange={(e) => updateField("taskName", e.target.value)}
          placeholder="Task Name"
          className="border rounded px-3 py-2"
        />
        <input
          type="text"
          value={form.calories}
          onChange={(e) => updateField("calories", e.target.value)}
          placeholder="Calories Burned"
          className="border rounded px-3 py-2"
        />

        <h3 className="col-span-2 text-lg font-medium mt-4">Diet Product</h3>
        <input
          type="text"
          value={form.dietProduct}
          onChange={(e) => updateField("dietProduct", e.target.value)}
          placeholder="Select Diet"
          className="col-span-2 border rounded px-3 py-2"
        />

        <div className="col-span-2 flex justify-end gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/challenges")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditChallenge;
