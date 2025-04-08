const ReusableDetailsView = ({
  title,
  avatar,
  name,
  email,
  info = [],
  isSuspended,
  onSuspendToggle,
  status, // ✅ optional status badge
  onPrimaryAction,
  primaryActionLabel = "View Details",
}) => {
  const showToggle = typeof isSuspended === "boolean" && typeof onSuspendToggle === "function";
  const showStatus = !showToggle && status;

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-md max-w-6xl mx-auto mt-10">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        {onPrimaryAction && (
          <button
            onClick={onPrimaryAction}
            className="border border-blue-500 text-blue-500 px-4 py-1.5 rounded-md hover:bg-blue-50 transition"
          >
            {primaryActionLabel}
          </button>
        )}
      </div>

      {/* Avatar + Toggle/Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
          <div>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        {/* Right side (Suspend toggle or Status badge) */}
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {/* Toggle (only shown if isSuspended is valid) */}
          {showToggle && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Suspend</span>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isSuspended}
                  onChange={onSuspendToggle}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition" />
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:translate-x-5 transition" />
              </label>
            </div>
          )}

          {/* Status (only shown if status is provided) */}
          {showStatus && (
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${
                status === "Running"
                  ? "bg-yellow-100 text-yellow-700"
                  : status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : status === "Quit"
                  ? "bg-red-100 text-red-500"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {status}
            </span>
          )}
        </div>
      </div>

      {/* Info Grid */}
      <div className="border-t pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-10 text-sm text-gray-700">
        {info.map((item, index) => (
          <div key={index}>
            <p className="font-medium">{item.label}</p>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReusableDetailsView;
