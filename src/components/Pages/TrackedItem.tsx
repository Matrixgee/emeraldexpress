import { X, Package, MapPin, User } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrackedItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trackingData = location.state?.trackingData;

  console.log(trackingData);

  useEffect(() => {
    if (!trackingData) {
      navigate("/");
    }
  }, [trackingData, navigate]);

  const handleBack = () => {
    navigate(-1);
    console.log("Going back");
  };

  // Progress bar configuration
  const stages = [
    { id: 1, name: "Order Placed", key: "placed" },
    { id: 2, name: "Processing", key: "processing" },
    { id: 3, name: "Picked Up", key: "picked_up" },
    { id: 4, name: "In Transit", key: "in_transit" },
    { id: 5, name: "Out for Delivery", key: "out_for_delivery" },
    { id: 6, name: "Delivered", key: "delivered" },
  ];

  const getCurrentStageIndex = () => {
    const currentStage = trackingData?.[0].stage;
    // Convert stage number to index (assuming stage is 1-based)
    return currentStage && currentStage >= 1 && currentStage <= stages.length
      ? currentStage - 1
      : 0;
  };

  const currentStageIndex = getCurrentStageIndex();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 relative">
          <button
            type="button"
            onClick={handleBack}
            className="absolute top-4 left-4 p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Shipment Tracking</h1>
            <div className="flex items-center justify-center gap-2">
              <Package className="h-5 w-5" />
              <span className="text-lg font-mono">
                {trackingData?.trackingId}
              </span>
            </div>
          </div>
        </div>

        {/* Shipment History */}
        <div className="p-6">
          <div className="border-b-4 border-gray-800 mb-6">
            <h2 className="text-xl font-bold text-gray-800 pb-2">
              Shipment History
            </h2>
          </div>

          <div className="space-y-4">
            {/* Current Status Entry */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Location
                </div>
                <div className="p-4 border-b md:border-b-0 border-gray-200">
                  {trackingData?.[0].currentLocation}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Status
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {trackingData?.[0].orderStatus}
                  </span>
                </div>

                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Updated By
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
                  {trackingData?.[0].updatedBy}
                </div>

                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Remarks
                </div>
                <div className="p-4 border-b md:border-b-0 border-gray-200">
                  {trackingData?.[0].comment}
                </div>
              </div>
            </div>

            {/* Previous Entry */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Location
                </div>
                <div className="p-4 border-b md:border-b-0 border-gray-200">
                  {trackingData?.[0].destination}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Status
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    In Transit
                  </span>
                </div>

                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Updated By
                </div>
                <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
                  System Update
                </div>

                <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
                  Remarks
                </div>
                <div className="p-4 border-b md:border-b-0 border-gray-200">
                  Package departed facility
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="p-6 bg-gray-50">
          <div className="border-b-4 border-gray-800 mb-6">
            <h2 className="text-xl font-bold text-gray-800 pb-2">
              Shipment Details
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Sender Information */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sender Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-600">Name</div>
                  <div className="text-gray-900">
                    {trackingData?.[0].shipperName}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Address
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0]?.shipperAddress}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Phone</div>
                  <div className="text-gray-900">
                    {trackingData?.[0].shipperNumber}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Email</div>
                  <div className="text-blue-600 text-sm break-all">
                    {trackingData?.[0].shipperEmail}
                  </div>
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-green-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Receiver Details
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-sm font-medium text-gray-600">Name</div>
                  <div className="text-gray-900">
                    {trackingData?.[0].receiverName}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Address
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].receiverAddress}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Phone</div>
                  <div className="text-gray-900">
                    {trackingData?.[0].receiverNumber}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">Email</div>
                  <div className="text-blue-600 text-sm break-all">
                    {trackingData?.[0].receiverEmail}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="w-full py-6 px-4 border-b-2 border-black bg-gray-50">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Tracking Progress
            </h3>
            <div className="relative">
              {/* Progress line */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 mx-8"></div>
              <div
                className="absolute top-5 left-0 h-1 bg-blue-600 mx-8 transition-all duration-500"
                style={{
                  width: `${(currentStageIndex / (stages.length - 1)) * 100}%`,
                }}
              ></div>

              {/* Progress steps */}
              <div className="relative flex justify-between items-center">
                {stages.map((stage, index) => (
                  <div key={stage.id} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                        index <= currentStageIndex
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-white border-gray-300 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div
                      className={`mt-2 text-xs text-center max-w-[80px] transition-colors duration-300 ${
                        index <= currentStageIndex
                          ? "text-blue-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {stage.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-4">
              <span className="text-sm font-medium text-gray-700">
                Current Status:{" "}
                <span className="text-blue-600 capitalize">
                  {stages[currentStageIndex]?.name}
                </span>
              </span>
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-yellow-50 px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-4 w-4" />
                Package Information
              </h3>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Type/Mode
                  </div>
                  <div className="text-gray-900 capitalize">
                    {trackingData?.[0].mode}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Packages
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].packages}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Weight
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].weight} kg
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Quantity
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].quantity}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Product
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].product}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Payment Mode
                  </div>
                  <div className="text-gray-900 capitalize">
                    {trackingData?.[0].paymentMode}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Expected Delivery
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].expectedDeliveryDate}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600">
                    Order Status
                  </div>
                  <div className="text-gray-900">
                    {trackingData?.[0].orderStatus}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackedItem;
