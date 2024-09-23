"use client";
import Link from 'next/link';
import React from 'react'

function Hero() {
  return (
    <div className="pl-1 mt-20 lg:flex-col-reverse">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="mt-9 mx-6 text-left max-w-md md:mb-10">
          <h1 className="text-3xl sm:text-3xl lg:text-5xl font-bold mb-4 text-[#292A34]">
            Increase your <br />
            occupancy with <span className='text-[#4FBE9F]'>Putko </span> for €14.95 per month.
          </h1>
          <p className="text-base sm:text-lg mb-6 text-gray-700">
            In the last year, we reached <b>1,000,000</b> website visits and <b>50,000</b> inquiries. Join us today and try our services.
          </p>
          <Link href="/Subscription">
          <div className="space-y-4 flex flex-col">
            <button className="bg-[#4FBE9F] hover:bg-green-700 text-white rounded-[6px] font-bold py-2 px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg focus:outline-none focus:shadow-outline">
              Add accommodation and try
            </button>
            <button className="bg-[#E7EAEE] hover:bg-gray-100 text-gray-800 rounded-[6px] font-bold py-2 px-4 md:px-6 lg:px-8 text-sm md:text-base lg:text-lg focus:outline-none focus:shadow-outline">
              Why rent with Putko
            </button>
          </div>
          </Link>
        </div>
        <div className="w-full md:w-1/2 bg-cover">
          <img 
            src="/Image.png" 
            alt="Living room" 
            className="w-full h-auto rounded-tl-[12px] rounded-bl-[12px] rounded-tr-none rounded-br-none shadow-md"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
