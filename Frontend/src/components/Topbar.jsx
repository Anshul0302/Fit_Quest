import { BellIcon, ChevronDownIcon } from 'lucide-react';

// const Topbar = () => {
//   return (
//     <div className="bg-white p-4 flex justify-end items-center shadow-sm">
//       <BellIcon className="mr-4" />
//       <div className="flex items-center gap-2">
//         <img src="/avatar.png" className="w-8 h-8 rounded-full" alt="User" />
//         <span>Makise</span>
//         <ChevronDownIcon size={16} />
//       </div>
//     </div>
//   );
// };

// export default Topbar;

// Topbar.jsx
const Topbar = () => {
    return (
      <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FitQuest Logo" className="h-8" />
          <span className="text-xl font-bold text-gray-800">FitQuest</span>
        </div>
  
        {/* Right-side Controls (optional, like profile or logout) */}
        <div>
          {/* You can add buttons or user dropdown here */}
        </div>
      </div>
    );
  };
  
  export default Topbar;
  
