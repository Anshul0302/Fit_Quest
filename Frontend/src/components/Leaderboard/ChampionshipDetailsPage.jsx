import { useNavigate, useParams } from "react-router-dom";

function ChampionshipDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const championship = {
    id,
    title: `Weekly Battle #${id}`,
    status: "Running",
    dateRange: "Apr 1 - Apr 7, 2025",
    image: "/challenge1.png",
    entryCost: "50 FQC",
    totalPrizePool: "5,000 FQC",
    leagueXPRanges: "0-500 XP",
    firstPrize: "2,500 FQC",
    secondPrize: "1,500 FQC",
    thirdPrize: "1,000 FQC",
    participants: 520,
    description: "Burn fat with HIIT & diet tracking!",
    taskName: "Jump Squats (3 sets, 15 reps)",
    caloriesBurned: "1,500 kcal",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Championship Details:</h2>
        <button
          className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
          onClick={() => navigate("/participants")}
        >
          View Participants
        </button>
      </div>

      <div className="border rounded-lg p-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <img
              src={championship.image}
              alt="champ"
              className="w-16 h-16 rounded object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">{championship.title}</h3>
              <p className="text-sm text-gray-500">{championship.dateRange}</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
            {championship.status}
          </span>
        </div>

        {/* Championship Info */}
        <div>
          <h4 className="font-medium mb-2">Championship Information</h4>
          <div className="grid grid-cols-3 gap-y-3 text-sm text-gray-700">
            <div>
              Entry FQC Cost:{" "}
              <span className="font-semibold">{championship.entryCost}</span>
            </div>
            <div>
              Total Prize Pool:{" "}
              <span className="font-semibold">
                {championship.totalPrizePool}
              </span>
            </div>
            <div>
              League XP Ranges:{" "}
              <span className="font-semibold">
                {championship.leagueXPRanges}
              </span>
            </div>

            <div>
              1st FQC Prize:{" "}
              <span className="font-semibold">{championship.firstPrize}</span>
            </div>
            <div>
              2nd FQC Prize:{" "}
              <span className="font-semibold">{championship.secondPrize}</span>
            </div>
            <div>
              3rd FQC Prize:{" "}
              <span className="font-semibold">{championship.thirdPrize}</span>
            </div>

            <div>
              Start & End Date:{" "}
              <span className="font-semibold">{championship.dateRange}</span>
            </div>
            <div>
              Participants:{" "}
              <span className="font-semibold">{championship.participants}</span>
            </div>
            <div>
              Championship Description:{" "}
              <span className="font-semibold">{championship.description}</span>
            </div>
          </div>
        </div>

        {/* Task Info */}
        <div>
          <h4 className="font-medium mb-2">Task Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              Task Name:{" "}
              <span className="font-semibold">{championship.taskName}</span>
            </div>
            <div>
              Calories Burned:{" "}
              <span className="font-semibold">
                {championship.caloriesBurned}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChampionshipDetailsPage;
