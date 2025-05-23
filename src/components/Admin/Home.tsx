import { Package } from 'lucide-react';

const Home = () => {

  const mockOrders = [
  {
    id: 'ORD-001',
    shipperName: 'John Smith',
    receiverName: 'Alice Johnson',
    origin: 'New York, USA',
    destination: 'Los Angeles, USA',
    status: 'In Transit',
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
    status: 'Pending',
    departureDate: '2024-01-20',
    expectedDelivery: '2024-01-23',
    carrier: 'Reliable Transport',
    totalFreight: '$320.00'
  }
];

  const stats = [
    { label: 'Total Orders', value: '1,234', change: '+12%', color: 'bg-blue-500' },
    { label: 'In Transit', value: '89', change: '+5%', color: 'bg-yellow-500' },
    { label: 'Delivered', value: '1,089', change: '+8%', color: 'bg-green-500' },
    { label: 'Pending', value: '56', change: '-2%', color: 'bg-red-500' }
  ];

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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Freight</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockOrders.slice(0, 5).map((order:any) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.origin} → {order.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalFreight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home
