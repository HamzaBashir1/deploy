import React from "react";
import {
  FaBreadSlice,
  FaConciergeBell,
  FaEgg,
  FaInfoCircle,
} from "react-icons/fa";
import {
  FaUtensils,
  FaCoffee,
  FaBowlRice,
  FaDrumstickBite,
  FaGlobe,
} from "react-icons/fa";

const Diet = ({ data }) => {
  const dietOptions = data?.diet || [];

  const DIET_CONFIG = {
    "Own catering": {
      icon: <FaConciergeBell className="text-2xl text-neutral-600" />,
      description: "Prepare your own meals with full kitchen access",
    },
    Breakfast: {
      icon: <FaCoffee className="text-2xl text-neutral-600" />,
      description: "Daily breakfast included with your stay",
    },
    "Half board": {
      icon: <FaBreadSlice className="text-2xl text-neutral-600" />,
      description: "Breakfast and dinner included",
    },
    "Full board": {
      icon: <FaEgg className="text-2xl text-neutral-600" />,
      description: "All main meals included: breakfast, lunch, and dinner",
    },
    "All inclusive": {
      icon: <FaGlobe className="text-2xl text-neutral-600" />,
      description: "All meals, snacks, and selected beverages included",
    },
  };

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10  w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-neutral-900">
            Dining Options
          </h2>
          <span className="block mt-3 text-neutral-500 text-lg">
            Choose your preferred meal plan for your stay
          </span>
        </div>

        <div className="mb-8 bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-amber-100 rounded-xl">
              <FaInfoCircle className="text-2xl text-amber-600" />
            </div>
            <p className="text-amber-700">
              Meal plan selection will be available after choosing your stay
              dates
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {dietOptions.length > 0 ? (
            dietOptions.map((option, index) => (
              <div
                key={index}
                className="group bg-neutral-50 hover:bg-neutral-100 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow transition-shadow">
                    {DIET_CONFIG[option]?.icon}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {option}
                    </h3>
                    <p className="text-neutral-500">
                      {DIET_CONFIG[option]?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-neutral-500 text-center py-8">
              No meal options currently available
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-neutral-400">
          *Photos are for illustration purposes only
        </p>
      </div>
=======
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
>>>>>>> f88800770ed881f40e51d52e26717815a1ef8332
    </div>
  );
};

export default Diet;
