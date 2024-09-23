import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';

const Diet = ({ data }) => {
  const dietOptions = data?.diet || [];

  return (
    <div className="bg-white rounded-lg shadow-md sm:p-8 p-6 mt-5 lg:mr-[440px] lg:ml-[18px]">
      {/* Title Section */}
      <h2 className="mb-4 text-xl font-bold">Diet</h2>
      
      {/* Notification Section */}
      <div className="flex items-start p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <FaInfoCircle className="mt-1 mr-3 text-xl text-yellow-600" />
        <p className="text-sm">
          You can choose your meal only after <span className="font-semibold">choosing the date</span> of your vacation.
        </p>
      </div>

      {/* Options Section */}
      {dietOptions.length > 0 ? (
        dietOptions.map((option, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg mb-2">
            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg">
              <img src="/path/to/icon.png" alt={`${option} icon`} className="w-8 h-8" /> {/* Replace with dynamic icons */}
            </div>
            <p className="ml-4 text-sm font-medium">{option}</p>
          </div>
        ))
      ) : (
        <p className="text-sm">No meal options available.</p>
      )}

      {/* Disclaimer Section */}
      <p className="mt-2 text-xs text-gray-500">*Illustrative photos</p>
    </div>
  );
};

export default Diet;
