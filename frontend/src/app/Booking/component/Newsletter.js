import React from 'react';

const Newsletter = () => {
  return (
    <div className="flex items-center justify-center py-12 bg-gray-100">
    <div className="relative w-full max-w-4xl p-6 overflow-hidden bg-white rounded-lg shadow-lg sm:p-12">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="./z.png" // Replace with your image URL or local path
          alt="background" 
          className="object-cover w-full h-full rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center p-6 space-y-4 lg:p-12">
        <h2 className="text-3xl font-bold text-white">
          Actions, news and interesting things to email
        </h2>
        
        {/* Input Field */}
        <div className="relative ml-12 w-[500px] ">
  <input
    type="email"
    placeholder="Enter your email..."
    className="w-full px-4 py-4 pr-12 text-gray-700 bg-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
  
  {/* Button inside input */}
  <button className="absolute inset-y-0 right-0 flex items-center justify-center px-4 py-1 mx-1 my-1 text-white bg-pink-500 rounded-full shadow-md hover:bg-pink-600 focus:outline-none">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9.707V7a1 1 0 112 0v4a1 1 0 01-.293.707l-3 3a1 1 0 01-1.414-1.414L9 9.293z"
        clipRule="evenodd"
      />
    </svg>
  </button>
</div>


        {/* GDPR Text */}
        <p className="text-sm text-gray-300">
          By subscribing to the newsletter, you consent to the processing of your personal data in accordance with the 
          <a href="#" className="text-blue-500 underline"> GDPR</a>.
        </p>
      </div>
    </div>
  </div>
  );
};

export default Newsletter;
