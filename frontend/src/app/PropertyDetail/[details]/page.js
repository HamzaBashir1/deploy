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
    const [favorite, setFavorite] = useState([]);   
    const [isCopied, setIsCopied] = useState(false);
    const [showSharjeelOnly, setShowSharjeelOnly] = useState(false);
    const [id , setid] = useState('')

     // Track scrolling and toggle visibility of buttons
     useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            // Adjust scroll position threshold as needed
            setShowSharjeelOnly(scrollTop > 200); 
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                setid(result._id);
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

    const fetchReviews = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${url}`);
          const result = await response.json();
    
          if (result.success && result.data.length > 0) {
            const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
            const avgRating = totalRatings / result.data.length;
    
            setRatingsData({
              averageRating: avgRating,
              ratingsCount: result.data.length,
            });
          } else {
            setRatingsData({
              averageRating: 0,
              ratingsCount: 0,
            });
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      };
    
    
       // Function to toggle favorite status
    const toggleFavorite = async (propertyId) => {
    if (!user) {
      toast.error("You need to be logged in to add favorites.");
      return;
    }
    
    const isFavorite = favorite.includes(propertyId);
    
    if (isFavorite) {
      toast.info("This accommodation is already in your favorites!");
      return;
    }
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          accommodationId: propertyId,
        }),
      });
    
      const result = await response.json();
      if (response.ok) {
        toast.success("Added to favorites!");
        setFavorite([...favorite, propertyId]);
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Error updating favorite: " + error.message);
    }
    };
    
    // Function to remove favorite status
    const removeFavorite = async (propertyId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/remove/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            accommodationId: propertyId,
          }),
        }
      );
    
      const result = await response.json();
      if (response.ok) {
        toast.success("Removed from favorites!");
        setFavorite(favorite.filter((id) => id !== propertyId));
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Error updating favorite: " + error.message);
    }
    };
    
    // Handle toggling between add and remove favorite
    const handleToggleFavorite = (propertyId) => {
    const isFavorite = favorite.includes(propertyId);
    if (isFavorite) {
      removeFavorite(propertyId);
    } else {
      toggleFavorite(propertyId);
    }
    };
    
    // Fetch user favorites on mount
    const fetchMyFavorites = async () => {
    if (!user) {
      toast.error("You need to be logged in to view favorites.");
      return;
    }
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/my-favorites?userId=${user._id}`
      );
      const result = await response.json();
      if (response.ok) {
        setFavorite(result.favorites || []);
        console.log("Fetched Favorites:", result.favorites);
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Error fetching favorites: " + error.message);
    }
    };
    
    const handleCopyLink = () => {
    const accommodationUrl = `${window.location.origin}/accommodation/${_id}`;
    
    navigator.clipboard.writeText(accommodationUrl)
      .then(() => {
        setIsCopied(true); // Set copied state
        toast.success("Link copied!"); // Show success toast when link is copied
        setTimeout(() => {
          setIsCopied(false); // Reset icon after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy the link.");
        console.error("Error copying link:", err);
      });
    };

    const handleClick = () => {
        scrollToSection('location'); // Call scrollToSection directly
      };
    
    return (
        <div className='bg-[#F3F4F6]'>
            <Navbar />
            <div className=' lg:px-10 xl:px-14 2xl:px-18 max-w-[1820px] mx-auto'>
                {/* Heading and Tab Navigation */}
                <div className='relative'>
                <div className='p-4'>
                    <Heading data={accommodationData} handleClick={handleClick}/>
                 
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
                </div>

                {/* Right-side icons */}
                <div className="flex items-center space-x-4">
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
                    </div>

                    {/* Right-side icons */}
                   <div className="flex items-center space-x-4">

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
                    <div className='hidden md:block w-[500px] h-[650px] sticky top-0 overflow-y-auto'>
                        
                           
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
