import React, { useState, useContext, useEffect } from "react";
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import TabNavigation from './TabNavigation'; // Assuming you want to display this after clicking 'Process'
import AccommodationForm from "./AccommodationForm";
import { Base_URL } from "../../config";
import Calsync from "./Calsync";
import { FormContext } from "../../FormContext";
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";

const Reservation = ({ onMenuClick }) => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [show, setShow] = useState(0);
  const [selectedReservation, setSelectedReservation] = useState([]);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext
  const {  updateNotification,
    notification,} = useContext(FormContext);

  const [activePage, setActivePage] = useState(''); // Control the active page state


const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const handleButtonClick = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleProcessClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowPrice(true);
  };

  useEffect(() => {
    const userr = localStorage.getItem('user');
    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      const fetchReservations = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/provider/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });

          if (!response.ok) throw new Error('Failed to fetch reservations');
          const result = await response.json();
          setReservations(result);
           // Count pending and unpaid reservations
        // const pendingCount = result.filter(
        //   (reservation) => reservation.isApproved === "pending"
        // ).length;

        // const unpaidCount = result.filter(
        //   (reservation) => reservation.isApproved === "unpaid"
        // ).length;
        // updateNotification(pendingCount + unpaidCount);



          
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };

      fetchReservations();
    }
  }, []);

  if (showForm) {
    return (
      <div className="p-4">
        <button className="text-xl text-gray-600" onClick={closeForm}>
          Close Form
        </button>
        <AccommodationForm />
      </div> 
    );
  }
  // Handle the menu click event
  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };

  return (
    <div className="p-4 space-y-6 bg-white">
      {/* Header Section */}
      <div className="p-4 bg-white rounded-lg ">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Reservation Requests</h1>
            <p className="text-sm text-gray-600">{reservations.length} requests</p>
          </div>

          {/* Profile and Add Accommodation Button */}
          <div className="flex items-center gap-4">
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
                <BsPersonCircle className="text-xl text-gray-800" />
              )}
              <h1 className="text-sm text-gray-800">{user?.name || 'User'}</h1>
            </div>
          </div>
        </div>

        {/* Add Your Own Date Button (Visible on All Screens) */}
        <div className="flex justify-end mt-4">
          <button
            className="flex items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-full hover:bg-red-600"
            onClick={handleButtonClick}
          >
            <BiPlus className="text-lg" />
            <span className="hidden sm:block">Add Your Own Date</span>
          </button>
        </div>
      </div>

      {/* Reservation List or Price Component */}
      {!showPrice ? (
        <div className="flex flex-col gap-6">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div 
                key={index} 
                className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md md:flex-row md:items-center md:justify-between"
              >
                <button className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded-lg">
                  Import
                </button>
                <div className="flex flex-col">
                  <h1 className="font-bold text-gray-900">{reservation.name || "Unknown User"}</h1>
                  <p className="text-sm font-medium text-gray-600">
                    {new Date(reservation.checkInDate).toLocaleDateString()} — {new Date(reservation.checkOutDate).toLocaleDateString()} 
                    ({reservation.numberOfPersons} persons)
                  </p>
                  <p className="text-sm text-gray-600">Source: {reservation.source || "N/A"}</p>
                </div>
                <div className="text-sm">
                  <h1 className="font-bold text-gray-900">{reservation.email || "No Email"}</h1>
                  <p className="text-gray-600">{reservation.phone || "No Phone"}</p>
                </div>
                <div className="font-bold text-gray-900">{reservation.totalPrice || "N/A"}</div>
                <button
                  onClick={() => handleProcessClick(reservation)}
                  className="px-6 py-2 bg-gray-200 rounded-lg"
                >
                  Process
                </button>
           <button
  className={`px-4 py-2 font-semibold rounded-lg ${
    reservation.isApproved === "approved" 
      ? "bg-green-500 text-white" 
      : "bg-red-500 text-white"
  }`}
>
  {reservation.isApproved === "approved" ? "Paid" : "Unpaid"}
</button>

              </div> 
            ))
          ) : (
            <p className="text-gray-600">No reservations found.</p>
          )}
        </div>
      ) : (
        <div className="mt-6 bg-white">
          <TabNavigation reservationData={selectedReservation} />
        </div>
      )}

      <Calsync/>
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
};

export default Reservation;
