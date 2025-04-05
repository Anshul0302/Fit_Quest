// components/Layout.js
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Topbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 px-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
