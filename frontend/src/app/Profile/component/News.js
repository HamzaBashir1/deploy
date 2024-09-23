"use client";
import React, { useState, useContext } from "react";
import { FaHourglassHalf, FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";

const News = () => {
  const { user } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div  className="">
        <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
            {/* Left Section: Title and Status */}
            <div className="flex flex-col">
              <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">News</h1>
              <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Apartment Košice - no messages</p>
            </div>

            {/* Center Section: Add Accommodation Button */}
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

      <div className="bg-white"></div>

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

      <div className="flex flex-col justify-center py-5 px-5 sm:mx-5 mb-5 text-center items-center pb-[550px]">
        <div>
          <h2 className="text-xl font-semibold mb-2">You have no messages yet</h2>
          <p className="text-gray-500 max-w-xl text-center">
            No one has contacted your accommodation yet. All messages sent by customers via the contact form will be sent
            to your email, and you will also be able to read and deal with them here.
          </p>
        </div>
      </div>
    </>
  );
};

export default News;
