"use client"
import React from 'react'

function Pri() {
  return (
    <div>
    <div className="relative bg-gray-900 text-white py-12 px-8 min-h-screen">
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: "url('Images.png')",
      }}
    ></div>

    {/* Overlay for Gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent  "></div>

    <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start">
      {/* Text Section */}
      <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mt-72 z-10">
        <h2 className="text-4xl font-bold mb-4">How much does it <br/>cost?</h2>
        <p className="text-gray-300 mb-4 mt-5">
          When you sign up for the first time, you can choose <br/> from 3 special packages. The most advantageous Profi <br/>package for 12 months includes complete services with  <br/>the highest number of views.
        </p>
        <div className="mt-8 flex flex-row ">
        <button className="bg-transparent border border-[#FFD179] text-[#FFD179] font-bold py-3  px-4 rounded-[10px] text-lg">
        from the 20€
      </button>
      
          <p className=" mt-4 ml-5 text-[#FFD179]">
            per month for the <br/> object with VAT
          </p>
        </div>
      </div>
    </div>
  </div>   
  
  </div>
  )
}

export default Pri
