import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Base_URL } from "../../config";
import { CiSearch } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import AccomodationForm from "./AccommodationForm";

// Helper function to check if a date is within a range from the database
const isDateInRange = (date, dateRanges) =>
  dateRanges.some((range) => {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    return date >= start && date <= end;
  });

const Calendar = ({ year, months = [] }) => {
  const [selectedDateDetails, setSelectedDateDetails] = useState(null); // Store the clicked accommodation date details
  const [occupancyDates, setOccupancyDates] = useState([]); // Initialize as array
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state to show/hide form
  const [displayedMonths, setDisplayedMonths] = useState(4); // State to keep track of displayed months

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchOccupancyDates = async () => {
      const userId = user?._id;
      if (!userId) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);
        const result = await response.json();

        if (!response.ok) throw new Error(result.message);

        setOccupancyDates(result || []); // Ensure result is always an array
      } catch (error) {
        console.error("Error fetching occupancy dates:", error);
        setError("No accommodation available.");
      }
    };

    fetchOccupancyDates();
  }, [user]);

  const handleAccommodationClick = (date) => {
    const selectedOcc = occupancyDates.find((occ) =>
      occ.occupancyCalendar.find((range) => {
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        return date >= start && date <= end;
      })
    );

    if (selectedOcc) {
      const dateRange = selectedOcc.occupancyCalendar.find((range) => {
        const start = new Date(range.startDate);
        const end = new Date(range.endDate);
        return date >= start && date <= end;
      });

      setSelectedDateDetails({
        accommodationId: selectedOcc._id, // Add accommodation ID
        entryId: dateRange._id, // Add entry ID (assuming each range has a unique _id)
        name: selectedOcc.name,
        startDate: new Date(dateRange.startDate).toDateString(),
        endDate: new Date(dateRange.endDate).toDateString(),
        guestName: dateRange.guestName,
        status: "booked",
      });
    }
  };

  const handleDelete = async (accommodationId, entryId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${accommodationId}/occupancy/${entryId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("delete");
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete entry.");
      }

      // Update state by filtering out the deleted entry
      setOccupancyDates((prevDates) =>
        prevDates.map((occ) =>
          occ._id === accommodationId
            ? {
                ...occ,
                occupancyCalendar: occ.occupancyCalendar.filter(
                  (range) => range._id !== entryId
                ),
              }
            : occ
        )
      );

      // Close the popup after deletion
      setSelectedDateDetails(null);
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete the entry. Please try again.");
    }
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  return (
    <div className="p-5">
      {/* Navbar */}
      <div className="p-5 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <h1 className="text-[#0b0b0e] font-bold text-xl md:text-2xl">
            Occupancy Calendar
          </h1>

          <div className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center">
            <CiSearch className="text-xl text-gray-500" />
            <button
              className="flex items-center px-4 py-2 space-x-2 text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={() => setShowForm(true)} // Show form on button click
            >
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
              {user?.photo ? (
                <img
                  src={user.photo}
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

      <button
        className="px-4 py-2 text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600"
        onClick={() => setShowForm(true)} // Show form on button click
      >
        accommodation update
      </button>

      {/* Accommodation Form Popup */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <AccomodationForm />
            <button
              className="px-4 py-2 mt-4 text-white bg-red-500 rounded-lg hover:bg-red-600"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Accommodation Details Popup */}
      {selectedDateDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60">
          <div className="w-full max-w-md p-8 transition-transform transform scale-100 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800">
              Accommodation Details
            </h2>

            {/* Accommodation Info */}
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Name:</span>{" "}
                {selectedDateDetails.name}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Guest Name:</span>{" "}
                {selectedDateDetails.guestName}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Start Date:</span>{" "}
                {selectedDateDetails.startDate}
              </p>
              <p>
                <span className="font-semibold text-gray-700">End Date:</span>{" "}
                {selectedDateDetails.endDate}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between mt-6">
              <button
                className="px-4 py-2 text-white transition bg-red-500 rounded-lg shadow hover:bg-red-600"
                onClick={() =>
                  handleDelete(
                    selectedDateDetails.accommodationId,
                    selectedDateDetails.entryId
                  )
                }
              >
                Delete
              </button>

              <button
                className="px-4 py-2 text-gray-700 transition bg-gray-300 rounded-lg shadow hover:bg-gray-400"
                onClick={() => setSelectedDateDetails(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {months
            .filter((monthIndex) => {
              // Show months from the current month onward
              const actualYear = monthIndex >= 8 ? year : year + 1;
              return (
                actualYear > currentYear ||
                (actualYear === currentYear && monthIndex >= currentMonth)
              );
            })
            .slice(0, displayedMonths) // Only show the number of months in displayedMonths
            .map((monthIndex, index) => {
              const actualYear = monthIndex >= 8 ? year : year + 1; // Adjust year based on monthIndex
              const daysInMonth = new Date(
                actualYear,
                monthIndex + 1,
                0
              ).getDate();
              const firstDay = new Date(actualYear, monthIndex, 1).getDay();

              return (
                <div key={index} className="p-4">
                  <h2 className="mb-3 text-lg font-semibold">
                    {new Date(actualYear, monthIndex).toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>

                  <div className="grid grid-cols-7 gap-2 text-center">
                    {["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"].map(
                      (day) => (
                        <div key={day} className="text-sm text-gray-500">
                          {day}
                        </div>
                      )
                    )}

                    {[...Array(firstDay === 0 ? 6 : firstDay - 1)].map(
                      (_, i) => (
                        <div key={i}></div>
                      )
                    )}

                    {[...Array(daysInMonth)].map((_, i) => {
                      const date = i + 1;
                      const currentDate = new Date(actualYear, monthIndex, date);
                      const occupancy = occupancyDates.find((occ) =>
                        isDateInRange(currentDate, occ.occupancyCalendar || [])
                      );
                      const isInRange = !!occupancy;

                      return (
                        <div
                          key={i}
                          className={`p-2 text-sm rounded cursor-pointer ${
                            isInRange ? "bg-green-300" : ""
                          }`}
                          onClick={() =>
                            isInRange && handleAccommodationClick(currentDate)
                          }
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
      )}

      {/* Show More Months Button */}
      <div className="mt-4 text-center">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => setDisplayedMonths(displayedMonths + 4)} // Increase the number of displayed months by 4
        >
          Show More Months
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const monthsToShow = [8, 9, 10, 11, 0, 1, 2, 3, 4]; // August to April (spanning two years)

  return <Calendar year={currentYear} months={monthsToShow} />;
};

export default App;
