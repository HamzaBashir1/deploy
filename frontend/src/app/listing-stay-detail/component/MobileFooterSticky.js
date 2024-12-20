import React, { useContext, useState } from "react";
import ModalMobileSelectionDate from "../../Checkout/component/ModalMobileSelectionDate";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import converSelectedDateToString from "../../utlis/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { FormContext } from "../../FormContext";
 
import { usePathname, useRouter } from "next/navigation";

const MobileFooterSticky = () => {
  const [startDate, setStartDate] = useState(null); // Initially null for no date
  const [endDate, setEndDate] = useState(null); // Initially null for no date
  const { pricenight, ida ,accdata , updatendate, enddate, startdate, updatestartdate, } = useContext(FormContext); // Getting pricenight and listingId from FormContext
  const router = useRouter();
  console.log("accdata", accdata)
 

  // Handle date change
  const handleDateChange = ({ startDate: start, endDate: end }) => {
    setStartDate(start);
    setEndDate(end);
  };

  // Calculate the number of nights
  const calculateNumberOfDays = () => {
    if (!startdate || !enddate) return 0;
    const timeDifference = Math.abs(enddate - startdate);
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  // Calculate the total price
  const calculateTotalPrice = () => {
    const days = calculateNumberOfDays();
    return days * pricenight;
  };

  // Handle reservation and store data in localStorage
  const handleReserve = () => {
    if (!startdate || !enddate) {
      console.error("Please select valid check-in and check-out dates.");
      return;
    }

    const totalPrice = calculateTotalPrice(); // Calculate the total price
    const nights = calculateNumberOfDays(); // Calculate the number of nights

    try {
      // Store reservation data in localStorage
      localStorage.setItem(
        "userData",
        JSON.stringify({
          checkInDate: startdate,           // Store check-in date
          checkOutDate: enddate,           // Store check-out date
          total: totalPrice,               // Store total price
          listingId: ida,                  // Store listing ID
          data: accdata, // Add additional data if needed
          nights: nights,                  // Store number of nights
        })
      );


      console.log("Reservation data stored in localStorage!");
      router.push("/Checkout");
      // Optionally, redirect to another page or show a success message
      // router.push("/Checkout"); // Uncomment if using Next.js for navigation
    } catch (error) {
      console.error("Failed to store reservation data in localStorage:", error);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block py-2 bg-white border-t lg:hidden sm:py-3 border-neutral-200">
      <div className="container flex items-center justify-between">
        <div className="flex flex-col">
          {/* Show price per night or total price */}
          {!startdate && !enddate ? (
            <span className="block text-xl font-semibold">
              €{pricenight}
              <span className="ml-1 text-sm font-normal text-neutral-500">
                /night
              </span>
            </span>
          ) : (
            <span className="block text-xl font-semibold">
              Total: €{calculateTotalPrice()}
            </span>
          )}

          {/* Show "Select Date" initially, or selected dates if available */}
          <ModalMobileSelectionDate
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm font-medium underline"
              >
                {!startdate && !enddate
                  ? "Select Date" // Show "Select Date" option
                  : converSelectedDateToString([startDate, endDate])}
              </span>
            )}
            onDateChange={handleDateChange}
          />
        </div>

        {/* Reserve Button */}
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={handleReserve} // Call handleReserve on click
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
