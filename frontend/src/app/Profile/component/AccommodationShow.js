import React, { useState, useEffect, useContext } from 'react';
import { FaEdit } from 'react-icons/fa'; // Import Edit icon
import { BiHeart, BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { CiLocationOn, CiSearch, CiStar } from 'react-icons/ci';
import { MdDelete, MdLocalParking, MdOutlinePets } from 'react-icons/md';
import { IoWifi } from 'react-icons/io5';
import { AuthContext } from '../../context/AuthContext';
import useFetchData from '../../hooks/useFetchData.js';
import Loading from '../../components/Loader/Loading.js';
import Error from '../../components/Error/Error.js';
import { Base_URL } from '../../config.js';
import Accommodationupdate from './AccommodationUpdate';
import { toast } from 'react-toastify';
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { FormContext } from '@/app/FormContext';

const AccommodationShow = ({ onMenuClick }) => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ratingsData, setRatingsData] = useState({});
  const [editingAccommodationId, setEditingAccommodationId] = useState(null); // State for tracking edited accommodation
  const [accommodation, setAccommodation] = useState([]); 
  // const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState(''); 
  
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

  // Handle the menu click event
  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };

  const userr = localStorage.getItem('user');
  const users = JSON.parse(userr);
  const userId = users._id;

  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);

  useEffect(() => {
    if (accommodationData) {
      accommodationData.forEach((property) => {
        fetchReviews(property._id);
      });
    }
  }, [accommodationData]);

  const fetchReviews = async (accommodationId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${accommodationId}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
        const avgRating = totalRatings / result.data.length;

        setRatingsData((prevState) => ({
          ...prevState,
          [accommodationId]: {
            averageRating: avgRating,
            ratingsCount: result.data.length,
          },
        }));
      } else {
        setRatingsData((prevState) => ({
          ...prevState,
          [accommodationId]: {
            averageRating: 0,
            ratingsCount: 0,
          },
        }));
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleEditClick = (accommodationId) => {
    setEditingAccommodationId(accommodationId); // Set the current accommodation ID for editing
  };

  const closeUpdateForm = () => {
    setEditingAccommodationId(null); // Reset state to close the update form
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Accommodation deleted successfully');
        // Update the state to remove the deleted accommodation
        setAccommodation((prevState) => prevState.filter((property) => property._id !== id));

      } else {
        console.error(result.message || 'Failed to delete accommodation');
        toast.error(result.message || 'Failed to delete accommodation');
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <div>
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
    <div className="flex flex-col items-start gap-4 mb-4 md:flex-row md:justify-between md:items-center">
      {/* Left Section: Title and Status */}
      <div className="flex flex-col">
        <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Accommodation</h1>
        <p className="text-[#292A34B2] text-sm md:text-xs font-medium"> </p>
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
      {loading && <Loading />}
      {error && <Error />}

      {/* Conditionally render either the cards or the update form */}
      {!editingAccommodationId ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accommodationData &&
            accommodationData.map((property) => {
              const ratingsInfo = ratingsData[property._id] || { averageRating: 0, ratingsCount: 0 };
              const { averageRating, ratingsCount } = ratingsInfo;

              return (
                <div key={property._id} className="flex flex-col w-full max-w-xs overflow-hidden border rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <div className="relative w-full h-56 sm:h-64">
                    <img
                      src={property.images[0] || '/bedroom.jpg'}
                      alt={property.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-2 right-2 bg-[#00000059] rounded-full p-1 sm:p-2">
                      <BiHeart className="text-xl sm:text-2xl text-[#4FBE9F]" />
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h1 className="font-bold text-base sm:text-lg text-[#1F2937]">{property.name}</h1>
                    <p className="text-lg sm:text-sm text-[#666666]">
                      {property.person} persons, {property.bedroomCount} bedrooms, {property.bathroomCount} bathrooms
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                      {property.equipmentAndServices.includes('Parking') && (
                        <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                          <MdLocalParking className="text-[#292A34]" />
                        </div>
                      )}
                      {property.equipmentAndServices.includes('Free Wifi') && (
                        <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                          <IoWifi className="text-[#292A34]" />
                        </div>
                      )}
                      {property.pets.includes('They are not allowed') && (
                        <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                          <MdOutlinePets className="text-[#292A34]" />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center mt-2 sm:mt-3">
                      <CiLocationOn className="text-[#292A34]" />
                      <p className="text-xs sm:text-sm text-[#292A34] ml-1 sm:ml-2">{property.location?.address || 'Unknown location'}</p>
                    </div>

                    <hr className="my-3 sm:my-4 h-0.5 bg-neutral-100 dark:bg-white/10" />
                    <div className="flex items-center justify-between">
                      <h1 className="text-sm font-bold sm:text-base lg:text-lg">
                        ${property.price} <span className="text-xs font-normal sm:text-sm lg:text-base">/night</span>
                      </h1>
                      <div className="flex items-center">
                        <CiStar className="text-[#DC2626]" />
                        <h1 className="ml-1 text-sm font-bold lg:text-lg md:text-base">{averageRating.toFixed(1)}</h1>
                        <p className="ml-1 text-xs text-gray-600 sm:text-sm lg:text-base md:text-sm sm:ml-2">({ratingsCount})</p>
                      </div>
                    </div>

                    <div className='flex justify-between'>
                      <div className="flex justify-start mt-2">
                        <button
                          onClick={() => handleDelete(property._id)} // Open edit form on click
                          className="flex items-center px-3 py-1 text-white bg-red-500 rounded hover:bg-red-800"
                        >
                          <MdDelete className="mr-2" />
                          Delete
                        </button>
                      </div>

                      {/* Add Edit button here */}
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleEditClick(property._id)} // Open edit form on click
                          className="flex items-center px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          <FaEdit className="mr-2" />
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        // Render the AccommodationUpdate form when editingAccommodationId is set
        <Accommodationupdate accommodationId={editingAccommodationId} onClose={closeUpdateForm} />
      )}
    </div>
  );
};

export default AccommodationShow;
