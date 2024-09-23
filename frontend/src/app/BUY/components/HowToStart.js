"use client"
import React from 'react'

function HowToStart() {
  return (
    <div>
    <div className="min-h-screen px-8 py-20 bg-gray-100">
      <div className="mx-auto text-center max-w-7xl">
        {/* Title Section */}
        <h2 className="mb-12  text-5xl font-bold">How to start</h2>

        <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-12">
          {/* Image Section */}
          <div className="flex justify-center w-full mb-8 lg:w-1/2 lg:mb-0">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="/Container (4).png"
                alt="How to start image"
                className="object-cover w-full h-auto"
              />
            </div>
          </div>

          {/* Sign up Section */}
          <div className="flex flex-col  items-start w-full text-left lg:w-1/2 lg:items-start lg:pl-8">
            <div className="flex items-center mb-4 ">
              <div className="w-5 h-5 mr-4 bg-black rounded-full"></div>
              <h3 className="text-2xl font-bold">Sign up</h3>
            </div>
            <p className="text-lg text-gray-600">
              Fill out a simple form with basic <br/> information about your <br/> accommodation. It will take <br/> you less than 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>

    </div>
  )
}

export default HowToStart
