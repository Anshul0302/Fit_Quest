import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

function CreateSubscriptionPlan() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    features: "",
    status: "active",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit plan data (e.g. API call here)
    navigate("/subscriptions");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-6">Create Subscription Plan</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload */}
        <div className="border border-dashed rounded-lg p-4 text-center text-blue-500 cursor-pointer">
          <Upload className="inline-block mr-2" />
          <span>Upload Icon / Banner</span>
          <p className="text-xs text-gray-400 mt-1">Recommended size: 400x400px</p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Plan Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />
          <input
            name="price"
            placeholder="Price (e.g. $29.99)"
            value={form.price}
            onChange={handleChange}
            className="input"
          />
          <input
            name="duration"
            placeholder="Duration (e.g. 3 months)"
            value={form.duration}
            onChange={handleChange}
            className="input"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="input"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Features */}
        <textarea
          name="features"
          placeholder="Plan Features (comma or newline separated)"
          rows={4}
          value={form.features}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 text-sm"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/subscriptions")}
            className="px-6 py-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save Plan
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateSubscriptionPlan;
