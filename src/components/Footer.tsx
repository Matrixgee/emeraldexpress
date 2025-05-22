
import logo from '../assets/Logo.png'

const Footer = () => {

    const copy = new Date().getFullYear()
  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt=""  className="w-[200px] max-md:w-[160px] max-md:h-[30px] h-[40px]"/>
            </div>
            <p className="text-blue-200">
              Your trusted partner for reliable logistics and shipping solutions worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-blue-200">
              <li>Express Shipping</li>
              <li>Freight Solutions</li>
              <li>International Delivery</li>
              <li>Supply Chain Management</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-blue-200">
              <li>About Us</li>
              <li>Careers</li>
              <li>News</li>
              <li>Investors</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-blue-200">
              <li>Help Center</li>
              <li>Track Package</li>
              <li>Contact Us</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-4 text-center text-blue-200">
          <p>&copy; {copy} Emerald Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer