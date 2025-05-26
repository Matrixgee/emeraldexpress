import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/Routes"
import './App.css'

const App = () => {
  
  console.log(`${import.meta.env.VITE_DEVE_URL}`)



  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
