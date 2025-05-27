import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import EditOrderModal from "./EditOrderModal";
import DeleteModal from "./DeleteModal";
import Sidebar from "./Sidebar";
import type { Order, OrderFormData } from "../../types";
import { Home, Menu, Package, Plus } from "lucide-react";
import logo from "../../assets/Logo.png";
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { FiLogOut } from "react-icons/fi";

const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "EECS-001",
      customer: "John Smith",
      origin: "New York, NY",
      destination: "Los Angeles, CA",
      status: "In Transit",
      date: "2024-01-15",
      value: "$1,250.00",
      notes: "Fragile items - handle with care",
      currentLocation: undefined,
    },
    {
      id: "EECS-002",
      customer: "Sarah Johnson",
      origin: "Chicago, IL",
      destination: "Miami, FL",
      status: "Delivered",
      date: "2024-01-14",
      value: "$875.50",
      notes: "Express delivery requested",
      currentLocation: undefined,
    },
    {
      id: "EECS-003",
      customer: "Mike Davis",
      origin: "Seattle, WA",
      destination: "Boston, MA",
      status: "Pending",
      date: "2024-01-16",
      value: "$2,100.75",
      notes: "Large shipment - requires special handling",
      currentLocation: undefined,
    },
    {
      id: "EECS-004",
      customer: "Emma Wilson",
      origin: "Denver, CO",
      destination: "Atlanta, GA",
      status: "In Transit",
      date: "2024-01-13",
      value: "$950.25",
      notes: "Standard delivery",
      currentLocation: undefined,
    },
  ]);

  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleCreateOrder = (formData: OrderFormData) => {
    const order: Order = {
      id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
      customer: formData.customer,
      origin: formData.origin,
      destination: formData.destination,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      value: formData.value.startsWith("$")
        ? formData.value
        : `$${formData.value}`,
      notes: formData.notes,
      currentLocation: undefined,
    };
    setOrders([...orders, order]);
    alert("Order created successfully!");
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
  };

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map((order) =>
      order.id === updatedOrder.id
        ? {
            ...updatedOrder,
            value: updatedOrder.value.startsWith("$")
              ? updatedOrder.value
              : `$${updatedOrder.value}`,
          }
        : order
    );
    setOrders(updatedOrders);
    setEditingOrder(null);
    alert("Order updated successfully!");
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter((order) => order.id !== orderId));
    setShowDeleteModal(null);
    alert("Order deleted successfully!");
  };

  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home, to: "/admin-dashboard/home" },
    {
      id: "orders",
      label: "All Orders",
      icon: Package,
      to: "/admin-dashboard/orders",
    },
    {
      id: "create",
      label: "Create Order",
      icon: Plus,
      to: "/admin-dashboard/create",
    },
  ];

  const navigate = useNavigate();
  const [mobileNav, setMobileNav] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setMobileNav(false); // Close mobile nav when logout modal opens
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
    <div className="flex max-md:flex-col-reverse h-screen bg-gray-100">
      <div className="max-md:hidden">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-auto">
        <main className="p-4">
          <Outlet
            context={{
              orders,
              handleCreateOrder,
              handleEditOrder,
              handleDeleteOrder,
              setShowDeleteModal,
            }}
          />
        </main>
      </div>

      <EditOrderModal
        order={editingOrder}
        onClose={() => setEditingOrder(null)}
        onSave={handleUpdateOrder}
      />

      <DeleteModal
        isOpen={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        onConfirm={() => handleDeleteOrder(showDeleteModal!)}
        orderId={showDeleteModal}
      />

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
                    : "Are you sure you want to logout? You will need to sign in again to access the dashboard."}
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

      <div className="max-md:flex md:hidden justify-between p-4 bg-[#274cb2]">
        <img src={logo} alt="" className="w-[150px] h-[30px]" />
        <Menu
          color="white"
          onClick={() => setMobileNav(true)}
          size={30}
          cursor="pointer"
        />
      </div>

      <AnimatePresence>
        {mobileNav && (
          <motion.div
            className="w-screen flex justify-end "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-blue-900 fixed text-white w-64 h-screen p-6 flex flex-col justify-between"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
            >
              <div>
                <div className="mb-8 flex justify-end">
                  <CgClose
                    color="white"
                    onClick={() => setMobileNav(false)}
                    size={30}
                    cursor="pointer"
                  />
                </div>

                <nav className="space-y-2">
                  {menuItems.map(({ id, label, icon: Icon, to }, index) => (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        duration: 0.3,
                      }}
                    >
                      <NavLink
                        to={to}
                        end={id === "home"}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-white text-blue-900 font-semibold"
                              : "text-blue-100 hover:bg-blue-800"
                          }`
                        }
                        onClick={() => setMobileNav(false)} // Close nav on link click
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </NavLink>
                    </motion.div>
                  ))}
                </nav>
              </div>
              <div
                onClick={handleLogoutClick}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer hover:font-semibold hover:bg-red-500"
              >
                <p className="flex items-center gap-3">
                  <FiLogOut size={18} color="white" />
                  Log Out
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
