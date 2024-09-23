"use client";
import React, { useState, useContext } from "react";
import { FaCheckCircle, FaHourglassHalf, FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import LineChart from "./LineChart";
const AccommodationShow = () => {

  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div>
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between items-start md:items-center">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Accommodation</h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Apartment Košice </p>
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

    <div className="flex flex-row">
        <div className="flex-1">
              <img src="/putko.png" className="rounded-lg"/>
              <div className="flex-row">
                <FaCheckCircle/>
                <p>Verified accommodation</p>
              </div>
              <hr className="my-2"/>
            <p>Accommodation name</p>
            <p>Total capacity: <span className="font-bold">2 beds</span></p>
            <p>Number of Apartment: <span className="font-bold">1</span></p>
        </div>
    </div>
        
        <div className="flex-1">
            <div className="p-1 bg-slate-300   flex justify-between">
                <h1>Views</h1>
                <p>Statistics</p>
            </div>
            <LineChart/>
        </div>
    </div>
  )
}

export default AccommodationShow