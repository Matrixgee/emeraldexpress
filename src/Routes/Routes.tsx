import { createBrowserRouter } from "react-router-dom";
import LogisticsApp from "../components/Layouts/LogisticsApp";
import HomePage from "../components/Pages/Home/HomePage";
import AboutPage from "../components/Pages/AboutPage";
import ContactPage from "../components/Pages/Contact/ContactPage";
import AdminLayout from "../components/Layouts/AdminLayout";
import AdminLogin from "../components/Auth/AdminLogin";
import AdminRegister from "../components/Auth/AdminRegister";
import TrackedItem from "../components/Pages/TrackedItem";
import AdminDashboard from "../components/Admin/AdminDashboard";
import Home from "../components/Admin/Home";
import AllOrdersPage from "../components/Admin/AllOrdersPage";
import CreateOrderPage from "../components/Admin/CreateOrderPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LogisticsApp/>,
        children:([
            {
              path:"",
              element: <HomePage/>  
            },
            {
                path:"about",
                element:<AboutPage/>
            },
            {
                path:"contact",
                element: <ContactPage/>
            }
        ])
    },
    {
        path:"admin",
        element: <AdminLayout/>,
        children: [
            {
                path:"login",
                element: <AdminLogin/>
            },
            {
                path:"register",
                element: <AdminRegister/>
            }
        ]
    },
    {
        path:"admin-dashboard",
        element: <AdminDashboard/>,
        children:[
            {
                path:"home",
                element:<Home/>
            },
            {
                path:"orders",
                element:<AllOrdersPage/>
            },
            {
                path:"create",
                element:<CreateOrderPage/>
            }
        ]
    },
    {
        path:"tracked-item",
        element: <TrackedItem/>
    }
])