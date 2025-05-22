import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactForm = () => {
        useEffect(() => {
            AOS.init({
                duration: 800,
                easing: "ease-in-out",
                once: true,
                mirror: false,
            });
        }, []);
    

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg" data-aos="fade-right" data-aos-delay="800">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Send us a Message</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="john@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            type="tel" 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>General Inquiry</option>
            <option>Shipping Quote</option>
            <option>Track Package</option>
            <option>Support</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea 
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tell us how we can help you..."
          ></textarea>
        </div>
        
        <button className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition duration-300 font-semibold">
          Send Message
        </button>
      </div>
    </div>
  );
};


export default ContactForm