import bar from "../../assets/bar.png"
import bg from "../../assets/Logo.png"

const TrackedItem = () => {
    
    return (
        <div className="bg-blue-900 w-full h-max lg:h-screen p-3 md:text-[18px]">
            <div className="bg-white border-2 border-black w-full h-full">
                <div className="w-full h-[43%] border-b-2 border-black flex max-lg:flex-col">
                    <div className="h-full w-[30%] max-lg:border-b-2 max-lg:border-r-0 max-lg:w-full max-lg:justify-center flex items-center border-r-2 border-black">
                        <img src={bg} alt="" className="max-lg:w-max max-lg:h-[40px]" />
                    </div>
                    <div className="h-full w-[40%] max-lg:w-full max-lg:border-b-2 max-lg:border-r-0 border-r-2 border-black p-4 flex flex-col justify-center items-center">
                        <img src={bar} alt="" />
                        <div className="font-mono text-[17px]">EECS084196421</div>
                        <div className="text-xl">Accounts Copy</div>
                    </div>
                    <div className="h-full w-[40%] max-lg:w-full max-lg:h-[450px] flex flex-col">
                        <div className="w-full h-1/3 flex border-b-2 border-black">
                            <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Pickup date:</h5>
                                <p>2023-11-21</p>
                            </div>
                            <div className="w-[40%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Pickup time</h5>
                            </div>
                            <div className="w-[30%] h-full border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Delivery date:</h5>
                                <p>2023-11-21</p>
                            </div>
                        </div>
                        <div className="w-full h-1/3 flex border-b-2 border-black">
                            <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Origin:</h5>
                                <p>Korea</p>
                            </div>
                            <div className="w-[40%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Destination:</h5>
                            </div>
                            <div className="w-[30%] h-full border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Courier</h5>
                                <p>Emerald Express</p>
                            </div>
                        </div>
                        <div className="w-full h-1/3 flex">
                            <div className="w-[30%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Carrier:</h5>
                                <p>EECS</p>
                            </div>
                            <div className="w-[40%] h-full border-r-2 border-black p-4 text-[16px] flex justify-center flex-col">
                                <h5>Carrier reference No:</h5>
                                <p className="max-sm:text-sm">EECS084196421</p>
                            </div>
                            <div className="w-[30%] p-4 h-full text-[16px] flex justify-center flex-col">
                                <h5>Departure Time:</h5>
                                <p>12:00pm</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[57%] flex max-md:flex-col">
                    <div className="h-full w-[85%] max-md:w-full max-md:border-b-2 max-md:border-r-0 border-r-2 border-black">
                        <div className="h-2/3 border-b-2 max-md:flex-col border-black flex">
                            <div className="w-1/2 max-md:w-full border-r-2 max-md:border-r-0 border-black">
                                <div className="flex text-[17px] w-full h-[30%] border-b-2 border-black">
                                    <div className="w-[35%] max-md:w-[50%] p-4 border-r-2 border-black">Shipper</div>
                                    <div className="p-4">Kim Nam Joon</div>
                                </div>
                                <div className=" p-4 text-[17px] h-[70%] flex flex-col justify-center">
                                    <div className="mb-2">P.O Box #1062 Loans Rm201</div>
                                    <div className="mb-2">Donghwa Bldg Seoul, South Korea</div>
                                    <div className="text-blue-600 underline break-all">btskimnamjoonrapmonster@gmail.com</div>

                                </div>
                            </div>
                            <div className="w-1/2 max-md:w-full">
                                <div className="flex text-[17px] w-full h-[30%] border-b-2 max-md:border-t-2 border-black">
                                    <div className="w-[35%] p-4 border-r-2 border-black">Consigner</div>
                                    <div className="p-4">Adele Kavaliaukskiene</div>
                                </div>
                                <div className=" p-4 text-[17px] h-[70%] flex flex-col justify-center">
                                    <div className="mb-2">Audros g.8, Lazdijai LT-67129 Lithuania</div>
                                    <div className="mb-2">+37067811016</div>
                                    <div className="text-blue-600 underline break-all">paspartukas@gmail.com</div>

                                </div>
                            </div>
                        </div>
              <div className="h-1/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                  <div className="font-semibold">Type of Shipment:</div>
                  <div className="">Air Freight</div>
                </div>
                <div className="p-4 sm:p-3 border-r-2 text[17px] border-black">
                  <div className="font-semibold">Packages:</div>
                  <div className="">1</div>
                </div>
                <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                  <div className="font-semibold">Product:</div>
                  <div className="">Metal Box</div>
                </div>
                <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                  <div className="font-semibold">Weight:</div>
                  <div className="">6Kg</div>
                </div>
                <div className="p-4 sm:p-3 border-r-2 text-[17px] border-black">
                  <div className="font-semibold">Total Freight:</div>
                  <div className="">1</div>
                </div>
                <div className="p-4 sm:p-3 text-[17px]">
                  <div className="font-semibold">Quantity:</div>
                  <div className="">1</div>
                </div>
              </div>
            </div>
                    <div className="h-full w-[25%] max-md:w-full">
                        <div className="h-[19.7%] border-b-2 text-[17px] flex items-center p-4 border-black">
                            <p>Status: In Transit</p>
                        </div>
                        <div className="h-[80.3%] text-[17px] flex items-start p-4">
                            <p>Comment: Your package has been successfully registered and out for shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackedItem
