"use client";
import React, { useState, useContext, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import DateRangePicker from "./DateRangePicker";
import { AuthContext } from "../../context/AuthContext";
import AccommodationForm from "./AccommodationForm";
// import { Base_URL } from "../../config";

// Helper function to get the number of days in a month
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

// Helper function to get the first day of the month (0 is Sunday, 1 is Monday, etc.)
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

// Helper function to check if a date is within any of the date ranges from the database
const isDateInRange = (date, dateRanges) => {
  return dateRanges.some((range) => {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    return date >= start && date <= end;
  });
};

// Calendar component
const Calendar = ({ year, months }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hoveredDate, setHoveredDate] = useState(null); // New state for hovered date
  const [showForm, setShowForm] = useState(false);
  const [occupancyDates, setOccupancyDates] = useState([]); // Store occupancy data from the database

  const { user } = useContext(AuthContext);

  // Fetch occupancy dates from the server
  useEffect(() => {
    const fetchOccupancyDates = async () => {
      const userId = user?._id;
      if (!userId) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`
        );
        const result = await response.json();
        console.log("Fetched occupancy dates:", result);

        // Assuming result contains the occupancyCalendar array
        setOccupancyDates(result);
      } catch (error) {
        console.error("Error fetching occupancy dates:", error);
      }
    };

    fetchOccupancyDates();
  }, [user]);

  // Helper function to handle date change from the date picker
  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setShowDatePicker(false);

    // Automatically show the form when both dates are selected
    if (start && end) {
      setShowForm(true);
    }
  };

  // Determine if a date is being hovered
  const isDateHovered = (date) => {
    if (!hoveredDate) return false;
    return date.toDateString() === hoveredDate.toDateString();
  };

  // Close the form
  const closeForm = () => {
    setShowForm(false);
  };

  // Render the form if showForm is true
  if (showForm) {
    return (
      <div className="py-4">
        <button className="text-2xl text-gray-600" onClick={closeForm}>
          Close Form
        </button>
        <AccommodationForm startDate={startDate} endDate={endDate} />
      </div>
    );
  }

  return (
    <div className="p-5">
      {/* Navbar */}
      <div className="mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">
              Occupancy calendar
            </h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium">
              Apartment Košice
            </p>
          </div>
          <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            onClick={() => setShowForm(true)}
          >
            <CiSearch className="text-xl text-gray-500" />
            <button className="flex items-center px-4 py-2 space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  alt="User Profile"
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || "User"}</h1>
            </div>
          </div>
        </div>
      </div>

      {showDatePicker && (
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
        />
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {months.map((monthIndex, index) => {
          const daysInMonth = getDaysInMonth(year, monthIndex);
          const firstDay = getFirstDayOfMonth(year, monthIndex);

          return (
            <div key={index} className="p-4">
              <h2 className="mb-3 text-lg font-semibold">
                {new Date(year, monthIndex).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2 text-center">
                {["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <div key={day} className="text-sm text-gray-500">
                      {day}
                    </div>
                  )
                )}

                {/* Empty spaces for days before the first day */}
                {[...Array(firstDay === 0 ? 6 : firstDay - 1)].map((_, i) => (
                  <div key={i}></div>
                ))}

                {/* Dates */}
                {[...Array(daysInMonth)].map((_, i) => {
                  const date = i + 1;
                  const currentDate = new Date(year, monthIndex, date);

                  // Check if the current date is within any occupancy range
                  const isInRange = occupancyDates.some((occupancy) =>
                    isDateInRange(currentDate, occupancy.occupancyCalendar || [])
                  );
                  const isHovered = isDateHovered(currentDate);

                  return (
                    <div
                      key={i}
                      className={`p-2 text-sm rounded cursor-pointer transition-colors duration-200 ${
                        isHovered ? "bg-blue-200" : ""
                      } ${isInRange ? "bg-green-300" : ""} ${
                        i % 7 === 5 || i % 7 === 6 ? "" : ""
                      }`}
                      onClick={() => {
                        if (!startDate) {
                          setStartDate(currentDate);
                        } else if (!endDate) {
                          setEndDate(currentDate);
                          setShowDatePicker(false);
                          handleDateChange(startDate, currentDate);
                        } else {
                          setStartDate(currentDate);
                          setEndDate(null);
                        }
                      }}
                      onMouseEnter={() => setHoveredDate(currentDate)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Main component to render calendar for specific months
const App = () => {
  const currentYear = new Date().getFullYear();
  const monthsToShow = [8, 9, 10, 11, 0, 1, 2, 3, 4]; // Array of months index starting from September (8) to May (4) next year

  return (
    <div>
      <Calendar year={currentYear} months={monthsToShow} />
    </div>
  );
};

export default App;
