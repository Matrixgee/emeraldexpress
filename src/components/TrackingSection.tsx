import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState('');
  useEffect(() => {
            AOS.init({
              duration: 800,
              easing: "ease-in-out",
              once: true,
              mirror: false,
            });
          }, []);
  
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    status: string;
    location: string;
    estimatedDelivery: string;
    progress: number;
  } | null>(null);

  const handleTracking = () => {
    navigate("/tracked-item")
    if (trackingId.trim()) {
      // Setting the result including the new fields
      setTrackingResult({
        id: trackingId,
        status: 'In Transit',
        location: 'Distribution Center - Chicago, IL',
        estimatedDelivery: 'Tomorrow, 2:00 PM',
        progress: 75
      });
    }
  };

  const navigate = useNavigate()

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6" data-aos="fade-in" data-aos-delay="200">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Track Your Shipment</h2>
          <p className="text-gray-600 text-lg">Enter your tracking ID to get real-time updates on your package</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g., EECS123456789)"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleTracking}
                className="bg-blue-900 cursor-pointer text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center gap-2"
              >
                <Search size={20} />
                Track
              </button>
            </div>

            {trackingResult && (
              <div className="border-t pt-8">
                <h3 className="text-xl font-bold text-blue-900 mb-4">Tracking Results</h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Tracking ID</p>
                      <p className="font-semibold text-blue-900">{trackingResult.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="font-semibold text-green-600">{trackingResult.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Current Location</p>
                      <p className="font-semibold text-blue-900">{trackingResult.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated Delivery</p>
                      <p className="font-semibold text-blue-900">{trackingResult.estimatedDelivery}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Progress</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${trackingResult.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">{trackingResult.progress}% Complete</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
