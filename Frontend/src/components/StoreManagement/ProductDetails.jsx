import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;
  console.log(product,"<>?<>?<>?<>?")

  if (!product) return <div className="p-6 text-center">No product found.</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Product Details:</h2>
          <div className="flex gap-2">
            <button
              onClick={() => alert("Edit functionality here")}
              className="text-gray-500 hover:text-blue-500"
              title="Edit"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => alert("Delete confirmation modal here")}
              className="text-gray-500 hover:text-red-500"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Main Product Header Section */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 object-cover rounded-md"
          />
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
        </div>

        <hr className="my-4" />

        {/* Product Info Section */}
        <h4 className="text-sm font-semibold mb-3 text-gray-800">
          Product Information
        </h4>
        <div className="grid grid-cols-3 gap-4 text-sm text-gray-700">
          <div>
            <p className="text-gray-500 text-xs">Category</p>
            <p className="font-medium">{product.category}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Price</p>
            <p className="font-medium">{product.price}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Inventory</p>
            <p className="font-medium">{product.inventory}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Concentration</p>
            <p className="font-medium">{product.concentration}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Content</p>
            <p className="font-medium">{product.content}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Championship Description</p>
            <p className="font-medium">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
