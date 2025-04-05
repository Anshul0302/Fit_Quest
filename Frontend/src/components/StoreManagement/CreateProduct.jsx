import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";

function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    inventory: "",
    concentration: "",
    content: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/store");
  };

  return (
    <div className="p-6 max-w-6xl my-3 mx-auto bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-dashed rounded-lg p-4 text-center text-blue-500 cursor-pointer">
          <Upload className="inline-block mr-2" />
          <span>Upload Image</span>
          <p className="text-xs text-gray-400 mt-1">
            Recommended size: 400x400px
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="input"
          />
          <input
            name="category"
            placeholder="Select Category"
            value={form.category}
            onChange={handleChange}
            className="input"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="input"
          />
          <input
            name="inventory"
            placeholder="Inventory Quantity"
            value={form.inventory}
            onChange={handleChange}
            className="input"
          />
          <input
            name="concentration"
            placeholder="Concentration (mg/ml)"
            value={form.concentration}
            onChange={handleChange}
            className="input"
          />
          <input
            name="content"
            placeholder="Content (ml/vial)"
            value={form.content}
            onChange={handleChange}
            className="input"
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded px-4 py-2 text-sm"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/store")}
            className="px-6 py-2 bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
