import { Outlet } from "react-router-dom";

const StoreManagement = () => {
  return (
    <div className="flex-1 p-6">
      {/* Any common UI or page title here */}
      <Outlet /> {/* Renders UserTable or UserDetails */}
    </div>
  );
};

export default StoreManagement;
