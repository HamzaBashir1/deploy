"use client";
import React, { useState, useContext, useRef, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import { MdClose } from 'react-icons/md';
import { FaHome, FaBars, FaEnvelope, FaCalendarAlt, FaChartLine, FaList } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { RiMenu2Fill, RiHotelLine } from "react-icons/ri";
import { MdOutlineEmail, MdOutlineShowChart, MdEuro, MdOutlinePercent, MdOutlineSubscriptions } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSync, GoSignOut } from "react-icons/go";
import Link from 'next/link'; // Ensure you import Link
import { FormContext } from '@/app/FormContext';
 
const Header = () => {
  const { user } = useContext(AuthContext);
  // const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext

  const [sidebarOpen, setSidebarOpen] = useState(false);  // State to track sidebar visibility
  const sidebarRef = useRef(null);  // Reference to sidebar for detecting clicks outside
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);  // Close the sidebar if clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle menu click and update selectedpage
  const handleMenuClick = (page) => {
    updateSelectedpage(page);  // Update selectedpage with clicked menu item
    setIsMenuOpen(false);  // Close the menu after selection
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
        {/* Left Section: Title and Status */}
        <div className="flex flex-col md:items-start">
          <h1 className="text-[#292A34] font-bold text-2xl">Overview</h1>
          <p className="text-[#292A34B2] text-xs font-medium">No warning</p>
        </div>

        {/* Center Section: Add Accommodation Button */}
        <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            
          >
            <CiSearch className="text-xl text-gray-500" />
            
            <button className="flex items-center px-4 py-2 space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100" onClick={() => updateSelectedpage("AddAccommodation")}>
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2" onClick={toggleMenu}>
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

      {/* Mobile Menu */}
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

            <hr className='my-5'/>

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

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default Header;
