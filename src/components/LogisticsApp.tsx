
import ScrollToTop from "./ScrollToTop";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

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