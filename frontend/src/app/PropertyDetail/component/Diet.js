import React from 'react';
import { FaBreadSlice, FaConciergeBell, FaEgg, FaInfoCircle } from 'react-icons/fa';
import { FaUtensils, FaCoffee, FaBowlRice, FaDrumstickBite, FaGlobe } from 'react-icons/fa'; // Import icons

const Diet = ({ data }) => {
  const dietOptions = data?.diet || [];

  // Function to get the appropriate icon for each diet option
  const getDietIcon = (option) => {
    switch (option) {
      case 'Own catering':
        return <FaConciergeBell className="w-8 h-8" />; // Concierge Bell for own catering
      case 'Breakfast':
        return <FaCoffee className="w-8 h-8" />; // Coffee for breakfast
      case 'Half board':
        return <FaBreadSlice className="w-8 h-8" />; // Bread Slice for half board
      case 'Full board':
        return <FaEgg className="w-8 h-8" />; // Egg for full board
      case 'All inclusive':
        return <FaGlobe className="w-8 h-8" />; // Globe for all-inclusive
      default:
        return null; // Return null for unrecognized options
    }
  };

  return (
    <div className="border rounded-lg shadow-md sm:p-8 p-6 mt-5 lg:ml-[18px]">
      {/* Title Section */}
      <h2 className="mb-4 text-xl font-bold">Diet</h2>
      
      {/* Notification Section */}
      <div className="flex items-start p-4 mb-4 bg-yellow-100 border border-yellow-300 rounded-lg">
        <FaInfoCircle className="mt-1 mr-3 text-xl text-yellow-600" />
        <p className="text-sm text-black">
          You can choose your meal only after <span className="font-semibold">choosing the date</span> of your vacation.
        </p>
      </div>

      {/* Options Section */}
      {dietOptions.length > 0 ? (
        dietOptions.map((option, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg mb-2">
            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 border rounded-lg">
              {getDietIcon(option)} {/* Display the appropriate icon */}
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
