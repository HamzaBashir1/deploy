"use client";
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CiSearch } from 'react-icons/ci';
import { BiPlus } from 'react-icons/bi';
import { Base_URL } from "../../config"
import { BsPersonCircle } from 'react-icons/bs';
import { FormContext } from "../../FormContext";
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { DotIcon } from 'lucide-react'
import { BiDownload } from 'react-icons/bi'
import { createEvents } from 'ics';
import useFetchData from '../../hooks/useFetchData';

function Synchronization({ onMenuClick }) {
  const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [url, setUrl] = useState('');
  const [accommodationData, setAccommodationData] = useState([]);
  const [error, setError] = useState(null);
  const [calendarId, setCalendarId] = useState(null);
  const [secretToken, setSecretToken] = useState(null);
  const [bookings, setBookings] = useState([]); // State for bookings

  const [myurl, setmyurl] = useState('')
  // const [activePage, setActivePage] = useState('');
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("import"); 
 
  // const { user } = useContext(AuthContext);
  const userId = user?._id;
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (page) => {
    console.log("overview", page)
    setActivePage(page);
    onMenuClick(page); 
  };

  useEffect(() => {
    const userr = localStorage.getItem('user');
    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      const fetchAccommodations = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch accommodations');
          }

          const result = await response.json();
          setAccommodations(result);
          console.log("acc" ,accommodations);
        } catch (error) {
          console.error('Error fetching accommodations:', error);
        }
      };

      fetchAccommodations();
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  const handleAccommodationChange = (e) => {
    const accommodationId = e.target.value;
    const selected = accommodations.find(accommodation => accommodation._id === accommodationId);
    setSelectedAccommodation(selected);
    setUrl(selected ? selected.url || '' : ''); // Update URL field
  };

  useEffect(() => {
    if (activePage === "export") {
      handleGenerateICS();
    }
  }, [activePage]);
  
  const handleDownload = () => {
    if (!url) {
      alert("No URL available for download");
      return;
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop(); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
   console.log("acc" ,accommodations); 
//

const { data, loading, error: fetchError } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);

const extractCalendarInfo = (data) => {
    if (data && data.length > 0) {
        let url = data[0]?.url; // Assuming the URL for the calendar is in the first accommodation object

        if (url) {
            // Add protocol if missing
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = `https://${url}`;
            }

            try {
                const urlParts = new URL(url);
                const params = new URLSearchParams(urlParts.search);
                
                // Extract calendarId and secretToken from the URL
                const id = urlParts.pathname.split('/').pop().split('.')[0]; // Extracts the ID before .ics
                const token = params.get('s'); // Assuming 's' is the parameter for the secret token
                
                // Log URL, calendarId, and secretToken
                console.log('Calendar URL:', url);
                console.log('Extracted Calendar ID:', id);
                console.log('Extracted Secret Token:', token);
                
                setCalendarId(id);
                setSecretToken(token);
            } catch (error) {
                console.error('Invalid URL format:', error);
            }
        }
    }
};

useEffect(() => {
  if (fetchError) {
      console.error("Error fetching accommodation data:", fetchError);
      setError("Failed to fetch accommodation data.");
  } else if (data) {
      setAccommodationData(data);
      extractCalendarInfo(data); // Extract calendarId and secretToken
  }
}, [data, fetchError]);

const handleSave = async () => {
  if (!selectedAccommodation) {
    console.error("No accommodation selected");
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodation._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error("Failed to update accommodation");
    }
    alert("Accommodation updated successfully");
    console.log("Accommodation updated successfully");

    // Fetch bookings and handle calendar updates
    const bookings = await fetchBookings();
    if (Array.isArray(bookings) && bookings.length > 0) {
      await updateAllBookings(bookings);
    } else {
      console.error("No bookings available for update");
    }
  } catch (error) {
    alert("Accommodation not updated");
    console.error("Error updating accommodation:", error);
  }
};

const fetchBookings = async () => {
  const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/calendar/${calendarId}/${secretToken}`;
  console.log(`Fetching bookings from: ${fetchUrl}`);

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fetch error details:", errorData);
      throw new Error("Failed to fetch bookings");
    }
    const data = await response.json();
    return data.bookings || [];
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error; // Re-throw to handle in the calling function
  }
};

const updateAllBookings = async (bookings) => {
  console.log("Updating all bookings...");

  try {
    const requests = bookings.map((booking) => {
      if (!booking.start || !booking.end) {
        console.error("Invalid booking object:", booking);
        return null;
      }

      const formatDate = (date) => {
        const d = new Date(date);
        let month = "" + (d.getMonth() + 1);
        let day = "" + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
      };

      const startDate = formatDate(booking.start);
      const endDate = formatDate(booking.end);

      console.log("Sending booking update:", {
        startDate,
        endDate,
        guestName: booking.summary || "Guest",
        status: "booked",
      });

      return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodation._id}/occupancyCalendar`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          guestName: booking.summary || "Guest",
          status: "booked",
        }),
      }).then(async (response) => {
        const result = await response.json();
        console.log("API Response for booking:", result);
        if (!response.ok) {
          console.error("API Error:", result);
          throw new Error(`Failed to update booking: ${result.message}`);
        }
        return result;
      });
    });

    const results = await Promise.all(requests.filter(Boolean));
    console.log("Successfully updated bookings:", results);
  } catch (error) {
    console.error("Error updating bookings:", error);
  }
};

console.log("book",bookings)


   const handleGenerateICS = async () => {
    if (!selectedAccommodation) {
      alert("No accommodation selected");
      return;
    }
  
    try {
      // Construct the dynamic URL for fetching the .ics file
      const generatedUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodation._id}/calendar.ics`;
  
      // Validate the URL by making a request (optional)
      const response = await fetch(generatedUrl, { method: "HEAD" });
      if (!response.ok) {
        alert("Failed to generate calendar link");
        return;
      }
  
      // Update the state with the generated URL
      setmyurl(generatedUrl); // Ensure `setMyUrl` updates the state for the input field
      // alert("Calendar link generated successfully!");
    } catch (error) {
      console.error("Error generating calendar link:", error);
      alert("Error generating calendar link");
    }
  };
  return (
    <div>
      {/* Navbar */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Synchron Calendar</h1>
            <p className="text-[#292A34B2] text-sm md:text-xs font-medium"></p>
          </div>
          <div className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center" onClick={toggleMenu}>
            <CiSearch className="text-xl text-gray-500" />
            <button className="items-center hidden px-4 py-2 text-black bg-white border rounded-lg md:flex hover:bg-gray-100" onClick={() => updateSelectedpage("AddAccommodation")}>
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2" onClick={toggleMenu}>
              {user?.photo ? (
                <img src={user?.photo} alt="User Profile" className="object-cover w-8 h-8 rounded-full" />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white">

        {/* Accommodation Selection */}
        <div className='mx-32'>
          <div className="p-5 mb-4 bg-white">
            <div className="flex items-center justify-between p-6 mt-12 mb-8 bg-gray-100 rounded-lg shadow-md">
              <div className="text-lg font-medium text-gray-600">
                <span className="text-xl font-bold text-gray-800">1/1 Name and Link</span>
              </div>
            </div>

            <h1 className="mb-2 text-lg font-bold">Accommodation Name</h1>
            <div className="relative">
              <select className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md" onChange={handleAccommodationChange}>
                <option value="">Select an accommodation</option>
                {accommodations.length > 0 ? (
                  accommodations.map(accommodation => (
                    <option key={accommodation._id} value={accommodation._id}>
                      {accommodation.name}
                    </option>
                  ))
                ) : (
                  <option>No accommodations available</option>
                )}
              </select>
            </div>
          </div>

          {/* URL Input */}
          <div className="p-5 mb-4 bg-white">
            <h1 className="mb-2 text-lg font-bold">Enter URL</h1>
            <div className="relative">
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                className="w-full p-2 pl-3 pr-12 border border-gray-300 rounded-md"
                placeholder="Enter URL"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button onClick={handleSave} className="px-8 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600">
              Save
            </button>
          </div>

          {/* Airbnb Synchronization */}
          {/* Airbnb Synchronization or Import Section */}
{selectedAccommodation && url && url !== '' && (
  <>
    <hr className="my-10" />
    {/* Export and Import Buttons */}
    <div className="flex justify-start mb-5">
      <button
        className={`px-8 py-2 font-medium mr-2 text-white rounded-md ${
          activePage === "export" ? "bg-red-500 hover:bg-red-600" : "bg-gray-300"
        }`}
        onClick={() => setActivePage("export")}
      >
        Export
      </button>
      <button
        className={`px-8 py-2 font-medium text-white rounded-md ${
          activePage === "import" ? "bg-red-500 hover:bg-red-600" : "bg-gray-300"
        }`}
        onClick={() => setActivePage("import")}
      >
        Import
      </button>
    </div>

    {/* Export Section */}
    {activePage === "import" && (
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Airbnb</h1>
          <p>Synchronization: Today</p>
        </div>
        <div className="flex flex-row gap-5">
          <button className="bg-gray-300 px-2.5 py-2" onClick={handleDownload}>
            <BiDownload />
          </button>
        </div>
      </div>
    )}

    {/* Import Section */}
    {activePage === "export" && (
      <div className="p-5 bg-gray-100 rounded-lg">
        <h1 className="mb-4 text-xl font-bold">Import URL</h1>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            value={myurl}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(myurl);
              alert("URL copied to clipboard!");
            }}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            Copy
          </button>
        </div>
        
      </div>
    )}

  </>
)}

        </div>

      </div>

      {/* Menu Sidebar */}
      <div className={`fixed top-0 right-0 h-full bg-white shadow-lg z-50 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4">
          <button className="text-2xl text-gray-600" onClick={toggleMenu}>
            <MdClose />
          </button>
          <ul className="mt-4 space-y-2 font-medium text-gray-800">
            <li className='flex flex-row gap-2'>
              <div>
                {user?.photo ? (
                  <img src={user?.photo} alt="User Profile" className="object-cover w-8 h-8 rounded-full" />
                ) : (
                  <BsPersonCircle className="text-[#292A34] text-xl" />
                )}
              </div>
              <div className='flex flex-col'>
                <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
                <p className='text-xs' onClick={() => updateSelectedpage("EditProfile")}>Edit Profile</p>
              </div>
            </li>
            <hr className='my-5' />

            {/* Menu Items */}
            {[{ icon: <RiMenu2Fill />, text: 'Reservation requests' }, { icon: <LuCalendarDays />, text: 'Occupancy calendar' }, { icon: <RiHotelLine />, text: 'Accommodation' }, { icon: <GoSync />, text: 'Calendar synchronization' }]
              .map(({ icon, text }) => (
                <li key={text}>
                  <a
                    href="#"
                    className={`flex gap-4 items-center px-4 py-2 rounded-md text-[#292A34] hover:bg-gray-100 transition-all cursor-pointer`}
                    onClick={() => handleMenuClick(text)}
                  >
                    <span className="text-xl">{icon}</span>
                    {text}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Synchronization; 
