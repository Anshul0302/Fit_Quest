import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
// import DeleteProductModal from "./DeleteProductModal";
import { DeleteConfirmModal, FilterModal } from "../ChallengeManagement/ChallengeModal";
import ProductFilterModal from "./ProductFilter";

const initialProducts = [
  {
    id: 1,
    name: "Nandrolone",
    category: "PHARMACEUTICALS",
    price: "$4200",
    inventory: 100,
    concentration: "100mg/ml",
    content: "10ml vial",
    description: "Burn fat with HIIT & diet support",
    image: "/avatar.png",
  },
];

function StoreManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(initialProducts);
  const [showFilter, setShowFilter] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteProduct(null);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Store Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg text-sm bg-gray-50"
            />
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
          </div>
          <button
            onClick={() => setShowFilter(true)}
            className="border px-3 py-2 rounded-md flex items-center gap-2 text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>
          <button
            onClick={() => navigate("/store/create")}
            className="bg-blue-500 text-white px-4 py-2 rounded text-sm"
          >
            + Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Inventory</th>
              <th className="px-4 py-2">Concentration</th>
              <th className="px-4 py-2">Content</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{p.name}</td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3">{p.price}</td>
                <td className="px-4 py-3">{p.inventory}</td>
                <td className="px-4 py-3">{p.concentration}</td>
                <td className="px-4 py-3">{p.content}</td>
                <td className="px-4 py-3 flex gap-2">
                  <button
                    onClick={() =>
                      navigate(`/store/view/${p.id}`, { state: { product: p } })
                    }
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setDeleteProduct(p)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showFilter && (
        <ProductFilterModal
          onClose={() => setShowFilter(false)}
          onApply={() => {
            // apply filter logic
          }}
        />
      )}

      {deleteProduct && (
        <DeleteConfirmModal
          product={deleteProduct}
          onClose={() => setDeleteProduct(null)}
          onConfirm={() => handleDelete(deleteProduct.id)}
        />
      )}
    </div>
  );
}

export default StoreManagement;
