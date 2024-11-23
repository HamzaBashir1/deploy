"use client";
import React, { useState, useEffect, useContext } from "react";
import { CiSearch } from 'react-icons/ci';
import { BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import LineChart from "./LineChart";
import DateRangePicker from "./DateRangePicker";
import { FaInfoCircle, FaRegStar } from 'react-icons/fa';
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { Base_URL } from "../../config";
import { format, eachDayOfInterval, startOfDay, parseISO } from "date-fns"; 
import ClickChart from "./ClickChart";
import InterestChart from "./InterestChart";
import { FormContext } from "../../FormContext";
import { GoSignOut, GoSync } from "react-icons/go";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { WiTime10 } from "react-icons/wi";
import { LuCalendarDays } from "react-icons/lu";

const Statistics = ({ onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext
  const [activePage, setActivePage] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;
  // Handle the menu click event
  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };

   // Fetch user accommodations
   useEffect(() => {
    const fetchUserAccommodations = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          setAccommodations(data);

          // Prepare data for LineChart: Calculate views, clicks, and interest per day
          const dailyViews = {};
          const dailyClicks = {};
          const dailyInterest = {};

          // Group views, clicks, and interest by date
          data.forEach(acc => {
            if (acc.date && !isNaN(Date.parse(acc.date))) {
              const date = parseISO(acc.date);
              const views = acc.views || 0;
              const clicks = acc.clicks || 0;
              const interest = acc.customerInterest || 0;

              const dayKey = startOfDay(date).toISOString().split('T')[0]; // Get date as string in 'YYYY-MM-DD' format

              // Initialize if the key doesn't exist
              if (!dailyViews[dayKey]) dailyViews[dayKey] = 0;
              if (!dailyClicks[dayKey]) dailyClicks[dayKey] = 0;
              if (!dailyInterest[dayKey]) dailyInterest[dayKey] = 0;

              dailyViews[dayKey] += views;
              dailyClicks[dayKey] += clicks;
              dailyInterest[dayKey] += interest;
            }
          });

          // Generate list of days within the selected date range
          const days = eachDayOfInterval({
            start: startOfDay(startDate),
            end: startOfDay(endDate),
          });

          const labels = [];
          const viewDataPoints = [];
          const clickDataPoints = [];
          const interestDataPoints = [];

          // Populate labels, viewDataPoints, clickDataPoints, and interestDataPoints
          days.forEach(day => {
            const dayKey = startOfDay(day).toISOString().split('T')[0];
            labels.push(format(day, "dd.MM.yyyy")); 
            viewDataPoints.push(dailyViews[dayKey] || 0); 
            clickDataPoints.push(dailyClicks[dayKey] || 0); 
            interestDataPoints.push(dailyInterest[dayKey] || 0); 
          });

          // Prepare chart data
          setChartData({ labels, viewData: viewDataPoints, clickData: clickDataPoints, interestData: interestDataPoints });
        } else {
          console.error("Fetched data is not an array:", data);
          setAccommodations([]);
        }
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      setLoading(true);
      fetchUserAccommodations();
    }
  }, [userId, startDate, endDate]);
  

  // Calculate statistics
  const viewCount = accommodations.reduce((sum, acc) => sum + (acc.views || 0), 0);
  const detailViewCount = accommodations.reduce((sum, acc) => sum + (acc.clicks || 0), 0);
  const customerInterestCount = accommodations.reduce((sum, acc) => sum + (acc.customerInterest || 0), 0);

  // Find the earliest registration date
  const registrationDates = accommodations.map(acc => {
    const date = new Date(acc.createdAt);
    // Check if the date is valid
    return isNaN(date) ? null : date; // Return null if date is invalid
  });

  const validDates = registrationDates.filter(date => date !== null);
  const earliestRegistrationDate = validDates.length > 0 ? new Date(Math.min(...validDates)) : null;

  return (
    <div className="py-4">
      {/* Navbar */}
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between">
          {/* Left Section: Title and Status */}
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Statistics</h1>
          </div>

          {/* Center Section: Add Accommodation and User (Clickable for Menu) */}
          <div
            className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center"
            onClick={toggleMenu}
          >
            <CiSearch className="text-xl text-gray-500" />
            <button className="items-center hidden px-4 py-2 text-black bg-white border rounded-lg md:flex hover:bg-gray-100"  onClick={() => updateSelectedpage("AddAccommodation")}>
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2"   onClick={toggleMenu}>
              {user?.photo ? (
                <img 
                  src={user?.photo} 
                  alt="User Profile" 
                  className="object-cover w-8 h-8 rounded-full"
                />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex">
          {/* Date Range Picker */}
        </div>
        <div>
          <DateRangePicker 
            startDate={startDate} 
            endDate={endDate} 
            onDateChange={handleDateChange} 
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 mx-10 lg:flex-row">
        {/* First Column */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col py-3">
            <h1 className="font-bold">Last 30 days</h1>
            {startDate && endDate && (
              <p className="text-sm text-gray-600 md:text-base">
                {`Selected range: ${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}`}
              </p>
            )}
            <hr />
          </div>
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">View Accommodation</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : viewCount}</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">Opening the Accommodation detail</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : detailViewCount}</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">Customer interest</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : customerInterestCount}</h1>
          </div>
        </div>

        {/* Second Column */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col py-3">
            <h1 className="font-bold">Total since registration</h1>
            <p className="text-xs">
              Date of registration: {earliestRegistrationDate ? format(earliestRegistrationDate, "dd MMM yyyy") : 'N/A'}
            </p>
            <hr className="my-2" />
          </div>
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">View Accommodation</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : viewCount}</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">Opening the Accommodation detail</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : detailViewCount}</h1>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between py-3">
            <h1 className="text-blue-500">Customer interest</h1>
            <h1 className="font-bold">{loading ? 'Loading...' : customerInterestCount}</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 mx-10 mt-4 border md:flex-row">
        <FaInfoCircle className="text-lg" />
        <p className="text-xs md:text-sm lg:text-base">
          Statistics are measured by Google Analytics and include only users with enabled cookies. Actual traffic may be 5 to 10% higher.
        </p>
      </div>

      <div className="flex flex-col gap-20 mx-10 my-5">
      {chartData.labels.length > 0 && (
          <LineChart 
            labels={chartData.labels} 
            data={chartData.viewData} 
            title="Daily Views Ratio"
          />
        )}
        {chartData.labels.length > 0 && (
        <ClickChart 
            labels={chartData.labels} 
            clickData={chartData.clickData} 
            title="Clicks on Accommodation"
        />
        )}
        {chartData.labels.length > 0 && (
        <InterestChart 
            labels={chartData.labels} 
            interestData={chartData.interestData} 
            title="Customer Interest"
        />
        )}

    
      </div>

       {/* Drawer Menu */}
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
            <li className='flex flex-row gap-2'>
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
              <div className='flex flex-col'>
                <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
                <p className='text-xs' onClick={() => updateSelectedpage("EditProfile")} >Edit Profile</p>
              </div>
            </li>
            {/* <li className='flex flex-col gap-3'>
              <button className='bg-[#292A34] rounded-lg text-white py-4 px-24'>Extend Subscription</button>
              <button className='bg-[#E7EAEE] rounded-lg text-[#292A34] py-4 px-24'>Order Additional services</button>
            </li> */}

            <hr className='my-5' />

            {/* Menu Items */}
            {/* Add your existing menu items here */}
             {/* Menu items */}
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
                  className='flex items-center gap-4 p-2 rounded-lg cursor-pointer hover:bg-gray-100'
                  onClick={() => handleMenuClick(text)}  // Handle menu click and update selectedpage
                >
                  {icon}
                  <span className="text-sm font-medium">{text}</span>
                </p>
              </li>
            ))}
            <li>
              <button
                onClick={() => {}}
                className='flex items-center w-full gap-4 p-2 text-left text-gray-800 rounded-lg hover:bg-gray-100'
              >
                <GoSignOut />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-800 bg-opacity-50"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default Statistics;
