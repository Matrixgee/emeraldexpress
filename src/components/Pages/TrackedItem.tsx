// TrackedItem.tsx

import { X, Package, MapPin, User } from "lucide-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Types
interface TrackingData {
  trackingId: string;
  stage: number;
  createdAt: string;
  currentLocation: string;
  orderStatus: string;
  updatedBy: string;
  comment: string;
  destination: string;
  shipperName: string;
  shipperAddress: string;
  shipperNumber: string;
  shipperEmail: string;
  receiverName: string;
  receiverAddress: string;
  receiverNumber: string;
  receiverEmail: string;
  mode: string;
  packages: number;
  weight: number;
  quantity: number;
  product: string;
  paymentMode: string;
  expectedDeliveryDate: string;
}

interface LocationState {
  trackingData: TrackingData[];
}

interface Stage {
  id: number;
  name: string;
  key: string;
}

// Constants
const TRACKING_STAGES: Stage[] = [
  { id: 1, name: "Order Placed", key: "placed" },
  { id: 2, name: "Processing", key: "processing" },
  { id: 3, name: "Picked Up", key: "picked_up" },
  { id: 4, name: "In Transit", key: "in_transit" },
  { id: 5, name: "Out for Delivery", key: "out_for_delivery" },
  { id: 6, name: "Delivered", key: "delivered" },
];

// Helper Functions
const formatDateTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const getCurrentStageIndex = (stage: number | undefined): number => {
  if (!stage || stage < 1 || stage > TRACKING_STAGES.length) return 0;
  return stage - 1;
};

const getStatusBadgeColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    delivered: "bg-green-100 text-green-800",
    in_transit: "bg-blue-100 text-blue-800",
    processing: "bg-yellow-100 text-yellow-800",
    pending: "bg-gray-100 text-gray-800",
  };

  const normalized = status.toLowerCase().replace(/\s+/g, "_");
  return statusColors[normalized] || "bg-yellow-100 text-yellow-800";
};

// Subcomponents
const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
      status
    )}`}
  >
    {status}
  </span>
);

const InfoCard = ({
  title,
  icon: Icon,
  bgColor,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  bgColor: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className={`${bgColor} px-4 py-3 border-b border-gray-200`}>
      <h3 className="font-semibold text-gray-800 flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {title}
      </h3>
    </div>
    <div className="p-4 space-y-3">{children}</div>
  </div>
);

const InfoField = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-gray-900">{value}</div>
  </div>
);

const EmailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-blue-600 text-sm break-all">{value}</div>
  </div>
);

const HistoryEntry = ({
  dateTime,
  location,
  status,
  updatedBy,
  remarks,
}: {
  dateTime?: string;
  location: string;
  status: string;
  updatedBy: string;
  remarks: string;
}) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
    {dateTime && (
      <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
        <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
          Date and Time
        </div>
        <div className="p-4 border-b md:border-b-0 border-gray-200">
          {dateTime}
        </div>
        <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
          Location
        </div>
        <div className="p-4 border-b md:border-b-0 border-gray-200">
          {location}
        </div>
      </div>
    )}

    <div className="grid grid-cols-1 md:grid-cols-6 text-sm">
      {!dateTime && (
        <>
          <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
            Location
          </div>
          <div className="p-4 border-b md:border-b-0 border-gray-200">
            {location}
          </div>
        </>
      )}
      <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
        Status
      </div>
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
        <StatusBadge status={status} />
      </div>
      <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
        Updated By
      </div>
      <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200">
        {updatedBy}
      </div>
      <div className="bg-gray-100 p-4 font-semibold border-b md:border-b-0 md:border-r border-gray-200">
        Remarks
      </div>
      <div className="p-4 border-b md:border-b-0 border-gray-200">
        {remarks}
      </div>
    </div>
  </div>
);

const ProgressBar = ({ currentStageIndex }: { currentStageIndex: number }) => (
  <div className="w-full py-6 px-4 border-b-2 border-black bg-gray-50">
    <h3 className="text-lg font-semibold mb-4 text-center">
      Tracking Progress
    </h3>
    <div className="relative">
      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-300 mx-8" />
      <div
        className="absolute top-5 left-0 h-1 bg-blue-600 mx-8 transition-all duration-500"
        style={{
          width: `${(currentStageIndex / (TRACKING_STAGES.length - 1)) * 100}%`,
        }}
      />
      <div className="relative flex justify-between items-center">
        {TRACKING_STAGES.map((stage, index) => (
          <div key={stage.id} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                index <= currentStageIndex
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`mt-2 text-xs text-center max-w-[80px] ${
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
          {TRACKING_STAGES[currentStageIndex]?.name}
        </span>
      </span>
    </div>
  </div>
);

// Main Component
const TrackedItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState | null;
  const trackingData = state?.trackingData;

  useEffect(() => {
    if (!trackingData?.length) navigate("/");
  }, [trackingData, navigate]);

  const handleBack = () => navigate(-1);

  if (!trackingData?.length) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {trackingData.map((currentTracking, index) => {
        const currentStageIndex = getCurrentStageIndex(currentTracking.stage);

        return (
          <div
            key={currentTracking.trackingId || index}
            className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 relative">
              <button
                type="button"
                onClick={handleBack}
                className="absolute top-4 left-4 p-2 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-2">Shipment Tracking</h1>
                <div className="flex items-center justify-center gap-2">
                  <Package className="h-5 w-5" />
                  <span className="text-lg font-mono">
                    {currentTracking.trackingId}
                  </span>
                </div>
              </div>
            </div>

            {/* History */}
            <div className="p-6">
              <div className="border-b-4 border-gray-800 mb-6">
                <h2 className="text-xl font-bold text-gray-800 pb-2">
                  Shipment History
                </h2>
              </div>
              <div className="space-y-4">
                <HistoryEntry
                  dateTime={formatDateTime(currentTracking.createdAt)}
                  location={currentTracking.currentLocation}
                  status={currentTracking.orderStatus}
                  updatedBy={currentTracking.updatedBy}
                  remarks={currentTracking.comment}
                />
                <HistoryEntry
                  location={currentTracking.destination}
                  status="In Transit"
                  updatedBy="System Update"
                  remarks="Package departed facility"
                />
              </div>
            </div>

            {/* Details */}
            <div className="p-6 bg-gray-50">
              <div className="border-b-4 border-gray-800 mb-6">
                <h2 className="text-xl font-bold text-gray-800 pb-2">
                  Shipment Details
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InfoCard
                  title="Sender Details"
                  icon={User}
                  bgColor="bg-blue-50"
                >
                  <InfoField label="Name" value={currentTracking.shipperName} />
                  <InfoField
                    label="Address"
                    value={currentTracking.shipperAddress}
                  />
                  <InfoField
                    label="Phone"
                    value={currentTracking.shipperNumber}
                  />
                  <EmailField
                    label="Email"
                    value={currentTracking.shipperEmail}
                  />
                </InfoCard>

                <InfoCard
                  title="Receiver Details"
                  icon={MapPin}
                  bgColor="bg-green-50"
                >
                  <InfoField
                    label="Name"
                    value={currentTracking.receiverName}
                  />
                  <InfoField
                    label="Address"
                    value={currentTracking.receiverAddress}
                  />
                  <InfoField
                    label="Phone"
                    value={currentTracking.receiverNumber}
                  />
                  <EmailField
                    label="Email"
                    value={currentTracking.receiverEmail}
                  />
                </InfoCard>
              </div>

              {/* Progress */}
              <ProgressBar currentStageIndex={currentStageIndex} />

              {/* Package */}
              <InfoCard
                title="Package Information"
                icon={Package}
                bgColor="bg-yellow-50"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <InfoField label="Type/Mode" value={currentTracking.mode} />
                  <InfoField
                    label="Packages"
                    value={currentTracking.packages}
                  />
                  <InfoField
                    label="Weight"
                    value={`${currentTracking.weight} kg`}
                  />
                  <InfoField
                    label="Quantity"
                    value={currentTracking.quantity}
                  />
                  <InfoField label="Product" value={currentTracking.product} />
                  <InfoField
                    label="Payment Mode"
                    value={currentTracking.paymentMode}
                  />
                  <InfoField
                    label="Expected Delivery"
                    value={currentTracking.expectedDeliveryDate}
                  />
                  <InfoField
                    label="Order Status"
                    value={currentTracking.orderStatus}
                  />
                </div>
              </InfoCard>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackedItem;
