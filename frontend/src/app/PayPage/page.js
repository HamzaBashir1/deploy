"use client";

import React, { useState, useEffect } from "react";
// import StartRating from "../Shared/StartRating";
import ButtonPrimary from "../Shared/ButtonPrimary";
import NcImage from "../Shared/NcImage/NcImage";
import StartRating from "../listing-stay-detail/component/StartRating";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import FooterNav from "../Shared/FooterNav";
import HeroSearchForm2Mobile from "../components/HeroSearchForm2Mobile";

const Page = ({ className = "" }) => {
  const [userData, setUserData] = useState(null);
  const [reservation, setReservation] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guests, setGuests] = useState({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });

  // Fetching the user data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data) {
      setUserData(data);
      setStartDate(new Date(data.checkInDate));
      setEndDate(new Date(data.checkOutDate));
      setGuests({
        guestAdults: data.guests?.adults || 0,
        guestChildren: data.guests?.children || 0,
        guestInfants: data.guests?.infants || 0,
      });
    }
  }, []);

  // Update reservation state when userData is available
  useEffect(() => {
    if (userData) {
      setReservation((prev) => ({
        ...prev,
        checkInDate: userData.checkInDate || "",
        checkOutDate: userData.checkOutDate || "",
        numberOfPersons:
          (userData.guests?.adults || 0) +
          (userData.guests?.children || 0) +
          (userData.guests?.infants || 0),
        totalPrice: userData.total || 0,
        accommodationProvider: userData.data?.userId?._id || "user",
        accommodationId: userData.listingId || "",
      }));
    }
  }, [userData]);

  const renderContent = () => {
    if (!userData) return null;

    const {
      _id,
      images,
      propertyType,
      locationDetails,
      rentalform,
      beds,
      bathroom,
      priceMonThus,
    } = userData.data || {};
    const { city, country } = locationDetails || {};
    const image = images?.[0];
    const data = userData.data;
    const name = data?.name;
    const hostId = data?.userId;
    const hostName = hostId?.name;
    const hostEmail = hostId?.email;

    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-3xl lg:text-4xl font-semibold">Congratulation 🎉</h2>
        <div className="border-b border-neutral-200"></div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Your booking</h3>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 w-full sm:w-40">
              <div className="aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
                <NcImage src={image || "https://via.placeholder.com/150"} />
              </div>
            </div>
            <div className="pt-5 sm:pb-5 sm:px-5 space-y-3">
              <div>
                <span className="text-sm text-neutral-500 line-clamp-1">
                  {`${propertyType} in ${city || "Unknown City"}, ${country || "Unknown Country"}`}
                </span>
                <span className="text-base sm:text-lg font-medium mt-1 block">
                  {name || "Property Name"}
                </span>
              </div>
              <span className="block text-sm text-neutral-500">
                {`${beds || 0} beds · ${bathroom || 0} baths`}
              </span>
              <div className="w-10 border-b border-neutral-200"></div>
              <StartRating />
            </div>
          </div>

          <div className="mt-6 border border-neutral-200 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200">
            <div className="flex-1 p-5 flex space-x-4">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Date</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {`${startDate?.toLocaleDateString() || ""} - ${endDate?.toLocaleDateString() || ""}`}
                </span>
              </div>
            </div>
            <div className="flex-1 p-5 flex space-x-4">
              <div className="flex flex-col">
                <span className="text-sm text-neutral-400">Guests</span>
                <span className="mt-1.5 text-lg font-semibold">
                  {`${guests.guestAdults + guests.guestChildren + guests.guestInfants} Guests`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Booking detail</h3>
          <div className="flex flex-col space-y-4">
            {/* <div className="flex text-neutral-600">
              <span className="flex-1">Booking code</span>
              <span className="flex-1 font-medium text-neutral-900 ">
                {userData.bookingCode || "#000-000-000"}
              </span>
            </div> */}
            <div className="flex text-neutral-600">
              <span className="flex-1">Date</span>
              <span className="flex-1 font-medium text-neutral-900">
                {startDate?.toLocaleDateString() || ""} - {endDate?.toLocaleDateString() || ""}
              </span>
            </div>
            <div className="flex text-neutral-600">
              <span className="flex-1">Total</span>
              <span className="flex-1 font-medium text-neutral-900">
                ${userData.total || "0"}
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Host detail</h3>
          <div className="flex flex-col space-y-4">
            {/* <div className="flex text-neutral-600">
              <span className="flex-1">Booking code</span>
              <span className="flex-1 font-medium text-neutral-900 ">
                {userData.bookingCode || "#000-000-000"}
              </span>
            </div> */}
            <div className="flex text-neutral-600">
              <span className="flex-1">Name</span>
              <span className="flex-1 font-medium text-neutral-900">
                {hostName}
              </span>
            </div>
            <div className="flex text-neutral-600">
              <span className="flex-1">Email</span>
              <span className="flex-1 font-medium text-neutral-900">
                {hostEmail}
              </span>
            </div>
          </div>
        </div>
        <div>
          <ButtonPrimary href="/listing-stay-map">Explore more stays</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-PayPage ${className}`} data-nc-id="PayPage">
      <div
        className="sticky top-0 z-50 block bg-white md:hidden py-4 px-2"
        style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}
      >
        <HeroSearchForm2Mobile />
      </div> 
      <div className="hidden md:block">
        <Header/>
      </div>
      <main className="container mt-6 mb-24 lg:mb-32">
        <div className="max-w-4xl mx-auto">{renderContent()}</div>
      </main>
      <Footer />
        <div className="lg:hidden">
          <FooterNav/>
        </div>
    </div>
  );
};

export default Page;
