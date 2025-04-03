import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import UserTable from "../components/UserTable";

const UserManagement = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
