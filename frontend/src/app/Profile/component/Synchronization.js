"use client";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CiSearch } from 'react-icons/ci';
import { BiPlus } from 'react-icons/bi';
// import { Base_URL } from '../../config';
import { BsPersonCircle } from 'react-icons/bs';

function Synchronization() {
  const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [url, setUrl] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              Apartment Košice
            </p>
          </div>
          <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            onClick={toggleMenu}
          >
            <CiSearch className="text-xl text-gray-500" />
            <button className="flex items-center px-4 py-2 space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
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
    </div>
  );
}

export default Synchronization;
