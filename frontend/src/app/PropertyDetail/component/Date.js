"use client";
import React, { useEffect, useState } from "react";
import { BiBox } from "react-icons/bi";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { PiGreaterThanBold, PiLessThanBold } from "react-icons/pi";

dayjs.extend(isBetween);

const DateComponent = ({ data }) => {
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const occupancyCalendar = data?.occupancyCalendar || [];
  const accommodationId = data?._id || "Accommodation Name";

  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null); // Added for hover effect

  useEffect(() => {
    const dates = [];
    occupancyCalendar.forEach((entry) => {
      const startDate = dayjs(entry.startDate);
      const endDate = dayjs(entry.endDate);

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

  // Update to check for hovered date in addition to the selected range
  const isInRange = (date) => {
    const { start, end } = selectedRange;
    if (!start) return false;
    if (end) return dayjs(date).isBetween(start, end, null, "[]");
    if (hoveredDate && dayjs(hoveredDate).isAfter(start)) {
      return dayjs(date).isBetween(start, hoveredDate, null, "[]");
    }
    return false;
  };

  const handleDateClick = (date) => {
    if (isPastDate(date)) return;

    if (!selectedRange.start) {
      setSelectedRange({ start: date, end: null });
      setHoveredDate(null); // Reset hover when a new start date is clicked
    } else if (!selectedRange.end && dayjs(date).isAfter(selectedRange.start)) {
      setSelectedRange({ ...selectedRange, end: date });
      setHoveredDate(null);
    } else if (dayjs(date).isBefore(selectedRange.start)) {
      setSelectedRange({ start: date, end: null });
      setHoveredDate(null);
    } else {
      setSelectedRange({ start: date, end: null });
      setHoveredDate(null);
    }
  };

  const handleMouseEnter = (date) => {
    if (!selectedRange.end && !isPastDate(date) && selectedRange.start) {
      setHoveredDate(date); // Update hoveredDate when hovering over a date
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
      if (!date) return <div key={index} className="w-8 h-8 md:w-10 md:h-10" />;

      let bgColor = "bg-white";
      let cursor = "cursor-pointer";
      let textColor = "text-black";

      if (isPastDate(date)) {
        bgColor = "bg-green-200";
        cursor = "cursor-not-allowed";
        textColor = "text-black-200";
      } else if (isOccupied(date)) {
        bgColor = "bg-green-400";
      } else if (selectedRange.start === date) {
        bgColor = "bg-green-200";
        textColor = "text-black";
      } else if (isInRange(date)) {
        bgColor = "bg-green-200";
      }

      return (
        <div
          key={date}
          onClick={() => handleDateClick(date)}
          onMouseEnter={() => handleMouseEnter(date)} // Trigger hover effect
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center m-1 rounded ${bgColor} ${cursor} ${textColor}`}
        >
          {dayjs(date).format("D")}
        </div>
      );
    });
  };

  return (
    <div className="p-4 md:p-6 lg:rounded-lg bg-white lg:mr-[440px] lg:ml-[18px] lg:-mt-44 mt-1">
      <h1 className="font-bold text-xl md:text-2xl mb-2">Date of arrival — departure</h1>
      <p className="mb-4">To set a price, select the date of your trip.</p>

      {/* Month Navigation */}
      <div className="flex justify-between mb-4">
        <h2
          onClick={prevMonth}
          className="text-lg font-bold cursor-pointer text-left w-1/3"
        >
          Back
        </h2>

        <h2
          onClick={nextMonth}
          className="text-lg font-bold cursor-pointer text-right w-1/3"
        >
          Next
        </h2>
      </div>

      {/* Calendar */}
      <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 lg:space-x-8">
        {/* First month calendar */}
        <div className="w-full lg:w-1/2 mb-6">
          <h2 className="text-lg font-bold text-center mb-6 border-b-2">{currentMonth.format("MMMM YYYY")}</h2>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-xs font-bold text-center md:text-base">
                {day}
              </div>
            ))}
            {renderDates(daysInCurrentMonth)}
          </div>
        </div>

        {/* Second month calendar */}
        <div className="w-full lg:w-1/2 mb-6">
          <h2 className="text-lg font-bold text-center mb-6 border-b-2">
            {currentMonth.add(1, "month").format("MMMM YYYY")}
          </h2>
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

      {/* Legend */}
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
          <BiBox className="text-green-500 border border-gray-800" />
          <p className="ml-2 text-xs md:text-base">Selected dates</p>
        </div>
      </div>
    </div>
  );
};

export default DateComponent;
