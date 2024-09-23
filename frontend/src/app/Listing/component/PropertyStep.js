import Link from 'next/link';
import React from 'react';

const PropertyStep = () => {
  return (
  <div>
  <div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
{/* Back Button */}
<img src='/Putko.png' className="w-20 h-8 text-gray-500 hover:text-gray-700 focus:outline-none"/>

</div>
  <div className="min-h-screen px-8 py-20 ">
  <div className="mx-auto text-left max-w-7xl">
    {/* Title Section */}
    <h2 className="mb-12 text-5xl font-bold"></h2>

    <div className="flex flex-col items-center justify-center lg:flex-row-reverse lg:space-x-12">
      {/* Image Section */}
      <div className="flex justify-center w-full mb-8 lg:w-1/2 lg:mb-0">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <img
            src="/Image.png"
            alt="How to start image"
            className="object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Sign up Section */}
      <div className="flex flex-col items-start w-full text-left lg:w-1/2 lg:items-start lg:pl-8">
        <div className="flex items-center mb-4 ">
          
          <h1 className="text-2xl font-bold">step 1 </h1>
        </div>
        <div className="flex items-center mb-4 ">
          
          <h1 className="text-4xl font-bold">Tell us about your place </h1>
        </div>
        <p className="text-lg text-gray-600">
        In this step, we'll ask you which type of property <br/> you have and if
        guests will book the entire place or just a room. Then let us know the location and how many guests can stay. </p>
      </div>
    </div>
  </div>
</div>
<div className="flex items-center justify-between p-4 bg-white border-t border-gray-200">
{/* Back Button */}
<button className="text-gray-500 hover:text-gray-700 focus:outline-none">
  Back
</button>

{/* Next Button */}
<button className="px-4 py-2 text-white bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none">
  Next
</button>
</div>
  </div>
  );
};

export default PropertyStep; 