"use client";
import React, { useState, useContext } from "react";
import { CiSearch } from 'react-icons/ci';
import { BiPlus, BiFilter, BiSearch } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxDashboard } from 'react-icons/rx';
import { RiMenu2Fill } from 'react-icons/ri';
import { MdOutlineEmail, MdOutlineShowChart, MdEuro, MdOutlinePercent, MdOutlineSubscriptions } from 'react-icons/md';
import { LuCalendarDays } from 'react-icons/lu';
import { FaRegStar } from 'react-icons/fa';
import { WiTime10 } from 'react-icons/wi';
import { RiHotelLine } from 'react-icons/ri';
import { GoSync, GoSignOut } from 'react-icons/go';
import Link from 'next/link';
import { MdClose } from 'react-icons/md';
import AccommodationForm from './AccommodationForm';

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleButtonClick = () => {
    setShowForm(true); // Show the form and hide the other content
  };

  const closeForm = () => {
    setShowForm(false); // Close the form and show the original content
  };

  if (showForm) {
    // If showForm is true, display only the form
    return (
      <div className="py-4">
        <button 
          className="text-gray-600 text-2xl"
          onClick={closeForm}
        >
          Close Form
        </button>
        <AccommodationForm />
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Navbar */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Reservation Requests</h1>
            <p className="text-[#292A34B2] text-sm lg:text-lg md:text-base font-medium">
              Apartment Kosice - 11 requests
            </p>
          </div>

          {/* Center Section: Add Accommodation and User (Clickable for Menu) */}
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

        {/* Button Container for Add Your Own Date */}
        <div className="flex justify-end">
          <button
            className="flex items-center bg-red-500 text-white rounded-full px-4 py-2 space-x-2 hover:bg-red-600"
            onClick={handleButtonClick}
          >
            <BiPlus className="text-lg" />
            <span className="sm:block hidden">Add Your Own Date</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Section */}
      <div className="flex flex-row lg:flex-row lg:justify-between gap-4 mb-6">
        <div className="flex flex-row lg:flex-row gap-4 mb-4 lg:mb-0">
          <button className="bg-[#E7EAEE] flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200">
            <BiFilter className="text-lg" />
            <span className="hidden sm:block">Filter</span>
          </button>
          <button className="bg-[#E7EAEE] flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200">
            <span className="hidden sm:block">The latest</span>
            <IoMdArrowDropdown className="text-lg" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full lg:max-w-xs">
          <input
            type="text"
            placeholder="Search for..."
            className="border rounded-lg pl-10 pr-4 py-2 w-full"
          />
          <span className="absolute left-3 top-[50%] transform -translate-y-1/2 text-gray-500">
            <BiSearch />
          </span>
        </div>
      </div>

      <hr className="my-5" />

      {/* Reservation Details */}
      <div className="flex flex-col gap-10 mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
          <div key={index} className="flex flex-row md:flex-row items-center gap-5">
            <button className="bg-[#FFCB4E] rounded-lg py-2 px-4 text-white font-semibold">Import</button>
            <div>
              <h1 className="font-bold text-[#292A34] text-base">Apartment Kosice</h1>
              <h6 className="text-[#666666] text-sm font-bold">Sep 8 — Sep 10, 2024 (2 nights)</h6>
              <p className="text-[#666666] text-sm">Airbnb</p>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Menu */}
      <div 
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button 
            className="text-gray-600 text-2xl"
            onClick={toggleMenu}
          >
            <MdClose />
          </button>
          <ul className="space-y-2 font-medium text-gray-800 mt-4">
          <li className='flex flex-row gap-2'>
              <div>
                {user?.photo ? (
                  <img 
                    src={user?.photo} 
                    alt="User Profile" 
                    className="w-8 h-8 rounded-full object-cover"
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

            <hr className='my-5'/>

            {[
              { icon: <RxDashboard />, text: 'Overview', href: '#' },
              { icon: <RiMenu2Fill />, text: 'Reservation requests', href: '#' },
              { icon: <MdOutlineEmail />, text: 'News', href: '#' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar', href: '#' },
              { icon: <MdOutlineShowChart />, text: 'Statistics', href: '#' },
              { icon: <FaRegStar />, text: 'Rating', href: '#' },
              { icon: <MdEuro />, text: 'Prices', href: '#' },
              { icon: <MdOutlinePercent />, text: 'Promotions and discounts', href: '#' },
              { icon: <WiTime10 />, text: 'Last minute', href: '#' },
              { icon: <RiHotelLine />, text: 'Accommodation', href: '#' },
              { icon: <GoSync />, text: 'Calendar synchronization', href: '#' },
              { icon: <MdOutlineSubscriptions />, text: 'Subscription', href: '#' },
            ].map(({ icon, text, href }) => (
              <li key={text}>
                <Link href={href}>
                  <p className="flex items-center gap-3 text-[#292A34]">
                    {icon} <span>{text}</span>
                  </p>
                </Link>
              </li>
            ))}

            <hr className="my-5" />

            <li>
              <button 
                className="text-[#C62026] font-medium flex items-center gap-2"
              >
                <GoSignOut />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Full-page Accommodation Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full h-full sm:w-3/4 sm:h-auto p-8 relative">
            <button className="absolute top-4 right-4 text-gray-600 text-2xl" onClick={closeForm}>
              <MdClose />
            </button>
            <AccommodationForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;
