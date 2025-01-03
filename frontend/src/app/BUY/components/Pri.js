"use client"
import React from 'react'

function Pri() {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('Images.png')",
        }}
      ></div>

      {/* Overlay for Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>

      <div className="relative flex flex-col lg:flex-row items-center lg:items-start px-6 sm:px-12 md:px-16 lg:px-24 py-12 sm:py-16">
        {/* Text Section */}
        <div className="lg:w-1/2 lg:pr-8 lg:mt-72 z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How much does it <br /> cost?
          </h2>
          <div className="max-w-xs sm:max-w-md lg:max-w-lg mx-auto lg:mx-0">
            <p className="text-gray-300 mb-4 mt-5 text-sm sm:text-base lg:text-lg">
              When you sign up for the first time, you can choose from 3 special packages. The most advantageous Profi package for 12 months includes complete services with the highest number of views.
            </p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start  gap-4 lg:gap-0">
            <button className="bg-transparent border border-[#FFD179] text-[#FFD179] font-bold px-4 py-3 rounded-md text-base sm:text-lg">
              from the 20€
            </button>
            <p className="pl-2 text-left text-[#FFD179] text-sm sm:text-base">
              Per month for the <br /> object with VAT
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pri
