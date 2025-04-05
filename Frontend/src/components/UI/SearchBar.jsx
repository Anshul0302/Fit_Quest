import React from "react";

function SearchBar({ value, onChange }) {
  return (
    <div className="w-full md:w-auto">
      <input 
        type="text" 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        placeholder="Search challenges..." 
        className="w-full md:w-64 px-3 py-2 rounded border border-gray-300"
      />
    </div>
  );
}

export default SearchBar;
