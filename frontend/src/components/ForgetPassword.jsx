import React from 'react'

const ForgetPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 animate-fade-in">
      <div className="flex w-full max-w-5xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl overflow-hidden">

        {/* Left Side Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            aria-hidden="true"
            className="object-cover w-full h-full dark:hidden"
            // src={LightImage}
            alt="Office"
          />
          <img
            aria-hidden="true"
            className="hidden object-cover w-full h-full dark:block"
            // src={DarkImage}
            alt="Office Dark"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex flex-col justify-center w-full md:w-1/2 p-6 sm:p-12">
          <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200 text-center sm:text-left">
            Forgot your password?
          </h1>
          <p className="mb-6 text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            No worries! Enter your email and we’ll send you a reset link.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="jane.doe@example.com"
                className="w-full px-4 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-lg transition duration-150 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            >
              Send Reset Link
            </button>

            <div className="text-center mt-4">
              <a href="/login" className="text-sm text-purple-600 hover:underline dark:text-purple-400">
                Back to login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword