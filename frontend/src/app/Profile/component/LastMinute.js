import React, { useContext } from "react";
import { BiFilter, BiPlus } from 'react-icons/bi';
import { BsArrowDown, BsPersonCircle } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const LastMinute = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onDateChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };

    const { user } = useContext(AuthContext);

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="p-4 md:p-8 lg:p-10 xl:p-12 min-h-screen">
            <div className="flex flex-col gap-4 md:flex-row md:justify-between mb-6">
                {/* Left Section: Title and Status */}
                <div className="flex flex-col">
                    <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">News</h1>
                    <p className="text-[#292A34B2] text-sm md:text-xs font-medium">
                        Apartment Košice - no messages
                    </p>
                </div>

                {/* Center Section: Add Accommodation Button */}
                <div className="hidden md:flex md:flex-row md:items-center gap-4 cursor-pointer" onClick={toggleMenu}>
                    <CiSearch className="text-xl text-gray-500" />
                    <button className="flex items-center bg-white text-black border border-gray-300 px-4 py-2 rounded-lg space-x-2 hover:bg-gray-100">
                        <BiPlus className="text-lg" />
                        <span>Add Accommodation</span>
                    </button>
                    <div className="flex items-center gap-2">
                        {user?.photo ? (
                            <img 
                                src={user?.photo} 
                                alt="User Profile" 
                                className="w-8 h-8 rounded-full object-cover"
                            />
                        ) : (
                            <BsPersonCircle className="text-[#292A34] text-xl" />
                        )}
                        <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-5xl gap-10">
                <div className="p-5 bg-white mb-10 flex flex-row items-center gap-5">
                    <h1 className="font-semibold text-lg">1/2</h1>
                    <span>Last minute</span> 
                    <AiOutlineQuestionCircle className="text-gray-500" />
                </div>

                <textarea
                    rows={4}
                    className="w-full mb-10 p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
                    placeholder="Enter details..."
                />

                <div className="p-5 bg-white mb-10 flex flex-row items-center gap-5">
                    <h1 className="font-semibold text-lg ">2/2  </h1>
                    <span>When the offer will be displayed on the website</span>
                    <AiOutlineQuestionCircle className="text-gray-500" />
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
        </div>
    )
}

export default LastMinute;
