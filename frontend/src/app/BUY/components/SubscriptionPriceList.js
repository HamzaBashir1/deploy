"use client"
import React from 'react'
import SubscriptionCard from './ProfessionalCard'
import ProfessionalCard from './ProfessionalCard';
import StandardCard from './StandardCard';
import BasicCard from './BasicCard'

function SubscriptionPriceList() {

  return (
    <div>
     <div className="bg-gray-50 py-12">
     
      {/* Section Title */}
      <div className="text-center mb-10 px-4 md:px-8 lg:px-16 xl:px-32">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscription price list</h2>
      <p className="text-gray-600 max-w-full md:max-w-2xl lg:max-w-4xl mx-auto">
        When you sign up for the first time, you can choose from 3 special packages. The most
        <br className="hidden lg:block" />
        advantageous Profi package includes complete services with the highest number of impressions.
        <br className="hidden lg:block" />
        After the initial subscription, flat-rate packages for 12, 6, or 3 months are available.
      </p>
    </div>
    

      {/* Toggle Buttons */}
      <div className="flex flex-col lg:flex-row justify-center gap-2 mx-5 mb-10">
        <button className="bg-white  border-black border-[2px] rounded-[10px]  px-4 py-2  shadow-sm focus:outline-none hover:bg-gray-100 text-[16px]">
          Cottages, wooden houses, log<br/>cabins
        </button>
        <button className="bg-white border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none hover:bg-gray-100">
          Hotels, guesthouses
        </button>
      </div>

     {/* Subscription Cards */}
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 w-full xl:px-32">
      <div className="max-w-lg w-full h-full">
        <ProfessionalCard />
      </div>
      <div className="max-w-lg w-full h-full">
        <StandardCard />
      </div>
      <div className="max-w-lg w-full h-full">
        <BasicCard />
      </div>
    </div>

      
      
    </div> 
    </div>
  )
}

export default SubscriptionPriceList
