
import { Outlet } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Header from "../Header";
import Footer from "../Footer";

const LogisticsApp = () => {

  return (
    <div className="min-h-screen bg-gray-50">
        <ScrollToTop/>
      <Header />
      <Outlet/>
      <Footer />
    </div>
  );
};
export default LogisticsApp