import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/banner.png';
import logo from '../assets/images/smartneckband-logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (mobile === '8874856645' && password === 'admin') {
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#ee86a8] to-[#f19b81] px-4">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-3" style={{ maxHeight: '90vh' }}>
        {/* Left Banner Image - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#F2709C] to-[#FF9472] relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-black/10 z-10 p-2"></div>
          <img
            src={banner}
            alt="Smart Neckband Banner"
            className="object-cover w-full h-full "
            style={{ objectPosition: 'center' }}
          />
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center overflow-y-auto" style={{ maxHeight: '90vh' }}>
          <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
            {/* Logo - Always visible */}
            <div className="flex justify-center">
              <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">Welcome Back</h3>
              <p className="text-sm text-gray-600 mt-1">
                Sign in to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mobile No.</label>
                <input
                  type="text"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your Mobile No."
                  className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                />
              </div>

              <div className="space-y-1 relative">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-3 w-3 accent-orange-500 focus:ring-orange-400 rounded"
                  />
                  Remember Me
                </label>
                <a href="/forgetPassword" className="text-orange-600 hover:underline font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 text-sm rounded-lg text-white font-medium bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 shadow-md hover:shadow-lg transition-all duration-300"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-gray-600 pt-1">
               
                <a href="/loginwithotp" className="text-orange-600 font-medium hover:underline">Login with OTP</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;