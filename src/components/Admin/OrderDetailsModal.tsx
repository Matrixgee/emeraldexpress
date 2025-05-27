import { useState } from 'react';
import { X } from 'lucide-react';

const OrderDetailsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const orderDetails = {
    trackingId: "TRK-2024-001234",
    receiverName: "John Smith",
    shipperName: "ABC Electronics Store",
    origin: "Los Angeles, CA 90210",
    destination: "New York, NY 10001",
    carrier: "FedEx Express",
    departureTime: "2:30 PM",
    departureDate: "March 15, 2024",
    expectedDate: "March 18, 2024"
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        View Order Details
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Details</h2>
              <button onClick={closeModal}>
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="font-medium">Tracking ID:</span> {orderDetails.trackingId}
              </div>
              <div>
                <span className="font-medium">Receiver:</span> {orderDetails.receiverName}
              </div>
              <div>
                <span className="font-medium">Shipper:</span> {orderDetails.shipperName}
              </div>
              <div>
                <span className="font-medium">Origin:</span> {orderDetails.origin}
              </div>
              <div>
                <span className="font-medium">Destination:</span> {orderDetails.destination}
              </div>
              <div>
                <span className="font-medium">Carrier:</span> {orderDetails.carrier}
              </div>
              <div>
                <span className="font-medium">Departure Time:</span> {orderDetails.departureTime}
              </div>
              <div>
                <span className="font-medium">Departure Date:</span> {orderDetails.departureDate}
              </div>
              <div>
                <span className="font-medium">Expected Date:</span> {orderDetails.expectedDate}
              </div>
            </div>
            
            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;