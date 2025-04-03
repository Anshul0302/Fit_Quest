import {
    HomeIcon,
    UsersIcon,
    ShoppingCartIcon,
    TrophyIcon,
    // BuildingStorefrontIcon,
    CreditCardIcon,
    BarChart2Icon
  } from 'lucide-react';
  
  const Sidebar = () => {
    return (
      <div className="bg-white w-60 p-4 min-h-screen shadow">
        <h2 className="text-2xl font-bold text-purple-500 mb-8">Fitquest</h2>
        <ul className="space-y-4 text-gray-700">
          <li className="flex items-center gap-2 cursor-pointer">
            <HomeIcon size={18} /> Dashboard
          </li>
          <li className="flex items-center gap-2 text-white bg-purple-600 p-2 rounded-lg cursor-pointer">
            <UsersIcon size={18} /> User Management
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <ShoppingCartIcon size={18} /> Order Management
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <TrophyIcon size={18} /> Challenge & Quest
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            {/* <BuildingStorefrontIcon size={18} /> */}
             Store Management
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <CreditCardIcon size={18} /> Subscription
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <BarChart2Icon size={18} /> Leaderboard
          </li>
          <li className="flex items-center gap-2 cursor-pointer">
            <CreditCardIcon size={18} /> Payment
          </li>
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  