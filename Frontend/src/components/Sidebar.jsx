import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UsersIcon,
  ShoppingCartIcon,
  TrophyIcon,
  CreditCardIcon,
  BarChart2Icon,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-white w-60 p-4 min-h-screen shadow">
      <h2 className="text-2xl font-bold text-purple-500 mb-8">Fitquest</h2>
      <ul className="space-y-4 text-gray-700">
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/dashboard") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-2 w-full"
          >
            <HomeIcon size={18} /> Dashboard
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/users") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link to="/admin/users" className="flex items-center gap-2 w-full">
            <UsersIcon size={18} /> User Management
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/orders") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link to="/admin/orders" className="flex items-center gap-2 w-full">
            <ShoppingCartIcon size={18} /> Order Management
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/challenges") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link
            to="/admin/challenges"
            className="flex items-center gap-2 w-full"
          >
            <TrophyIcon size={18} /> Challenges
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/store") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link to="/admin/store" className="flex items-center gap-2 w-full">
            <CreditCardIcon size={18} /> Store Management
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/subscription") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link
            to="/admin/subscription"
            className="flex items-center gap-2 w-full"
          >
            <CreditCardIcon size={18} /> Subscription
          </Link>
        </li>
        <li
          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
            isActive("/admin/leaderboard") ? "bg-purple-600 text-white" : ""
          }`}
        >
          <Link
            to="/admin/leaderboard"
            className="flex items-center gap-2 w-full"
          >
            <BarChart2Icon size={18} /> Leaderboard
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
