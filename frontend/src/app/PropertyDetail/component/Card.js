"use client";
import React, { useState, useEffect, useContext } from "react";
import ChatUI from './ChatUI';
import { toast } from "react-toastify";
import ReservationPage from "./ReservationPage";
import { AuthContext } from "../../context/AuthContext";
import LoginPopup from "./login"; 
import dayjs from 'dayjs';
import { useRouter } from "next/navigation";
import Link from "next/link";

const Card = ({ data, selectedRange  }) => { 
  const router = useRouter();

  const discount = data?.discount ?? "N/A";
  const person = data?.person || "N/A";
  const price = data?.price || 0;
  const { user } = useContext(AuthContext);
  const nightlyRate = price;
  const url = data?._id;
  const userR = data?.userId?._id || "user Name";
  const userN = data?.userId?.name || "user Name";
  const [checkInDate, setCheckInDate] = useState(selectedRange?.start || "");
  const [checkOutDate, setCheckOutDate] = useState(selectedRange?.end || "");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [reserved, setReserved] = useState(false);
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showReservationPage, setShowReservationPage] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);  
  const [pendingAction, setPendingAction] = useState(null); 
  const [showDateComponent, setShowDateComponent] = useState(false); // Date component state

  useEffect(() => {

    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const differenceInTime = end.getTime() - start.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      setNights(differenceInDays > 0 ? differenceInDays : 0);
    } else {
      setNights(0);
    }
  }, [checkInDate, checkOutDate]);
  
  useEffect(() => {
    const subtotal = nightlyRate * nights;
    const discount = data?.discount ?? "N/A"; 
    const totalPrice = subtotal - discount;
    setTotal(totalPrice);
  }, [nights, nightlyRate]); 

  const togglePopup = () => {
    if (!user) {
      setPendingAction("message");
      setShowLoginPopup(true);
      return;
    }
    setShowPopup(!showPopup);
  };

  const handleLoginSuccess = () => {
    setShowLoginPopup(false); 
    if (pendingAction === "reserve") {
      handleReserve(); 
    } else if (pendingAction === "message") {
      togglePopup(); 
    }
    setPendingAction(null); 
  };


  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  
  
  // Handling date selection from DateComponent
  const handleDateChange = (range) => {
    setCheckInDate(range?.start || "");
    setCheckOutDate(range?.end || "");
  };

  useEffect(() => {
    if (selectedRange && selectedRange.start && selectedRange.end) {
      handleDateChange(selectedRange);
    }
  }, [selectedRange]);

  const handleReserve = () => {
    if (!user) {
      setPendingAction("reserve");
      setShowLoginPopup(true);
      return;
    }
    
    if (checkInDate && checkOutDate && guests > 0) {
      try {
        localStorage.setItem('userData', JSON.stringify({
          checkInDate: checkInDate,
          checkOutDate: checkOutDate,
          guests: guests,
          total: total,
          nights: nights,
          listingId: data?._id,
          data: data
        }));
  
        // Delay navigation to allow for a visual confirmation
        setTimeout(() => {
          router.push('/Reservation');
        }, 500); // 500 ms delay
      } catch (error) {
        console.error("Error storing data in localStorage:", error);
        toast.error("There was an issue with your reservation. Please try again.");
      }
    } else {
      toast.error("Please select valid check-in and check-out dates and number of guests.");
    }
  };
  

  return (
    <div>
      <div className="md:p-5 lg:p-5 xl:p-5 2xl:p-5 bg-white mx-3 p-2 border rounded-lg ">
        <div className="flex justify-between mx-5 mb-4 sm:flex-row">
          <h1 className="text-xl font-bold sm:text-2xl">€{price} /<span className="text-sm">night</span></h1>
          <p className="text-xl font-bold sm:text-2xl">5.0</p> 
        </div>

        <div className="p-4 mb-4 bg-white rounded-lg">
            <hr className="mb-2 h-0.5 border-t-0 bg-neutral-100" />
            <div 
            onClick={() => scrollToSection('date')}
            className="flex justify-between mb-4 space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-gray-500">Date from - to</h1>
                <p>
                  {selectedRange?.start ? dayjs(selectedRange.start).format('MMM D') : 'Select start'} to  {selectedRange?.end ? dayjs(selectedRange.end).format('MMM D') : 'end date'}
                </p>
              </div>
              <div>
                <button className="text-red-400">Choose</button>
              </div>
            </div>
              
          <div className="flex items-center justify-between space-x-4 mb-4">
              <div>
                <p className="text-lg font-medium">Guests</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  aria-label="Decrease guest count"
                  onClick={() => setGuests(Math.max(1, guests - 1))}  
                  className="bg-gray-100 p-2 px-4 rounded-md text-xl font-bold"
                >
                  -
                </button>
                <span className="text-xl font-semibold">{guests}</span>
                <button
                  type="button"
                  aria-label="Increase guest count"
                  onClick={() => setGuests(guests < person ? guests + 1 : guests)}  
                  className="bg-gray-100 p-2 px-4 rounded-md text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          
          <button
            className="w-full py-2 font-bold text-white bg-green-500 rounded-lg"
            onClick={handleReserve} 
          >
            Reserve
          </button>
          {reserved ? (
            <p className="mt-2 text-sm text-center text-green-500">Reservation request successful! You won't be charged yet.</p>
          ) : (
            <p className="mt-2 text-sm text-center">You won't be charged yet</p>
          )}
          
          <button className="w-full py-2 font-bold text-white bg-green-500 rounded-lg" onClick={togglePopup}>
            Message
          </button>
        </div>

        <div className="p-4 bg-white rounded-lg">
          <div className="flex justify-between mb-2">
            <p>€{nightlyRate} * {nights} nights</p>
            <p>€{nightlyRate * nights}</p>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-2">
              <p>Discount</p>
              <p>-€{discount}</p>
            </div>
          )}
          <hr className="my-4 h-0.5 border-t-0 bg-neutral-100" />
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>€{total}</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <h2 className="mb-4 text-xl font-bold">{userN}</h2>
            <form className="space-y-4">
              <ChatUI userR={userR} />
              <div className="flex justify-end">
                <button type="button" className="px-4 py-2 text-gray-500 bg-gray-200 rounded-md hover:bg-gray-300" onClick={togglePopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showLoginPopup && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}  
          onClose={() => setShowLoginPopup(false)} 
        />
      )}
    </div>
  );
};

export default Card;
