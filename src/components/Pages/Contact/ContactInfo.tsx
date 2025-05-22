import { Mail, MapPin, Phone } from "lucide-react";
import { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

const ContactInfo = () => {

        useEffect(() => {
            AOS.init({
                duration: 800,
                easing: "ease-in-out",
                once: true,
                mirror: false,
            });
        }, []);

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 p-8 rounded-lg" data-aos="fade-left" data-aos-delay="800">
        <h3 className="text-xl font-semibold text-blue-900 mb-6">Get in Touch</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <Phone className="text-blue-900 mr-4" size={24} />
            <div>
              <p className="font-semibold text-blue-900">Phone</p>
              <p className="text-gray-600">+1 (800) 555-LOGI</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Mail className="text-blue-900 mr-4" size={24} />
            <div>
              <p className="font-semibold text-blue-900">Email</p>
              <p className="text-gray-600">info@logitrans.com</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="text-blue-900 mr-4" size={24} />
            <div>
              <p className="font-semibold text-blue-900">Address</p>
              <p className="text-gray-600">
                123 Logistics Ave<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-left" data-aos-delay="800">
        <h3 className="text-xl font-semibold text-blue-900 mb-4">Business Hours</h3>
        <div className="space-y-2 text-gray-600">
          <div className="flex justify-between">
            <span>Monday - Friday</span>
            <span>8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday</span>
            <span>9:00 AM - 4:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Sunday</span>
            <span>Closed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo