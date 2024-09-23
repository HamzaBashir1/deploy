"use client";
import React, { useState, useContext } from "react";
import { FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { BiFilter } from 'react-icons/bi';
import { BsArrowDown } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";

const RatingComponent = () => {

  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <>
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Rating</h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Apartment Košice</p>
          </div>

          {/* Center Section: Search and Add Accommodation Button */}
          <div className="hidden md:flex md:flex-row md:items-center md:gap-5">
          <div
            className="hidden md:flex md:flex-row md:items-center gap-4 cursor-pointer"
            onClick={toggleMenu}
          >
            <CiSearch className="text-xl text-gray-500" />
            <button className="flex items-center bg-white text-black border border-gray-300 px-4 py-2 rounded-lg space-x-2 hover:bg-gray-100">
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
              {user?.photo ? (
                <img 
                  src={user?.photo} 
                  alt="User Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
            </div>
          </div>

        </div>

        </div>

      </div>

      {/* Rating Section */}
      <div className='lg:mx-10 mx-5'>
        <div className='flex justify-between py-5 sm:mx-5 mb-5 flex-col sm:flex-row items-center'>
          <div className='flex flex-col lg:flex-row items-center gap-5'>
            <span className="text-6xl font-bold text-gray-800">0.0</span>
            <div className='flex flex-col text-center sm:text-left'>
              <div className='text-[#292A34] flex flex-row font-semibold text-sm sm:text-base'>
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-gray-300 w-6 h-6" />
                ))}
              </div>
              <p className='text-xs sm:text-sm'>No rating</p>
            </div>
          </div>
        </div>

        <hr className='my-4'/>

        {/* Filter and Search Controls */}
        <div className="flex justify-between mb-5 flex-col sm:flex-row items-center">
        <div className="flex flex-row items-center gap-5">
          <button className="flex items-center px-6 py-2 bg-white text-gray-600 rounded-md shadow hover:bg-gray-300">
            <BiFilter className="text-lg" />
            <span className="ml-2">Filter</span>
          </button>
          <div>
            <button className="flex items-center px-6 py-2 bg-white text-gray-600 rounded-md shadow hover:bg-gray-300">
              The latest
              <BsArrowDown className="ml-2" />
            </button>
          </div>
        </div>

        <div className="mt-4 sm:mt-0 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>
          
          <hr/>

        {/* No Ratings Message */}
        <div className="flex flex-col justify-center py-5 px-5 sm:mx-5 mb-5 text-center items-center pb-[500px]">
          <div>
            <h2 className="text-xl font-semibold mb-2">You have no ratings yet</h2>
            <p className="text-gray-500 max-w-xl">
              No one has rated your accommodation yet. Motivate your customers to evaluate, 
              so you can see where your strengths are and what you can still improve. Good 
              ratings also motivate new or undecided customers.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingComponent;
