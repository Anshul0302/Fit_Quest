import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-xl shadow max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">User Details:</h2>
        <button
          onClick={() => navigate("/admin/user/history/1")}
          className="px-4 py-1 border rounded-full text-sm border-blue-500 text-blue-500 hover:bg-blue-50"
        >
          Task History
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <img
          src="/avatar.png"
          alt="User Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h4 className="font-semibold">John Doe</h4>
          <p className="text-sm text-gray-500">john@email.com</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500">Suspended</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <h5 className="text-gray-500">Level</h5>
          <p className="font-semibold">98</p>
        </div>
        <div>
          <h5 className="text-gray-500">XP Earned</h5>
          <p className="font-semibold">12,000</p>
        </div>
        <div>
          <h5 className="text-gray-500">FQC Earned</h5>
          <p className="font-semibold">12,000</p>
        </div>
        <div>
          <h5 className="text-gray-500">Tasks</h5>
          <p className="font-semibold">15/30</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
