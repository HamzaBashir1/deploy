"use client";
import React, { useState, useContext } from "react";
import { FaHourglassHalf, FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { FormContext } from "@/app/FormContext";

const News = ({ onMenuClick }) => {
  const { user } = useContext(AuthContext);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('');
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };


  return (
    <>
      <div  className="">
        <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
            {/* Left Section: Title and Status */}
            <div className="flex flex-col">
              <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">News</h1>
              <p className="text-[#292A34B2] text-sm md:text-xs font-medium"> no messages</p>
            </div>

            {/* Center Section: Add Accommodation Button */}
            <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            onClick={toggleMenu}
          >
            <CiSearch className="text-xl text-gray-500" />
            <button className="items-center hidden px-4 py-2 text-black bg-white border rounded-lg md:flex hover:bg-gray-100"  onClick={() => updateSelectedpage("AddAccommodation")}>
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2"   onClick={toggleMenu}>
              {user?.photo ? (
                <img 
                  src={user?.photo} 
                  alt="User Profile" 
                  className="object-cover w-8 h-8 rounded-full"
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
      <div className="flex flex-col items-center justify-between mb-5 sm:flex-row">
        <div className="flex flex-row items-center gap-5">
          <button className="flex items-center px-6 py-2 text-gray-600 bg-white rounded-md shadow hover:bg-gray-300">
            <BiFilter className="text-lg" />
            <span className="ml-2">Filter</span>
          </button>
          <div>
            <button className="flex items-center px-6 py-2 text-gray-600 bg-white rounded-md shadow hover:bg-gray-300">
              The latest
              <BsArrowDown className="ml-2" />
            </button>
          </div>
        </div>

        <div className="w-full mt-4 sm:mt-0 sm:w-auto">
          <input
            type="text"
            placeholder="Search for..."
            className="w-full px-4 py-2 border border-gray-200 rounded-md shadow sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center py-5 px-5 sm:mx-5 mb-5 text-center items-center pb-[550px]">
        <div>
          <h2 className="mb-2 text-xl font-semibold">You have no messages yet</h2>
          <p className="max-w-xl text-center text-gray-500">
            No one has contacted your accommodation yet. All messages sent by customers via the contact form will be sent
            to your email, and you will also be able to read and deal with them here.
          </p>
        </div>
      </div>

      {/* Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button 
            className="text-2xl text-gray-600"
            onClick={toggleMenu}
          >
            <MdClose />
          </button>
          <ul className="mt-4 space-y-2 font-medium text-gray-800">
            <li className='flex flex-row gap-2'>
              <div>
                {user?.photo ? (
                  <img 
                    src={user?.photo} 
                    alt="User Profile" 
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <BsPersonCircle className="text-[#292A34] text-xl" />
                )}
              </div>
              <div className='flex flex-col'>
                <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
                <p className='text-xs'>Edit Profile</p>
              </div>
            </li>
            <li className='flex flex-col gap-3'>
              <button className='bg-[#292A34] rounded-lg text-white py-4 px-24'>Extend Subscription</button>
              <button className='bg-[#E7EAEE] rounded-lg text-[#292A34] py-4 px-24'>Order Additional services</button>
            </li>

            <hr className='my-5' />

            {/* Menu Items */}
            {/* Add your existing menu items here */}
             {/* Menu items */}
             {[
              
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              { icon: <MdOutlineEmail />, text: 'News' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              { icon: <MdOutlineShowChart />, text: 'Statistics' },
              { icon: <FaRegStar />, text: 'Rating' },
              { icon: <WiTime10 />, text: 'Last minute' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
              { icon: <MdOutlineSubscriptions />, text: 'Subscription' },
            ].map(({ icon, text }) => (
              <li key={text}>
                <p
                  className='flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100'
                  onClick={() => handleMenuClick(text)}  // Handle menu click and update selectedpage
                >
                  {icon}
                  <span className="text-sm font-medium">{text}</span>
                </p>
              </li>
            ))}
            <li>
              <button
                onClick={() => {}}
                className='flex items-center w-full gap-4 p-2 text-left text-gray-800 rounded-lg hover:bg-gray-100'
              >
                <GoSignOut />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default News;
