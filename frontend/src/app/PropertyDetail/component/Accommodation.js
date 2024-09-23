import React from 'react';

const Accommodation = () => {
  return (
    <div className=" lg:mt-5 lg:mr-[440px] lg:ml-[18px]">
      <div className="bg-white rounded-lg p-4 sm:p-6 lg:p-6">
        {/* Header Section */}
        <div className="">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">Accommodation price list</h2>
          <p className="text-sm text-gray-600">An overview of accommodation prices to help you plan your stay.</p>
        </div>

        {/* Price Chart Section */}
        <div className="pb-4  ">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <h3 className="flex items-center text-base sm:text-lg font-semibold">
              <img src='/Image (2).png' alt="2024" className="w-6 h-6 mr-2"/>
              2024
            </h3>
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button className="p-1 bg-gray-100 rounded-full">
                {/* Placeholder for a button icon */}
              </button>
              <button className="p-1 bg-gray-100 rounded-full">
                <img src='/Button.png' alt="Button" />
              </button>
            </div>
          </div>
          <div className="h-20 mt-4 bg-gray-200 rounded-lg"></div> {/* Placeholder for price chart */}
        </div>

        {/* Price Details Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-t border-gray-200">
            <div className="mb-2 sm:mb-0">
              <h4 className="text-sm sm:text-base font-semibold">Base rate</h4>
              <p className="text-xs text-gray-500">Minimum 1 night, without meals</p>
            </div>
            <div>
              <span className="text-lg font-bold">240€</span>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-t border-gray-200">
            <div className="mb-2 sm:mb-0">
              <h4 className="text-sm sm:text-base font-semibold">Winter season</h4>
              <p className="text-xs text-gray-500">Valid from 2.1. until 15.3. Minimum 1 night without meals</p>
            </div>
            <div>
              <span className="text-lg font-bold">290€</span>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-t border-gray-200">
            <div className="mb-2 sm:mb-0">
              <h4 className="text-sm sm:text-base font-semibold">Easter</h4>
              <p className="text-xs text-gray-500">Valid from 18.4. until 21.4. Minimum 1 night without meals</p>
            </div>
            <div>
              <span className="text-lg font-bold">290€</span>
              <p className="text-xs text-gray-500">per night</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accommodation;
