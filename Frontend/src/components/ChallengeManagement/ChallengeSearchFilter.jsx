// components/ChallengeManagement/ChallengeSearchFilter.js
const ChallengeSearchFilter = ({
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-64 bg-white"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-48 bg-white"
      >
        <option value="">All Status</option>
        <option value="Upcoming">Upcoming</option>
        <option value="Running">Running</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-48 bg-white"
      >
        <option value="">All Types</option>
        <option value="Fitness">Fitness</option>
        <option value="Mindset">Mindset</option>
        <option value="Productivity">Productivity</option>
      </select>
    </div>
  );
};

export default ChallengeSearchFilter;
