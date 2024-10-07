import React from 'react';

const AccommodationProvider = () => {
  return (
    <div className="px-4 lg:px-0">
      {/* Main Layout: Image first on mobile, text first on large screens */}
      <div className="flex flex-col lg:flex-row-reverse mt-10">
        
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl lg:w-[68%] shadow-lg h-[250px] lg:h-[400px]">
          <img
            src="/Blog.png"
            alt="How to be an eco-host"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-start text-left lg:w-1/2 mt-10 lg:mt-32">
          <div className="lg:pr-14">
            <div className="text-red-500">Inspiration</div>
            <h2 className="text-2xl lg:text-3xl font-semibold">How to be an eco-host</h2>
            <button className="mt-4 px-6 py-3 text-white bg-red-500 rounded-md hover:bg-pink-700 transition">
              To read
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationProvider;
