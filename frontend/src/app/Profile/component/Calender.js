import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Base_URL } from "../../config";
import { CiSearch } from "react-icons/ci";
import { BiPlus } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import AccomodationForm from "./AccommodationForm";
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { FormContext } from '@/app/FormContext';
import useFetchData from "@/app/hooks/useFetchData";

const isDateInRange = (date, dateRanges) =>
  dateRanges.some((range) => {
    const start = new Date(range.startDate);
    const end = new Date(range.endDate);
    return date >= start && date <= end;
  });

const Calendar = ({ year, months = [] }) => {
  const [selectedDateDetails, setSelectedDateDetails] = useState(null);
  const [occupancyDates, setOccupancyDates] = useState([]);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [displayedMonths, setDisplayedMonths] = useState(12);
  const { selectedpage, updateSelectedpage } = useContext(FormContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const userId = user?._id;

  const [accommodationData, setAccommodationData] = useState([]);
  const [calendarId, setCalendarId] = useState(null);
  const [secretToken, setSecretToken] = useState(null);
  const [bookings, setBookings] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data, loading, error: fetchError } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);

  useEffect(() => {
    if (fetchError) {
      console.error("Error fetching accommodation data:", fetchError);
      setError("Failed to fetch accommodation data.");
    } else if (data) {
      setAccommodationData(data);
      extractCalendarInfo(data);
    }
  }, [data, fetchError]);

  const extractCalendarInfo = (data) => {
    if (data && data.length > 0) {
      const url = data[0]?.url;
      if (url) {
        const urlParts = new URL(url);
        const params = new URLSearchParams(urlParts.search);
        const id = urlParts.pathname.split('/').pop().split('.')[0];
        const token = params.get('s');
        setCalendarId(id);
        setSecretToken(token);
      }
    }
  };

  useEffect(() => {
    if (calendarId && secretToken) {
      const fetchBookings = async () => {
        const fetchUrl = `${Base_URL}/calendar/${calendarId}/${secretToken}`;
        try {
          const response = await fetch(fetchUrl);
          if (!response.ok) throw new Error('Failed to fetch bookings');
          const data = await response.json();
          setBookings(data.bookings || []);
        } catch (error) {
          console.error("Error fetching bookings:", error);
          setError("Failed to fetch bookings.");
        }
      };

      fetchBookings();
    }
  }, [calendarId, secretToken]);

  useEffect(() => {
    const fetchOccupancyDates = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setOccupancyDates(result || []);
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
        accommodationId: selectedOcc._id,
        entryId: dateRange._id,
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

      setSelectedDateDetails(null);
    } catch (error) {
      console.error("Error deleting entry:", error);
      alert("Failed to delete the entry. Please try again.");
    }
  };

  // const [months] = useState(Array.from({ length: 12 }, (_, i) => i));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const isDateBooked = (date) => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      return date >= bookingStart && date <= bookingEnd;
    });
  };

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
              className="items-center hidden px-4 py-2 text-black bg-white border rounded-lg md:flex hover:bg-gray-100"
              onClick={() => updateSelectedpage("AddAccommodation")}
            >
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2" onClick={toggleMenu}>
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
        onClick={() => setShowForm(true)}
      >
        Accommodation Update
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
              const actualYear = monthIndex >= 8 ? year : year + 1;
              return (
                actualYear > currentYear ||
                (actualYear === currentYear && monthIndex >= currentMonth)
              );
            })
            .slice(0, displayedMonths)
            .map((monthIndex, index) => {
              const actualYear = monthIndex >= 8 ? year : year + 1;
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
                      const isBooked = isDateBooked(currentDate);

                      return (
                        <div
                          key={i}
                          className={`p-2 text-sm rounded cursor-pointer ${isBooked ? "bg-green-300" : isInRange ? "bg-green-300" : ""}`}
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
      {/* <div className="mt-4 text-center">
        <button
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => setDisplayedMonths(displayedMonths + 4)}
        >
          Show More Months
        </button>
      </div> */}

      {/* Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4">
          <button
            className="text-2xl text-gray-600"
            onClick={toggleMenu}
          >
            <MdClose />
          </button>
          <ul className="mt-4 space-y-2 font-medium text-gray-800">
            <li className="flex flex-row gap-2">
              <div>
                {user?.photo ? (
                  <img
                    src={user?.photo}
                    alt="User Profile"
                    className="object-cover w-8 h-8 rounded-full"
                  />
                ) : (
                  <BsPersonCircle className="text-[#292A34] text-xl" />
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-[#292A34] text-sm">{user?.name || "User"}</h1>
                <p className="text-xs" onClick={() => updateSelectedpage("EditProfile")} >Edit Profile</p>
              </div>
            </li>
            {/* <li className="flex flex-col gap-3">
              <button className="bg-[#292A34] rounded-lg text-white py-4 px-24">
                Extend Subscription
              </button>
              <button className="bg-[#E7EAEE] rounded-lg text-[#292A34] py-4 px-24">
                Order Additional services
              </button>
            </li> */}

            <hr className="my-5" />

            {/* Menu Items */}
            {[
              { icon: <RiMenu2Fill />, text: 'Reservation requests' },
              { icon: <MdOutlineEmail />, text: 'News' },
              { icon: <LuCalendarDays />, text: 'Occupancy calendar' },
              { icon: <MdOutlineShowChart />, text: 'Statistics' },
              { icon: <FaRegStar />, text: 'Rating' },
              { icon: <WiTime10 />, text: 'Last minute' },
              { icon: <RiHotelLine />, text: 'Accommodation' },
              { icon: <GoSync />, text: 'Calendar synchronization' },
              { icon: <MdOutlineSubscriptions />, text: 'Subscription' },
            ].map(({ icon, text }) => (
              <li key={text}>
                <p
                  className="flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100"
                  onClick={() => handleMenuClick(text)}
                >
                  {icon}
                  <span className="text-sm font-medium">{text}</span>
                </p>
              </li>
            ))}
            <li>
              <button
                onClick={() => {}}
                className="flex items-center w-full gap-4 p-2 text-left text-gray-800 rounded-lg hover:bg-gray-100"
              >
                <GoSignOut />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const monthsToShow = [8, 9, 10, 11, 0, 1, 2, 3, 4];

  return <Calendar year={currentYear} months={monthsToShow} />;
};

export default App;