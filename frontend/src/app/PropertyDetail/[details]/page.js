"use client";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter for redirect
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
import { AuthContext } from '../../context/AuthContext';
import { Base_URL } from '../../config';
import Photo from '../component/Photo';
import Information from '../component/Information';
import Overlook from '../component/Overlook';
import WeatherForecast from '../component/WeatherForecast';
import { PiLessThanBold } from 'react-icons/pi';
import Email from '../component/EMail';


const Page = ({ params }) => {
    const [accommodationData, setAccommodationData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);  // Access user from context
    const router = useRouter();  // Initialize router

    useEffect(() => {
        const storedUser = localStorage.getItem('user'); // Adjust the key based on your implementation
        console.log("user", storedUser);
        if (!storedUser) {
            // Redirect to login page if user is not logged in
            router.push('/login');
        }

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
    }, [params.details, user, router]);

    // Logging the fetched data for debugging
    console.log("Accommodation Data:", accommodationData);

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
        <div>
            <Navbar />
            <div className='bg-[#f8f8f8]'>
                <Heading data={accommodationData} />
                {/* Tab Navigation */}
                <div className="flex space-x-4 overflow-x-auto bg-[#f8f8f8] p-4 border-b border-gray-300 mx-4 sm:mx-6 md:mx-10 lg:mx-14">
                    <button onClick={() => router.back()} className="flex items-center text-sm py-2 px-4 text-[#58CAAA]">
                        <span className="mr-1"><PiLessThanBold /></span> Back
                    </button>
                    <button onClick={() => scrollToSection('overview')} className="text-sm py-2 px-4">Overview</button>
                    <button onClick={() => scrollToSection('date')} className="text-sm py-2 px-4">Occupancy</button>
                    <button onClick={() => scrollToSection('information')} className="text-sm py-2 px-4">Information</button>
                    <button onClick={() => scrollToSection('location')} className="text-sm py-2 px-4">Location</button>
                    <button onClick={() => scrollToSection('Overlook')} className="text-sm py-2 px-4">Don't Overlook</button>
                    <button onClick={() => scrollToSection('diet')} className="text-sm py-2 px-4">Diet</button>
                    <button onClick={() => scrollToSection('ratings')} className="text-sm py-2 px-4">Ratings</button>
                    <button onClick={() => scrollToSection('weather')} className="text-sm py-2 px-4">Weather</button>
                </div>


                {/* Render all sections */}
                <div className="">
                    <div id="overview">
                        <Photo data={accommodationData} />
                        <ReservationCard data={accommodationData} />
                    </div>
                    <div id="date">
                        <DateComponent data={accommodationData} />
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
                    <div id="weather">
                        <WeatherForecast data={accommodationData} />
                    </div>
                </div>
            </div>
            <CommonSection />
            <Email/>
            <Footer />
        </div>
    );
};

export default Page;
