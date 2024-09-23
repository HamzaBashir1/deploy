"use client"
import { useState, useEffect } from 'react';

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Update date every 24 hours (once a day)

    return () => clearInterval(interval);
  }, []);

  const day = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });

  return (
    <div className='flex flex-row items-center gap-2 sm:gap-5'>
      <h1 className='text-[#292A34] text-6xl sm:text-8xl'>{day}</h1>
      <span className='text-[#292A34] text-xl sm:text-2xl'>{month}</span>
    </div>
  );
};

export default DateComponent;
