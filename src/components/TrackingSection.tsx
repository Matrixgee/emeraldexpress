import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "./config/axiosconfig";

// interface TrackingDetails {
//   shipperName: string;
//   shipperNumber: string;
//   shipperAddress: string;
//   shipperCountry: string;
//   shipperEmail: string;
//   receiverName: string;
//   receiverNumber: string;
//   receiverAddress: string;
//   receiverCountry: string;
//   receiverEmail: string;
//   quantity: string;
//   description: string;
//   length: string;
//   width: string;
//   height: string;
//   weight: string;
//   totalFreight: string;
//   packages: string;
//   product: string;
//   mode: string;
//   paymentMode: string;
//   origin: string;
//   departureDate: string;
//   destination: string;
//   expectedDeliveryDate: string;
//   pickupDate: string;
//   pickupTime: string;
//   carrier: string;
//   comment: string;
//   stage: 0 | 1 | 2 | 3 | 4;
// }

const TrackingSection = () => {
  const [trackingId, setTrackingId] = useState("");
  // const [trackingResult, setTrackingResult] = useState<TrackingDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);


  const handleTracking = async () => {
    if (!trackingId.trim()) {
      toast.error("Please enter a tracking ID.");
      return;
    }

    try {
      toast.loading("Tracking shipment...");
      const response = await axios.get(`/getOrderByTrackingId/${trackingId}`);
      const trackingData = response.data.data;
      console.log(response.data.data);
      toast.dismiss();
      navigate("/tracked-item", { state: { trackingData } });
    } catch (error) {
      toast.dismiss();
      toast.error(
        "Tracking failed. Please check the tracking ID and try again."
      );
      console.error("Tracking error:", error);
    }
  };


  return (
    <section className="py-16 bg-gray-50">
      <div
        className="container mx-auto px-6"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            Track Your Shipment
          </h2>
          <p className="text-gray-600 text-lg">
            Enter your tracking ID to get real-time updates on your package
          </p>
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
                className="bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition duration-300 flex items-center gap-2"
              >
                <Search size={20} />
                Track
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
