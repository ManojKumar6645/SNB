import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import banner from '../assets/images/banner.png';
import logo from '../assets/images/smartneckband-logo.png';

const LoginWithOTP = () => {
    const [loginMethod, setLoginMethod] = useState('mobile'); // 'mobile' or 'email'
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [initialMobile, setInitialMobile] = useState(''); // Store the initial mobile
    const [initialEmail, setInitialEmail] = useState(''); // Store the initial email
    const [showOTPField, setShowOTPField] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [rememberMe, setRememberMe] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const otpInputRefs = useRef([]);
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (showOTPField && firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, [showOTPField]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const validateMobile = (number) => {
        const cleaned = number.replace(/\D/g, '');
        if (cleaned.length !== 10) {
            setError('Mobile number must be 10 digits');
            return false;
        }
        if (!/^[6-9]\d{9}$/.test(cleaned)) {
            setError('Please enter a valid Indian mobile number');
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

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setIsSubmitting(true);

        try {
            if (loginMethod === 'mobile') {
                if (validateMobile(mobile)) {
                    // Store the initial mobile
                    setInitialMobile(mobile);
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 800));
                    setShowOTPField(true);
                    setCountdown(30);
                    setSuccessMessage(`OTP sent to +91 ${mobile}`);
                }
            } else {
                if (validateEmail(email)) {
                    // Store the initial email
                    setInitialEmail(email);
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 800));
                    setShowOTPField(true);
                    setCountdown(30);
                    setSuccessMessage(`OTP sent to ${email}`);
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOTPSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 4) {
            setError('Please enter complete 4-digit OTP');
            return;
        }

        setIsSubmitting(true);
        try {
            // Simulate verification API call
            await new Promise(resolve => setTimeout(resolve, 800));

            // Demo verification - in real app, verify with backend
            if (enteredOtp === '1234') {
                navigate('/');
            } else {
                setError('Invalid OTP. Please try again.');
                setOtp(['', '', '', '']);
                if (otpInputRefs.current[0]) {
                    otpInputRefs.current[0].focus();
                }
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3 && otpInputRefs.current[index + 1]) {
            otpInputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
    };

    const resendOTP = async () => {
        if (countdown === 0) {
            setIsSubmitting(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                setCountdown(30);
                setSuccessMessage(`OTP resent to ${loginMethod === 'mobile' ? `+91 ${initialMobile}` : initialEmail}`);
                setError('');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const toggleLoginMethod = () => {
        setLoginMethod(loginMethod === 'mobile' ? 'email' : 'mobile');
        setError('');
        setSuccessMessage('');
    };

    const handleBackToChange = () => {
        setShowOTPField(false);
        setOtp(['', '', '', '']);
        // Reset the input fields to the initial values
        if (loginMethod === 'mobile') {
            setMobile(initialMobile);
        } else {
            setEmail(initialEmail);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ee86a8] to-[#f19b81] px-4 py-8 sm:py-0">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden p-3">
                {/* Left Banner Image - Hidden on mobile */}
                <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#F2709C] to-[#FF9472] relative overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                    <img
                        src={banner}
                        alt="Smart Neckband Banner"
                        className="object-cover w-full h-full"
                        style={{ objectPosition: 'center' }}
                    />
                </div>

                {/* Right Login Form */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
                    <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
                        {/* Logo */}
                        <div className="flex justify-center">
                            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800">
                                {showOTPField ? 'Verify OTP' : 'Welcome Back'}
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">
                                {showOTPField
                                    ? loginMethod === 'mobile'
                                        ? `Enter the OTP sent to +91 ${initialMobile}`
                                        : `Enter the OTP sent to ${initialEmail}`
                                    : 'Sign in to continue to your account with OTP'}
                            </p>
                        </div>

                        {!showOTPField ? (
                            <form onSubmit={handleSendOTP} className="space-y-5 mt-4">
                                {/* Login Method Toggle */}
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

                                {/* Mobile/Email Input Field */}
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
                                            : setEmail(e.target.value)
                                        }
                                        placeholder={
                                            loginMethod === 'mobile'
                                                ? 'Enter 10-digit number'
                                                : 'your.email@example.com'
                                        }
                                        className={`w-full px-4 py-3 text-sm border ${error ? 'border-red-500' : 'border-gray-300'
                                            } rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all`}
                                        maxLength={loginMethod === 'mobile' ? 10 : undefined}
                                    />
                                    {error && (
                                        <p className="text-red-500 text-xs mt-1 animate-fadeIn">{error}</p>
                                    )}
                                    {successMessage && (
                                        <p className="text-green-500 text-xs mt-1 animate-fadeIn">{successMessage}</p>
                                    )}
                                </div>

                                {/* Remember me checkbox */}
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="h-4 w-4 accent-orange-500 focus:ring-orange-400 rounded border-gray-300"
                                        />
                                        <span className="text-sm">Remember me</span>
                                    </label>
                                    <button type="button" className="text-orange-600 hover:underline font-medium text-sm"
                                    onClick={() => navigate('/login')}
                                    >
                                        Login With Password
                                    </button>
                                </div>

                                {/* Send OTP Button */}
                                <button
                                    type="submit"
                                    disabled={
                                        isSubmitting ||
                                        (loginMethod === 'mobile'
                                            ? mobile.length !== 10 || !!error
                                            : !!error || !email)
                                    }
                                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${((loginMethod === 'mobile' && mobile.length === 10 && !error) ||
                                            (loginMethod === 'email' && email && !error))
                                            ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        } shadow-md hover:shadow-lg transition-all duration-300`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send OTP'
                                    )}
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleOTPSubmit} className="space-y-5 mt-4">
                                {/* OTP Input Fields */}
                                <div className="space-y-2">
                                    <label className="text-m font-medium text-gray-700">Verification Code</label>
                                    <div className="flex justify-between space-x-3">
                                        {[0, 1, 2, 3].map((index) => (
                                            <input
                                                key={index}
                                                type="text"
                                                inputMode="numeric"
                                                maxLength="1"
                                                value={otp[index]}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                ref={index === 0 ? firstInputRef : (el) => (otpInputRefs.current[index] = el)}
                                                className="w-full h-12 text-center text-xl font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent outline-none transition-all"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Enter the 4-digit code sent to {loginMethod === 'mobile' ? `+91 ${initialMobile}` : initialEmail}
                                    </p>
                                </div>

                                {/* Resend OTP */}
                                <div className="text-center text-sm pt-2">
                                    {countdown > 0 ? (
                                        <span className="text-gray-500">
                                            Didn't receive code? Resend in {countdown}s
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={resendOTP}
                                            disabled={isSubmitting}
                                            className="text-orange-600 font-medium hover:underline focus:outline-none disabled:text-gray-400 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? 'Resending...' : 'Resend OTP'}
                                        </button>
                                    )}
                                </div>

                                {/* Verify Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting || otp.join('').length !== 4}
                                    className={`w-full py-3 px-4 rounded-lg text-white font-medium flex items-center justify-center ${otp.join('').length === 4
                                            ? 'bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700'
                                            : 'bg-gray-300 cursor-not-allowed'
                                        } shadow-md hover:shadow-lg transition-all duration-300`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify & Continue'
                                    )}
                                </button>

                                {/* Back to login options */}
                                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-2">
                                    <button
                                        type="button"
                                        onClick={handleBackToChange}
                                        className="text-sm text-orange-600 hover:underline focus:outline-none"
                                    >
                                        ← Change {loginMethod === 'mobile' ? 'number' : 'email'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleLoginMethod}
                                        className="text-sm text-orange-600 hover:underline focus:outline-none"
                                    >
                                        Use {loginMethod === 'mobile' ? 'email' : 'mobile'} instead
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginWithOTP;