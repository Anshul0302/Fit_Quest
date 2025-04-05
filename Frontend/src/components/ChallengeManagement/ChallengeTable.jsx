import { Link } from "react-router-dom";
import ReusableTable from "../UI/ReusableTable";
import ChallengeActionMenu from "./ChallengeActionMenu";
import { useState } from "react";
import ChallengeSearchFilter from "./ChallengeSearchFilter";
import { FilterModal } from "./ChallengeModal";

const initialChallenges = Array(5)
  .fill()
  .map((_, i) => ({
    id: i + 1,
    title: `Challenge ${i + 1}`,
    type: ["Weight Loss", "Muscle Gain", "Educational"][i % 3],
    startDate: "2025-04-01",
    status: ["Upcoming", "Running", "Completed"][i % 3],
  }));

const ChallengeTable = () => {
  const [challenges, setChallenges] = useState(initialChallenges);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const applyFilters = ({ status, type }) => {
    setStatus(status);
    setType(type);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setStatus("");
    setType("");
  };

  const filtered = challenges.filter((ch) => {
    return (
      ch.title.toLowerCase().includes(search.toLowerCase()) &&
      (status ? ch.status === status : true) &&
      (type ? ch.type === type : true)
    );
  });

  const handleUpdate = (updated) => {
    setChallenges(
      challenges.map((ch) => (ch.id === updated.id ? updated : ch))
    );
  };

  const handleDelete = (id) => {
    setChallenges(challenges.filter((ch) => ch.id !== id));
  };

  const columns = [
    {
      header: "Title",
      render: (ch) => (
        <Link
          to={`/admin/challenges/view/${ch.id}`}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          {ch.title}
        </Link>
      ),
    },
    { header: "Type", accessor: "type" },
    { header: "Start Date", accessor: "startDate" },
    {
      header: "Status",
      render: (ch) => (
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
          {ch.status}
        </span>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center m-4">
        <h2 className="text-xl font-semibold">Challenge Management</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setShowFilterModal(true)}
            className="border mt-1 border-gray-500 text-blue-500 bg-white px-4 py-2 rounded-lg text-sm hover:bg-blue-50"
          >
            Filter
          </button>
          <Link
            to="/challenges/add"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-1"
          >
            + Add Challenge
          </Link>
        </div>
      </div>

      {/* Search & Inline Filter */}
      <ChallengeSearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        type={type}
        setType={setType}
      />

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {/* Table */}
      <ReusableTable
        title=""
        columns={columns}
        data={filtered}
        renderActions={(ch) => (
          <ChallengeActionMenu
            data={ch}
            onEdit={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      />
    </div>
  );
};

export default ChallengeTable;
