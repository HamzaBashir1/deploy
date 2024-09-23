"use client"
import React from 'react'

function Featuresection() {
  return (
    <div>

    <div className="bg-[#004230] text-white p-10">
   
    <div className="bg-[#004230] text-white py-12 px-8">
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start">
      {/* Text Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-3xl font-bold mb-4">What else do you get?</h2>
        <p className="text-gray-300 mb-4">
          A clear web application, available on all devices, a modern presentation, and tools for an efficient rental system.
        </p>
        <p>
          <a href="#" className="text-blue-400 underline">
            Watch the video presentation
          </a>
          .
        </p>
      </div>

      {/* Video Section */}
      <div className="lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md">
          <img
            src="/image.png"
            alt="Video presentation"
            className="rounded-lg shadow-lg w-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center text-xl">
              ▶
            </button>
          </div>
          <div className="absolute bottom-4 right-4 bg-gray-800 text-white font-bold py-1 px-2 rounded-lg text-sm">
            1:26
          </div>
        </div>
      </div>
    </div>
  </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3  gap-10">
      <div className="flex flex-col items-left">
        <div className="rounded-full p-4 mb-3">
          <img src='/Overlay.png' className='h-14 w-14'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">Marketing support</h3>
          <p>We cover the marketing and you can focus on your business.</p>
        </div>
      </div>
      <div className="flex flex-col items-left">
        <div className="rounded-full  p-4 mb-3">
        <img src='/spoznaju-vas-novi-ludia.webp.png' className='h-14 w-14 rounded-md'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">New people will meet you</h3>
          <p>Thanks to our tools and experience, we will target your offer to relevant customers.</p>
        </div>
      </div>
      <div className="flex flex-col items-left">
        <div className="rounded-full  p-4 mb-3">
        <img src='/poradenstvo-a-servis.webp.png' className='h-14 w-14 rounded-md'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">Advice and service</h3>
          <p>Have our team at your disposal, which you can contact by phone or email.</p>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="flex flex-col items-left">
        <div className="rounded-full p-4 mb-3">
        <img src='/Overlay (2).png' className='h-14 w-14 rounded-md'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">Ratings</h3>
          <p>Use customer feedback to help you improve your services.</p>
        </div>
      </div>
      <div className="flex flex-col items-left">
        <div className="rounded-full  p-4 mb-3">
        <img src='/Overlay (1).png' className='h-14 w-14 rounded-md'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">Statistics</h3>
          <p>Detailed statistics will help you get a better picture of your accommodation.</p>
        </div>
      </div>
      <div className="flex flex-col items-left">
        <div className="rounded-full  p-4 mb-3">
        <img src='/Overlay (3).png' className='h-14 w-14 rounded-md'/>
        </div>
        <div>
          <h3 className="font-bold mb-2">Calendar synchronization</h3>
          <p>You can synchronize the occupancy with other platforms and fill it out in one place.</p>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Featuresection
