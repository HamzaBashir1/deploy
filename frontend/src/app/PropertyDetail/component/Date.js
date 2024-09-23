import React from 'react';
import { BiBox } from 'react-icons/bi';

const DateComponent = () => {
  const daysOfWeek = ['MON', 'TUES', 'ST', 'PI', 'SAT', 'NO'];

  const augustDates = [
    { date: 19, status: 'occupied' },
    { date: 20, status: 'occupied' },
    { date: 21, status: 'occupied' },
    { date: 22, status: 'occupied' },
    { date: 23, status: 'occupied' },
    { date: 24, status: 'occupied' },
    { date: 25, status: 'occupied' },
    { date: 30, status: 'checkout' },
    { date: 31, status: 'checkout' },
  ];

  const septemberDates = [
    { date: 1, status: 'occupied' },
    { date: 7, status: 'occupied' },
    { date: 8, status: 'occupied' },
    { date: 14, status: 'occupied' },
    { date: 15, status: 'occupied' },
    { date: 21, status: 'occupied' },
    { date: 22, status: 'occupied' },
    { date: 28, status: 'occupied' },
    { date: 29, status: 'occupied' },
  ];

  const renderDates = (dates, totalDays) => {
    return Array.from({ length: totalDays }).map((_, index) => {
      const date = index + 1;
      const dateInfo = dates.find(d => d.date === date);
      const status = dateInfo ? dateInfo.status : 'free';

      const statusClasses = {
        free: '',
        occupied: 'bg-green-200',
        checkout: 'bg-green-300 border border-gray-800',
      };

      return (
        <div
          key={date}
          className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center m-1 rounded ${statusClasses[status]}`}
        >
          {date}
        </div>
      );
    });
  };

  return (
    <div className="p-4 md:p-6 rounded-lg bg-white lg:mr-[440px] lg:ml-[18px] lg:-mt-32">
      <div className="flex flex-col md:flex-row justify-around">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h3 className="text-center text-base md:text-lg mb-4">August 2024</h3>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center text-xs md:text-base font-bold">
                {day}
              </div>
            ))}
            {renderDates(augustDates, 31)}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-center text-base md:text-lg mb-4">September 2024</h3>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="text-center text-xs md:text-base font-bold">
                {day}
              </div>
            ))}
            {renderDates(septemberDates, 30)}
          </div>
        </div>
      </div>

      <hr className="my-8 md:my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className=" md:justify-start">
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
        </div>
      </div>
    </div>
  );
};

export default DateComponent;
