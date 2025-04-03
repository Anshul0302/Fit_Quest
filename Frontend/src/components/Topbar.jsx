import React, { useState, useEffect } from "react";
import { BellIcon, ChevronDownIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Topbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get(
        "http://localhost:8000/api/notification/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Optional: Set interval to auto-refresh
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        {/* <img src="/fitquestLogo1.png" alt="FitQuest Logo" className="h-8" /> */}
        {/* <span className="text-xl font-bold text-gray-800">FitQuest</span> */}
      </div>

      {/* Right-side Controls */}
      <div className="flex items-center gap-6 relative">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <BellIcon className="text-gray-600" size={20} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>

        {/* Admin Profile Dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img
              src="/avatar.png"
              alt="Admin"
              className="w-8 h-8 rounded-full border"
            />
            <span className="font-medium">{adminName}</span>
            <ChevronDownIcon size={16} />
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white shadow rounded w-40 z-10">
              <ul className="text-sm text-gray-700">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/admin/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
