// pages/UserDetails.js
import { useState } from "react";
import ProfileView from "../ReusableDetailsView";

const UserDetails = () => {
  const [suspended, setSuspended] = useState(false);

  const user = {
    id: 1,
    name: "John Doe",
    email: "john@email.com",
    avatar: "https://i.pravatar.cc/100?img=5",
    age: 28,
    gender: "Male",
    height: `5'9" (175 cm)`,
    weight: "75 kg (165 lbs)",
    goals: "Muscle Gain",
    calories: "1,500 kcal",
    level: 5,
    xp: 1200,
    completed: 100,
    quit: 20,
    isSuspended: false,
  };

  const handleSuspendToggle = () => setSuspended((prev) => !prev);

  const handleViewChallenges = () => alert(`Viewing challenges for ${user.name}`);

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
    <ProfileView
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
