import { useLocation, useNavigate } from "react-router-dom";
import bar from "../../assets/bar.png";
import bg from "../../assets/Logo.png";
import { useEffect } from "react";

const TrackedItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trackingData = location.state?.trackingData;

  useEffect(() => {
    if (!trackingData) {
      navigate("/");
    }
  }, [trackingData, navigate]);

  return (
    <div className="bg-blue-900 w-full h-max lg:h-screen p-3 md:text-[18px]">
      <div className="bg-white border-2 border-black w-full h-full">
        <div className="w-full h-[43%] border-b-2 border-black flex max-lg:flex-col">
          <div className="h-full w-[30%] max-lg:border-b-2 max-lg:border-r-0 max-lg:w-full max-lg:justify-center flex items-center border-r-2 border-black">
            <img src={bg} alt="" className="max-lg:w-max max-lg:h-[40px]" />
          </div>
          <div className="h-full w-[40%] max-lg:w-full max-lg:border-b-2 max-lg:border-r-0 border-r-2 border-black p-4 flex flex-col justify-center items-center">
            <img src={bar} alt="" />
            <div className="font-mono text-[17px]">
              {trackingData?.trackingId}
            </div>
            <div className="text-xl">Accounts Copy</div>
          </div>
          <div className="h-full w-[40%] max-lg:w-full max-lg:h-[450px] flex flex-col">
            <div className="w-full h-1/3 flex border-b-2 border-black">
              <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Pickup date:</h5>
                <p>{trackingData?.pickUpDate}</p>
              </div>
              <div className="w-[40%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Pickup time</h5>
                <p>{trackingData?.pickupTime}</p>
              </div>
              <div className="w-[30%] h-full border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Delivery date:</h5>
                <p>{trackingData?.expectedDeliveryDate}</p>
              </div>
            </div>
            <div className="w-full h-1/3 flex border-b-2 border-black">
              <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Origin:</h5>
                <p>{trackingData?.origin}</p>
              </div>
              <div className="w-[40%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Destination:</h5>
                <p>{trackingData?.destination}</p>
              </div>
              <div className="w-[30%] h-full border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Courier:</h5>
                <p>{trackingData?.carrier}</p>
              </div>
            </div>
            <div className="w-full h-1/3 flex">
              <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Carrier:</h5>
                <p>{trackingData?.carrier}</p>
              </div>

              <div className="w-[30%] p-4 h-full text-[16px] flex justify-center flex-col">
                <h5 className="font-semibold">Departure Time:</h5>
                <p>{trackingData?.departureTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[57%] flex max-md:flex-col">
          <div className="h-full w-[85%] max-md:w-full max-md:border-b-2 max-md:border-r-0 border-r-2 border-black">
            <div className="h-2/3 border-b-2 max-md:flex-col border-black flex">
              <div className="w-1/2 max-md:w-full border-r-2 max-md:border-r-0 border-black">
                <div className="flex text-[17px] w-full h-[30%] border-b-2 border-black">
                  <div className="w-[35%] max-md:w-[50%] p-4 border-r-2 border-black font-semibold">
                    Shipper
                  </div>
                  <div className="p-4">{trackingData?.shipperName}</div>
                </div>
                <div className=" p-4 text-[17px] h-[70%] flex flex-col justify-center">
                  <div className="mb-2">{trackingData?.shipperAddress}</div>
                  <div className="text-blue-600 underline break-all">
                    {trackingData?.shipperEmail}
                  </div>
                </div>
              </div>
              <div className="w-1/2 max-md:w-full">
                <div className="flex text-[17px] w-full h-[30%] border-b-2 max-md:border-t-2 border-black">
                  <div className="w-[35%] p-4 border-r-2 border-black font-semibold">
                    Consigner
                  </div>
                  <div className="p-4">{trackingData?.receiverName}</div>
                </div>
                <div className=" p-4 text-[17px] h-[70%] flex flex-col justify-center">
                  <div className="mb-2">{trackingData?.receiverAddress}</div>
                  <div className="mb-2">{trackingData?.receiverNumber}</div>
                  <div className="text-blue-600 underline break-all">
                    {trackingData?.receiverEmail}
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
              <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                <div className="font-semibold">Type of Shipment:</div>
                <div>{trackingData?.mode}</div>
              </div>
              <div className="p-4 sm:p-3 border-r-2 text[17px] border-black">
                <div className="font-semibold">Packages:</div>
                <div>{trackingData?.packages}</div>
              </div>
              <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                <div className="font-semibold">Product:</div>
                <div>{trackingData?.product}</div>
              </div>
              <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                <div className="font-semibold">Weight:</div>
                <div>{trackingData?.weight}</div>
              </div>
              <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                <div className="font-semibold">Total Freight:</div>
                <div>${trackingData?.totalFreight}</div>
              </div>
              <div className="p-4 sm:p-3 text-[17px]">
                <div className="font-semibold">Quantity:</div>
                <div>{trackingData?.quantity}</div>
              </div>
            </div>
          </div>
          <div className="h-full w-[25%] max-md:w-full">
            <div className="h-[19.7%] border-b-2 text-[17px] flex items-center p-4 border-black">
              <p>Status: {trackingData?.orderStatus}</p>
            </div>
            <div className="h-[80.3%] text-[17px] flex items-start p-4">
              <p>Comment: {trackingData?.comment}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackedItem;
