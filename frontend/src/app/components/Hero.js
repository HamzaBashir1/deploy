'use client';
import Link from 'next/link';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { BiSearch } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FormContext } from "../FormContext";
import Calendar from './Calendar';
import { FaAnglesDown } from 'react-icons/fa6';


const Search = () => {
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { location , updatelocation} = useContext(AuthContext);
  // const { location, updateLocation } = useContext(AuthContext);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const locationLabel = "Destination";
  const checkInLabel = "Check-in";
  const checkOutLabel = "Check-out";
  const guestLabel = "Who";

  return (
    <>
      <Hero
        locationLabel={locationLabel}
        checkInLabel={checkInLabel}
        checkOutLabel={checkOutLabel}
        guestLabel={guestLabel}
        openModal={openModal}
      />
      {isModalOpen && <SearchModal closeModal={closeModal} />}
    </>
  );
};

const Hero = ({ locationLabel, checkInLabel, checkOutLabel, guestLabel, openModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, role, token } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      <nav className="absolute top-0 left-0 z-40 w-full bg-transparent border-gray-200 dark:bg-transparent dark:border-gray-700">
        {/* Background overlay for the nav */}
        <div className="absolute sm:hidden top-0 left-0 w-full h-full bg-black opacity-80 z-[-1]"></div>
        {/* Background overlay for desktop only */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20 z-[-1] hidden lg:block"></div>
      <div className="flex flex-wrap items-center justify-between p-2 lg:p-4 xl:p-4 2xl:p-4 md:p-4 mx-1 md:ml-20 md:mr-8">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          {token && user ? (
            <Link
              href={`/${role === 'guest' ? 'Profile' : 'Profile'}`}
              className="flex items-center"
            >
            <figure className={`w-[30px] ${!user?.photo ? 'mr-6' : ''}`}>
              {user?.photo ? (
                <img src={user.photo} className="w-full rounded-full" alt={user.name} />
              ) : (
                <span className="text-lg text-white font-semibold">{user?.name}</span>
              )}
            </figure>
            </Link>
          ) : (
            <Link href="/login">
              <button className="bg-[#4FBE9F] py-2 px-6 text-white font-[600] flex items-center justify-center rounded-lg">
                Login
              </button>
            </Link>
          )}
          <Link href="/Favorite">
            <FaRegHeart className="text-xl text-white cursor-pointer dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300" />
          </Link>
          <button
              onClick={toggleMenu}
              className="w-10 h-10 p-2 text-sm text-white transition-all duration-300 bg-transparent border-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-controls="navbar-hamburger"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
        </div>
        <div
          className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-gray-50 z-40 rounded-lg shadow-lg ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          id="navbar-hamburger"
        >
          <div className="relative h-full">
            <ul className="flex flex-col mt-8 font-medium rounded-lg">
              <h1 className="px-4 py-2 font-bold">For Customers</h1>
              <li>
                <Link
                  href="/Blog"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Blog For Customers
                </Link>
              </li>
              <li>
                <Link
                  href="/FAQ"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/Booking"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  How Booking Works
                </Link>
              </li>
              <hr />
              <h1 className="px-4 py-2 font-bold">For Accommodation Providers</h1>
              <li>
                <Link
                  href="/Blog"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Blog For Providers
                </Link>
              </li>
              <li>
                <Link
                  href="/FAQ"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/BUY"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Rent with Putko
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

      <div
          className="md:pt-[220px] pt-20 bg-cover bg-center bg-[url('/hero.jpg')] h-[600px] sm:h-[600px] md:h-[700px] lg:h-[720px] xl:h-[720px] relative overflow-hidden bg-blend-darken"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div className="relative z-10 flex flex-col items-start ml-6 sm:ml-10 md:ml-24">
          <img src='/wavy.png'/>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
            No matter where <br /> you're going to, we'll <br /> take you there
          </h1>

          <div
            onClick={openModal}
            className="relative mt-52 lg:mt-6 border-4 w-[320px] lg:w-[460px] md:w-[380px] py-2 rounded-full transition cursor-pointer bg-transparent border-[#58CAAA] shadow-[0_0_10px_#58CAAA]"
          >
            {/* The overlay, positioned behind other elements */}
            <div className="absolute inset-0 bg-black opacity-30 z-0 rounded-full pointer-events-none"></div>
            
            {/* The content, placed above the overlay */}
            <div className="relative z-10 flex flex-row items-center justify-between px-4">
              <div className="text-[10px] md:text-sm font-semibold text-white">{locationLabel}</div>
              <div className="px-4 text-[10px] md:text-sm font-semibold text-center text-white border-x">
                {checkInLabel} - {checkOutLabel}
              </div>
              <div className="pl-1 text-[10px] md:text-sm font-semibold text-white">
                {guestLabel}
              </div>
              <BiSearch className="bg-[#58CAAA] lg:p-3 p-2 -mr-2 rounded-full text-white text-4xl lg:text-[52px]" />
            </div>
          </div>
          <div className='mt-2'>
          <img src="heroperson.png" className='w-65 h-10'/>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchModal = ({ closeModal }) => {
  const modalRef = useRef(null);
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { updateLocation, updateDates, updateperson } = useContext(FormContext);

  const allSuggestions = [
    "Bratislava", "Košice", "Prešov", "Žilina", "Nitra",
    "Trnava", "Martin", "Trenčín", "Poprad", "Prievidza",
    "Banská Bystrica", "Komárno", "Nové Zámky", "Spišská Nová Ves"
  ];

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    if (value) {
      const filteredSuggestions = allSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]); // Clear suggestions if input is empty
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]); 
  };

  // Guest state
  const [guests, setGuests] = useState(2); // Renamed to avoid confusion

  const handleIncrement = () => {
    setGuests(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (guests > 0) setGuests(prev => prev - 1);
  };

  // Date Range state
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setDateRange(ranges.selection); 
  };

  // Submit handler to include all states (location, city, country, guests, dates)
  const handleSubmit = (e) => {
    e.preventDefault();
    updateLocation(location); // Corrected variable name
    updateperson(guests); // Pass the guest count to context
    // updateDates(dateRange); 
    closeModal(); // Close modal after submission
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeModal]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Search</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              value={location} // Updated to use the singular variable
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Enter a location"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <label className="block text-gray-700 font-bold">Select Check-in and Check-out Date</label>
          <div className="mb-4 flex items-center justify-center">
            <Calendar
              value={dateRange}
              onChange={handleSelect}
              disabledDates={[]} 
            />
          </div>

          <div className="flex items-center justify-between space-x-4 mb-4">
            <div>
              <p className="text-lg font-medium">Guests</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                aria-label="Decrease guest count"
                onClick={handleDecrement}
                className="bg-gray-100 p-2 px-4 rounded-md text-xl font-bold"
              >
                -
              </button>
              <span className="text-xl font-semibold">{guests}</span> {/* Updated to use the new state */}
              <button
                type="button"
                aria-label="Increase guest count"
                onClick={handleIncrement}
                className="bg-gray-100 p-2 px-4 rounded-md text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={closeModal}
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
  );
};



export default Search;
