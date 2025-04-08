import ReusableDetailsView from "../ReusableDetailsView";
import { useNavigate, useParams } from "react-router-dom";
import DietInfoList from "../DietInfoList"; // ✅ Import the reusable component

const UserChallengeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const challenge = {
    id,
    name: "30-Day Fat Burn",
    type: "Muscle Gain",
    status: "Running",
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?fit=crop&w=600&q=80",
    difficulty: "Intermediate",
    duration: "30 Days",
    dates: "March 5 - April 5",
    xp: 500,
    fqc: 100,
    description: "Burn fat with HIIT & diet tracking!",
    task: {
      name: "Jump Squats (3 sets, 15 reps)",
      calories: "1,500 kcal",
    },
    products: [
      { name: "Nandrolone Phenylpropionate", category: "Pharmaceuticals" },
      { name: "Nandrolone Phenylpropionate", category: "Pharmaceuticals" },
    ],
  };

  const handleViewParticipants = () => {
    navigate(`/challenge/participants/${challenge.id}`);
  };

  const info = [
    { label: "Difficulty Level", value: challenge.difficulty },
    { label: "Duration", value: challenge.duration },
    { label: "Duration & Dates", value: challenge.dates },
    { label: "Total XP", value: challenge.xp },
    { label: "Total FQC", value: challenge.fqc },
    { label: "Challenge Description", value: challenge.description },
    { label: "Task Name", value: challenge.task.name },
    { label: "Calories Burned", value: challenge.task.calories },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-5xl mx-auto mt-10">
      <ReusableDetailsView
        title="Challenge Details:"
        avatar={challenge.image}
        name={challenge.name}
        email={challenge.type}
        info={info}
        onPrimaryAction={handleViewParticipants}
        primaryActionLabel="View Participants"
        // isSuspended={false}
        status={challenge.status}
      />


      {/* Reusable Diet Component */}
      <DietInfoList products={challenge.products} />
    </div>
  );
};

export default UserChallengeDetails;
