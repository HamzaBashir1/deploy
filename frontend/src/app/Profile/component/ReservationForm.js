"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const ReservationForm = ({ reservation }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(1);
  const maxOccupancy = 3; // Example maximum occupancy
  const totalOccupancy = adults + children + infants;

  const handleIncrement = (setter, value) => {
    if (totalOccupancy < maxOccupancy) {
      setter(value + 1);
    }
  };

  const handleDecrement = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };
 
  // Extract occupancyCalendar from reservation data
  const occupancyCalendar = reservation.accommodationId.occupancyCalendar;

  const isPastDate = (date) => dayjs(date).isBefore(dayjs(), "day");

  const isReservedDate = (date) => {
    return occupancyCalendar.some(({ startDate, endDate }) =>
      dayjs(date).isBetween(dayjs(startDate), dayjs(endDate), null, "[]")
    );
  };

  const isInRange = (date) => {
    const { start, end } = selectedRange;
    return start && end && dayjs(date).isBetween(start, end, null, "[]");
  };

  const handleDateClick = (date) => {
    if (isPastDate(date) || isReservedDate(date)) return; // Disable past and reserved dates

    if (!selectedRange.start) {
      setSelectedRange({ start: date, end: null });
    } else if (!selectedRange.end && dayjs(date).isAfter(selectedRange.start)) {
      setSelectedRange({ ...selectedRange, end: date });
    } else {
      setSelectedRange({ start: date, end: null });
    }
  };

  const getDaysInMonth = (month) => {
    const startDay = month.startOf("month").day();
    const daysInMonth = month.daysInMonth();

    // Create an array with the days of the month and placeholders for empty cells
    return Array.from({ length: startDay + daysInMonth }, (_, index) => {
      const day = index - startDay + 1;
      if (day <= 0) return null;
      return month.date(day).format("YYYY-MM-DD");
    });
  };

  const renderCalendarDays = (month) => {
    return getDaysInMonth(month).map((date, index) => {
      if (!date) return <div key={index} className="invisible" />; // Placeholder for empty cells

      let bgColor = "bg-white";
      let textColor = "text-black";
      let cursor = "cursor-pointer";

      if (isPastDate(date)) {
        bgColor = "bg-gray-200";
        textColor = "text-gray-400";
        cursor = "cursor-not-allowed";
      } else if (isReservedDate(date)) {
        bgColor = "bg-green-300";
        textColor = "text-white";
        cursor = "cursor-not-allowed";
      } else if (selectedRange.start === date || selectedRange.end === date) {
        bgColor = "bg-blue-500";
        textColor = "text-white";
      } else if (isInRange(date)) {
        bgColor = "bg-blue-100";
      }

      return (
        <div
          key={date}
          onClick={() => handleDateClick(date)}
          className={`${bgColor} ${textColor} ${cursor} p-2 rounded-md`}
        >
          {dayjs(date).format("D")}
        </div>
      );
    });
  };

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));

  return (
    <div className="max-w-4xl mx-auto">
    <div className="flex flex-col bg-white rounded-lg lg:flex-row ">
      
      {/* Left Section: Number of persons */}
      <div className=''>
      <div>
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-600">1/3</span>
        <span className="font-semibold text-gray-800">Date from — to</span>
      </div>

      {/* Right Section */}
      
    </div>
    <div className="gap-4 p-4 bg-white rounded-lg">
   
  
    <div className="flex flex-col p-2 mt-4 lg:w-[600px] w-[400px] lg:flex-row">
      {/* First Calendar */}
      <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="flex items-center justify-center w-10 h-10 text-xl font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          &lt;
        </button>
        <h3 className="text-lg font-bold">{currentMonth.format("MMMM YYYY")}</h3>
        <button
          onClick={nextMonth}
          className="flex items-center justify-center w-10 h-10 text-xl font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          &gt;
        </button>
      </div>
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-500">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="uppercase">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mt-2 text-sm text-center">
        {renderCalendarDays(currentMonth)}
      </div>
    </div>
      {/* Second Calendar */}
      <div className="p-4">
      <div className="flex items-center justify-between mb-4">
      <button
      onClick={prevMonth}
      className="flex items-center justify-center w-10 h-10 text-xl font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
    >
      &lt;
    </button>
          <h3 className="mb-4 text-lg font-bold text-center">
            {currentMonth.add(1, "month").format("MMMM YYYY")}
          </h3>
          <button
          onClick={nextMonth}
          className="flex items-center justify-center w-10 h-10 text-xl font-bold text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          &gt;
        </button>
        </div>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-2 text-xs font-medium text-gray-500">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="uppercase">
                {day}
              </div>
            ))}
          </div>
          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2 mt-2 text-sm text-center">
            {renderCalendarDays(currentMonth.add(1, "month"))}
          </div>
        </div>
    </div>
  </div>
  
      </div>
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
      
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-600">2/3 Number of persons</span>
       
      </div>

      {/* Right Section */}
      
    </div>
    <div className="p-6 mx-auto bg-white rounded-lg ">
    {/* Warning Message */}
    {totalOccupancy >= maxOccupancy && (
      <div className="flex items-center mb-4 text-sm font-semibold text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.366-1.36 2.12-1.36 2.486 0l6.518 24.213c.349 1.297-.774 2.487-2.09 2.196L1.833 18.198a1.5 1.5 0 01-.44-2.196L8.257 3.1zM10 11a1 1 0 00-.707.293l-.007.007a.993.993 0 00-.293.707v3a1 1 0 001 1h.01a1 1 0 001-1v-3a1 1 0 00-.29-.707l-.007-.007A1 1 0 0010 11zm-.001-2.1A1.1 1.1 0 1011.1 8 1.1 1.1 0 0010 8.9z"
            clipRule="evenodd"
          />
        </svg>
        You have reached <strong className="ml-1">maximum occupancy</strong>
      </div>
    )}

    {/* Adults */}
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label className="font-semibold">Adults</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDecrement(setAdults, adults)}
            className={`px-3 py-1 rounded ${
              adults > 0 ? "bg-gray-200" : "bg-gray-100 text-gray-400"
            }`}
            disabled={adults <= 0}
          >
            -
          </button>
          <span className="font-medium text-gray-700">{adults}</span>
          <button
            onClick={() => handleIncrement(setAdults, adults)}
            className={`px-3 py-1 rounded ${
              totalOccupancy < maxOccupancy
                ? "bg-gray-200"
                : "bg-gray-100 text-gray-400"
            }`}
            disabled={totalOccupancy >= maxOccupancy}
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Children */}
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label className="font-semibold">Children from 2 to 12 years old</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDecrement(setChildren, children)}
            className={`px-3 py-1 rounded ${
              children > 0 ? "bg-gray-200" : "bg-gray-100 text-gray-400"
            }`}
            disabled={children <= 0}
          >
            -
          </button>
          <span className="font-medium text-gray-700">{children}</span>
          <button
            onClick={() => handleIncrement(setChildren, children)}
            className={`px-3 py-1 rounded ${
              totalOccupancy < maxOccupancy
                ? "bg-gray-200"
                : "bg-gray-100 text-gray-400"
            }`}
            disabled={totalOccupancy >= maxOccupancy}
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Infants */}
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <label className="font-semibold">Children under 2 years old</label>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleDecrement(setInfants, infants)}
            className={`px-3 py-1 rounded ${
              infants > 0 ? "bg-gray-200" : "bg-gray-100 text-gray-400"
            }`}
            disabled={infants <= 0}
          >
            -
          </button>
          <span className="font-medium text-gray-700">{infants}</span>
          <button
            onClick={() => handleIncrement(setInfants, infants)}
            className={`px-3 py-1 rounded ${
              totalOccupancy < maxOccupancy
                ? "bg-gray-200"
                : "bg-gray-100 text-gray-400"
            }`}
            disabled={totalOccupancy >= maxOccupancy}
          >
            +
          </button>
        </div>
      </div>
    </div>

    {/* Recalculate Button */}
    <div className="flex justify-center">
      <button className="px-6 py-2 text-white bg-black rounded">
        Recalculate
      </button>
    </div>
  </div>
<div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <span className="font-medium text-gray-600">3/3</span>
        <span className="font-semibold text-gray-800">Diet</span>
      </div>

      {/* Right Section */}
      
    </div>  
<div className="flex flex-col items-center justify-center bg-white">
{/* Step Indicator */}

{/* Card */}
<div className="w-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md">
  <div className="flex items-center p-4">
    {/* Icon */}
    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
      <svg
        className="w-6 h-6 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    {/* Content */}
    <div className="flex-1 ml-4">
      <h3 className="text-lg font-semibold text-gray-800">Accommodation without meals</h3>
      <p className="text-sm text-gray-600">Total for 2 people for 2 nights</p>
    </div>

    {/* Price */}
    <div className="ml-auto text-2xl font-bold text-gray-800">90€</div>
  </div>
</div>
</div>
        </div>
      
      {/* Right Section: Reservation and Price */}
      <div className='ml-10'>
      

        <div className="p-4 bg-white rounded-lg w-[310px]">
        <h2 className="mb-4 text-lg font-bold">Reservation</h2>
        <hr className="mb-4" />
        
        <div className="flex justify-between mb-2">
          <span className="text-[15px] text-gray-600">Date from — to</span>
          <span className="text-pink-500 cursor-pointer"></span>
        </div>
        <div className="mb-2">
          <span>{dayjs(reservation.checkInDate).format('YYYY-MM-DD')} — {dayjs(reservation.checkOutDate).format('YYYY-MM-DD')}</span>
        </div>
        <hr className="mb-4" />
        
        <div className="flex justify-between mb-2">
          <span className="text-[15px] text-gray-600">Number of people</span>
          <span className="text-pink-500 cursor-pointer"></span>
        </div>
        <div className="mb-2">
          <span>{reservation.numberOfPersons} people</span>
        </div>
        <hr className="mb-4" />
        
        <div className="flex justify-between mb-2">
          <span className="text-[15px] text-gray-600">Accommodation</span>
          <span className="text-pink-500 cursor-pointer"></span>
        </div>
        <div className="mb-2 ">
          <span>{reservation.accommodationId.name}</span>
        </div>
        <hr className="mb-4" />
        
        <div className="flex justify-between mb-2">
          <span className="text-[15px] text-gray-600">Diet</span>
          <span className="text-pink-500 cursor-pointer"></span>
        </div>
        <div className="mb-4">
          <span>{reservation.diet}</span>
        </div>
        <hr className="mb-4" />
        <h2 className="mb-4 text-xl font-semibold">Price</h2>
    
        <div className="flex justify-between mb-3">
          <span className="text-[15px] text-gray-800">Accommodation</span>
          <span className="text-lg">€{reservation.totalPrice}</span>
        </div>
        
        <div className="flex justify-between mb-3">
          <span className="text-[15px] text-orange-600">Final cleaning 1x</span>
          <span className="text-lg">10€</span>
        </div>
        
        <hr className="my-3 border-gray-200" />
        
        <div className="flex justify-between font-bold">
          <span className="text-[15px]">Total price</span>
          <span className="text-2xl">€{reservation.totalPrice}</span>
        </div>
       
      </div>

     
      </div>
    </div>
  </div>
  );
};

export default ReservationForm;
