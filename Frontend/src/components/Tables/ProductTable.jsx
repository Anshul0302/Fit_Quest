import { useState } from "react";
import ReusableTable from "../ReusableTable";
import ActionMenu from "../ActionMenu";
import { useNavigate } from "react-router-dom";

const mockProducts = Array(3).fill().map((_, i) => ({
  id: i + 1,
  name: "NANDROLONE PHENYLPROPIONATE",
  category: "PHARMACEUTICALS",
  price: "$4,999",
  inventory: 100,
  concentration: "100mg/ml",
  content: "10ml vial",
  image: "https://cdn-icons-png.flaticon.com/512/6713/6713531.png",
}));

const ProductTable = () => {
  const [products, setProducts] = useState(mockProducts);
  const navigate = useNavigate();

  const handleEdit = (product) => {
    alert(`Edit ${product.name}`);
    // navigate(`/store/edit/${product.id}`);
  };

  const handleDelete = (product) => {
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  };

  const columns = [
    {
      header: "Product Name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <img src={item.image} alt="product" className="w-8 h-8 rounded-full" />
          <span className="truncate max-w-[120px] font-medium">{item.name}</span>
        </div>
      ),
    },
    { header: "Category", accessor: "category" },
    { header: "Price", accessor: "price" },
    { header: "Inventory", accessor: "inventory" },
    { header: "Concentration", accessor: "concentration" },
    { header: "Content", accessor: "content" },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Store Management</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none bg-gray-100"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-600">
            + Add Product
          </button>
        </div>
      </div>

      <ReusableTable
        title=""
        columns={columns}
        data={products}
        renderActions={(product) => (
          <ActionMenu
            data={product}
            onView={() => alert("View " + product.name)}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product)}
          />
        )}
      />
    </div>
  );
};

export default ProductTable;
