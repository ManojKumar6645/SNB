import React, { useState } from 'react';
import axios from 'axios';
import banner from '../assets/images/b1.png';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: '',
    mobile_number: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.mobile_number.trim()) newErrors.mobile_number = 'Mobile number is required';
    if (!/^\d{10}$/.test(formData.mobile_number)) newErrors.mobile_number = 'Invalid mobile number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/users', formData);
      alert('Account created successfully');
      // Reset form after successful submission
      setFormData({
        username: '',
        mobile_number: '',
        email: '',
        address: '',
        password: '',
        confirmPassword: ''
      });
      setAgreedToTerms(false);
    } catch (error) {
      console.error(error);
      let errorMessage = 'Error creating account';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden" style={{ maxHeight: '90vh' }}>
        {/* Left Image - Hidden on small screens */}
        <div className="hidden md:block md:w-1/2 h-48 md:h-auto overflow-hidden">
          <img
            src={banner}
            alt="Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form */}
        <div className="flex flex-col justify-center p-6 md:p-8 w-full md:w-1/2">
          <h2 className="text-2xl text-center font-bold text-gray-800 dark:text-gray-100 mb-4">
            Create Your Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                User Name
              </label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Mobile Number
              </label>
              <input
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                type="tel"
                placeholder="Enter your number"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.mobile_number? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.mobile_number && (
                <p className="mt-1 text-xs text-red-500">{errors.mobile_number}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Enter your email"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                type="text"
                placeholder="Enter your address"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.address && (
                <p className="mt-1 text-xs text-red-500">{errors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter your password"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Confirm your password"
                className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:text-gray-200 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className={`mr-2 rounded focus:ring-purple-500 ${
                  errors.terms ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                  Privacy Policy
                </a>
              </span>
            </div>
            {errors.terms && (
              <p className="text-xs text-red-500">{errors.terms}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md text-sm font-medium transition duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-purple-600 hover:underline dark:text-purple-400"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;