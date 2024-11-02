"use client";
import React, { useState, useContext, useEffect } from "react";
import { FaStar } from 'react-icons/fa'; // Importing FontAwesome icons
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { BiFilter } from 'react-icons/bi';
import { BsArrowDown } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import { Base_URL } from "../../config"
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { FormContext } from "@/app/FormContext";

const RatingComponent = ({ onMenuClick }) => {
  const [accommodations, setAccommodations] = useState([]); // Initialize with an empty array
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Store the selected accommodation object
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);  
  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext

  const [activePage, setActivePage] = useState('');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const handleMenuClick = (page) => {
      console.log("overview",page)
      setActivePage(page);
      onMenuClick(page); // Pass the page value to parent component
    };
  // Fetch accommodations on mount
  useEffect(() => {
    const userr = localStorage.getItem('user');

    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

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

  // Fetch reviews when an accommodation is selected
  const fetchReviews = async (accommodationId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${accommodationId}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        setReviews(result.data);

        // Calculate average rating
        const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
        const avgRating = totalRatings / result.data.length;
        setAverageRating(avgRating);
        setRatingsCount(result.data.length);
      } else {
        setAverageRating(0);
        setRatingsCount(0);
        setReviews([]); // Reset reviews if none are found
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // Handle accommodation selection
  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    const accommodation = accommodations.find(acc => acc._id === selectedId);

    if (accommodation) {
      setSelectedAccommodation(accommodation);
      fetchReviews(accommodation._id); // Fetch reviews based on the selected accommodation
    }
  };

  return (
    <>
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Accommodation Rating</h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">
              {selectedAccommodation ? selectedAccommodation.name : "Select an Accommodation"}
            </p>
          </div>

          <div className="hidden md:flex md:flex-row md:items-center md:gap-5">
            <div className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center">
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

      {/* Rating Section */}
      <div className="mx-5 lg:mx-10">
        <div className="flex flex-col items-center justify-center py-5 mb-5 bg-white lg:items-center sm:mx-5 sm:flex-row">
          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <span className="text-6xl font-bold text-gray-800">
              {averageRating.toFixed(1) || "0.0"}
            </span>
            <div className="flex flex-col text-center sm:text-left">
              <div className="text-[#292A34] flex flex-row font-semibold text-sm sm:text-base">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-6 h-6 ${index < averageRating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-xs sm:text-sm">{ratingsCount} reviews</p>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Filter and Search Controls */}
        <div className="flex flex-col items-center justify-center mb-5 sm:flex-row">
          <div className="w-full mt-4 sm:mt-0 sm:w-auto">
            <select
              className="w-full px-20 py-2 border border-gray-200 rounded-md shadow sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={selectedAccommodation ? selectedAccommodation._id : ""}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Accommodation</option>
              {accommodations.map(accommodation => (
                <option key={accommodation._id} value={accommodation._id}>
                  {accommodation.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <hr />

        {/* Reviews Section */}
        <div className="flex flex-col items-center justify-center px-5 py-5 mb-5 text-center sm:mx-5">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="p-4 mb-4 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{review.authorName}</h3>
                </div>
                <p className="mt-2 text-gray-500">{review.comment}</p>
              </div>
            ))
          ) : (
            <div>
              <h2 className="mb-2 text-xl font-semibold">You have no ratings yet</h2>
              <p className="max-w-xl text-gray-500">
                No one has rated your accommodation yet. Motivate your customers to evaluate,
                so you can see where your strengths are and what you can still improve. Good
                ratings also motivate new or undecided customers.
              </p>
            </div>
          )}
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

export default RatingComponent;
