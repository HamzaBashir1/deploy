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
  const [shows, setShows] = useState(true);
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
    setShows(false)
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

      <hr className="pb-3"/>

      {/* Reservation List or Price Component */}
      {!showPrice ? (
        <div className="flex flex-col gap-6">
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-4">
                  <div className="flex flex-col gap-4 md:flex-row md:gap-10">
                    <div className="flex flex-col">
                      <span
                        className={`w-28 h-8 flex items-center justify-center rounded-lg ${
                          reservation.isApproved === "approved"
                            ? "bg-green-500 text-white"
                            : reservation.isApproved === "cancelled"
                            ? "bg-gray-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {reservation.isApproved === "approved"
                          ? "Confirmed"
                          : reservation.isApproved === "cancelled"
                          ? "Cancelled"
                          : "Raw"}
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-24">
                      <div className="flex flex-col">
                        <h1 className="font-bold">
                          {reservation.name || "Unknown User"}
                        </h1>
                        <p>
                          {new Date(reservation.checkInDate).toLocaleDateString()} —{" "}
                          {new Date(reservation.checkOutDate).toLocaleDateString()} (
                          {reservation.numberOfPersons} persons)
                        </p>
                        <p>{reservation.source || "N/A"}</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-[12px] text-blue-500">
                          {reservation.email || "No Email"}
                        </p>
                        <p className="text-gray-600">
                          {reservation.phone || "No Phone"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 md:flex-row md:gap-24">
                    <div className="flex flex-col text-left md:text-left">
                      {reservation.totalPrice || "N/A"}€
                    </div>
                    <div className="flex flex-col">
                      <button
                        className="px-4 py-1 bg-gray-200 rounded-lg md:px-8"
                        onClick={() => handleProcessClick(reservation)}
                      >
                        Process
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="my-4 border-t border-gray-300" />
              </React.Fragment>
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


     { shows && <Calsync/>}
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
            

            <hr className='my-5' />

             {[
              
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
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
