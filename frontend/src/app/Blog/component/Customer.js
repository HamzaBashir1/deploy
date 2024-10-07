import React from 'react';

function Customer() {
  return (
    <div className="px-4 lg:px-0">
      {/* Category Buttons */}
      <div className="flex flex-nowrap space-x-4 overflow-x-auto mt-4">
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Accommodation
        </button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Inspiration
        </button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Traveling
        </button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Curiosities
        </button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Advice and Tips
        </button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200">
          Tips for a Trip
        </button>
      </div>

      {/* Main Content: Image first on mobile, text first on large screens */}
      <div className="flex flex-col lg:flex-row-reverse mt-10">
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl lg:w-[68%] shadow-lg h-[250px] lg:h-[400px]">
          <img
            src="/customer.png"
            alt="Curiosities of Slovak caves"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-start text-left lg:w-1/2 mt-10 lg:mt-32">
          <div className="lg:pr-14">
            <div className="text-red-500">Inspiration</div>
            <h2 className="text-2xl lg:text-3xl font-semibold">Curiosities of Slovak caves</h2>
            <button className="mt-4 px-6 py-3 text-white bg-red-500 rounded-md hover:bg-pink-700 transition">
              To read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customer;
