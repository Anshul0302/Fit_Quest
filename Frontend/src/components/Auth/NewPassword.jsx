import React, { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Moved inside component
  const token = location.state?.token; // ✅ This will now work correctly
  console.log("🚨 Token from location.state:", location.state?.token);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || password !== confirmPassword) {
      setMsg("Passwords do not match or are empty.");
      return;
    }

    console.log("👉 Sending to backend:", { token, newPassword: password });

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          token,
          newPassword: password,
        }
      );

      setMsg("✅ Password reset successful! You can now login.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("❌ Reset failed:", err);
      setMsg(err.response?.data?.msg || "Something went wrong.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className="h-[70%] flex w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="w-1/2 h-full bg-white px-12 py-20 flex flex-col justify-center">
          <div className="flex justify-center mb-7">
            <img
              src="/src/assets/images/fitquestLogo1.png"
              alt="FitQuest Logo"
              className="h-20"
            />
          </div>
          <div className="mb-5 px-7">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">
              Create a New Password
            </h3>
            <p className="text-sm text-gray-400">
              Set a strong password to secure your account.
            </p>
          </div>

          {msg && <div className="text-sm text-red-500 mb-2">{msg}</div>}

          <div className="space-y-4 w-full max-w-md mx-auto">
            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm">
              <MdLockOutline className="text-gray-500 mr-2 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="flex-1 outline-none bg-transparent"
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye
                className="text-gray-500 text-xl ml-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-xl px-4 py-2 shadow-sm">
              <MdLockOutline className="text-gray-500 mr-2 text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="flex-1 outline-none bg-transparent"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <AiOutlineEye
                className="text-gray-500 text-xl ml-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            <button
              className="w-full rounded-xl h-8"
              style={{ backgroundColor: "#6B6DFE", color: "white" }}
              onClick={handleReset}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-1/2 h-full bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl relative overflow-hidden">
          <img
            src="/src/assets/images/muscled-women.png"
            className="absolute bottom-0 right-0 h-full object-cover"
            alt="fitness"
          />
          <div className="absolute bottom-0 bg-white/20 backdrop-blur-lg m-8 p-4 rounded-lg">
            <h4 className="text-xl font-bold text-white">
              Transform Your Fitness, One Step at a Time!
            </h4>
            <p className="text-sm text-white mt-2">
              Track workouts, join challenges, earn rewards, and achieve your
              fitness goals effortlessly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
