import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/banner.png';
import logo from '../assets/images/smartneckband-logo.png';

const ForgotPassword = () => {
    const [loginMethod, setLoginMethod] = useState('mobile');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateMobile = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length !== 10 || !/^[6-9]\d{9}$/.test(cleaned)) {
            setError('Please enter a valid 10-digit Indian mobile number');
            return false;
        }
        setError('');
        return true;
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }
        setError('');
        return true;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            if (loginMethod === 'mobile') {
                if (!validateMobile(mobile)) return;
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                setSuccessMessage(`Reset link sent to +91 ${mobile}`);
            } else {
                if (!validateEmail(email)) return;
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                setSuccessMessage(`Reset link sent to ${email}`);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ee86a8] to-[#f19b81] px-4 py-8 sm:py-0">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-3">
                <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#F2709C] to-[#FF9472] relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                    <img
                        src={banner}
                        alt="Banner"
                        className="object-cover w-full h-full"
                        style={{ objectPosition: 'center' }}
                    />
                </div>

                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
                        <div className="flex justify-center">
                            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800">Forgot Password</h3>
                            <p className="text-sm text-gray-600 mt-2">
                                Enter your registered {loginMethod} to receive reset instructions.
                            </p>
                        </div>

                        <form onSubmit={handleResetPassword} className="space-y-5 mt-4">
                            {/* Toggle Login Method */}
                            <div className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-full">
                                <button
                                    type="button"
                                    onClick={() => setLoginMethod('mobile')}
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${loginMethod === 'mobile'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    Mobile
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setLoginMethod('email')}
                                    className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${loginMethod === 'email'
                                            ? 'bg-white text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:text-gray-800'
                                        }`}
                                >
                                    Email
                                </button>
                            </div>

                            {/* Input Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    {loginMethod === 'mobile' ? 'Mobile Number' : 'Email Address'}
                                </label>
                                <input
                                    type={loginMethod === 'mobile' ? 'tel' : 'email'}
                                    required
                                    value={loginMethod === 'mobile' ? mobile : email}
                                    onChange={(e) => loginMethod === 'mobile'
                                        ? setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                                        : setEmail(e.target.value)}
                                    placeholder={loginMethod === 'mobile' ? 'Enter 10-digit number' : 'your.email@example.com'}
                                    className={`w-full px-4 py-3 text-sm border ${error ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all`}
                                    maxLength={loginMethod === 'mobile' ? 10 : undefined}
                                />
                                {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                                {successMessage && <p className="text-green-500 text-xs mt-1">{successMessage}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || (!!error || (loginMethod === 'mobile' && mobile.length !== 10) || (loginMethod === 'email' && !email))}
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center 
                                ${((loginMethod === 'mobile' && mobile.length === 10 && !error) || 
                                    (loginMethod === 'email' && email && !error))
                                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700'
                                        : 'bg-gray-300 cursor-not-allowed'
                                    } shadow-md hover:shadow-lg transition-all duration-300`}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
