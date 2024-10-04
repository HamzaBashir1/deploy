"use client"
import React, { useState, useContext } from 'react';
import { BsFilter } from 'react-icons/bs';
import MapCard from './MapCard'; // Import the MapCard component
import { IoClose } from 'react-icons/io5';
import { FormContext } from "../../FormContext";

const Title = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMapFullScreen, setIsMapFullScreen] = useState(false); 
  const [isLocationPopupOpen, setIsLocationPopupOpen] = useState(false); 
  const [ispersonPopupOpen, setIspersonPopupOpen] = useState(false); 

  const { location, person,updateperson,city,country,updateLocation, updateCity, updateCountry,drop , updatedrop } = useContext(FormContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMapFullScreen = () => {
    setIsMapFullScreen(!isMapFullScreen); // Toggle full screen
  };

  const openLocationPopup = () => {
    setIsLocationPopupOpen(true);
  };

  const closeLocationPopup = () => {
    setIsLocationPopupOpen(false);
  };

  
  const openpersonPopup = () => {
    setIspersonPopupOpen(true);
  };

  const closepersonPopup = () => {
    setIspersonPopupOpen(false);
  };

  const [locations, setLocation] = useState('');
  const [countrys, setcountry] = useState('');
  const [citys, setcity] = useState('');
  const [guests, setGuests] = useState('');
  // const { location,updateLocation,updateCity,updateCountry} = useContext(FormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ locations, city, country, guests });
    updateLocation(locations);
    updateCountry(countrys);
    updateCity(citys);
    // closeModal();
    closeLocationPopup();
  };

  return (
    <div className='pt-40 lg:mx-20 mx-4'>
      <h1 className='font-bold text-[#292A34] text-3xl mb-2'>Accommodation</h1>
      <p className='text-[#54555D] text-base mb-10'>
        See accommodation for rent at the best price directly from the accommodation provider.
      </p>

      <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 pb-10'>
        <div className='flex flex-wrap gap-2'>
          <button 
            className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]'
            onClick={openLocationPopup}
            >
              Location
          </button>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]'>Date from - to</button>
          <button 
            className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]' 
            onClick={openpersonPopup}
            >
              Number of persons
          </button>
        </div>

        <div className='flex flex-wrap items-center gap-2 lg:gap-3'>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm text-[10px] px-5 flex items-center'>
            <BsFilter className='mr-2' /> Filter
          </button>
          <p className='text-[10px] lg:text-sm'>Sort by:</p>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              id="dropdownDefaultButton"
              className="text-[10px] lg:text-sm font-bold text-black rounded-lg px-2 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Dropdown button
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdown"
                className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-28 sm:w-36 lg:w-44"
              >
                <ul className="py-2 text-xs text-gray-700 sm:text-sm">
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Apartment')}  // Update the drop value when clicked
                    >
                      Apartment
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Flat')}
                    >
                      Flat
                    </p>
                  </li>
                  <li>
                    <p 
                      
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Glamping')}
                    >
                      Glamping
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Cottages')}
                    >
                      Cottages
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Motels/Hostel')}
                    >
                      Motels/Hostel
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Wooden Houses')}
                    >
                      Wooden Houses
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Guest Houses')}
                    >
                      Guest Houses
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Secluded Accommodation')}
                    >
                      Secluded Accommodation
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Hotels')}
                    >
                      Hotels
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Dormitories')}
                    >
                      Dormitories
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Caves')}
                    >
                      Caves
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Campsites')}
                    >
                      Campsites
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Treehouses')}
                    >
                      Treehouses
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Houseboats')}
                    >
                      Houseboats
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Rooms')}
                    >
                      Rooms
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Entire Homes')}
                    >
                      Entire Homes
                    </p>
                  </li>
                  <li>
                    <p 
                       
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => updatedrop('Luxury Accommodation')}
                    >
                      Luxury Accommodation
                    </p>
                  </li>
                </ul>
              </div>
            )}
            
            
          </div>

          <button
            onClick={toggleMapFullScreen}
            className='bg-[#E7EAEE] lg:text-sm rounded-lg py-[9.5px] text-[10px] px-5 flex items-center'
          >
            <BsFilter className='mr-2' /> Map
          </button>
        </div>
      </div>

      {/* Location Popup Modal */} 
      {isLocationPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Search</h2>
            <form onSubmit={ handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  value={locations}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter a location"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  value={citys}
                  onChange={(e) => setcity(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  value={countrys}
                  onChange={(e) => setcountry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeLocationPopup}
                  className="px-4 py-2 mr-4 text-gray-700 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4FBE9F] text-white rounded-lg hover:bg-green-500"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Location Popup Modal */}
      {ispersonPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Search</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                closepersonPopup(); // Close popup on form submit
              }}>
            
              <div className="mb-4">
                <label className="block text-gray-700">person</label>
                <input
                  type="text"
                  value={person}
                  onChange={(e) => updateperson(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closepersonPopup}
                  className="px-4 py-2 mr-4 text-gray-700 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4FBE9F] text-white rounded-lg hover:bg-green-500"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isMapFullScreen && (
        <div className='fixed inset-0 z-50 bg-white'>
          <button
            onClick={toggleMapFullScreen}
            className='absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 shadow'
          >
            <IoClose/>
          </button>
          <MapCard />
        </div>
      )}
    </div>
  );
};

export default Title;
