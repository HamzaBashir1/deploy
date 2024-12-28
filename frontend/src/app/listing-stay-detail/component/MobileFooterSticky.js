import React, { useContext, useState } from "react";
import ModalMobileSelectionDate from "../../Checkout/component/ModalMobileSelectionDate";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import converSelectedDateToString from "../../utlis/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";
import { FormContext } from "../../FormContext";
import { useRouter } from "next/navigation";

const MobileFooterSticky = () => {
  const { pricenight, ida, accdata, updatendate, enddate, startdate, updatestartdate } = useContext(FormContext);
  const router = useRouter();

  // Utility function to format dates as 'YYYY-MM-DD'
  const formatDate = (date) => {
    if (!date) return null;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  };

  // Calculate the number of nights
  const calculateNumberOfDays = () => {
    if (!startdate || !enddate) return 0;
    const timeDifference = Math.abs(enddate - startdate);
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
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

    const totalPrice = calculateTotalPrice();
    const nights = calculateNumberOfDays();

    try {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          checkInDate: formatDate(startdate),
          checkOutDate: formatDate(enddate),
          total: totalPrice,
          listingId: ida,
          data: accdata,
          nights: nights,
        })
      );

      console.log("Reservation data stored in localStorage!");
      router.push("/Checkout");
    } catch (error) {
      console.error("Failed to store reservation data in localStorage:", error);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 block py-2 bg-white border-t lg:hidden sm:py-3 border-neutral-200">
      <div className="container flex items-center justify-between">
        <div className="flex flex-col">
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

          <ModalMobileSelectionDate
            renderChildren={({ openModal }) => (
              <span onClick={openModal} className="block text-sm font-medium underline">
                {!startdate && !enddate
                  ? "Select Date"
                  : converSelectedDateToString([startdate, enddate])}
              </span>
            )}
            onDateChange={({ startDate, endDate }) => {
              updatestartdate(startDate);
              updatendate(endDate);
            }}
          />
        </div>

        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary sizeClass="px-5 sm:px-7 py-3 !rounded-2xl" onClick={handleReserve}>
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
