// // pages/UserDetails.js
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import ReusableDetailsView from "../ReusableDetailsView";

// const UserDetails = () => {
//   const [suspended, setSuspended] = useState(false);
//   const navigate = useNavigate()

//   const user = {
//     id: 1,
//     name: "John Doe",
//     email: "john@email.com",
//     avatar: "https://i.pravatar.cc/100?img=5",
//     age: 28,
//     gender: "Male",
//     height: `5'9" (175 cm)`,
//     weight: "75 kg (165 lbs)",
//     goals: "Muscle Gain",
//     calories: "1,500 kcal",
//     level: 5,
//     xp: 1200,
//     completed: 100,
//     quit: 20,
//     isSuspended: false,
//   };

//   const handleSuspendToggle = () => setSuspended((prev) => !prev);

//   const handleViewChallenges = () => {navigate(`/user-management/user-challenges/${user.id}`)};

//   const userInfo = [
//     { label: "Age", value: `${user.age} Years` },
//     { label: "Gender", value: user.gender },
//     { label: "Height", value: user.height },
//     { label: "Weight", value: user.weight },
//     { label: "Fitness Goals", value: user.goals },
//     { label: "Calories Burned", value: user.calories },
//     { label: "Level", value: user.level },
//     { label: "Total XP Earned", value: user.xp },
//     { label: "Total Challenge Completed", value: user.completed },
//     { label: "Total Challenge Quit", value: user.quit },
//   ];

//   return (
//     <ReusableDetailsView
//       title="User Details"
//       avatar={user.avatar}
//       name={user.name}
//       email={user.email}
//       info={userInfo}
//       isSuspended={suspended}
//       onSuspendToggle={handleSuspendToggle}
//       onPrimaryAction={handleViewChallenges}
//       primaryActionLabel="View Challenges"
//     />
//   );
// };

// export default UserDetails;
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReusableDetailsView from "../ReusableDetailsView";
import axios from "axios"; // Assuming you're using axios

const UserDetails = () => {
  const { id } = useParams(); // ✅ Grab user ID from route
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [suspended, setSuspended] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSuspendToggle = () => setSuspended((prev) => !prev);

  const handleViewChallenges = () => {
    navigate(`/user-management/user-challenges/${id}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("adminToken"); // Or "userToken" based on your app
        const res = await axios.get( 
          `${import.meta.env.VITE_API_URL}/api/auth/me/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
        setSuspended(res.data.isSuspended || false);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false);
      }
    };
  
    if (id) fetchUser();
  }, [id]);
  
  if (loading) return <p className="text-center mt-10">Loading user details...</p>;
  if (!user) return <p className="text-center mt-10 text-red-500">User not found.</p>;

  const userInfo = [
    { label: "Age", value: `${user.age} Years` },
    { label: "Gender", value: user.gender },
    { label: "Height", value: user.height },
    { label: "Weight", value: user.weight },
    { label: "Fitness Goals", value: user.goals },
    { label: "Calories Burned", value: user.calories },
    { label: "Level", value: user.level },
    { label: "Total XP Earned", value: user.xp },
    { label: "Total Challenge Completed", value: user.completed },
    { label: "Total Challenge Quit", value: user.quit },
  ];

  return (
    <ReusableDetailsView
      title="User Details"
      avatar={user.avatar}
      name={user.name}
      email={user.email}
      info={userInfo}
      isSuspended={suspended}
      onSuspendToggle={handleSuspendToggle}
      onPrimaryAction={handleViewChallenges}
      primaryActionLabel="View Challenges"
    />
  );
};

export default UserDetails;

