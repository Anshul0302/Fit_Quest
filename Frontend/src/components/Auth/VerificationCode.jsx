import axios from "axios";
import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VerificationCode = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6 || !email) {
      alert("Invalid OTP or missing email.");
      return;
    }

    console.log("Sending OTP verification with:", { email, otp: enteredOtp });
    try {
      console.log("Sending OTP verification with:", { email, otp: enteredOtp });

      const res = await axios.post(
        "http://43.205.49.98:8000/api/auth/verify-otp",
        {
          email,
          otp: enteredOtp,
        }
      );

      const token = res.data.token;

      navigate("/reset-password", { state: { email, token } });
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to verify OTP.");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center px-4">
      <div className=" h-[70%] flex w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden">
        {/* ............................................Left Panel.................................... */}
        <div className="h-full w-1/2 bg-white px-12 py-20 flex flex-col justify-center">
          <div className="flex justify-center mb-7">
            <img
              src="/src/assets/images/fitquestLogo1.png"
              alt="FitQuest Logo"
              className="h-20 "
            />
          </div>
          <div className="mb-5 px-7">
            <h3 className="text-xl font-semibold mb-2 text-gray-500">
              OTP Verification
            </h3>
            <p className="text-sm text-gray-400">
              Enter the 6-digit OTP sent to your email to proceed.
            </p>
          </div>

          <div className="space-y-4 w-full max-w-md mx-auto">
            {/* Otp Input */}
            <div className="flex justify-start space-x-6 mt-4 gap-1 ">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>

            {/* Verify Button*/}
            <button
              className="w-full rounded-xl h-8"
              style={{ backgroundColor: "#6B6DFE", color: "white" }}
              onClick={() => handleVerify()}
            >
              Verify
            </button>

            {/* Resend code button*/}

            <button
              className="bg-white text-blue-600 cursor-pointer "
              onClick={() => console.log("resend")}
            >
              Resend code
            </button>
          </div>
        </div>
        {/* ............................................image on Right.................................... */}
        <div className="h-full  w-1/2 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-2xl relative overflow-hidden">
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

export default VerificationCode;
