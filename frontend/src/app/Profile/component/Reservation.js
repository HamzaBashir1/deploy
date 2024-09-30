import React, { useState, useContext, useEffect } from "react";
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import TabNavigation from './TabNavigation'; // Assuming you want to display this after clicking 'Process'
import AccommodationForm from "./AccommodationForm";
import { Base_URL } from "../../config"

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [showPrice, setShowPrice] = useState(false); // State for showing Price component
  const [reservations, setReservations] = useState([]); // State for reservations
  const [selectedReservation, setSelectedReservation] = useState([]); // State for selected reservation

  const handleButtonClick = () => {
    setShowForm(true); // Show the form
  };

  const closeForm = () => {
    setShowForm(false); // Close the form
  };

  // Update handleProcessClick to take in the reservation object
  const handleProcessClick = (reservation) => {
    setSelectedReservation(reservation); // Set the selected reservation
    setShowPrice(true); // Show the TabNavigation component
  };

  useEffect(() => {
    const userr = localStorage.getItem('user');

    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      console.log('User ID:', userId);

      const fetchReservations = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation/provider/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch reservations');
          }

          const result = await response.json();
          console.log('Fetched reservations:', result);

          setReservations(result); // Store the fetched reservations in state
        } catch (error) {
          console.error('Error fetching reservations:', error);
        }
      };

      fetchReservations();
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  if (showForm) {
    // If showForm is true, display only the form
    return (
      <div className="py-4">
        <button 
          className="text-gray-600 text-2xl"
          onClick={closeForm}
        >
          Close Form
        </button>
        <AccommodationForm />
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Reservation Requests</h1>
            <p className="text-[#292A34B2] text-sm lg:text-lg md:text-base font-medium">
              {reservations.length} requests
            </p>
          </div>
          <div className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center">
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

        {/* Button to Add Your Own Date */}
        <div className="flex justify-end">
          <button
            className="flex items-center px-4 py-2 space-x-2 text-white bg-red-500 rounded-full hover:bg-red-600"
            onClick={handleButtonClick}
          >
            <BiPlus className="text-lg" />
            <span className="hidden sm:block">Add Your Own Date</span>
          </button>
        </div>
      </div>

      {/* Conditionally Render Reservation Details or Price Component */}
      {!showPrice ? (
        <div className="flex flex-col gap-10 mb-4">
          {/* Display fetched reservations as cards */}
          {reservations.length > 0 ? (
            reservations.map((reservation, index) => (
              <div key={index} className="flex flex-row items-center justify-between gap-5 p-4 bg-white rounded-lg shadow-md">
                <button className="bg-[#FFCB4E] rounded-lg py-2 px-4 text-white font-semibold">Import</button>
                <div>
                  <h1 className="font-bold text-[#292A34] text-base">{reservation.username || "Unknown User"}</h1>
                  <h6 className="text-[#666666] text-sm font-bold">
                    {new Date(reservation.checkInDate).toLocaleDateString()} — {new Date(reservation.checkOutDate).toLocaleDateString()}
                    ({reservation.numberOfPersons} persons)
                  </h6>
                  <p className="text-[#666666] text-sm">Source: {reservation.source || "N/A"}</p>
                </div>
                <div>
                  <h1 className="font-bold text-[#292A34] text-base">{reservation.email || "No Email"}</h1>
                  <h6 className="text-[#666666] text-sm font-bold">{reservation.phone || "No Phone"}</h6>
                </div>
                <div>
                  <h1 className="font-bold text-[#292A34] text-base">{reservation.totalPrice || "N/A"}</h1>
                </div>
                <div>
                  <button
                    onClick={() => handleProcessClick(reservation)}  // Pass reservation to handleProcessClick
                    className="gap-2 px-6 py-2 bg-gray-200 rounded-lg"
                  >
                    Process
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <TabNavigation reservationData={selectedReservation} /> {/* Pass the selected reservation as a prop */}
        </div>
      )}
    </div>
  );
};

export default Reservation;
