import { Outlet } from "react-router-dom"


const AdminLayout = () => {
  return (
    <div className="w-full h-max min-h-screen bg-blue-900 flex justify-center items-center">
      <Outlet/>
    </div>
  )
}

export default AdminLayout
