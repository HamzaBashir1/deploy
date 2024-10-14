"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from '../component/Heading';
import Location from '../component/Location';
import DateComponent from '../component/Date'; // Renamed to avoid conflict with Date object
import ReservationCard from '../component/ReservationCard';
import Navbar from '../component/Navbar';
import Ratings from '../component/Ratings';
import Persons from '../component/Persons';
import Diet from '../component/Diet';
import CommonSection from '../../List-Page/component/CommonSection';
import Loading from "../../components/Loader/Loading.js";
import Error from "../../components/Error/Error.js";
import Footer from "../../components/Footer/Footer.js";
import { Base_URL } from '../../config';
import Photo from '../component/Photo';
import Information from '../component/Information';
import Overlook from '../component/Overlook';
import { PiLessThanBold } from 'react-icons/pi';
import Email from '../../components/Email';
import Card from '../component/Card';
import Overview from '../component/Overview';
import { BiCopy, BiHeart, BiSolidCopy, BiSolidHeart } from 'react-icons/bi';

const Page = ({ params }) => {
    const [accommodationData, setAccommodationData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     // State to manage selected date range
     const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

    const router = useRouter();  // Initialize router

    useEffect(() => {
        const fetchAccommodationData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${params.details}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
                setAccommodationData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAccommodationData();
    }, [params.details, router]);

    // Logging the fetched data for debugging
    console.log("Accommodation Data:", accommodationData);

    const handleDateChange = (newRange) => {
        setSelectedRange(newRange); // Update the selected range when dates are changed
    };

    if (loading) {
        return <Loading />; // Render Loading component
    }

    if (error) {
        return <Error message={error} />; // Render Error component with message prop
    }

    // Scroll to specific section when tab is clicked
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className='bg-[#F3F4F6]'>
            <Navbar />
            <div className=' lg:px-10 xl:px-14 2xl:px-18 max-w-[1820px] mx-auto'>
                {/* Heading and Tab Navigation */}
                <div className='relative'>
                <div className='p-4'>
                    <Heading data={accommodationData} />
                 
                </div>
                </div>
                   {/* Tab Navigation */}
                   {showSharjeelOnly ? (
                    <>
                    <div className="sticky-tabs flex justify-between items-center overflow-x-auto bg-[#F3F4F6] border-b border-gray-300 p-4 sticky top-0 z-10">
                    <div className="flex space-x-4">
                    <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                    <span className="mr-1"><PiLessThanBold /></span> Back
                    </button>
                    <button onClick={() => scrollToSection('overview')} className="px-4 py-2 text-sm">Overview</button>
                    <button onClick={() => scrollToSection('date')} className="px-4 py-2 text-sm">Occupancy</button>
                    <button onClick={() => scrollToSection('information')} className="px-4 py-2 text-sm">Information</button>
                    <button onClick={() => scrollToSection('location')} className="px-4 py-2 text-sm">Location</button>
                    <button onClick={() => scrollToSection('Overlook')} className="px-4 py-2 text-sm">Don't Overlook</button>
                    <button onClick={() => scrollToSection('diet')} className="px-4 py-2 text-sm">Diet</button>
                    <button onClick={() => scrollToSection('ratings')} className="px-4 py-2 text-sm">Ratings</button>
                    {/* <button onClick={() => scrollToSection('weather')} className="px-4 py-2 text-sm">Weather</button> */}
                </div>

                {/* Right-side icons */}
                <div className="flex items-center space-x-4 ">
                    <img src='/map.png' className='hidden sm:block' />
                    {favorite.includes(id) ? (
                    <BiSolidHeart
                        className='text-xl sm:text-2xl text-[#DC2626] cursor-pointer hover:text-red-600'
                    />
                    ) : (
                    <BiHeart
                        className='text-xl sm:text-2xl text-[#4FBE9F] cursor-pointer hover:text-red-500'
                    />
                    )}
                    {/* Copy link functionality */}
                    {isCopied ? (
                    <BiSolidCopy
                        className="text-xl text-blue-500 cursor-pointer md:text-2xl"
                    />
                    ) : (
                    <BiCopy
                        className="text-xl cursor-pointer md:text-2xl hover:text-blue-500"
                    />
                    )}
                </div>
            </div>
                    </>
                ) : (
                    <>
                      <div className="sticky-tabs flex justify-between items-center overflow-x-auto bg-[#F3F4F6] border-b border-gray-300 p-4 sticky top-0 z-10">
                        <div className="flex space-x-4">
                        <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                        <span className="mr-1"><PiLessThanBold /></span> Back
                        </button>
                        <button onClick={() => scrollToSection('overview')} className="px-4 py-2 text-sm">Overview</button>
                        <button onClick={() => scrollToSection('date')} className="px-4 py-2 text-sm">Occupancy</button>
                        <button onClick={() => scrollToSection('information')} className="px-4 py-2 text-sm">Information</button>
                        <button onClick={() => scrollToSection('location')} className="px-4 py-2 text-sm">Location</button>
                        <button onClick={() => scrollToSection('Overlook')} className="px-4 py-2 text-sm">Don't Overlook</button>
                        <button onClick={() => scrollToSection('diet')} className="px-4 py-2 text-sm">Diet</button>
                        <button onClick={() => scrollToSection('ratings')} className="px-4 py-2 text-sm">Ratings</button>
                        {/* <button onClick={() => scrollToSection('weather')} className="px-4 py-2 text-sm">Weather</button> */}
                    </div>

                    {/* Right-side icons */}
                   <div className="flex items-center space-x-4">
                        {/* <img src="/map.png" className="hidden sm:block md:hidden lg:hidden" alt="Map" /> */}

                        {/* Favorite Icon */}
                        {favorite.includes(id) ? (
                            <BiSolidHeart
                            className="text-xl sm:text-2xl text-[#DC2626] cursor-pointer hover:text-red-600 sm:inline-block md:hidden lg:hidden"
                            />
                        ) : (
                            <BiHeart
                            className="text-xl sm:text-2xl text-[#4FBE9F] cursor-pointer hover:text-red-500 sm:inline-block md:hidden lg:hidden"
                            />
                        )}

                        {/* Copy Link Icon */}
                        {isCopied ? (
                            <BiSolidCopy
                            className="text-xl text-blue-500 cursor-pointer md:text-2xl sm:inline-block md:hidden lg:hidden"
                            />
                        ) : (
                            <BiCopy
                            className="text-xl cursor-pointer md:text-2xl hover:text-blue-500 sm:inline-block md:hidden lg:hidden"
                            />
                        )}
                        </div>

                </div>
                        </>
                )}
                <Photo data={accommodationData} />

                <div className='flex '>
                    {/* Main content section */}     
                    <div className='w-[100%] md:w-[70%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] 3xl:w-[70%]'>
                        {/* Render all sections */}
                        <div>
                            <div id="overview">
                                <Overview data={accommodationData} />
                               
                                {/* Card visible only on mobile */}
                                <div className="block md:hidden">
                                    <Card data={accommodationData}  selectedRange={selectedRange}/>
                                </div>
                            </div>
                            <div id="date">
                                <DateComponent data={accommodationData} onDateChange={handleDateChange} />
                            </div>
                            <div id='information'>
                                <Information data={accommodationData} />
                            </div>
                            <div id="location">
                                <Location data={accommodationData} />
                            </div>
                            <div id='Overlook'>
                                <Overlook data={accommodationData} />
                            </div>
                            <div id="persons">
                                <Persons data={accommodationData} />
                            </div>
                            <div id="diet">
                                <Diet data={accommodationData} />
                            </div>
                            <div id="ratings">
                                <Ratings userId={accommodationData?.userId} data={accommodationData} />
                            </div>
                        </div>
                    </div>

                    {/* Sticky Card Component Section */}
                    <div className='hidden md:block w-[500px] h-[630px] sticky top-0 overflow-y-auto'>
                        
                           
                        <Card data={accommodationData}  selectedRange={selectedRange} />
                    
                    </div>

                    
                </div>
                <CommonSection />
            </div>
            
            <Email />
            <Footer />
        </div>
    );
};

export default Page;
