// TrackedItem.tsx

import { X, Package } from "lucide-react";
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
  { id: 5, name: "On Hold", key: "on_hold" }, // ✅ Added
  { id: 6, name: "Out for Delivery", key: "out_for_delivery" },
  { id: 7, name: "Delivered", key: "delivered" },
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
    on_hold: "bg-red-100 text-red-800", // ✅ Add this line
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
console.log(InfoCard);

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

console.log(InfoField);

const EmailField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-sm font-medium text-gray-600">{label}</div>
    <div className="text-blue-600 text-sm break-all">{value}</div>
  </div>
);
console.log(EmailField);

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
  <div className="w-full py-4 sm:py-6 lg:py-8 px-3 sm:px-4 lg:px-6 bg-gradient-to-br from-slate-50 to-blue-50/30 border-b border-slate-200/60 shadow-sm">
    <div className="max-w-4xl mx-auto">
      <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 lg:mb-8 text-center text-slate-800 tracking-tight">
        Tracking Progress
      </h3>

      <div className="relative mb-4 sm:mb-6 lg:mb-8">
        {/* Mobile: Horizontal scroll container for many stages */}
        <div
          className={`${
            TRACKING_STAGES.length > 4 ? "overflow-x-auto pb-2" : ""
          } -mx-2 px-2`}
        >
          <div
            className={`${
              TRACKING_STAGES.length > 4 ? "min-w-max" : "w-full"
            } relative`}
          >
            {/* Background line - responsive margins */}
            <div className="absolute top-4 sm:top-5 lg:top-6 left-0 right-0 h-1 sm:h-1.5 lg:h-2 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full mx-4 sm:mx-6 lg:mx-10 shadow-inner" />

            {/* Progress line with gradient - responsive */}
            <div
              className="absolute top-4 sm:top-5 lg:top-6 left-0 h-1 sm:h-1.5 lg:h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-4 sm:mx-6 lg:mx-10 transition-all duration-700 ease-out shadow-md"
              style={{
                width: `calc((${
                  (currentStageIndex / (TRACKING_STAGES.length - 1)) * 100
                }% * (100% - 2rem)) / 100% + 1rem)`,
              }}
            />

            {/* Stage indicators - responsive spacing */}
            <div
              className={`
              relative flex items-center px-1 sm:px-2 lg:px-4
              ${
                TRACKING_STAGES.length > 4
                  ? "justify-start gap-4 sm:gap-6 lg:gap-8"
                  : "justify-between"
              }
            `}
            >
              {TRACKING_STAGES.map((stage, index) => (
                <div
                  key={stage.id}
                  className="flex flex-col items-center group flex-shrink-0"
                >
                  {/* Circle with responsive sizing */}
                  <div
                    className={`
                      relative w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full border-2 sm:border-3 
                      flex items-center justify-center text-xs sm:text-sm font-bold 
                      transition-all duration-500 transform hover:scale-105
                      ${
                        index <= currentStageIndex
                          ? "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : index === currentStageIndex + 1
                          ? "bg-white border-blue-300 text-blue-400 shadow-md ring-1 sm:ring-2 ring-blue-200"
                          : "bg-white border-slate-300 text-slate-400 shadow-sm hover:border-slate-400"
                      }
                    `}
                  >
                    {index < currentStageIndex ? (
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="text-xs sm:text-sm">{index + 1}</span>
                    )}

                    {/* Pulse animation for current stage */}
                    {index === currentStageIndex && (
                      <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
                    )}
                  </div>

                  {/* Stage name with responsive typography */}
                  <div
                    className={`
                      mt-1.5 sm:mt-2 lg:mt-3 text-xs sm:text-xs lg:text-sm text-center 
                      ${
                        TRACKING_STAGES.length > 4
                          ? "w-16 sm:w-20 lg:w-24"
                          : "max-w-[60px] sm:max-w-[70px] lg:max-w-[90px]"
                      }
                      leading-tight transition-all duration-300 break-words hyphens-auto
                      ${
                        index <= currentStageIndex
                          ? "text-blue-700 font-semibold"
                          : index === currentStageIndex + 1
                          ? "text-blue-500 font-medium"
                          : "text-slate-500 group-hover:text-slate-600"
                      }
                    `}
                  >
                    {stage.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Current status with responsive styling */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 border border-blue-200/50 shadow-sm backdrop-blur-sm">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-slate-700">
            Current Status:
          </span>
          <span className="text-xs sm:text-sm font-bold text-blue-600 capitalize">
            {TRACKING_STAGES[currentStageIndex]?.name}
          </span>
        </div>
      </div>
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
                {[...trackingData].reverse().map((entry, index) => {
                  const currentStageIndex = getCurrentStageIndex(entry.stage);

                  return (
                    <HistoryEntry
                      key={index}
                      dateTime={formatDateTime(entry.createdAt)}
                      location={entry.currentLocation}
                      status={
                        TRACKING_STAGES[currentStageIndex]?.name || "Unknown"
                      }
                      updatedBy={entry.updatedBy}
                      remarks={entry.comment}
                    />
                  );
                })}
              </div>
            </div>

            {/* Details */}
            <div className="p-6 bg-gray-50">
              <div className="border-b-4 border-gray-800 mb-6">
                <h2 className="text-xl font-bold text-gray-800 pb-2">
                  Shipment Details
                </h2>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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
              </div> */}

              {/* Progress */}
              <ProgressBar currentStageIndex={currentStageIndex} />

              {/* Package */}
              {/* <InfoCard
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
              </InfoCard> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackedItem;
