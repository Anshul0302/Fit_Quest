const DietInfoList = ({ products = [] }) => {
    return (
      <div className="mt-10">
        <h4 className="font-semibold text-gray-700 text-sm mb-3">Diet Information</h4>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6713/6713531.png"
                  alt="product"
                  className="w-10 h-10 rounded-md"
                />
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{product.category}</p>
                </div>
              </div>
              <button className="px-4 py-1.5 text-sm border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default DietInfoList;
  