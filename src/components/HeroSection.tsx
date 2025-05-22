import { useNavigate } from "react-router-dom";
import bg from "../assets/bg.jpg"

const HeroSection = () => {

  const navigate = useNavigate()
  return (
    <section
      className="text-white h-[600px] py-20 bg-cover flex justify-center items-center bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-[15px]">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-5xl max-md:text-4xl font-bold mb-6 text-center">
              Reliable <span className="text-blue-400">Logistics Solutions</span> for Your Business
            </h1>
            <p className="text-xl mb-8 text-blue-100 text-center">
              Fast, secure, and efficient shipping services worldwide. Track your packages in real-time and get them delivered on schedule.
            </p>
            <div className="flex  flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={()=>navigate("/about")} className="bg-white text-blue-900 max-md:w-max px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 cursor-pointer transition duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection
