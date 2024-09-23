"use client"
import React, { useState, useEffect } from 'react';
import { FaHome, FaBars, FaEnvelope, FaCalendarAlt, FaChartLine, FaList, FaHourglassHalf, FaRegStar } from 'react-icons/fa';
import { BsPersonCircle } from 'react-icons/bs';
import { MdOutlineEmail, MdOutlineShowChart, MdEuro, MdOutlinePercent, MdOutlineSubscriptions } from 'react-icons/md';
import { LuCalendarDays } from 'react-icons/lu';
import { RiMenu2Fill, RiHotelLine } from 'react-icons/ri';
import { WiTime10 } from 'react-icons/wi';
import { GoSync } from 'react-icons/go';
import { HiOutlineDotsHorizontal, HiMenuAlt2 } from 'react-icons/hi';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import Header from "../../components/Header/Header";
import Card from "./Card";
import Calender from './Calender';
import News from './News';
import Rating from './Rating';
import Statistics from './Statistics';
import Reservation from './Reservation';
import { AuthContext } from "../../context/AuthContext"; 

const Overview = () => {
  
  const [activePage, setActivePage] = useState(''); // Control the active page state
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch the correct current date when the component mounts
  useEffect(() => {
    const now = new Date(); // Fetch the current date immediately
    setCurrentDate(now);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Get day and month for display
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className="flex-1 p-4 sm:ml-64 bg-[#EEF1F5]">
      {/* Mobile menu button */}
      {/* Header */}
      <div className='hidden lg:inline'>
        <Header />
      </div>
      <div className="flex flex-row justify-between w-full lg:hidden">
        <FaHome className="text-2xl text-gray-700 hover:text-black" />
        <FaList className="text-2xl text-gray-700 hover:text-black" />
        <FaEnvelope className="text-2xl text-gray-700 hover:text-black" />
        <FaCalendarAlt className="text-2xl text-gray-700 hover:text-black" />
        <FaChartLine className="text-2xl text-gray-700 hover:text-black" />
        <FaBars className="text-2xl text-gray-700 hover:text-black" />
      </div>

      {/* Dynamic Page Rendering */}
      {activePage === '' && <Overview />}
      {activePage === 'reservation' && <Reservation />}
      {activePage === 'News' && <News />}
      {activePage === 'Calender' && <Calender />}
      {activePage === 'Rating' && <Rating />}
      {activePage === 'Statistics' && <Statistics />}

      {/* Main Content */}
      <div>
        <div className='flex justify-between mx-5 bg-[#EEF1F5] py-5 flex-row lg:flex-row items-center'>
          {/* Dynamic Date Display */}
          <div className='flex flex-row items-center gap-2 sm:gap-5'>
            <h1 className='text-[#292A34] text-6xl sm:text-8xl'>{day}</h1>
            <span className='text-[#292A34] text-lg sm:text-2xl'>{month}</span>
          </div>
          <div className='mt-4 sm:mt-0'>
            <BsPersonCircle className="text-[#292A34] text-xl" />
            
          </div>
        </div>

        {/* Subscription Info */}
        <div className='flex justify-between bg-[#FFFDCC] py-5 px-5 sm:mx-5 mb-5 flex-col sm:flex-row items-center'>
          <div className='flex flex-row items-center gap-5'>
            <FaHourglassHalf size={45} />
            <div className='flex flex-col text-center sm:text-left'>
              <h1 className='text-[#292A34] font-semibold text-sm sm:text-base'>Subscription ends Aug 27, 2025</h1>
              <p className='text-xs sm:text-sm'>355 days left until expiration</p>
            </div>
          </div>
          <button className='bg-[#292A34] py-2 sm:py-3 px-4 sm:px-6 rounded-md text-white mt-4 sm:mt-0'>
            Extend Subscription
          </button>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-5 bg-[#EEF1F5]'>
          {[
            { title: "Reservation requests", Icon: RiMenu2Fill },
            { title: "News", Icon: MdOutlineEmail },
            { title: "Occupancy calendar", Icon: LuCalendarDays },
            { title: "Statistics", Icon: MdOutlineShowChart },
            { title: "Rating", Icon: FaRegStar },
            { title: "Prices", Icon: MdEuro },
            { title: "Promotions and discounts", Icon: MdOutlinePercent },
            { title: "Last minute", Icon: WiTime10 },
            { title: "Accommodation", Icon: RiHotelLine },
            { title: "Synchronization", Icon: GoSync },
            { title: "Subscription", Icon: MdOutlineSubscriptions },
            { title: "Additional services", Icon: HiOutlineDotsHorizontal },
            { title: "Invoices", Icon: LiaFileInvoiceSolid },
            { title: "Billing data", Icon: HiMenuAlt2 },
          ].map(({ title, Icon }, index) => (
            <Card 
              key={index}
              title={title}
              Icon={Icon}
              iconSize="4xl"
              customClasses="bg-gray-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Overview;
