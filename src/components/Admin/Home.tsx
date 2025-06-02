import { Package } from 'lucide-react';

const Home = () => {
  const statusStages = [
    { stage: 1, name: "Processing", percentage: 0 },
    { stage: 2, name: "Out for Delivery", percentage: 25 },
    { stage: 3, name: "In Transit", percentage: 25 },
    { stage: 4, name: "On Hold", percentage: 50 },
    { stage: 5, name: "Delivered", percentage: 75 },
    { stage: 6, name: "Picked Up", percentage: 100 }
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      shipperName: 'John Smith',
      receiverName: 'Alice Johnson',
      origin: 'New York, USA',
      destination: 'Los Angeles, USA',
      status: 'In Transit',
      stage: 2,
      departureDate: '2024-01-15',
      expectedDelivery: '2024-01-18',
      carrier: 'FastShip Express',
      totalFreight: '$250.00'
    },
    {
      id: 'ORD-002',
      shipperName: 'Sarah Wilson',
      receiverName: 'Mike Brown',
      origin: 'Chicago, USA',
      destination: 'Miami, USA',
      status: 'Delivered',
      stage: 4,
      departureDate: '2024-01-10',
      expectedDelivery: '2024-01-14',
      carrier: 'QuickMove Logistics',
      totalFreight: '$180.00'
    },
    {
      id: 'ORD-003',
      shipperName: 'David Lee',
      receiverName: 'Emma Davis',
      origin: 'Seattle, USA',
      destination: 'Denver, USA',
      status: 'Processing',
      stage: 1,
      departureDate: '2024-01-20',
      expectedDelivery: '2024-01-23',
      carrier: 'Reliable Transport',
      totalFreight: '$320.00'
    },
    {
      id: 'ORD-004',
      shipperName: 'Lisa Chen',
      receiverName: 'Robert Taylor',
      origin: 'Boston, USA',
      destination: 'Phoenix, USA',
      status: 'Out for Delivery',
      stage: 3,
      departureDate: '2024-01-12',
      expectedDelivery: '2024-01-16',
      carrier: 'Express Logistics',
      totalFreight: '$190.00'
    },
    {
      id: 'ORD-005',
      shipperName: 'Mark Anderson',
      receiverName: 'Jennifer White',
      origin: 'Houston, USA',
      destination: 'Portland, USA',
      status: 'Order Placed',
      stage: 0,
      departureDate: '2024-01-22',
      expectedDelivery: '2024-01-25',
      carrier: 'National Freight',
      totalFreight: '$275.00'
    }
  ];

  const stats = [
    { label: 'Total Orders', value: '1,234', change: '+12%', color: 'bg-blue-500' },
    { label: 'In Progress', value: '145', change: '+5%', color: 'bg-yellow-500' },
    { label: 'Delivered', value: '1,089', change: '+8%', color: 'bg-green-500' },
    { label: 'Order Placed', value: '56', change: '-2%', color: 'bg-gray-500' }
  ];

  const ProgressBar = ({ stage }: { stage: number }) => {
    const currentStage = statusStages.find(s => s.stage === stage);
    const percentage = currentStage ? currentStage.percentage : 0;
    
    return (
      <div className="w-24">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className="truncate">{currentStage?.name}</span>
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.slice(0, 5).map((order: any) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.origin} → {order.destination}
                  </td>
                  <td className="px-6 py-4">
                    <ProgressBar stage={order.stage} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalFreight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stage Distribution Chart */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Order Status Distribution</h3>
          <p className="text-sm text-gray-500">Current orders by stage</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {statusStages.map((stage) => {
            const stageOrders = mockOrders.filter(order => order.stage === stage.stage);
            const count = stageOrders.length;
            const percentage = mockOrders.length > 0 ? (count / mockOrders.length * 100).toFixed(0) : 0;
            
            return (
              <div key={stage.stage} className="text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 ${
                  stage.stage === 4 ? 'bg-green-500' : 
                  stage.stage >= 2 ? 'bg-blue-500' : 
                  stage.stage >= 1 ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                  {count}
                </div>
                <div className="text-sm font-medium text-gray-900">{stage.name}</div>
                <div className="text-xs text-gray-500">{percentage}% of orders</div>
                <div className="text-xs text-gray-400">Stage {stage.stage}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home