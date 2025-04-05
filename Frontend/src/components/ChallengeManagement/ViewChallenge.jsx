import { useNavigate, useParams } from "react-router-dom";

const ViewChallenge = () => {
  const { id } = useParams();
  // Fetch challenge details by id
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">Challenge Details:</h2>

      <div className="flex items-center gap-4 mb-6">
        <img
          src="/challenge1.png"
          className="w-12 h-11 rounded-lg"
          alt="Banner"
        />
        <div>
          <h3 className="text-lg font-bold">30-Day Fat Burn</h3>
          <p className="text-sm text-gray-500">Muscle Gain</p>
        </div>
        <button
          className="ml-auto px-4 py-1 border rounded-full text-sm border-blue-500 text-blue-500 hover:bg-blue-50"
          onClick={() => navigate("/admin/challenges/participants/123")} // pass challenge ID here
        >
          View Participants
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-md font-semibold border-b pb-1">
            Challenge Information
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2 text-sm">
            <div>
              <span className="font-medium">Difficulty Level:</span>{" "}
              Intermediate
            </div>
            <div>
              <span className="font-medium">Duration:</span> 30 Days
            </div>
            <div>
              <span className="font-medium">Dates:</span> March 5 – April 5
            </div>
            <div>
              <span className="font-medium">Total XP:</span> 500
            </div>
            <div>
              <span className="font-medium">Total FQC:</span> 100
            </div>
            <div>
              <span className="font-medium">Description:</span> Burn fat with
              HIIT & diet tracking!
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold border-b pb-1">
            Task Information
          </h4>
          <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
            <div>
              <span className="font-medium">Task Name:</span> Jump Squats (3
              sets, 15 reps)
            </div>
            <div>
              <span className="font-medium">Calories Burned:</span> 1,500 kcal
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold border-b pb-1">
            Diet Information
          </h4>
          <div className="flex flex-col gap-3 mt-2">
            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
              >
                <div>
                  <p className="font-medium">Nandrolone Phenylpropionate</p>
                  <p className="text-xs text-gray-500">PHARMACEUTICALS</p>
                </div>
                <button className="text-sm text-blue-500 border px-2 py-1 rounded hover:bg-blue-50">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewChallenge;
