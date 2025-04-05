import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReusableTable from "../UI/ReusableTable";
import { DeleteConfirmModal } from "../ChallengeManagement/ChallengeModal";
import { FilterModal } from "../ChallengeManagement/ChallengeModal";
import ChallengeActionMenu from "../ChallengeManagement/ChallengeActionMenu";
import ChampionshipActionMenu from "./ChampionshipActionMenu";

const initialChampionships = [
  {
    id: 1,
    title: "Championship 1",
    type: "Running",
    status: "Upcoming",
    startDate: "2025-05-01",
    endDate: "2025-05-11",
    totalPrizePool: "$ 10,000",
  },
  {
    id: 2,
    title: "Championship 2",
    type: "Cycling",
    status: "Running",
    startDate: "2025-04-15",
    endDate: "2025-05-21",
    totalPrizePool: "$ 10,000",
  },
  {
    id: 1,
    title: "Championship 1",
    type: "Running",
    status: "Upcoming",
    startDate: "2025-05-01",
    endDate: "2025-05-11",
    totalPrizePool: "$ 10,000",
  },
  {
    id: 2,
    title: "Championship 2",
    type: "Cycling",
    status: "Running",
    startDate: "2025-04-15",
    endDate: "2025-05-21",
    totalPrizePool: "$ 10,000",
  },
  {
    id: 1,
    title: "Championship 1",
    type: "Running",
    status: "Upcoming",
    startDate: "2025-05-01",
    endDate: "2025-05-11",
    totalPrizePool: "$ 10,000",
  },
  {
    id: 2,
    title: "Championship 2",
    type: "Cycling",
    status: "Running",
    startDate: "2025-04-15",
    endDate: "2025-05-21",
    totalPrizePool: "$ 10,000",
  },
];

function ChampionshipListPage() {
  const [championships, setChampionships] = useState(initialChampionships);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChampionship, setSelectedChampionship] = useState(null);
  const navigate = useNavigate();

  const handleUpdate = (updatedChamp) => {
    setChampionships((prev) =>
      prev.map((ch) => (ch.id === updatedChamp.id ? updatedChamp : ch))
    );
  };

  const columns = [
    {
      header: "Title",
      render: (champ) => (
        <Link
          to={`/championships/view/${champ.id}`}
          className="text-blue-600 hover:underline"
        >
          {champ.title}
        </Link>
      ),
    },
    { header: "Type", accessor: "type" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Total Prize Pool", accessor: "totalPrizePool" },
    {
      header: "Status",
      render: (champ) => (
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium">
          {champ.status}
        </span>
      ),
    },
  ];

  const handleDelete = (id) => {
    setChampionships(championships.filter((champ) => champ.id !== id));
    setShowDeleteModal(false);
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Championships List</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 bg-white text-black border border-gray-300 w-30 hover:bg-gray-200 rounded-lg"
          >
            Filter
          </button>
          <Link
            to="/championships/create"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            + Create Championship
          </Link>
        </div>
      </div>

      {/* Table */}
      <ReusableTable
        title=""
        columns={columns}
        data={championships}
        renderActions={(ch) => (
          <ChampionshipActionMenu
            data={ch}
            // onEdit={handleUpdate}
            onDelete={() => {
              setSelectedChampionship(ch);
              setShowDeleteModal(true);
            }}
            onView={() => navigate(`/championships/view/${ch.id}`)}
          />
        )}
      />

      {/* Modals */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={(filters) => {
          setShowFilterModal(false);
        }}
        onReset={() => {}}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDelete(selectedChampionship.id)}
        championshipId={selectedChampionship ? selectedChampionship.id : ""}
      />
    </div>
  );
}

export default ChampionshipListPage;
