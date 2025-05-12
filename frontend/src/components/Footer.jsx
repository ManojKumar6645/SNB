import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 mt-4">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Copyright text */}
          <p className="text-center sm:text-left text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Smart Neckband. All Rights Reserved.
          </p>

          {/* Powered by text */}
          <p className="mt-2 sm:mt-0 text-xs sm:text-sm text-center sm:text-right">
            Powered by <span className="font-semibold text-purple-500">@myanimal</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
