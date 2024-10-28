import React, { useContext } from "react";
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdClose, MdOutlineEmail, MdOutlineShowChart, MdOutlineSubscriptions } from "react-icons/md";
import { RiHotelLine, RiMenu2Fill } from "react-icons/ri";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { WiTime10 } from "react-icons/wi";
import { GoSignOut, GoSync } from "react-icons/go";
import { FormContext } from "@/app/FormContext";

import { toast } from "react-toastify";


//



const ContactCard = ({ isOpen, onClose }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-[300px] shadow-lg relative">
                <button className="absolute text-2xl text-gray-600 top-2 right-2" onClick={onClose}>
                    <MdClose />
                </button>
                <h2 className="mb-2 text-lg font-bold">Contact us</h2>
                <p className="mb-4 text-sm text-gray-500">Monday - Friday from 9:00 a.m. to 5:00 p.m</p>
                <button className="flex items-center justify-center w-full py-2 mb-3 text-white bg-black rounded-lg">
                    📧 info@fiemso.com
                </button>
                <button className="flex items-center justify-center w-full py-2 text-gray-800 bg-gray-100 rounded-lg">
                    📞 +421 2/222 002 12
                </button>
            </div>
        </div>
    );
};




//

const LastMinute = ({ onMenuClick }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [activePage, setActivePage] = useState('');
    const [isInfoSidebarOpen, setIsInfoSidebarOpen] = useState(false); // Sidebar state
    const [isSidebarOpen, setfoSidebarOpen] = useState(false);

    const onDateChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };
  // Handle the menu click event
  const handleMenuClick = (page) => {
    console.log("overview",page)
    setActivePage(page);
    onMenuClick(page); // Pass the page value to parent component
  };

    const { user } = useContext(AuthContext);

   
  const { selectedpage, updateSelectedpage } = useContext(FormContext);  // Use the selectedpage and updateSelectedpage from FormContext



  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };
    const [isContactOpen, setIsContactOpen] = useState(false); // Contact card state



    const toggleInfoSidebar = () => {
        setIsInfoSidebarOpen(!isInfoSidebarOpen);
    };

    const toggleSidebar = () => {
      setfoSidebarOpen(!isSidebarOpen);
  }; 
  const handleSave = () => {
    // Display toaster message on save
    toast.success('Saved successfully!');
};
const toggleContactCard = () => setIsContactOpen(!isContactOpen); // Toggle contact card


    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between">
                {/* Left Section: Title and Status */}
                <div className="flex flex-col">
                    <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">News</h1>
                    <p className="text-[#292A34B2] text-sm md:text-xs font-medium">
                        {/* Apartment Košice - no messages */}
                    </p>
                </div>

                {/* Center Section: Add Accommodation Button */}
                <div className="hidden gap-4 cursor-pointer md:flex md:flex-row md:items-center" onClick={toggleMenu}>
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

            <div className="max-w-5xl gap-10 mx-auto">
                <div className="flex flex-row items-center gap-5 p-5 mb-10 bg-white">
                    <h1 className="text-lg font-semibold">1/2</h1>
                    <span>Last minute</span> 
                    <AiOutlineQuestionCircle className="text-gray-500" onClick={toggleInfoSidebar}/>
                </div>

                <textarea
                    rows={4}
                    className="w-full p-3 mb-10 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter details..."
                />

                <div className="flex flex-row items-center gap-5 p-5 mb-10 bg-white">
                    <h1 className="text-lg font-semibold ">2/2  </h1>
                    <span>When the offer will be displayed on the website</span>
                    <AiOutlineQuestionCircle className="text-gray-500" onClick={toggleSidebar} />
                </div>

                <div className="flex flex-col gap-5 md:flex-row lg:justify-between lg:items-center">
                    <label className="block text-sm font-medium text-gray-700">
                        The period from — to <span className="text-red-500">*</span>
                    </label>
                    <div className="relative w-full md:w-auto">
                        <DatePicker
                            selected={startDate}
                            onChange={onDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            dateFormat="dd.MM.yyyy"
                            placeholderText="Select a date range"
                            className="w-full md:w-[420px] p-2 mt-1 border border-gray-300 rounded-md outline-none text-sm md:text-base text-gray-700"
                        />
                    </div>
                </div>
            </div>
<div className="flex justify-center p-4">
                <button className="px-4 py-2 font-semibold text-white transition duration-200 ease-in-out transform bg-pink-500 rounded-lg shadow-lg hover:bg-pink-600 hover:scale-105 sm:px-6 md:px-8 lg:px-10" onClick={handleSave} >
                    Save
                </button>
            </div>
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
                <p className='text-xs'>Edit Profile</p>
              </div>
            </li>
            <li className='flex flex-col gap-3'>
              <button className='bg-[#292A34] rounded-lg text-white py-4 px-24'>Extend Subscription</button>
              <button className='bg-[#E7EAEE] rounded-lg text-[#292A34] py-4 px-24'>Order Additional services</button>
            </li>

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
      
            {/* Info Sidebar */}
    <div 
    className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transform ${isInfoSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out `}
     // Scrollbar style for Firefox
>
    <div className="p-4">
        <button className="text-2xl text-gray-600" onClick={toggleInfoSidebar}>
            <MdClose />
        </button>

        <div className="mt-6">
            <h2 className="text-lg font-bold text-[#292A34]">Last Minute</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Last Minute is the ideal way to ensure that an important date is filled or to highlight a period where you need to increase sales. 
            </p>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
                At the same time, you can highlight other benefits here to make this offer even more attractive and capture attention. 
                Try to give information briefly and clearly, and avoid overly long texts.
            </p>

            <div className="mt-6">
                <h3 className="text-md font-semibold text-[#292A34]">Examples of Correct Text:</h3>
                <ul className="mt-2 space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>
                        From <strong>17.10 - 24.10</strong>, we offer a special price for <strong>7 nights</strong>, totaling <strong>599 Euros</strong>, including sauna and jacuzzi.
                    </li>
                    <li>
                        In <strong>October</strong>, from <strong>Monday to Thursday</strong>, the sauna and whirlpool are free of charge.
                    </li>
                </ul>
            </div>

            

            <p className="mt-6 text-sm text-gray-600">
                These examples are illustrative only, and you can adapt them to your content.
            </p>
        </div>
    </div>

    {/* Sticky Footer */}
    <div className="flex justify-between p-4 bg-white border-t border-gray-300 ">
    <div className="text-xs text-gray-500">
        Do you need advice? <br />
        <span className="font-medium">Mon - Fri from 9:00 a.m. to 5:00 p.m</span>
    </div>
    <button
        className="px-3 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
        onClick={toggleContactCard}
    >
        Contact
    </button>
</div>
</div>

 {/* Contact Card */}
            <ContactCard isOpen={isContactOpen} onClose={toggleContactCard} />
            {/* Info Sidebar */}
            <div
            className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-lg z-50 transform ${
                isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out flex flex-col`} // Add flexbox layout
        >
            {/* Sidebar Content */}
            <div className="flex-1 p-4 overflow-y-auto">
                <button className="text-2xl text-gray-600" onClick={toggleSidebar}>
                    <MdClose />
                </button>
        
                <div className="mt-6">
                    <h2 className="text-lg font-bold text-[#292A34]">Period</h2>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Mark the period in your calendar during which the offer will be displayed on the website
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Make sure that this period is not too long, as this could lead to a loss of appeal and customer interest.
                </p>
                </div>
            </div>
        
            {/* Sticky Footer */}
            <div className="flex justify-between p-4 bg-white border-t border-gray-300 ">
                <div className="text-xs text-gray-500">
                    Do you need advice? <br />
                    <span className="font-medium">Mon - Fri from 9:00 a.m. to 5:00 p.m</span>
                </div>
                <button
                    className="px-3 py-2 mt-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={toggleContactCard}
                >
                    Contact
                </button>
            </div>
        </div>
        </div>
    )
}

export default LastMinute;
