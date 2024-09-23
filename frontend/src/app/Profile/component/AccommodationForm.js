import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AccommodationForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [accommodations, setAccommodations] = useState([{}]);
  const [selectedAccommodation, setSelectedAccommodation] = useState('');
  // const [note, setNote] = useState('');

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    console.log(start,end)
  };
  const [selectedAccommodationId, setSelectedAccommodationId] = useState("");

  const handleSelectChange = (e) => {
    setSelectedAccommodationId(e.target.value); // Store the selected accommodation._id
  };
  useEffect(() => {
    // Retrieve the user object from localStorage
    const userr = localStorage.getItem('user');

    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;

      console.log('User ID:', userId);

      // Fetch accommodation data for the specific user
      const fetchAccommodations = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/accommodation/user/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch accommodations');
          }

          const result = await response.json();
          console.log('Fetched data:', result);

          setAccommodations(result);
        } catch (error) {
          console.error('Error fetching accommodations:', error);
        }
      };

      fetchAccommodations();
    } else {
      console.error('No user found in localStorage');
    }
  }, []);

  const handleSave = async () => {
    // Ensure both dates are selected
    if (!startDate || !endDate ) {
      alert('Please select both a date range and an accommodation.');
      return;
    }

    const userr = localStorage.getItem('user');
    if (userr) {
      const users = JSON.parse(userr);
      const userId = users._id;
console.log("acc",selectedAccommodationId)
      const occupancyCalendarEntry = {
        startDate: startDate,
        endDate: endDate,
      };

      try {
        const response = await fetch(`http://localhost:5000/api/accommodation/${selectedAccommodationId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            occupancyCalendar: occupancyCalendarEntry,
            // note: note, // Optional note field
            // accommodationId: selectedAccommodation,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update occupancy calendar');
        }

        const result = await response.json();
        console.log('Successfully updated:', result);
        alert('calender updated successfully!');
      } catch (error) {
        console.error('Error updating accommodation:', error);
        alert('Failed to update accommodation.');
      }
    }
  };

  return (
    <div className="max-w-3xl p-4 mx-auto">
      <div className="p-4 mb-4 rounded-md">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-medium">1/2 Accommodation</h2>
          <span className="ml-2 text-gray-400">?</span>
        </div>
        <div>
          <div className="flex justify-between gap-20">
            <label className="block text-sm font-medium text-gray-700">
              Accommodation <span className="text-red-500">*</span>
            </label>
            <select
              className="block w-full lg:w-[420px] p-2 mt-1 border border-gray-300 rounded-md"
              value={selectedAccommodationId} // Binding selected value to state
              onChange={handleSelectChange} 
            >
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
               {/* Displaying the selected accommodation ID for testing */}
      <p className='hidden'> Selected Accommodation ID: {selectedAccommodationId}</p>
          </div>
          <br />
          <div className="flex justify-between gap-20">
            <label className="block text-sm font-medium text-gray-700">
              Accommodation unit <span className="text-red-500">*</span>
            </label>
            <select className="block w-full lg:w-[420px] p-2 mt-1 border border-gray-300 rounded-md">
              <option>   {accommodations.length > 0 ? (
                accommodations.map((accommodation) => (
                  <option key={accommodation._id} value={accommodation._id}>
                    {accommodation.name}
                  </option>
                ))
              ) : (
                <option>No accommodations available</option>
              )}
           </option>
            </select>
          </div>
          <div className="flex justify-between gap-20">
            <label className="block text-sm font-medium text-gray-700">
              The period from — to <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DatePicker
                selected={startDate}
                onChange={onDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="dd.MM.yyyy"
                placeholderText="Select a date range"
                className="w-full lg:w-[420px] p-2 mt-1 border border-gray-300 rounded-md outline-none text-sm md:text-base text-gray-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 mb-4 rounded-md">
        <div className="flex items-center mb-2">
          <h2 className="text-lg font-medium">2/2 Note</h2>
          <span className="ml-2 text-gray-400">?</span>
        </div>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md"
          placeholder="Enter note"
          // value={note}
          onChange={(e) => setNote(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="px-8 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccommodationForm;

