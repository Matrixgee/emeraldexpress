import { Plus } from "lucide-react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { OrderFormData } from "../../types";

interface OutletContext {
  onCreateOrder: (data: OrderFormData) => void;
}

const CreateOrderPage = () => {
  const { onCreateOrder } = useOutletContext<OutletContext>();
  const [formData, setFormData] = useState({
    customer: '',
    origin: '',
    destination: '',
    value: '',
    notes: ''
  });

  const handleSubmit = (e:any) => {
    e.preventDefault();
    onCreateOrder(formData);
    setFormData({ customer: '', origin: '', destination: '', value: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={formData.customer}
                onChange={(e) => setFormData({...formData, customer: e.target.value})}
                placeholder="Enter customer name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order Value *
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="1250.00"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Origin *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={formData.origin}
                onChange={(e) => setFormData({...formData, origin: e.target.value})}
                placeholder="City, State"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                value={formData.destination}
                onChange={(e) => setFormData({...formData, destination: e.target.value})}
                placeholder="City, State"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Additional Notes
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Any special instructions or notes..."
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-6">
            <button
              type="button"
              onClick={() => setFormData({ customer: '', origin: '', destination: '', value: '', notes: '' })}
              className="px-6 py-2 max-md:text-[13px] max-md:px-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Form
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-900 max-md:text-[13px] max-md:px-2 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateOrderPage
