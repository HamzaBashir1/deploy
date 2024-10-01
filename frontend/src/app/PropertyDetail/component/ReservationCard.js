"use client";
import React, { useState, useEffect, useContext } from "react";
import { BsStarFill, BsWifi } from "react-icons/bs";
import { GiPoolDive, GiKnifeFork } from "react-icons/gi";
import { FaParking, FaSmokingBan, FaPaw } from "react-icons/fa";
import ChatUI from './ChatUI'
import { toast } from "react-toastify";
import ReservationPage from "./ReservationPage";
import { AuthContext } from "../../context/AuthContext";

const ReservationCard = ({ data }) => {
  const price = data?.price || [];
  const { user } = useContext(AuthContext);
  const nightlyRate = price;
  const url = data._id;
 const userR = data?.userId._id || "user Name";
  const userN = data?.userId.name || "user Name";
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [reserved, setReserved] = useState(false);
  const [total, setTotal] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showReservationPage, setShowReservationPage] = useState(false); // New state for showing ReservationPage
  const [ratingsData, setRatingsData] = useState({}); // State to store ratings
  // Fetch reviews based on accommodationId
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${url}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
        const avgRating = totalRatings / result.data.length;

        setRatingsData({
          averageRating: avgRating,
          ratingsCount: result.data.length,
        });
      } else {
        setRatingsData({
          averageRating: 0,
          ratingsCount: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [url]);


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
    const discount = nights >= 7 ? 28 : 0; // example: weekly discount
    const cleaningFee = 20;
    const serviceFee = 83;
    const taxesAndFees = 29;
    const totalPrice = subtotal - discount + cleaningFee + serviceFee + taxesAndFees;
    setTotal(totalPrice);
  }, [nights]);

  const handleReserve = () => {
    if (checkInDate && checkOutDate && guests > 0) {
      setReserved(true);
      setShowReservationPage(true); // Show ReservationPage
    } else {
      toast("Please select valid check-in and check-out dates and number of guests.");
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="bg-[#f8f8f8]">
      <div className="flex flex-col p-4 lg:flex-row lg:space-x-8">
        <div className="flex-1">
          <div className="flex flex-col p-4 bg-white rounded-lg sm:p-8 lg:flex-row lg:space-x-8">
            {/* Features and Evaluation Section */}
            <div className="flex-1 mb-8 lg:mb-0">
              <div className="flex flex-col justify-between mb-8 space-y-6 md:flex-row md:space-y-0">
                {/* Features Section */}
                <div className="grid grid-cols-1 gap-6 p-4 bg-white rounded-lg sm:grid-cols-2">
                  {data?.wifi && <Feature icon={<BsWifi size={24} />} title="Wi-Fi" description={data.wifi} />}
                  {data?.wellness && <Feature icon={<GiPoolDive size={24} />} title="Wellness" description={data.wellness} />}
                  {data?.parking && <Feature icon={<FaParking size={24} />} title="Parking" description={data.parking} />}
                  {data?.smoking && <Feature icon={<FaSmokingBan size={24} />} title="Smoking" description={data.smoking} />}
                  {data?.pets && <Feature icon={<FaPaw size={24} />} title="Pets" description={data.pets} />}
                  {data?.diet && <Feature icon={<GiKnifeFork size={24} />} title="Diet" description={data.diet} />}
                </div> 

                {/* Evaluation Section */}
                <div className="flex flex-col items-center flex-shrink-0 w-full p-4 bg-white rounded-lg md:w-1/3">
                  <h1 className="mb-2 text-lg font-bold">Evaluation</h1>
                  <h2 className="mb-2 text-4xl font-bold">
                    {ratingsData?.averageRating?.toFixed(1) || "No Ratings Yet"}
                  </h2>
                  <div className="flex mb-2">
                    {/* Render stars based on the average rating */}
                    {[...Array(Math.round(ratingsData?.averageRating || 0))].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm">{ratingsData?.ratingsCount} ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Reservation and Pricing Section */}
        <div className="p-5 bg-white rounded-lg">
          <div className="flex justify-between mx-5 mb-4 sm:flex-row">
            <h1 className="text-xl font-bold sm:text-2xl">${price} /<span className="text-sm">night</span></h1>
            <p className="text-xl font-bold sm:text-2xl">5.0</p>
          </div>

          {/* Reservation Details */}
          <div className="p-4 mb-4 bg-white rounded-lg">
            <div className="flex flex-col justify-between mb-4 space-y-4 sm:flex-row sm:space-y-0">
              <div className="relative flex flex-col flex-1">
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg h-[55px]"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                />
                <label className="absolute left-2 top-1 text-[8px] font-bold">CHECK-IN</label>
              </div>
              <div className="relative flex flex-col flex-1">
                <input 
                  type="date" 
                  className="w-full p-2 border rounded-lg h-[55px]"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                />
                <label className="absolute left-2 top-1 text-[8px] font-bold">CHECK-OUT</label>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative mb-4">
                <input 
                  type="number" 
                  className="w-full p-2 border rounded-lg h-[55px]"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                />
                <label className="absolute text-[8px] font-bold left-2 top-2">GUESTS</label>
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
            </div>
            <button 
              className="w-full py-2 font-bold text-white bg-green-500 rounded-lg"
              onClick={togglePopup}
            >
              Message
            </button>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 bg-white rounded-lg">
            <div className="flex justify-between mb-2">
              <p>${nightlyRate} * {nights} nights</p>
              <p>${nightlyRate * nights}</p>
            </div>
            {nights >= 7 && (
              <div className="flex justify-between mb-2">
                <p>Weekly discount</p>
                <p>-$28</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p>Cleaning fee</p>
              <p>$62</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Service fee</p>
              <p>$83</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Occupancy taxes and fees</p>
              <p>$29</p>
            </div>
            <hr className="my-4 h-0.5 border-t-0 bg-neutral-100" />
            <div className="flex justify-between font-bold">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Popup for Chat */}
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

      {/* Reservation Page Popup */}
      {showReservationPage && (
        <ReservationPage 
          checkInDate={checkInDate} 
          checkOutDate={checkOutDate} 
          guests={guests} 
          totalPrice={total} 
          nights={nights}
          onClose={() => setShowReservationPage(false)} // Close ReservationPage
          data={data}
        />
      )}
    </div>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-center p-4 space-x-4">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h1 className="font-bold">{title}</h1>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default ReservationCard;
