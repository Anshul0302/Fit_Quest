import { useParams } from "react-router-dom";
import { useState } from "react";

function UserDetailsPage() {
  const { id } = useParams();
  const [suspended, setSuspended] = useState(false);

  const user = {
    id,
    name: "John Doe",
    email: "john@gmail.com",
    avatar: "/avatar.png",
    taskName: "Weekly Battle #12",
    submitted: "Mar 31, 2025",
    calories: "1,500 kcal",
    images: [
      "/proof img.png",
      "/proof img.png",
      "/proof img.png",
      "/proof img.png",
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-xl mt-3 shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">User Details:</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Suspend</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={suspended}
              onChange={() => setSuspended(!suspended)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full p-1 duration-300 ease-in-out">
              <div
                className={`h-4 w-4 rounded-full bg-white shadow-md transform duration-300 ${
                  suspended ? "translate-x-5 bg-green-500" : ""
                }`}
              ></div>
            </div>
          </label>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Task Info */}
      <div className="grid grid-cols-3 gap-4 text-sm text-gray-700 mb-6">
        <div>
          <p className="font-medium">Task Name</p>
          <p>{user.taskName}</p>
        </div>
        <div>
          <p className="font-medium">Submitted</p>
          <p>{user.submitted}</p>
        </div>
        <div>
          <p className="font-medium">Calories Burned</p>
          <p>{user.calories}</p>
        </div>
      </div>

      {/* Uploaded Images */}
      <div className="mb-6">
        <p className="font-medium mb-2">Uploaded Images</p>
        <div className="flex gap-3">
          {user.images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`upload-${index}`}
              className="w-20 h-20 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <button className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600">
          Reject
        </button>
        <button className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600">
          Accept
        </button>
      </div>
    </div>
  );
}

export default UserDetailsPage;
