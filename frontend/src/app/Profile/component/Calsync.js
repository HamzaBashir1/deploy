"use client"; // Make sure to keep this for client-side component
import { useEffect, useState, useContext, useCallback } from 'react';
import { AuthContext } from '@/app/context/AuthContext';
import useFetchData from '@/app/hooks/useFetchData';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ICAL from 'ical.js'; // Make sure this package is installed

const Calsync = () => {
    const { user } = useContext(AuthContext);
    const userId = user._id;

    const [events, setEvents] = useState([]);

    // Fetch accommodation data
    const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/user/${userId}`);

    // Add a CORS proxy for development
    const addCorsProxy = (url) => {
        const corsProxy = "https://thingproxy.freeboard.io/fetch/";
        return process.env.NODE_ENV === "development" ? corsProxy + url : url;
    };

    const fetchAndParseEvents = useCallback(async (url) => {
        try {
            const response = await fetch(addCorsProxy(url));
            const icsText = await response.text();

            const jcalData = ICAL.parse(icsText);
            const comp = new ICAL.Component(jcalData);
            const vevents = comp.getAllSubcomponents("vevent");

            const parsedEvents = vevents.map(vevent => {
                const event = new ICAL.Event(vevent);
                return {
                    title: event.summary,
                    start: event.startDate.toJSDate(),
                    end: event.endDate.toJSDate(),
                };
            });

            setEvents(parsedEvents);
        } catch (error) {
            console.error("Error fetching and parsing calendar:", error);
        }
    }, []);

    const handleSync = async (url) => {
        if (url) {
            await fetchAndParseEvents(url);
        } else {
            console.log("No URL provided for synchronization.");
        }
    };

    useEffect(() => {
        if (accommodationData && accommodationData.length > 0) {
            const url = accommodationData[0].url; // Get the URL from the first accommodation item
            handleSync(url);
        }
    }, [accommodationData, handleSync]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching accommodation data</div>;
    }

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={events}
            />
        </div>
    );
};

export default Calsync;
