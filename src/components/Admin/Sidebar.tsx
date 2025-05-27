import { useState } from "react";
import { Home, Package, Plus } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../../assets/Logo.png"
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: Home, to: '/admin-dashboard/home' },
    { id: 'orders', label: 'All Orders', icon: Package, to: '/admin-dashboard/orders' },
    { id: 'create', label: 'Create Order', icon: Plus, to: '/admin-dashboard/create' },
  ];

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      navigate("/admin/login");
      setShowLogoutModal(false);
      setIsLoggingOut(false);
    }, 1500); // 1.5 second delay
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <>
      <div className="bg-[#2047b2] text-white w-64 h-screen p-6 flex flex-col justify-between">
        <div>
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
        <div onClick={handleLogoutClick} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer hover:font-semibold hover:bg-red-500">
          <p className="flex items-center gap-3">
            <FiLogOut size={18} color="white" />
            Log Out
          </p>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div
            className="fixed inset-0 bg-[#0000006f] flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 w-96 max-w-[90vw] shadow-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  {isLoggingOut ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-red-600 border-t-transparent"></div>
                  ) : (
                    <FiLogOut className="h-6 w-6 text-red-600" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {isLoggingOut ? "Logging out..." : "Confirm Logout"}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  {isLoggingOut 
                    ? "Please wait while we log you out safely..." 
                    : "Are you sure you want to logout? You will need to sign in again to access the dashboard."
                  }
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={cancelLogout}
                    disabled={isLoggingOut}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    disabled={isLoggingOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoggingOut && (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    )}
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;