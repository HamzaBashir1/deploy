"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from './component/Heading';
import Location from './component/Location';
import DateComponent from './component/Date'; // Renamed to avoid conflict with Date object
// import ReservationCard from '../component/ReservationCard';
import Navbar from './component/Navbar';
import Ratings from './component/Ratings';
import Persons from './component/Persons';
import Diet from './component/Diet';
import CommonSection from '../List-Page/component/CommonSection';
import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import Footer from "../components/Footer/Footer";
import { Base_URL } from '../config';
import Photo from './component/Photo';
import Information from './component/Information';
import Overlook from './component/Overlook';
import { PiLessThanBold } from 'react-icons/pi';
import Email from './../components/Email';
import Card from './component/Card';
import Overview from './component/Overview';

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
                const response = await fetch(`${Base_URL}/accommodation/${params.details}`);
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
                <div className=''>
                <div className='p-4'>
                    <Heading data={accommodationData} />
                 
                </div>
                </div>
                   {/* Tab Navigation */}
                    <div className="sticky-tabs flex space-x-4 overflow-x-auto bg-[#F3F4F6] border-b border-gray-300 lg:p-4 md:p-8 sticky top-0 z-10">
                    <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                        <span className="mr-1"><PiLessThanBold /></span> Back
                    </button>
                    <button onClick={() => scrollToSection('overview')} className="text-sm py-2 px-4">Overview</button>
                    <button onClick={() => scrollToSection('date')} className="text-sm py-2 px-4">Occupancy</button>
                    <button onClick={() => scrollToSection('information')} className="text-sm py-2 px-4">Information</button>
                    <button onClick={() => scrollToSection('location')} className="text-sm py-2 px-4">Location</button>
                    <button onClick={() => scrollToSection('Overlook')} className="text-sm py-2 px-4">Don't Overlook</button>
                    <button onClick={() => scrollToSection('diet')} className="text-sm py-2 px-4">Diet</button>
                    <button onClick={() => scrollToSection('ratings')} className="text-sm py-2 px-4">Ratings</button>
                </div>
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
