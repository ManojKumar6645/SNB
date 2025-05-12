import React from 'react'
import loginimg from '../assets/images/login-img.jpg'
const Login = () => {
  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 dark:bg-gray-900">
      <div className="flex-1 max-w-4xl mx-auto overflow-hidden bg-white rounded-xl shadow-xl dark:bg-gray-800">
        <div className="flex flex-col-reverse md:flex-row">
          {/* Image Section */}
          <div className="h-48 md:h-auto md:w-1/2">
            <img
              src="/assets/img/login-office.jpeg"
              alt="Office"
              className="object-cover w-full h-full dark:hidden"
            />
            <img
              src={loginimg}
              alt="Office Dark"
              className="hidden object-cover w-full h-full dark:block"
            />
          </div>

          {/* Form Section */}
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl text-center font-bold text-gray-800 dark:text-gray-200">Login to Your Account</h1>

              <label className="block text-sm mb-4">
                <span className="text-gray-700 dark:text-gray-400">User Name</span>
                <input
                  type="text"
                  placeholder="Enter your user name"
                  className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </label>

              <label className="block text-sm mb-4">
                <span className="text-gray-700 dark:text-gray-400">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-4 py-2 text-sm border rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </label>

              <button className="w-full px-4 py-2 mb-4 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                Log In
              </button>

              {/* <div className="flex items-center justify-center my-4">
                <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
                <span className="px-2 text-sm text-gray-500 dark:text-gray-400">or</span>
                <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
              </div>

              <button className="flex items-center justify-center w-full px-4 py-2 mb-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-gray-500">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .3c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 22.1 24 17.6 24 12.3c0-6.6-5.4-12-12-12z" />
                </svg>
                Login with GitHub
              </button>

              <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:border-gray-500">
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.95 4.57c-.89.39-1.83.65-2.82.77 1.01-.61 1.79-1.57 2.16-2.72-.95.56-2.01.96-3.13 1.18-.9-.96-2.17-1.56-3.59-1.56C9.72 2.24 7.52 4.45 7.52 7.16c0 .39.05.77.13 1.13C5.1 7.93 2.7 6.29 1.13 4.06.72 4.78.48 5.62.48 6.5c0 1.71.87 3.21 2.19 4.09-.8-.03-1.56-.25-2.22-.62v.06c0 2.38 1.69 4.37 3.95 4.83-.41.11-.85.17-1.3.17-.31 0-.61-.03-.91-.08.61 1.95 2.45 3.38 4.6 3.42-1.68 1.32-3.8 2.11-6.1 2.11-.39 0-.78-.02-1.17-.07 2.19 1.39 4.77 2.21 7.56 2.21 9.05 0 14-7.5 14-13.99 0-.21 0-.42-.01-.63.96-.69 1.8-1.56 2.46-2.55z" />
                </svg>
                Login with Twitter
              </button> */}

              <div className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
                <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                  Forgot your password?
                </a>
              </div>

              <div className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                Don’t have an account?{' '}
                <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">
                  Create one
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login