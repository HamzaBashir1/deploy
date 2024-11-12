// src/components/Calendar.js
import React, { useEffect, useState, useContext } from 'react';
import { Base_URL } from '@/app/config';
import useFetchData from '@/app/hooks/useFetchData';
import { AuthContext } from '@/app/context/AuthContext';

const Calsync = () => {
    const { user } = useContext(AuthContext);
    const userId = user?._id; // Optional chaining to safely access user ID
    const [accommodationData, setAccommodationData] = useState([]);
    const [error, setError] = useState(null);
    const [calendarId, setCalendarId] = useState(null);
    const [secretToken, setSecretToken] = useState(null);
    const [bookings, setBookings] = useState([]); // State for bookings

    // Fetch accommodation data
    const { data, loading, error: fetchError } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);

    useEffect(() => {
        if (fetchError) {
            console.error("Error fetching accommodation data:", fetchError);
            setError("Failed to fetch accommodation data.");
        } else if (data) {
            setAccommodationData(data);
            extractCalendarInfo(data); // Extract calendarId and secretToken
        }
    }, [data, fetchError]);
    const extractCalendarInfo = (data) => {
        if (data && data.length > 0) {
            let url = data[0]?.url; // Assuming the URL for the calendar is in the first accommodation object
    
            if (url) {
                // Add protocol if missing
                if (!url.startsWith('http://') && !url.startsWith('https://')) {
                    url = `https://${url}`;
                }
    
                try {
                    const urlParts = new URL(url);
                    const params = new URLSearchParams(urlParts.search);
                    
                    // Extract calendarId and secretToken from the URL
                    const id = urlParts.pathname.split('/').pop().split('.')[0]; // Extracts the ID before .ics
                    const token = params.get('s'); // Assuming 's' is the parameter for the secret token
                    
                    // Log URL, calendarId, and secretToken
                    console.log('Calendar URL:', url);
                    console.log('Extracted Calendar ID:', id);
                    console.log('Extracted Secret Token:', token);
                    
                    setCalendarId(id);
                    setSecretToken(token);
                } catch (error) {
                    console.error('Invalid URL format:', error);
                }
            }
        }
    };
    

    // Fetch bookings using calendarId and secretToken
    useEffect(() => {
        if (calendarId && secretToken) {
            const fetchBookings = async () => {
                const fetchUrl = `${Base_URL}/calendar/${calendarId}/${secretToken}`;
                console.log(`Fetching bookings from: ${fetchUrl}`); // Log the full fetch URL
                try {
                    const response = await fetch(fetchUrl);
                    if (!response.ok) {
                        const errorData = await response.json(); // Attempt to get error details
                        console.error("Fetch error details:", errorData);
                        throw new Error('Failed to fetch bookings');
                    }
                    const data = await response.json();
                    setBookings(data.bookings || []); // Store fetched bookings
                } catch (error) {
                    console.error("Error fetching bookings:", error);
                    setError("Failed to fetch bookings."); // Update error state
                }
            };
    
            fetchBookings();
        }
    }, [calendarId, secretToken]);

    // Assume the first accommodation is used to display data
    const apartment = accommodationData[0]; // Get the first accommodation data
    const apartmentName = apartment?.name || "Apartment Name"; // Fallback name

    return (
        <div>
            <hr className='my-4 bg-white' />
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking, index) => (
                        <React.Fragment key={index}>
                            <li className="flex flex-row gap-10 my-6">
                                <div>
                                    <div className="px-8 py-1 bg-yellow-300 rounded-full">
                                        <h1 className='text-white'>Import</h1>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <h1 className='font-bold'>{apartmentName}</h1>
                                    <p className=''>{new Date(booking.start).toLocaleDateString()} — {new Date(booking.end).toLocaleDateString()} ({(new Date(booking.end) - new Date(booking.start)) / (1000 * 60 * 60 * 24)} nights)</p>
                                    <p className='text-xs'>Airbnb</p>
                                </div>
                            </li>

                            {/* Add <hr /> after each booking except the last one */}
                            {index < bookings.length - 1 && <hr className='my-2 bg-white' />} {/* You can change color and spacing as needed */}
                        </React.Fragment>
                    ))}
                </ul>
            ) : (
                <p>No bookings  available from outsource.</p> // Message for no bookings
            )}

            {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        </div>
    );
};

export default Calsync;
