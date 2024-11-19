"use client";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CiSearch } from 'react-icons/ci';
import { BiPlus } from 'react-icons/bi';
import { Base_URL } from "../../config"
import { BsPersonCircle } from 'react-icons/bs';
import { FormContext } from "@/app/FormContext";
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";

function Synchronization({ onMenuClick }) {
  const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [url, setUrl] = useState('');
  const [activePage, setActivePage] = useState('');
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle the menu click event
  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };
  useEffect(() => {
    const userr = localStorage.getItem('user');
    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      // Fetch accommodation data for the specific user
      const fetchAccommodations = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch accommodations');
          }

          const result = await response.json();
          setAccommodations(result);
        } catch (error) {
          console.error('Error fetching accommodations:', error);
        }
      };

      fetchAccommodations();
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  const handleAccommodationChange = (e) => {
    const accommodationId = e.target.value;
    const selected = accommodations.find(accommodation => accommodation._id === accommodationId);
    setSelectedAccommodation(selected);
    setUrl(selected ? selected.url || '' : ''); // Update URL field
  };

  const handleSave = async () => {
    if (!selectedAccommodation) {
      console.error('No accommodation selected');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodation._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }), // Send updated URL
      });

      if (!response.ok) {
        throw new Error('Failed to update accommodation');
      }
    alert("Accommodation updated successfully ")
      console.log('Accommodation updated successfully');
    } catch (error) {
      alert("Accommodation not updated  ")
      console.error('Error updating accommodation:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">
              Synchron Calendar
            </h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">
              {/* Apartment Košice */}
            </p>
          </div>
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

      <div className="min-h-screen bg-white">
        {/* Accommodation Selection */}
        <div className="p-5 mb-4 bg-white">
          <h1 className="mb-2 text-lg font-bold">Accommodation Name</h1>
          <div className="relative">
            <select
              className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
              onChange={handleAccommodationChange}
            >
              <option value="">Select an accommodation</option>
              {accommodations.length > 0 ? (
                accommodations.map(accommodation => (
                  <option key={accommodation._id} value={accommodation._id}>
                    {accommodation.name}
                  </option>
                ))
              ) : (
                <option>No accommodations available</option>
              )}
            </select>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"></span>
          </div>
        </div>

        {/* URL Input */}
        <div className="p-5 mb-4 bg-white">
          <h1 className="mb-2 text-lg font-bold">Enter URL</h1>
          <div className="relative">
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
              placeholder="Enter URL"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"></span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="px-8 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </div>

      {/* <Calsync/> */}
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
                <p className='text-xs' onClick={() => updateSelectedpage("EditProfile")} >Edit Profile</p>
              </div>
            </li>
            {/* <li className='flex flex-col gap-3'>
              <button className='bg-[#292A34] rounded-lg text-white py-4 px-24'>Extend Subscription</button>
              <button className='bg-[#E7EAEE] rounded-lg text-[#292A34] py-4 px-24'>Order Additional services</button>
            </li> */}

            <hr className='my-5' />

            {/* Menu Items */}
            {/* Add your existing menu items here */}
             {/* Menu items */}
             {[
              
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              // { icon: <MdOutlineEmail />, text: 'News' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              // { icon: <MdOutlineShowChart />, text: 'Statistics' },
              // { icon: <FaRegStar />, text: 'Rating' },
              // { icon: <WiTime10 />, text: 'Last minute' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
              // { icon: <MdOutlineSubscriptions />, text: 'Subscription' },
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
    </div>
  );
}

export default Synchronization;
