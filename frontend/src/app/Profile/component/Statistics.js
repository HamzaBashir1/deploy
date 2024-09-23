"use client";
import React, { useState, useContext } from "react";
import { CiSearch } from 'react-icons/ci';
import { BiPlus, BiFilter, BiSearch, BiPlusCircle } from 'react-icons/bi';
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
import LineChart from "./LineChart";
import DateRangePicker from "./DateRangePicker";
import { FaInfoCircle } from 'react-icons/fa';
import { format } from "date-fns";

const Statistics = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="py-4">
      {/* Navbar */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-4">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Statistics</h1>
            <p className="text-[#292A34B2] text-sm lg:text-lg md:text-base font-medium">
              Apartment Kosice
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

        
        
      </div>

      <div className="flex flex-row">
        <div className="flex">

        </div>

        <div>
        <DateRangePicker 
            startDate={startDate} 
            endDate={endDate} 
            onDateChange={handleDateChange} 
        />
        </div>
      </div>
      
      
      <div className="flex flex-col lg:flex-row gap-4 ">
          {/* First Column */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col py-3">
              <h1 className="font-bold">Last 30 days</h1>
              {startDate && endDate && (
              <p className=" text-sm md:text-base text-gray-600">
                {`Selected range: ${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}`}
              </p>
            )}
              <hr/>
            </div>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">View Accommodation</h1>
              <h1 className="font-bold">1751</h1>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">Opening the Accommodation detail</h1>
              <h1 className="font-bold">17</h1>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">Customer interest</h1>
              <h1 className="font-bold">0</h1>
            </div>
          </div>

          {/* Second Column */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-col py-3">
              <h1 className="font-bold">Total since registration</h1>
              <p className="text-xs">Date of registration: 27 Aug 2024</p>
              <hr className="my-2"/>
            </div>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">View Accommodation</h1>
              <h1 className="font-bold">1751</h1>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">Opening the Accommodation detail</h1>
              <h1 className="font-bold">17</h1>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between py-3">
              <h1 className="text-blue-500">Customer interest</h1>
              <h1 className="font-bold">0</h1>
            </div>
          </div>
        </div>

        
        <div className="flex flex-col md:flex-row gap-3 border p-4 mt-4">
        <FaInfoCircle className="text-lg" />
          <p className="text-xs md:text-sm lg:text-base">
            Statistics are measured by Google Analytics and include only users with enabled cookies. Actual traffic may be 5 to 10% higher.
          </p>
        </div>

      <div className="flex flex-col gap-20">
      <LineChart/>
      <LineChart/>
      <LineChart/>
      <LineChart/>
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
                <Link href={href} className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100'>
                  {icon}
                  <span className="text-sm font-medium">{text}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {}}
                className='flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 text-gray-800 w-full text-left'
              >
                <GoSignOut />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default Statistics;
