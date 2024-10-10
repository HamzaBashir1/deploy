'use client';
import Link from 'next/link';
import React, { useState, useContext, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FormContext } from "../FormContext";


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
      <nav className="absolute top-0 left-0 z-50 w-full bg-transparent border-gray-200 dark:bg-transparent dark:border-gray-700">
      <div className="flex flex-wrap items-center justify-between p-2 lg:p-4 xl:p-4 2xl:p-4 md:p-4 mx-1 md:mx-20">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/putko.png" className="h-8" alt="Logo" />
        </Link>
        <div className="flex items-center space-x-4">
          {token && user ? (
            <Link
              href={`/${role === 'guest' ? 'Profile' : 'Profile'}`}
              className="flex items-center"
            >
              <figure className="w-[45px]">
                <img src={user?.photo} className="w-full rounded-full" alt={user?.name} />
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
            className="w-10 h-10 p-2 text-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          className={`fixed top-0 right-0 mt-16 mr-4 w-80 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 z-40 rounded-lg shadow-lg ${
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
        className="pt-[220px] bg-cover bg-center bg-[url('https://s3-alpha-sig.figma.com/img/bb47/c92b/c5bf527b8df6eb4e119ac00e8d535333?Expires=1728864000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NNNGgzneiAQldQbuNlTtBUz8pOeZCdpHDvQq2YF0HpIWIJJsn7eVAkpKS2ll1fDvdEqpiUr4tJT~04Ej11sBL2DS8ntGZYj3kKowp-fvfNoxkpZJ5gwFBLRDdrTSTaAUZMH3p8zttjNAm1zcy-zV5XXzzeIjajH7jG1Ac0vD56zVdMoPbYvSgZfB89FQpQdmitlGBW8oPqZXtTwhcP73jlPYqpdjGIUbVM1dXEecaalq0R76sWIyNshUNZL-4VI77rqCVXLW2s0ObgHT~qJDb6L1mMIGCULqPNIXDguLEZvJgvSdDMpNdaD8nxxSzcJbK-R2vG7rMSDylU77mzIuPQ__')] h-[700px] sm:h-[600px] md:h-[700px] lg:h-[720px] xl:h-[720px] relative overflow-hidden bg-blend-darken"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

        <div className="relative z-10 flex flex-col items-start ml-6 sm:ml-10 md:ml-24">
          <img src='/wavy.png'/>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-5xl">
            No matter where <br /> you're going to, we'll <br /> take you there
          </h1>

          <div
            onClick={openModal}
            className="mt-6 border w-[320px] lg:w-[380px] md:w-[380px] xl:w-[380px] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer bg-transparent border-gray-300"
          >
            <div className="flex flex-row items-center justify-between px-4">
              <div className="text-xs font-semibold text-white">{locationLabel}</div>
              <div className="px-4 text-xs font-semibold text-center text-white border-x">
                {checkInLabel} - {checkOutLabel}
              </div>
              <div className="pl-1 text-xs font-semibold text-white">
                {guestLabel}
              </div>
              <BiSearch className="text-2xl bg-[#58CAAA] p-1 -mr-2 rounded-full text-white" />
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
  const [locations, setLocation] = useState('');
  const [country, setcountry] = useState('');
  const [city, setcity] = useState('');
  const [guests, setGuests] = useState('');
  const { location,updateLocation,updateCity,updateCountry} = useContext(FormContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ locations, city, country, guests });
    updateLocation(locations);
    updateCountry(country);
    updateCity(city);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-semibold">Search</h2>
        <form onSubmit={handleSubmit}>
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
            <label className="block text-gray-700">city</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setcity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setcountry(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Guests</label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Number of guests"
            />
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
