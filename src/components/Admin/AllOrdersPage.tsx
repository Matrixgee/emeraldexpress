import { Search, Edit2, Trash2, X, Save } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "../config/axiosconfig";
import toast from "react-hot-toast";

type Order = {
  id: string;
  shipperName: string;
  receiverName: string;
  origin: string;
  destination: string;
  status: string;
  stage: number;
  departureDate: string;
  expectedDelivery: string;
  carrier: string;
  totalFreight: string;
};

const AllOrdersPage = () => {
  const statusStages = [
    { stage: 0, name: "Order Placed", percentage: 0 },
    { stage: 1, name: "Processing", percentage: 25 },
    { stage: 2, name: "In Transit", percentage: 50 },
    { stage: 3, name: "Out for Delivery", percentage: 75 },
    { stage: 4, name: "Delivered", percentage: 100 }
  ];


  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const adminToken = localStorage.getItem("token");
  const headers = {
    headers: { Authorization: `Bearer ${adminToken}` },
  }

useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get<Order[]>("/getAllOrders", headers)
      setOrders(res.data);
      console.log(res.data)
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchOrders();
}, []);

  const getStatusFromStage = (stage: number) => {
    const statusStage = statusStages.find(s => s.stage === stage);
    return statusStage ? statusStage.name : 'Unknown';
  };

  const getStageFromStatus = (status: string) => {
    const statusStage = statusStages.find(s => s.name === status);
    return statusStage ? statusStage.stage : 0;
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shipperName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.receiverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (order: Order) => {
    setEditingOrder({ ...order });
  };

  const handleSaveEdit = () => {
    if (!editingOrder) return;
    setOrders(orders.map(order => order.id === editingOrder.id ? editingOrder : order));
    setEditingOrder(null);
  };

  const handleDelete = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
    setShowDeleteConfirm(null);
  };

  const handleEditChange = (field: keyof Order, value: string | number) => {
    if (!editingOrder) return;
    let updatedOrder = { ...editingOrder, [field]: value };
    
    // If status is changed, update the stage accordingly
    if (field === 'status') {
      updatedOrder.stage = getStageFromStatus(value as string);
    }
    // If stage is changed, update the status accordingly
    if (field === 'stage') {
      updatedOrder.status = getStatusFromStage(value as number);
    }
    
    setEditingOrder(updatedOrder);
  };

  const ProgressBar = ({ stage }: { stage: number }) => {
    const currentStage = statusStages.find(s => s.stage === stage);
    const percentage = currentStage ? currentStage.percentage : 0;
    
    return (
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>{currentStage?.name}</span>
          <span>{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              stage === 4 ? 'bg-green-500' : 
              stage >= 2 ? 'bg-blue-500' : 
              stage >= 1 ? 'bg-yellow-500' : 'bg-gray-400'
            }`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };




  return (
    <div className="p-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All Orders</h2>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="order placed">Order Placed</option>
            <option value="processing">Processing</option>
            <option value="in transit">In Transit</option>
            <option value="out for delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

{
  isLoading ? toast.loading("Loading Orders") :

        <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{order.id}</div>
                      <div className="text-sm text-gray-500">From: {order.shipperName}</div>
                      <div className="text-sm text-gray-500">To: {order.receiverName}</div>
                      <div className="text-sm text-gray-500">Carrier: {order.carrier}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{order.origin}</div>
                    <div className="text-sm text-gray-500">↓</div>
                    <div className="text-sm text-gray-900">{order.destination}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">Dep: {order.departureDate}</div>
                    <div className="text-sm text-gray-500">ETA: {order.expectedDelivery}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-32">
                      <ProgressBar stage={order.stage} />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.totalFreight}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(order)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        title="Edit order"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(order.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                        title="Delete order"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
}

      {/* Edit Modal */}
      {editingOrder && (
        <div className="fixed inset-0 bg-[#0000006f] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Order</h3>
              <button
                onClick={() => setEditingOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order ID</label>
                  <input
                    type="text"
                    value={editingOrder.id}
                    onChange={(e) => handleEditChange('id', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Stage</label>
                  <select
                    value={editingOrder.stage}
                    onChange={(e) => handleEditChange('stage', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statusStages.map((stage) => (
                      <option key={stage.stage} value={stage.stage}>
                        Stage {stage.stage}: {stage.name} ({stage.percentage}%)
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shipper Name</label>
                  <input
                    type="text"
                    value={editingOrder.shipperName}
                    onChange={(e) => handleEditChange('shipperName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
                  <input
                    type="text"
                    value={editingOrder.receiverName}
                    onChange={(e) => handleEditChange('receiverName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
                  <input
                    type="text"
                    value={editingOrder.origin}
                    onChange={(e) => handleEditChange('origin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                  <input
                    type="text"
                    value={editingOrder.destination}
                    onChange={(e) => handleEditChange('destination', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={editingOrder.departureDate}
                    onChange={(e) => handleEditChange('departureDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery</label>
                  <input
                    type="date"
                    value={editingOrder.expectedDelivery}
                    onChange={(e) => handleEditChange('expectedDelivery', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
                  <input
                    type="text"
                    value={editingOrder.carrier}
                    onChange={(e) => handleEditChange('carrier', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Freight</label>
                  <input
                    type="text"
                    value={editingOrder.totalFreight}
                    onChange={(e) => handleEditChange('totalFreight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Progress Preview */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Progress Preview</label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <ProgressBar stage={editingOrder.stage} />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-[#0000006f] flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete order {showDeleteConfirm}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrdersPage;