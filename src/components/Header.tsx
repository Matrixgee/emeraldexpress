import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from '../assets/Logo.png';
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`bg-[#274cb2] text-white shadow-lg fixed w-full top-0 z-50 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-start space-x-2">
            <img src={logo} alt="Company Logo" className="w-[200px] max-md:w-[160px] max-md:h-[30px] h-[40px]" />
          </div>
          <div className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? "font-[700] text-md cursor-pointer" : "hover:text-blue-300 cursor-pointer"}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? "font-[700] text-md cursor-pointer" : "hover:text-blue-300 cursor-pointer"}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "font-[700] text-md cursor-pointer" : "hover:text-blue-300 cursor-pointer"}>Contact</NavLink>
          </div>

          <button 
            onClick={toggleMenu}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden flex flex-col space-y-4 py-4">
            <NavLink to="/home" className="hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Home</NavLink>
            <NavLink to="/about" className="hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" className="hover:text-blue-300" onClick={() => setIsMenuOpen(false)}>Contact</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
