"use client";
import React, { useEffect, useState } from "react";
import { BiBox } from "react-icons/bi";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const DateComponent = ({ data }) => {
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const occupancyCalendar = data?.occupancyCalendar || [];
  const accommodationId = data?._id || "Accommodation Name";

  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [occupiedDates, setOccupiedDates] = useState([]);

  // Set occupied dates based on the occupancyCalendar data
  useEffect(() => {
    const dates = [];
    occupancyCalendar.forEach((entry) => {
      const startDate = dayjs(entry.startDate);
      const endDate = dayjs(entry.endDate);

      // Add all dates in the range to occupiedDates
      let date = startDate;
      while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
        dates.push(date.format("YYYY-MM-DD"));
        date = date.add(1, "day");
      }
    });
    setOccupiedDates(dates);
  }, [occupancyCalendar]);

  const isOccupied = (date) => occupiedDates.includes(date);
  const isPastDate = (date) => dayjs(date).isBefore(dayjs(), "day");
  const isInRange = (date) => {
    const { start, end } = selectedRange;
    return start && end && dayjs(date).isBetween(start, end, null, "[]");
  };

  const handleDateClick = (date) => {
    if (isPastDate(date)) return; // Prevent selection of past dates

    if (!selectedRange.start) {
      setSelectedRange({ start: date, end: null });
    } else if (!selectedRange.end && dayjs(date).isAfter(selectedRange.start)) {
      setSelectedRange({ ...selectedRange, end: date });
    } else if (dayjs(date).isBefore(selectedRange.start)) {
      setSelectedRange({ start: date, end: null });
    } else {
      setSelectedRange({ start: date, end: null });
    }
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const getDaysInMonth = (month) => {
    const startDay = month.startOf("month").day();
    const daysInMonth = month.daysInMonth();

    return Array.from({ length: startDay + daysInMonth }, (_, index) => {
      const day = index - startDay + 1;
      if (day <= 0) return null;
      return month.date(day).format("YYYY-MM-DD");
    });
  };

  const daysInCurrentMonth = getDaysInMonth(currentMonth);
  const daysInNextMonth = getDaysInMonth(currentMonth.add(1, "month"));

  const renderDates = (daysInMonth) => {
    return daysInMonth.map((date, index) => {
      if (!date) return <div key={index} className="w-8 h-8 md:w-10 md:h-10" />; // Empty cell for previous month days

      let bgColor = "bg-white"; // Free dates default color
      let cursor = "cursor-pointer";
      let textColor = "text-black";

      if (isPastDate(date)) {
        bgColor = "bg-green-200"; // Past dates disabled
        cursor = "cursor-not-allowed";
        textColor = "text-black-200";
      } else if (isOccupied(date)) {
        bgColor = "bg-green-400"; // Occupied
      } else if (selectedRange.start === date) {
        bgColor = "bg-green-200"; // Start date selected
        textColor = "text-black";
      } else if (isInRange(date)) {
        bgColor = "bg-green-200"; // Dates in range
      }

      return (
        <div
          key={date}
          onClick={() => handleDateClick(date)}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center m-1 rounded ${bgColor} ${cursor} ${textColor}`}
        >
          {dayjs(date).format("D")}
        </div>
      );
    });
  };

  return (
    <div className="p-4 md:p-6 rounded-lg bg-white lg:mr-[440px] lg:ml-[18px] lg:-mt-32">
      <div className="flex justify-between mb-4">
        <button onClick={prevMonth} className="text-xl">&lt;</button>
        <h2 className="text-xl font-bold">{currentMonth.format("MMMM YYYY")} - {currentMonth.add(1, "month").format("MMMM YYYY")}</h2>
        <button onClick={nextMonth} className="text-xl">&gt;</button>
      </div>

      <div className="flex flex-col justify-around md:flex-row">
        {/* First month */}
        <div className="w-full mb-6 md:w-1/2 md:mb-0">
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-xs font-bold text-center md:text-base">
                {day}
              </div>
            ))}
            {renderDates(daysInCurrentMonth)}
          </div>
        </div>

        {/* Second month */}
        <div className="w-full mb-6 md:w-1/2 md:mb-0">
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-xs font-bold text-center md:text-base">
                {day}
              </div>
            ))}
            {renderDates(daysInNextMonth)}
          </div>
        </div>
      </div>

    <hr className="my-8 md:my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
      <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <BiBox className="text-gray-800" />
            <p className="ml-2 text-xs md:text-base">Free dates</p>
          </div>
          <div className="flex items-center">
            <BiBox className="text-green-200" />
            <p className="ml-2 text-xs md:text-base">Occupied</p>
          </div>
          <div className="flex items-center">
            <BiBox className="text-green-300 border border-gray-800" />
            <p className="ml-2 text-xs md:text-base">You can check out</p>
          </div>
          <div className="flex items-center">
            <BiBox className="text-green-200" />
            <p className="ml-2 text-xs md:text-base">Past dates</p>
          </div>
        
      </div>
    </div>
  );
};

export default DateComponent;
