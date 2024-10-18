"use client";
import React, { useEffect, useState } from "react";

const StickyFooter = ({ data, selectedRange, onSave, onChooseDate }) => {
  const price = data?.price || 0;
  const nightlyRate = price;

  const [checkInDate, setCheckInDate] = useState(selectedRange?.start || "");
  const [checkOutDate, setCheckOutDate] = useState(selectedRange?.end || "");
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [total, setTotal] = useState(0);
  const [showSaveButton, setShowSaveButton] = useState(false);

  // Calculate number of nights between selected dates
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

  // Calculate total price
  useEffect(() => {
    const subtotal = nightlyRate * nights;
    const discount = nights >= 7 ? 28 : 0;
    const cleaningFee = 20;
    const serviceFee = 83;
    const taxesAndFees = 29;
    const totalPrice = subtotal - discount + cleaningFee + serviceFee + taxesAndFees;
    setTotal(totalPrice);
  }, [nights, nightlyRate]);

  const handleDateChange = (range) => {
    setCheckInDate(range?.start || "");
    setCheckOutDate(range?.end || "");
    setShowSaveButton(true); // Show "Save" button after dates are selected
  };

  useEffect(() => {
    if (selectedRange && selectedRange.start && selectedRange.end) {
      handleDateChange(selectedRange);
    }
  }, [selectedRange]);

  return (
    <div className="fixed bottom-0 left-0 flex items-center justify-between w-full p-4 bg-white shadow-md md:hidden">
      <div>
        {showSaveButton ? (
          <>
            <p className="text-xl font-bold">{total}€</p>
            <p className="text-sm text-gray-600">{nights} nights / {guests} guests</p>
          </>
        ) : (
          <p className="text-xl font-bold">{price}€</p>
        )}
      </div>

      {showSaveButton ? (
        <button
          className="bg-[#FF3B3F] text-white py-2 px-6 rounded-lg font-semibold"
          onClick={onSave} // Handle "Save" button click
        >
          Save
        </button>
      ) : (
        <button
          className="bg-[#FF3B3F] text-white py-2 px-6 rounded-lg font-semibold"
          onClick={onChooseDate} // Handle "Choose Date" button click
        >
          Choose a date
        </button>
      )}
    </div>
  );
};

export default StickyFooter;
