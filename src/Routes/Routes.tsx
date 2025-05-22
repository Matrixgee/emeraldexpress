import { createBrowserRouter } from "react-router-dom";
import LogisticsApp from "../components/LogisticsApp";
import HomePage from "../components/Pages/Home/HomePage";
import AboutPage from "../components/Pages/AboutPage";
import ContactPage from "../components/Pages/Contact/ContactPage";

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
    }
])