"use client";
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';  // Import useRouter for redirect
import React from 'react';
import Heading from '../component/Heading';
import Location from '../component/Location';
import Date from '../component/Date';
import Photo from '../component/Photo';
import Information from '../component/Information';
import ReservationCard from '../component/ReservationCard';
import Navbar from '../component/Navbar';
import Ratings from '../component/Ratings';
import Overlook from '../component/Overlook';
import EMail from '../component/EMail';
import Diet from '../component/Diet';
import Persons from '../component/Persons';
import CommonSection from '../../List-Page/component/CommonSection';
import WeatherForecast from '../component/WeatherForecast';
import Accommodation from '../component/Accommodation';
import Loading from "../../components/Loader/Loading.js";
import Error from "../../components/Error/Error.js";
import Footer from "../../components/Footer/Footer.js";
import { AuthContext } from '../../context/AuthContext';
import { Base_URL } from '../../config';

const Page = ({ params }) => {
    const [accommodationData, setAccommodationData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);  // Access user from context
    const router = useRouter();  // Initialize router

    useEffect(() => {
        if (!user) {
            // Redirect to login page if user is not logged in
            router.push('/login');
            return;  // Prevent further execution if not logged in
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

    if (!user) {
        return null; // Render nothing while redirecting
    }

    if (loading) {
        return <Loading />; // Render Loading component
    }

    if (error) {
        return <Error message={error} />; // Render Error component with message prop
    }

    return (
        <div>
            <Navbar />
            <div className='bg-[#f8f8f8]'>
                <Heading data={accommodationData} />
                <Photo data={accommodationData} />
                <ReservationCard data={accommodationData} />
                <Date data={accommodationData} />
                <Information data={accommodationData} />
                <Location data={accommodationData} />
                <Persons data={accommodationData} />
                {/* <Accommodation data={accommodationData} /> */}
                <Diet data={accommodationData} />
                <Overlook data={accommodationData} />
                <Ratings userId={accommodationData?.userId} 
                  data={accommodationData}  />
                <WeatherForecast data={accommodationData} />
                <CommonSection data={accommodationData} />
                <EMail data={accommodationData} />
            </div>
            <Footer/>
        </div>
    );
};

export default Page;
