import React, { useState } from 'react';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

const Cal = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  // Sample data for occupied, free, and move-out dates
  const occupiedDates = [
    
    { date: '2024-11-04', status: 'Occupied' },
    { date: '2024-11-05', status: 'Occupied' },
    { date: '2024-11-06', status: 'Occupied' },
    { date: '2024-11-11', status: 'Occupied' },
    { date: '2024-11-21', status: 'Occupied' },
    { date: '2024-12-25', status: 'Occupied' },
    { date: '2024-12-26', status: 'Occupied' },
    { date: '2024-12-27', status: 'Occupied' },
    { date: '2024-12-28', status: 'Occupied' },
    { date: '2024-12-29', status: 'Occupied' },
    { date: '2024-12-30', status: 'Occupied' },
  ];

  const moveOutDates = [
    { date: '2024-11-17', status: 'Option to move out' },
    { date: '2024-11-18', status: 'Option to move out' },
    { date: '2024-12-23', status: 'Option to move out' },
    { date: '2024-12-24', status: 'Option to move out' },
  ];

  const isOccupied = (date) => occupiedDates.some(d => d.date === date);
  const isMoveOut = (date) => moveOutDates.some(d => d.date === date);

  const isPastDate = (date) => dayjs(date).isBefore(dayjs(), 'day');
  const isInRange = (date) => {
    const { start, end } = selectedRange;
    return start && end && dayjs(date).isBetween(start, end, null, '[]');
  };

  const handleDateClick = (date) => {
    if (isPastDate(date)) return; // Prevent selection of past dates

    // If no start date is selected, set this as the start date and color it black
    if (!selectedRange.start) {
      setSelectedRange({ start: date, end: null });
      console.log(`Start date: ${date}`);
    } 
    // If start is selected and no end, set this as the end date and color the range blue
    else if (!selectedRange.end && dayjs(date).isAfter(selectedRange.start)) {
      setSelectedRange({ ...selectedRange, end: date });
      console.log(`Selected range: ${selectedRange.start} to ${date}`);
    } 
    // If the selected date is before the start date, reset the selection
    else if (dayjs(date).isBefore(selectedRange.start)) {
      setSelectedRange({ start: date, end: null });
    } 
    // If both start and end are already selected, reset the range
    else {
      setSelectedRange({ start: date, end: null });
    }
  };

  const nextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const prevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const getDaysInMonth = (month) => {
    const startDay = month.startOf('month').day();
    const daysInMonth = month.daysInMonth();

    // Create an array with the days of the month and some placeholders before the 1st day
    return Array.from({ length: startDay + daysInMonth }, (_, index) => {
      const day = index - startDay + 1;
      if (day <= 0) return null;
      return month.date(day).format('YYYY-MM-DD');
    });
  };

  const daysInMonth = getDaysInMonth(currentMonth);

  return (
    <div className="max-w-4xl p-4 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between mb-4">
        <button onClick={prevMonth} className="text-xl">
          &lt;
        </button>
        <h2 className="text-xl font-bold">{currentMonth.format('MMMM YYYY')}</h2>
        <button onClick={nextMonth} className="text-xl">
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-4 text-sm text-center">
        <div className="font-bold">MON</div>
        <div className="font-bold">TUE</div>
        <div className="font-bold">WED</div>
        <div className="font-bold">THU</div>
        <div className="font-bold">FRI</div>
        <div className="font-bold">SAT</div>
        <div className="font-bold">SUN</div>

        {daysInMonth.map((date, index) => {
          if (!date) return <div key={index} />; // Empty cell for previous month days

          let bgColor = 'bg-white'; // Free dates default color
          let cursor = 'cursor-pointer';
          let textColor = 'text-black';

          if (isPastDate(date)) {
            bgColor = 'bg-gray-300'; // Past dates disabled
            cursor = 'cursor-not-allowed';
            textColor = 'text-gray-500';
          } else if (isOccupied(date)) {
            bgColor = 'bg-red-300'; // Occupied
          } else if (isMoveOut(date)) {
            bgColor = 'bg-pink-300'; // Option to move out
          } else if (selectedRange.start === date) {
            bgColor = 'bg-blue-300'; // Start date selected (black)
            textColor = 'text-white';
          } else if (isInRange(date)) {
            bgColor = 'bg-blue-300'; // Dates in range (blue)
          } else {
            bgColor = 'bg-gray-100'; // Free dates
          }

          return (
            <div
              key={date}
              onClick={() => handleDateClick(date)}
              className={`${bgColor} ${cursor} ${textColor} p-2 rounded-lg`}
            >
              {dayjs(date).format('D')}
            </div>
          );
        })}
      </div>

      <div className="mt-4">
        <p><strong>Legend:</strong></p>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Free</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-pink-300 rounded"></div>
            <span>Option to move out</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-300 rounded"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-300 rounded"></div>
            <span>Selected range (blue)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-black rounded"></div>
            <span>Start date (black)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span>Past dates (disabled)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cal;
