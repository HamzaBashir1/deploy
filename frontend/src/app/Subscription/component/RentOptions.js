"use client"
import React, { useState } from 'react';
import { useContext } from 'react';
import { FormContext } from "../../FormContext";
const RentalOptions = ({setTab, rentalOption, setRentalOption}) => {
  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  const { formData, updateFormData } = useContext(FormContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);}
  // Options data
  const options = [
    { id: 1, label: 'Apartment / flat for rent' },
    { id: 2, label: 'Cottage / Wooden house / Log house' },
    { id: 3, label: 'Hotel / Pension' },
    { id: 4, label: 'Other unique places' },
  ];

  // Handler for selecting an option
  const handleSelectOption = (id) => {
    setRentalOption(id);
  };

  return (
    <div>
    <div className="flex flex-row items-center min-h-screen mx-4 bg-gray-50">
      {/* Header */}
      <div className="w-full p-4 mx-12 ">
        <h1 className="text-3xl font-bold text-gray-800">What will you rent?</h1>
        <p className="mt-2 text-lg text-gray-600">
          Choose the option that best <span className="font-bold">describes</span> your accommodation.
        </p>
        <div className="flex items-center mt-4 text-gray-500">
          <div className="mr-2">
            {/* Chat Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h5m4 8v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2m4-2h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
              />
            </svg>
          </div>
          <p className="text-sm">
            Do you need advice on something?{' '}
            <a href="#" className="text-blue-500 underline">
              Ask us
            </a>
          </p>
        </div>
      </div>

      {/* Rental Options */}
      <div className="w-full max-w-2xl space-y-4">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex justify-between items-center border p-4 rounded-lg cursor-pointer ${
              rentalOption === option.id ? 'border-black' : 'border-gray-200'
            }`}
            onClick={() => handleSelectOption(option.id)}
          >
            <span className="text-lg font-medium text-gray-700">{option.label}</span>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-.01V9h.01a1.5 1.5 0 113 0v3.01H15v4h-2zm-2-4V9h-.01m-.991 7.232A1 1 0 108.999 17.5M21 7.2A10 10 0 105 16.803"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

     
    </div>
       {/* Navigation Buttons */}
       <div className="flex items-center justify-end mx-8">
       <button className="py-2 text-gray-500 px-9 hover:text-gray-700 focus:outline-none">Back</button>
       <button className="py-2 text-white bg-pink-500 rounded-md shadow px-9 hover:bg-pink-600 focus:outline-none"   onClick={() => setTab(1)}
       >Next</button>
     </div>
    </div>
  );
};

export default RentalOptions;
