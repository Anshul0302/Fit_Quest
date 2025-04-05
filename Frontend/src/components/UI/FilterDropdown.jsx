import React, { Fragment } from "react";
import { Listbox } from "@headlessui/react";

function FilterDropdown({ label, options, value, onChange }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-full md:w-auto">
        {/* Button toggling the list */}
        <Listbox.Button className="w-full flex justify-between items-center px-3 py-2 bg-white border border-gray-300 rounded text-sm">
          <span>{label}: <span className="font-medium">{value}</span></span>
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 7l4.5 4 4.5-4H5.5z" />
          </svg>
        </Listbox.Button>
        {/* Options dropdown */}
        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
          {options.map((option) => (
            <Listbox.Option 
              key={option} 
              value={option} 
              as={Fragment}
            >
              {({ active, selected }) => (
                <li 
                  className={`px-3 py-2 cursor-pointer ${active ? "bg-blue-500 text-white" : "text-gray-700"} ${selected ? "font-semibold" : ""}`}
                >
                  {option}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default FilterDropdown;
