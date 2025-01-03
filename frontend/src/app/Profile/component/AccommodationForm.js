import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AccomodationForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accommodations, setAccommodations] = useState([]);
  const [selectedAccommodationId, setSelectedAccommodationId] = useState("");
  const [occupancyCalendar, setOccupancyCalendar] = useState([]);
  const [selectedCalendarIndex, setSelectedCalendarIndex] = useState(null);
  const [isCustomDate, setIsCustomDate] = useState(false);
  const [guestName, setGuestName] = useState(""); // New state for guestName

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleSelectChange = async (e) => {
    const accommodationId = e.target.value;
    setSelectedAccommodationId(accommodationId);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${accommodationId}`
      );
      if (!response.ok) throw new Error("Failed to fetch occupancy calendar");

      const result = await response.json();
      setOccupancyCalendar(result.occupancyCalendar || []);
      if (result.occupancyCalendar.length > 0) {
        setSelectedCalendarIndex(0);
        setStartDate(new Date(result.occupancyCalendar[0].startDate));
        setEndDate(new Date(result.occupancyCalendar[0].endDate));
      } else {
        setSelectedCalendarIndex(null);
        setStartDate(null);
        setEndDate(null);
      }
    } catch (error) {
      console.error("Error fetching occupancy calendar:", error);
    }
  };

  const handleCalendarSelect = (e) => {
    const selectedIndex = e.target.value;
    
    if (selectedIndex === "custom") {
      // If "Enter Custom Date" is selected
      setIsCustomDate(true); // Enable custom date input
      setSelectedCalendarIndex(null); // Reset the selected index
      setStartDate(null); // Clear start date
      setEndDate(null); // Clear end date
      setGuestName(""); // Reset guest name
    } else {
      // If a predefined calendar entry is selected
      setIsCustomDate(false); // Disable custom date input
      const index = parseInt(selectedIndex, 10);
      setSelectedCalendarIndex(index); // Update the selected index
  
      const selectedEntry = occupancyCalendar[index];
      if (selectedEntry) {
        setStartDate(new Date(selectedEntry.startDate)); // Populate start date
        setEndDate(new Date(selectedEntry.endDate)); // Populate end date
      }
    }
  };
  
  useEffect(() => {
    const userr = localStorage.getItem("user");
    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      const fetchAccommodations = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch accommodations");
          const result = await response.json();
          setAccommodations(result);
        } catch (error) {
          console.error("Error fetching accommodations:", error);
        }
      };
      fetchAccommodations();
    } else {
      console.error("No user found in localStorage");
    }
  }, []);
  
  const handleSave = async () => {
    if (!startDate || !endDate) {
      alert("Please select both a date range and an accommodation.");
      return;
    }

    try {
      if (isCustomDate) {
        if (!guestName) {
          alert("Please enter the guest name for the custom date.");
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodationId}/occupancyCalendar`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              startDate,
              endDate,
              guestName, // Send guest name along with the custom date
            }),
          }
        );

        if (!response.ok)
          throw new Error("Failed to add custom date to occupancy calendar");
        alert("Custom date and guest name added successfully!");
      } else {
        const updatedCalendar = [...occupancyCalendar];
        updatedCalendar[selectedCalendarIndex] = {
          ...updatedCalendar[selectedCalendarIndex],
          startDate,
          endDate,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${selectedAccommodationId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ occupancyCalendar: updatedCalendar }),
          }
        );

        if (!response.ok) throw new Error("Failed to update occupancy calendar");
        alert("Calendar updated successfully!");
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
      alert("Failed to update accommodation.");
    }
  };

  return (
    <div className="max-w-3xl p-6 mx-auto bg-white">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Accommodation Form</h2>

      <div className="space-y-6">
        {/* Accommodation Selection */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Accommodation <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-red-200"
            value={selectedAccommodationId}
            onChange={handleSelectChange}
          >
            <option value="custom">Choose accommodation</option>
            {accommodations.length > 0 ? (
              accommodations.map((accommodation) => (
                <option key={accommodation._id} value={accommodation._id}>
                  {accommodation.name}
                </option>
              ))
            ) : (
              <option>No accommodations available</option>
            )}
          </select>
        </div>

        {/* Occupancy Calendar */}
        <div>
        <label className="block mb-2 font-medium text-gray-700">
          Occupancy Calendar
        </label>
        <select
          className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-red-200"
          onChange={handleCalendarSelect}
          value={selectedCalendarIndex !== null ? selectedCalendarIndex : "custom"} // Set default value to "custom"
        >
          <option Value="custom">Enter Custom Date</option> {/* Default "custom" option */}
          <option Value="custom">enter your own date</option> {/* Default "custom" option */}
          
          {occupancyCalendar.map((entry, index) => (
            <option key={index} value={index}>
              {new Date(entry.startDate).toLocaleDateString()} -{" "}
              {new Date(entry.endDate).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>
      

        {/* Guest Name Field - only show if custom date is selected */}
        {isCustomDate && (
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Guest Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-md shadow-sm focus:ring focus:ring-red-200"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)} // Update guestName state
              placeholder="Enter guest name"
            />
          </div>
        )}

        {/* Date Picker */}
        <div className="w-full">
          <label className="block mb-2 font-medium text-gray-700">
            Select Period <span className="text-red-500">*</span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={onDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            dateFormat="dd.MM.yyyy"
            placeholderText="Select a date range"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            wrapperClassName="w-full"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleSave}
          className="px-8 py-3 text-white transition duration-300 bg-red-500 rounded-md shadow hover:bg-red-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccomodationForm;
