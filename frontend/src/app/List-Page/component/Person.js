"use client"
import { FormContext } from "../../FormContext";
import useFetchData from "../../hooks/useFetchData";
import React, { useContext, useState, useEffect } from "react";

const Person = () => {
  const {  
    updateTravelingWithPet,
    updateBeds,
    Beds,
    updateBathrooms,
    Bathrooms,
    travelingWithPet,
    infants,
    adults,
    updateAdults,
    updateChildren,
    childrens,
    updateInfants,
    updateBedss,
        updateBathroomss
        ,
        Bedss,
        Bathroomss,  loadingProperties,
        setLoadingProperties,
    
  } = useContext(FormContext);

  const [adultss, setAdults] = useState(adults);
  const [children, setChildren] = useState(childrens);
  const [infantss, setInfants] = useState(infants);
  const [beds, setBeds] = useState(0); // 0 represents "Any"
  const [bathrooms, setBathrooms] = useState(0); // 0 represents "Any"
  const [travelingWithPets, setTravelingWithPet] = useState(false);
 // Increment/decrement beds
 const increaseBeds = () => setBeds(prev => prev + 1);
 const decreaseBeds = () => setBeds(prev => (prev > 0 ? prev - 1 : 0));

 // Increment/decrement bathrooms
 const increaseBathrooms = () => setBathrooms(prev => prev + 1);
 const decreaseBathrooms = () => setBathrooms(prev => (prev > 0 ? prev - 1 : 0));
 // Handle slider change

  const handleIncrement = (setter, value) => {
    setter(value + 1);
  };

  const handleDecrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };

  const handlePetChange = (e) => {
    setTravelingWithPet(e.target.checked);
  };

  useEffect(() => {
    updateAdults(adultss);
    updateChildren(children);
    updateInfants(infantss);
    updateBedss(beds);
    updateBathroomss(bathrooms);
    updateTravelingWithPet(travelingWithPet);
  }, [adultss, children, infantss, beds, bathrooms, travelingWithPet, updateAdults, updateChildren, updateInfants, updateBeds, updateBathrooms, updateTravelingWithPet]);
  
  return (
    <div className="p-6 mx-auto bg-white rounded-md shadow-lg">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">Guests & Rooms</h1>
      <hr className="mb-6" />

      {/* Adults */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-medium text-gray-700">Adults</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleDecrement(setAdults, adultss)}
            disabled={adultss === 1}
            className={`p-2 px-4 rounded-md text-xl font-bold transition ${
              adultss > 1 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          >
            -
          </button>
          <span className="text-xl font-semibold">{adults}</span>
          <button
            type="button"
            onClick={() => handleIncrement(setAdults, adults)}
            className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Children */}
{/* Children (2 - 12 years) */}
<div className="flex items-center justify-between mb-6">
        <p className="text-lg font-medium text-gray-700">Children (2 - 12 years)</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleDecrement(setChildren, children)}
            disabled={children === 0}
            className={`p-2 px-4 rounded-md text-xl font-bold transition ${
              children > 0 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          >
            -
          </button>
          <span className="text-xl font-semibold">{children}</span>
          <button
            type="button"
            onClick={() => handleIncrement(setChildren, children)}
            className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      {/* Infants */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg font-medium text-gray-700">Infants (under 2 years)</p>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => handleDecrement(setInfants, infantss)}
            disabled={infantss === 0}
            className={`p-2 px-4 rounded-md text-xl font-bold transition ${
              infantss > 0 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
            }`}
          >
            -
          </button>
          <span className="text-xl font-semibold">{infantss}</span>
          <button
            type="button"
            onClick={() => handleIncrement(setInfants, infantss)}
            className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div> 
      <hr className="mb-6" />

      {/* Bedrooms */}
      <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-medium text-gray-700">Number of Bedrooms</p>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={decreaseBeds}
          disabled={beds === 0}
          className={`p-2 px-4 rounded-md text-xl font-bold transition ${
            beds > 0 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          -
        </button>
        {/* Conditionally display 0 if bedrooms is empty or falsy */}
        <span className="text-xl font-semibold">{beds === 0 ? '0' : beds}</span>
        <button
          type="button"
          onClick={increaseBeds}
          className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
    
      {/* Bathrooms */}
      <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-medium text-gray-700">Number of Bathrooms</p>
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={decreaseBathrooms}
          disabled={bathrooms === 0}
          className={`p-2 px-4 rounded-md text-xl font-bold transition ${
            bathrooms > 0 ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 cursor-not-allowed"
          }`}
        >
          -
        </button>
        {/* Conditionally display 0 if bathrooms is an empty string */}
        <span className="text-xl font-semibold">{bathrooms === 0 ? '0' : bathrooms}</span>
        <button
          type="button"
          onClick={increaseBathrooms}
          className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
    

      <hr className="mb-6" />

      {/* Pet Option */}
      <div className="flex items-center mb-4">
        <input
          id="pet-checkbox"
          type="checkbox"
          checked={travelingWithPets}
          onChange={handlePetChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="pet-checkbox" className="ml-2 text-sm font-medium text-gray-900">
          We are traveling with a pet
        </label>
      </div>
    </div>
  );
};

export default Person;
