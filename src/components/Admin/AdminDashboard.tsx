import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import EditOrderModal from "./EditOrderModal";
import DeleteModal from "./DeleteModal";
import Sidebar from "./Sidebar";
import type { Order, OrderFormData } from "../../types";
import { Home, Menu, Package, Plus } from "lucide-react";
import logo from "../../assets/Logo.png"
import { CgClose } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";

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
        },
    ]);

    const [editingOrder, setEditingOrder] = useState<Order | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

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
        { id: 'home', label: 'Dashboard', icon: Home, to: '/admin-dashboard/home' },
        { id: 'orders', label: 'All Orders', icon: Package, to: '/admin-dashboard/orders' },
        { id: 'create', label: 'Create Order', icon: Plus, to: '/admin-dashboard/create' },
    ];

    const [mobileNav, setMobileNav] = useState(false)

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
            <div className="max-md:flex md:hidden justify-between p-4 bg-[#274cb2]">
                <img src={logo} alt="" className="w-[150px] h-[30px]" />
                <Menu color="white" onClick={()=>setMobileNav(true)} size={30} cursor="pointer" />
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
                className="bg-blue-900 fixed text-white w-64 min-h-screen p-6"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ 
                    type: "spring", 
                    damping: 25, 
                    stiffness: 200 
                }}
            >
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
                                duration: 0.3 
                            }}
                        >
                            <NavLink
                                to={to}
                                end={id === 'home'}
                                className={({ isActive }) =>
                                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-white text-blue-900 font-semibold'
                                        : 'text-blue-100 hover:bg-blue-800'
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
            </motion.div>
        </motion.div>
    )}
</AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
