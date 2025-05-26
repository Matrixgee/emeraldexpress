import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../config/axiosconfig";

interface Country {
  country: string;
  code: string;
}

interface OrderFormData {
  shipperName: string;
  shipperPhone: string;
  shipperAddress: string;
  shipperCountry: string;
  shipperEmail: string;
  receiverName: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverCountry: string;
  receiverEmail: string;
  quantity: string;
  description: string;
  length: string;
  width: string;
  height: string;
  weight: string;
  totalFreight: string;
  packages: string;
  product: string;
  mode: string;
  paymentMode: string;
  origin: string;
  departureDate: string;
  destination: string;
  expectedDeliveryDate: string;
  pickupDate: string;
  pickupTime: string;
  carrier: string;
  comment: string;
  stage: 0 | 1 | 2 | 3 | 4;
}

type FormField = keyof OrderFormData;

const defaultFormData: OrderFormData = {
  shipperName: "", shipperPhone: "", shipperAddress: "", shipperCountry: "", shipperEmail: "",
  receiverName: "", receiverPhone: "", receiverAddress: "", receiverCountry: "", receiverEmail: "",
  quantity: "", description: "", length: "", width: "", height: "", weight: "",
  totalFreight: "", packages: "", product: "", mode: "", paymentMode: "", origin: "", departureDate: "",
  destination: "", expectedDeliveryDate: "", pickupDate: "", pickupTime: "", carrier: "", comment: "",
  stage: 0,
};

const CreateOrderPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [formData, setFormData] = useState<OrderFormData>(defaultFormData);
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://countriesnow.space/api/v0.1/countries");
        const data = await response.json();
        const sortedCountries = data.data.sort((a: Country, b: Country) =>
          a.country.localeCompare(b.country)
        );
        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([
          { country: "United States", code: "US" },
          { country: "United Kingdom", code: "GB" },
          { country: "Canada", code: "CA" },
          { country: "Australia", code: "AU" },
          { country: "Germany", code: "DE" },
          { country: "France", code: "FR" },
          { country: "Japan", code: "JP" },
          { country: "Brazil", code: "BR" },
          { country: "India", code: "IN" },
          { country: "China", code: "CN" },
        ]);
      }
    };

    fetchCountries();
  }, []);

 



  const stageOptions = [
    { value: 0, label: "Order Placed", progress: 0 },
    { value: 1, label: "Processing", progress: 25 },
    { value: 2, label: "In Transit", progress: 50 },
    { value: 3, label: "Out for Delivery", progress: 75 },
    { value: 4, label: "Delivered", progress: 100 },
  ];

  const getProgressPercentage = (stage: number): number => {
    const stageMap: Record<0 | 1 | 2 | 3 | 4, number> = {
      0: 0, 1: 25, 2: 50, 3: 75, 4: 100
    };
    return stageMap[stage as 0 | 1 | 2 | 3 | 4] ?? 0;
  };

const handleInputChange = (field: keyof OrderFormData, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: field === "stage" ? Number(value) : value,
  }));

  if (errors[field as FormField]) {
    setErrors(prev => ({ ...prev, [field]: undefined }));
  }
};

  const generateTrackingId = () => {
    return 'EECS' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  };

  const [loading, setLoading] = useState(false)
  const [trackingId, setTrackingId] = useState("")

  const adminToken = localStorage.getItem("token")
  const headers = {
  headers: { Authorization: `Bearer ${adminToken}` },  }

  const handleSubmit = async (e: React.FormEvent) => {
      const loadingId = toast.loading("Creating Order...")
    e.preventDefault();
    try{
      setLoading(true)
      const res = await axios.post("/createOrder", formData, headers)
      console.log(res)
      toast.success("Order created Successfully")
      setTrackingId(generateTrackingId())
    }catch(error){
      console.log(error)
      toast.error("Error creating order, Please check and try again")
    }finally{
      setLoading(false)
      toast.dismiss(loadingId)
    }

    console.log("Order created:", {
      ...formData,
      trackingId,
      progressPercentage: getProgressPercentage(formData.stage),
    });

    

    toast.success(`Order created! Tracking ID: ${trackingId}`);
    setFormData(defaultFormData);
  };

  return (
    <div className="p-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Order</h2>
      
      <div className="space-y-8">
        {/* Shipper Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipper Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Shipper Name</label>
              <input
                type="text"
                name="shipperName"
                value={formData.shipperName}
                onChange={(val)=>handleInputChange("shipperName", val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="phone"
                name="shipperPhone"
                value={formData.shipperPhone}
                onChange={(val)=>handleInputChange("shipperPhone",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="shipperAddress"
                value={formData.shipperAddress}
                onChange={(val)=>handleInputChange("shipperAddress",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.shipperCountry}
                onChange={(e) => handleInputChange("shipperCountry", e.target.value)}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option
                    key={country.code || country.country}
                    value={country.country}
                  >
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.shipperCountry && (
                <p className="mt-1 text-sm text-red-400">{errors.shipperCountry}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="shipperEmail"
                value={formData.shipperEmail}
                onChange={(val)=>handleInputChange("shipperEmail",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Receiver Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Receiver Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={(val)=>handleInputChange("receiverName",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="receiverPhone"
                value={formData.receiverPhone}
                onChange={(val)=>handleInputChange("receiverPhone",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="receiverAddress"
                value={formData.receiverAddress}
                onChange={(val)=>handleInputChange("receiverAddress",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
                <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.receiverCountry}
                onChange={(e) => handleInputChange("receiverCountry", e.target.value)}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option
                    key={country.code || country.country}
                    value={country.country}
                  >
                    {country.country}
                  </option>
                ))}
              </select>
              {errors.receiverCountry && (
                <p className="mt-1 text-sm text-red-400">{errors.receiverCountry}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="receiverEmail"
                value={formData.receiverEmail}
                onChange={(val)=>handleInputChange("receiverEmail",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Package Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={(val)=>handleInputChange("quantity",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={(val)=>handleInputChange("weight",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length (cm)</label>
              <input
                type="number"
                step="0.1"
                name="length"
                value={formData.length}
                onChange={(val)=>handleInputChange("length",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
              <input
                type="number"
                step="0.1"
                name="width"
                value={formData.width}
                onChange={(val)=>handleInputChange("width",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input
                type="number"
                step="0.1"
                name="height"
                value={formData.height}
                onChange={(val)=>handleInputChange("height",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(val)=>handleInputChange("description",val.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Freight</label>
              <input
                type="text"
                name="totalFreight"
                value={formData.totalFreight}
                onChange={(val)=>handleInputChange("totalFreight",val.target.value)}
                placeholder="$0.00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Packages</label>
              <input
                type="number"
                name="packages"
                value={formData.packages}
                onChange={(val)=>handleInputChange("packages",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
              <input
                type="text"
                name="product"
                value={formData.product}
                onChange={(val)=>handleInputChange("product",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode</label>
              <select
                name="mode"
                value={formData.mode}
                onChange={(val)=>handleInputChange("mode",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Mode</option>
                <option value="air">Air</option>
                <option value="ground">Ground</option>
                <option value="sea">Sea</option>
                <option value="rail">Rail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={(val)=>handleInputChange("paymentMode",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Payment</option>
                <option value="prepaid">Prepaid</option>
                <option value="collect">Collect</option>
                <option value="third-party">Third Party</option>
              </select>
            </div>
            

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
              <select
                name="stage"
                value={formData.stage}
                onChange={(val)=>handleInputChange("stage",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {stageOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    Stage {option.value} - {option.label} ({option.progress}%)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={(val)=>handleInputChange("origin",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={(val)=>handleInputChange("departureDate",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={(val)=>handleInputChange("destination",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
              <input
                type="date"
                name="expectedDeliveryDate"
                value={formData.expectedDeliveryDate}
                onChange={(val)=>handleInputChange("expectedDeliveryDate",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={(val)=>handleInputChange("pickupDate",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Time</label>
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={(val)=>handleInputChange("pickupTime",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Carrier</label>
              <select
                name="carrier"
                value={formData.carrier}
                onChange={(val)=>handleInputChange("carrier",val.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Carrier</option>
                <option value="Emerald Express">Emerald Express</option>
              </select>
            </div>
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={(val)=>handleInputChange("comment",val.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional comments or special instructions..."
              />
            </div>
          </div>
        </div>

        {/* Progress Bar Preview */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Preview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Current Stage: {stageOptions.find(s => s.value === formData.stage)?.label}
              </span>
              <span className="text-sm text-gray-500">
                {getProgressPercentage(formData.stage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${getProgressPercentage(formData.stage)}%` }}
              >
                {getProgressPercentage(formData.stage) > 0 && (
                  <span className="text-xs text-white font-medium">
                    {getProgressPercentage(formData.stage)}%
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500">
              This progress bar will be displayed when clients track orders using the tracking ID
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setFormData({
              shipperName: '', shipperPhone: '', shipperAddress: '', shipperCountry: '', shipperEmail: '',
              receiverName: '', receiverPhone: '', receiverAddress: '', receiverCountry: '', receiverEmail: '',
              quantity: '', description: '', length: '', width: '', height: '', weight: '',
              totalFreight: '', packages: '', product: '', mode: '', paymentMode: '', origin: '', departureDate: '',
              destination: '', expectedDeliveryDate: '', pickupDate: '', pickupTime: '', carrier: '',comment: '',
              stage: 0
            })}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;

  