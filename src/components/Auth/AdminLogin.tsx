import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import logo from "../../assets/Logo.png"
import axios from "../config/axiosconfig";
import toast from "react-hot-toast";



const AdminLogin = () => {


const navigate = useNavigate()

const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setloading] = useState(false)

  const handleInputChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async () => {

const loadingId = toast.loading("Please wait...")
try{
  setloading(true)
  const res = await axios.post("/login", formData)
  console.log(res.data);
  localStorage.setItem("token", res.data.data.token)
  navigate("/admin-dashboard/home")
  }catch(error){
    console.log(error)
    toast.error("Login failed")
  }finally{
    setloading(false)
    toast.dismiss(loadingId)
  }
  };

  const currentYear = new Date().getFullYear()
  return (
    <div className="min-h-screen bg-blue-900 w-xl flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="w-full flex justify-center items-center mb-10">
                <img src={logo} alt="" className="w-50" />
            </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 text-center">
              Sign In
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Access your admin dashboard
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="admin@company.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500 hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200 font-medium"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account? {' '}
              <button
                onClick={()=>navigate("/admin/register")}
                className="text-blue-600 cursor-pointer hover:text-blue-500 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-blue-200 text-sm">
            © {currentYear} Emerald Express. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin
