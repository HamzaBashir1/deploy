"use client";
import React, { useState, useContext } from "react";
import { FaHourglassHalf, FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";

const Invoice = () => {

  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-4 min-h-screen">
      {/* Invoice Header Section */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between items-start md:items-center">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Invoices</h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Apartment Košice - 1 order</p>
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

      {/* Filter and Search Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-5 gap-4">
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

        <div className="w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      <hr />

      {/* Invoice Item Section */}
      <div className="flex flex-col md:flex-row justify-between mb-5 p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <label className="bg-green-500 text-white text-xs px-2 py-1 rounded-lg">Paid</label>
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">Order 4508</h1>
            <p>Variable symbol: <span className="font-bold text-gray-500">72400242</span></p>
            <p>Pre-invoice: <span className="font-bold text-gray-500">72400242</span></p>
            <p>Invoice: <span className="font-bold text-gray-500">72400242</span></p>
            <p>Created 27 Aug 2024</p>
            <h1 className="font-bold">Service "Profi 12 months"</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-4 mt-4 md:mt-0">
          <h1 className="font-bold text-xl">179 €</h1>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">Invoice</button>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg">Pre-invoice</button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
