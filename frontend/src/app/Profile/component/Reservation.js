import React, { useState, useContext, useEffect } from "react";
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { AuthContext } from "../../context/AuthContext";
import TabNavigation from './TabNavigation'; // Assuming you want to display this after clicking 'Process'
import AccommodationForm from "./AccommodationForm";
import { Base_URL } from "../../config";
import Calsync from "./Calsync";

const Reservation = () => {
  const { user } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState([]);

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

  return (
    <div className="p-4 space-y-6">
      {/* Header Section */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 md:text-2xl">Reservation Requests</h1>
            <p className="text-sm text-gray-600">{reservations.length} requests</p>
          </div>

          {/* Profile and Add Accommodation Button */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center px-4 py-2 border rounded-lg text-black bg-white hover:bg-gray-100">
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
              {user?.photo ? (
                <img 
                  src={user?.photo} 
                  alt="User Profile" 
                  className="w-8 h-8 rounded-full object-cover"
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
                className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
              >
                <button className="py-2 px-4 bg-yellow-500 text-white rounded-lg font-semibold">
                  Import
                </button>
                <div className="flex flex-col">
                  <h1 className="font-bold text-gray-900">{reservation.name || "Unknown User"}</h1>
                  <p className="text-sm text-gray-600 font-medium">
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
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reservations found.</p>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <TabNavigation reservationData={selectedReservation} />
        </div>
      )}

      <Calsync/>
    </div>
  );
};

export default Reservation;
