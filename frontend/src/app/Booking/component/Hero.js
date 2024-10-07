import React from 'react';
import { Bs1Circle, Bs3Circle, Bs2Circle } from "react-icons/bs";

function Hero() {
  return (
    <div className='py-20 sm:py-6'>
      {/* Section 1 */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-40">
        <div className="text-left">
          {/* Title Section */}
          <div className='text-left lg:pl-9'>
            <h2 className="px-2 lg:px-8 mb-12 text-3xl lg:text-5xl sm:text-2xl font-bold py-8 lg:py-16">
              How selection and booking work
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row-reverse lg:space-x-12">
            {/* Image Section */}
            <div className="flex justify-center w-full mb-8 lg:w-1/2 lg:mb-0">
              <div className="relative overflow-hidden">
                <img
                  src="/zz.png"
                  alt="How to start image"
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col items-start w-full text-left lg:w-1/2 lg:items-start lg:pl-8">
              <div className="flex flex-col items-start mb-4 text-left">
                <div className="text-4xl lg:text-6xl text-pink-600"><Bs1Circle /></div>
                <h2 className="mt-3 lg:mt-5 text-2xl lg:text-3xl font-bold sm:text-xl">Take your pick <br /></h2>
              </div>
              <div className='mt-5'>
                <p className="w-full lg:w-[410px] sm:w-full">
                  Start by researching accommodation, choose a location, enter your preferred date, number of people, use filters that will allow you to narrow down the options. Read customer reviews to find exactly what you're looking for.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="px-4 py-12 sm:py-8 md:px-16 lg:px-60 lg:py-20">
        <div className="text-left">
          <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-12">
            {/* Image Section */}
            <div className="flex justify-center w-full mb-8 lg:w-1/2 lg:mb-0">
              <div className="relative overflow-hidden">
                <img
                  src="/z.png"
                  alt="How to start image"
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col items-start w-full text-left lg:w-1/2 lg:items-start lg:pl-8">
              <div className="flex flex-col items-start mb-4 text-left max-w-7xl">
                <div className="text-4xl lg:text-6xl text-pink-600"><Bs2Circle /></div>
                <h2 className="mt-3 lg:mt-5 text-2xl lg:text-3xl font-bold sm:text-xl">Make a reservation <br /></h2>
              </div>
              <div className='mt-5'>
                <p className="w-full lg:w-[490px] sm:w-full">
                  When you find what you're looking for, send a booking request in just a few clicks, which will be sent directly to the accommodation provider. Or you can call him directly, or write an email, it is up to you what form of communication you choose with the accommodation provider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="px-4 py-12 sm:py-8 md:px-16 lg:px-60 lg:py-20">
        <div className="text-left">
          <div className="flex flex-col items-center justify-center lg:flex-row-reverse lg:space-x-12">
            {/* Image Section */}
            <div className="flex justify-center w-full mb-8 lg:w-1/2 lg:mb-0">
              <div className="relative overflow-hidden">
                <img
                  src="/zzz.png"
                  alt="How to start image"
                  className="object-cover w-full h-auto"
                />
              </div>
            </div>

            {/* Info Section */}
            <div className="flex flex-col items-start w-full text-left lg:w-1/2 lg:items-start lg:pl-8">
              <div className="flex flex-col items-start mb-4 text-left">
                <div className="text-4xl lg:text-6xl text-pink-600"><Bs3Circle /></div>
                <h2 className="mt-3 lg:mt-5 text-2xl lg:text-3xl font-bold sm:text-xl">Travel out <br /></h2>
              </div>
              <div className='mt-5'>
                <p className="w-full lg:w-[490px] sm:w-full">
                  After confirmation of the reservation from the accommodation provider, everything is agreed and you can travel. Enjoy your stay and after your return you can write a review that will help other travelers with their choice of accommodation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;
