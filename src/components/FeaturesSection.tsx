import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Clock, Globe, Shield } from "lucide-react";

const FeaturesSection = () => {

        useEffect(() => {
      AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }, []);

  const features = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Express shipping options with guaranteed delivery times"
    },
    {
      icon: Shield,
      title: "Secure Handling",
      description: "Advanced security measures to protect your valuable shipments"
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Worldwide coverage with local expertise in every region"
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 text-lg">We provide world-class logistics solutions tailored to your needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 300} className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="text-blue-900" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection
