import { useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import { BarChart3, Package, Truck, Users } from "lucide-react";

import OrdersTable from "./OrdersTable";
import type { Order } from "../../types";
import StatsCard from "./StatsCard ";
interface OutletContextType {
  orders: Order[];
  handleCreateOrder?: (formData: any) => void; // optional if not used here
  handleEditOrder?: (order: Order) => void;
  handleDeleteOrder?: (id: string) => void;
  setShowDeleteModal?: (id: string | null) => void;
}

const Home: React.FC = () => {
  // Use useOutletContext to get orders and other functions from parent
  const { orders } = useOutletContext<OutletContextType>();

  const totalRevenue = useMemo(() =>
    orders.reduce((sum, order) =>
      sum + parseFloat(order.value.replace(/[$,]/g, '')), 0
    ), [orders]
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Orders" value={orders.length} icon={Package} />
        <StatsCard title="In Transit" value={orders.filter(o => o.status === 'In Transit').length} icon={Truck} />
        <StatsCard title="Delivered" value={orders.filter(o => o.status === 'Delivered').length} icon={Users} />
        <StatsCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} icon={BarChart3} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <OrdersTable orders={orders} limit={5} />
      </div>
    </div>
  );
};

export default Home;
