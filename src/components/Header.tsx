import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo from '../assets/Logo.png';
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
    <motion.nav 
  className="bg-[#274cb2] text-white shadow-lg absolute w-full top-0 z-50"
  initial={{ y: -100 }}
  animate={{ y: showHeader ? 0 : -100 }}
  transition={{ 
    type: "spring", 
    damping: 20, 
    stiffness: 150,
    duration: 0.4 
  }}
>
  <div className="container mx-auto px-6">
    <div className="flex justify-between items-center py-4">
      <motion.div 
        className="flex items-start space-x-2"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img 
          src={logo} 
          alt="Company Logo" 
          className="w-[200px] max-md:w-[160px] max-md:h-[30px] h-[40px]" 
        />
      </motion.div>

      <motion.div 
        className="hidden md:flex space-x-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" }
        ].map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.4 + (index * 0.1), 
              duration: 0.3 
            }}
          >
            <NavLink 
              to={item.to} 
              className={({ isActive }) => 
                isActive 
                  ? "font-[700] text-md cursor-pointer" 
                  : "hover:text-blue-300 cursor-pointer transition-colors duration-200"
              }
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </motion.div>

      <motion.button 
        onClick={toggleMenu}
        className="md:hidden text-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          key={isMenuOpen ? 'close' : 'menu'}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </motion.div>
      </motion.button>
    </div>

    <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          className="md:hidden overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="flex flex-col space-y-4 py-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" }
            ].map((item, index) => (
              <motion.div
                key={item.to}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3 
                }}
              >
                <NavLink 
                  to={item.to} 
                  className="hover:text-blue-300 transition-colors duration-200 block py-2" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
</motion.nav>
  );
};

export default Header;
