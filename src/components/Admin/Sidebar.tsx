import { Home, Package, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png"

const Sidebar = () => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home, to: '/admin-dashboard/home' },
    { id: 'orders', label: 'All Orders', icon: Package, to: '/admin-dashboard/orders' },
    { id: 'create', label: 'Create Order', icon: Plus, to: '/admin-dashboard/create' },
  ];

  return (
    <div className="bg-[#2047b2] text-white w-64 min-h-screen p-6">
      <div className="mb-8">
        <img src={logo} alt="" className="w-[150px] h-[30px]" />
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(({ id, label, icon: Icon, to }) => (
          <NavLink
            key={id}
            to={to}
            end={id === 'home'} // exact match for home route
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-blue-900 font-semibold'
                  : 'text-blue-100 hover:bg-blue-800'
              }`
            }
          >
            <Icon className="h-5 w-5" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
