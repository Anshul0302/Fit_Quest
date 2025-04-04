import {
    HomeIcon,
    UsersIcon,
    ShoppingCartIcon,
    TrophyIcon,
    Store,
    CreditCardIcon,
    BarChart2Icon,
  } from 'lucide-react';
  
  import { NavLink } from 'react-router-dom';
  
  const Sidebar = () => {
    const navItems = [
      { label: 'Dashboard', icon: <HomeIcon size={18} />, path: '/dashboard' },
      { label: 'User Management', icon: <UsersIcon size={18} />, path: '/user-management' },
      { label: 'Order Management', icon: <ShoppingCartIcon size={18} />, path: '/orders' },
      { label: 'Challenge & Quest', icon: <TrophyIcon size={18} />, path: '/challenges' },
      { label: 'Store Management', icon: <Store size={18} />, path: '/store' },
      { label: 'Subscription', icon: <CreditCardIcon size={18} />, path: '/subscriptions' },
      { label: 'Leaderboard', icon: <BarChart2Icon size={18} />, path: '/leaderboard' },
      { label: 'Payment', icon: <CreditCardIcon size={18} />, path: '/payments' },
    ];
  
    return (
      <div className="bg-white w-[20%] p-4 min-h-screen shadow">
        <ul className="space-y-4 text-gray-700">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                    isActive
                      ? 'bg-purple-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`
                }
              >
                {item.icon} {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Sidebar;
  