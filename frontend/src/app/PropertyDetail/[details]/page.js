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
import { IoIosArrowBack } from 'react-icons/io';
import StickyFooter from '../component/StickyFooter';

const Page = ({ params }) => {
    const [accommodationData, setAccommodationData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorite, setFavorite] = useState([]);   
    const [isCopied, setIsCopied] = useState(false);
    const [showSharjeelOnly, setShowSharjeelOnly] = useState(false);
    const [id , setid] = useState('');
    const [latitude ,setlatitude] = useState('')
    const [longitude ,setlongitude] = useState('')
    const [dotCoords, setDotCoords] = useState({ x: latitude, y: longitude });
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        if (scrollTop > 50) {
          setScrolled(true); // Apply green background after scrolling 50px
        } else {
          setScrolled(false); // Revert to original background when at top
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll); // Clean up event listener
      };
    }, []);

     // State to manage selected date range
     

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

    // useEffect(() => {
    //   const latitude = accommodationData?.location?.latitude;
    //   const longitude = accommodationData?.location?.longitude;

    //   if (latitude && longitude) {
    //       const { x, y } = convertLatLonToXY(latitude, longitude);
    //       setDotCoords({ x, y });
    //       console.log("X and Y:", x, y); // Log x and y here
    //       console.log(`Latitude: ${latitude}, Longitude: ${longitude}, X: ${x}, Y: ${y}`);
    //   }
    // }, [accommodationData?.location]);

    
      const styles = {
        st0: {
          fill: '#fff',
          stroke: '#000',
          strokeWidth: 2.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        },
        st1: {
          fontFamily: 'Roboto, sans-serif',
        },
        st2: {
          fontSize: '14px',
        },
      };

      // const convertLatLonToXY = (latitude, longitude) => {
      //   const mapWidth = 900;  
      //   const mapHeight = 600; 

        
      //   const x = ((longitude + 180) * (mapWidth / 360));
      //   const latRad = latitude * (Math.PI / 180);
      //   const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)));
      //   const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI));

      //   return { x, y };
      // };

      // useEffect(() => {
      //   if (latitude && longitude) {
      //     const { x, y } = convertLatLonToXY(latitude, longitude);
      //     setDotCoords({ x, y });
      //     console.log("X and Y:", x, y); // Log x and y here
      //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}, X: ${x}, Y: ${y}`);

      //   }
      // }, [latitude, longitude]);

    //   console.log("Dot Coordinates:", dotCoords);

    const handleChooseDateClick = () => {
      scrollToSection("date");
    };
    
    // Handle save click - scroll to card
    const handleSaveClick = () => {
      scrollToSection('card');
    };

    const name = accommodationData?.name || "N/A"; 
    const location = accommodationData?.location?.address || "Unknown Location";
    const price = accommodationData?.price || "N/A";
    
    return (
        <div className='bg-[#F3F4F6]'>
            <Navbar />
            <div className=' lg:px-10 xl:px-14 2xl:px-18 max-w-[1820px] mx-auto'>
                {/* Heading and Tab Navigation */}
                <div className='relative'>
                <div className='p-4 hidden md:block'>
                  <Heading data={accommodationData} handleClick={handleClick} />
                </div>
                </div>
                   {/* Tab Navigation */}
                   {showSharjeelOnly ? (
                    <>
                     <div
                        className={`sticky-tabs flex justify-between items-center overflow-x-auto bg-[#F3F4F6] border-b border-gray-300 sticky top-0 z-10 ${
                          scrolled ? 'text-[#58CAAA]' : 'text-black'
                        }`}
                      >
                    
                    <div className="flex space-x-4">
                    <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                    <span className="mr-1"><IoIosArrowBack /></span> Back
                    </button>
                    <button onClick={() => scrollToSection('overview')} className="px-4 py-2 text-sm ">Overview</button>
                    <button onClick={() => scrollToSection('date')} className="px-4 py-2 text-sm ">Occupancy</button>
                    <button onClick={() => scrollToSection('information')} className="px-4 py-2 text-sm ">Information</button>
                    <button onClick={() => scrollToSection('location')} className="px-4 py-2 text-sm ">Location</button>
                    <button onClick={() => scrollToSection('Overlook')} className="px-4 py-2 text-sm ">Don't Overlook</button>
                    <button onClick={() => scrollToSection('diet')} className="px-4 py-2 text-sm ">Diet</button>
                    <button onClick={() => scrollToSection('ratings')} className="px-4 py-2 text-sm ">Ratings</button>
                </div>

                {/* Right-side icons */}
                <div className="hidden md:flex items-center space-x-4">
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
                    <div
                        className={`sticky-tabs flex justify-between items-center overflow-x-auto border-b bg-[#F3F4F6] border-gray-300 sticky top-0 z-10 ${
                          scrolled ? 'text-[#58CAAA]' : 'text-black'
                        }`}
                      >
                      
                        <div className="flex space-x-4">
                        <button onClick={() => router.back()} className="flex items-center text-sm py-2 text-[#58CAAA]">
                        <span className="mr-1"><IoIosArrowBack /></span> Back
                        </button>
                        <button onClick={() => scrollToSection('overview')} className="px-4 py-2 text-sm ">Overview</button>
                        <button onClick={() => scrollToSection('date')} className="px-4 py-2 text-sm ">Occupancy</button>
                        <button onClick={() => scrollToSection('information')} className="px-4 py-2 text-sm ">Information</button>
                        <button onClick={() => scrollToSection('location')} className="px-4 py-2 text-sm ">Location</button>
                        <button onClick={() => scrollToSection('Overlook')} className="px-4 py-2 text-sm ">Don't Overlook</button>
                        <button onClick={() => scrollToSection('diet')} className="px-4 py-2 text-sm ">Diet</button>
                        <button onClick={() => scrollToSection('ratings')} className="px-4 py-2 text-sm ">Ratings</button>
                    </div>

                </div>
                        </>
                )}
                <Photo data={accommodationData} />
                
                <div className='flex justify-between py-1 md:hidden'>
                  <div className='flex flex-col pl-2'>
                    <h1 className='font-bold'>{name}</h1>
                    <p>{location}</p>
                  </div>
                  <div className=''>
                          <svg
                            width="80"
                            height="60"
                            viewBox={`0 0 900 600`}
                            style={{ ...styles.st0,...styles.st1,...styles.st2}
                          }
                          onClick={handleClick}
                          >
                        
                        {/* Slovakia Map Path */}
                        <g id="Slovakia">
                        <path class="st0" d="M770,223.382l-0.994,3.269l-0.94,4.528l-0.604,4.567l0.054,3.347l-2.014,1.719l-4.996,0.737l-2.283,1.801
                            l-2.82,8.302l-1.612,3.515l-0.161,0.971l0.013,2.553l-0.255,1.205l-1.222,1.767l-3.116,2.644l-0.988,1.421l-0.247,0.355
                            l-0.859,2.408l-0.094,1.54l0.255,1.612l0.282,6.689l-0.295,1.335l-0.9,2.262l-1.128,1.63l-1.222,0.968l-0.994,1.294l-0.403,2.637
                            l0.161,4.225l-0.833,4.182l-1.585,3.672l-2.081,2.766l-1.571,1.027l-3.465,1.108l-1.598,1.098l-0.98,1.382l-1.356,3.135
                            l-0.806,1.432l-8.487,6.89l-1.947,3.197l-0.269,3.977l1.518,7.949l-0.457,3.081l-1.437,3.191l-0.121,14.109l-2.458,3.16
                            l-2.27,1.805l-2.417,0.708l-7.775-0.768l-2.35,0.152l-2.39,0.829l-6.782,0.354l-1.894,0.748l-3.962,2.274l-5.6,0.839l-6.728,3.45
                            l-3.948,0.343l-4.069-1.394l-3.438-2.551l-3.075-3.598l-7.279-11.216l-1.061-2.095l-1.692-8.09l-1.128-2.229l-2.216-0.501
                            l-4.794,0.066l-2.068-0.953l-0.873-1.378l-1.182-3.801l-0.859-1.683l-1.115-1.019l-2.35-0.928l-4.365-2.617l-1.893-0.578
                            l-6.742,2.146l-4.432,0.096l-2.176,0.446l-2.538,1.506l-1.088,1.83l-0.739,2.089l-1.517,2.199l-1.92,1.084l-1.477-0.649
                            l-1.612-1.363l-2.35-1.034l-4.311,0.983l-10.058,4.824l-3.29-0.765l-2.619-2.594l-3.626-1.647l-3.827-0.689l-3.25,0.253
                            l-4.633-0.416l-7.077-4.34l-4.083-0.436l-1.88-0.492l-3.854-3.53l-2.014-1.065l-2.108,0.036l-27.49,6.375l-8.057,0.548
                            l-3.747,1.511l-0.148,1.48l-0.04,1.632l0.255,3.4l0.081,0.689l0.013,0.694l-0.054,0.699l-0.108,0.689l-1.746,2.618l-0.295,0.313
                            l-3.949,4.192l-1.947,2.576l-1.504,3.04l-5.049,15.526l-2.713,5.639l-3.25,4.986l-3.774,3.813l-2.968,1.553l-1.571-0.671
                            l-1.464-1.619l-2.592-1.311l-1.464,0.646l-3.921,3.631l-2.176,0.968l-2.283-0.242l-1.329-0.494l-1.115,0.222l-1.625,1.936
                            l-0.51,1.371l-0.712,3.507l-0.953,1.743l-1.074,0.851l-2.457,0.952l-5.169,3.179l-0.431,0.265l-4.942,1.551l-2.995,1.857
                            l-5.882,5.509l-3.062,1.127l-2.699-1.036l-4.942-4.488l-3.196-1.022l-4.687,1.797l-1.236-0.161l-1.222-1.847l0.322-1.646
                            l0.739-1.681l-0.067-1.913l-2.31-2.81l-3.048-0.504l-5.989,1.169l-1.303-0.68l-2.82-3.501l-1.477-1.26l-1.303-0.383l-1.383-0.045
                            l-11.952,3.19l-2.243,1.305l-1.423,2.836l-1.222,7.541l-1.544,3.079l-0.04,0.09l-0.027,0.091l0.027,0.121l0.04,0.131l0.201,1.066
                            l0.067,1.056l-0.067,1.026l-0.201,1.006l-6.956,4.957l-17.538-0.372l-7.762,4.995l-1.423,0.291l-16.115-1.974l-7.776,1.14
                            l-2.553-0.122l-2.927-0.14l-1.907,0.894l-6.266,1.413l-12.361,2.786l-2.27,1.858l-3.478,7.247l-1.236,1.073l-2.525,0.431
                            l-1.182,0.692l-1.692,2.091l0.174,0.717l0.9,0.777l0.43,2.241l-1.303,8.007l-0.322,4.081l0.846,3.629l3.801,3.733l4.996,3.657
                            l-0.2,0.071l-3.198,1.134l-2.941,0.78l-2.256,1.68l-4.297,4.933l-3.169,1.964l-3.787,0.4l-3.881-0.759l-4.727-2.094l-5.828-0.425
                            l-26.603,3.108l-9.723,3.966l-4.821,0.459l-16.021-1.663l-29.767,1.926l-7.513,0.486l-10.878-2.971l-2.956-1.602l-5.531-2.999
                            l-1.356-1.519l-1.021-1.989l-2.404-2.3l-2.699-1.94l-1.934-0.97l-1.464,0.22l-1.303,0.64l-1.343,0.05l-1.585-1.635l-4.391-6.609
                            l-1.209-0.801l-3.263-0.691l-1.343-0.561l-1.276-1.181l-13.335-17.92l-4.096-3.401l-8.474-1.285l-1.346-0.377l-5.382-1.51
                            l-4.687-1.014l-4.741,2.881l-3.035-2.735l-4.203-1.501l-2.981-1.637l0.698-3.189l-1.558-1.301l-0.51-0.321l0.739-3.617l0.671-1.97
                            l1.33-1.644l-1.692-1.815l-0.617-1.127l-1.948-3.555l-1.37-0.88l-2.082-0.322l-1.786-1.097l-3.277-3.603l-0.927-3.035l-0.014-4.225
                            l-0.618-3.526l-2.028-7.006l-0.054-0.933l0.175-2.234l-0.121-0.847l-0.484-0.676l-0.806-0.277l-1.437-1.312l-1.182-0.545
                            l-0.994-0.641l-0.43-1.151l-0.161-0.888l-0.416-1.12l-0.443-0.979l-0.349-0.414l-0.564-0.404l0.242-0.99l0.51-1.131l0.295-0.868
                            l-0.591-1.551l-1.329-1.49l-1.37-1.132l-0.739-0.435l-2.619-0.278l-1.007-0.611L30,362.546l0.081-2.148l0.228-0.89l0.322-0.581
                            l0.336-1.234l1.155-10.451l0.537-2.799l1.316-2.638l3.398-4.913l0.685-2.609l0.967-1.85l2.149-1.739l2.135-2.261l0.28-1.003
                            l0.687-2.466l-1.209-9.185l0.322-3.732l2.055-2.514l1.491-2.739l6.567-18.988l3.196-5.46l4.472-3.883l1.867-2.375l0.765-3.722
                            l1.182-1.836l6.983-5.102l5.815-1.245l6.245,1.633l14.826,7.539l2.256-0.428l2.533-1.666l2.382-1.568l3.089-0.908l1.894,0.918
                            l3.975,4.212l4.754,0.744l24.965-9.855l2.296-1.909l4.485-7.741l2.095-1.747l3.196-0.552l2.74,0.47l2.484-0.143l2.39-2.34
                            l1.061-2.709l1.007-6.126l0.806-2.937l1.719-3.459l2.726-1.761l3.142-0.491l6.97,0.543l4.311-1.986l3.827-3.575l2.699-4.58
                            l0.859-4.357l-0.166-8.869l-0.022-1.195l0.47-5.328l1.652-6.523l2.431-6.065l3.129-5.102l3.827-3.632l17.485-6.836l4.806-3.775
                            l3.063-2.407l0.322-9.475l3.787,0.856l2.914-1.919l5.533-6.791l4.271-2.303l1.074-1.095l0.658-1.756l0.322-3.719l0.671-1.643
                            l2.672-1.695l5.748,0.837l3.706-1.964l0.9-0.186l0.9,0.186l4.257,2.15l3.76,1.158l3.639-0.207l5.331-4.921l2.431-0.931l5.318-0.145
                            l12.865,1.189l3.76,2.306l-1.141,3.369l0.134,2.852l0.631,2.706l0.336,2.964l-0.537,6.564l0.725,2.249l2.538,0.475l3.29-0.258
                            l5.022-2.93l2.834-0.671l1.195,0.413l2.578,1.888l1.249,0.64l1.343,0.093l3.263-0.65l4.002-1.609l0.94-1.6l0.336-2.487l0.913-3.892
                            l0.376-0.083l1.598-0.041l0.577-0.434l0.309-1.332l-0.255-0.95l-0.416-0.599l-0.228-0.227l2.082-6.49l1.773-2.843l1.893-1.81
                            l2.122-1.045l2.498-0.538l4.002,0.041l1.343-0.217l1.84-0.745l0.98-0.848l11.267-12.454l0.497-0.994l0.752-0.331l0.714,0.294
                            l1.099,0.452l2.189,3.874l0.98,1.046l3.048,2.029l1.571,4.026l2.363,10.095l2.095,6.366l0.671,1.426l2.229,1.725l2.713,0.733
                            l5.197,0.052l-0.604,1.26l-0.201,1.084l0.081,3.128l-0.276,2.35l-0.007,0.059l7.467,2.553l2.833,0.309l2.632-0.268l4.351-1.754
                            l1.168,0.888l0.027,0.02l1.209,3.775l0.658,3.32l0.766,9.644l-0.201,0.814l-0.994,1.493l-0.079,0.829l-0.001,0.016l0.457,0.669
                            l1.773,1.318l0.013,0.01l0.208,0.452l0.034,0.073l0.987,1.041l0.048,0.05l0.242,0.865l-0.309,1.122l-0.752,0.443l-0.833,0.237
                            l-0.578,0.473l-4.915,8.042l-0.524,2.621l1.679,2.322l3.277,1.202l5.989,0.452l2.887-1.069l1.829-1.894l2.536-2.628l2.35-1.748
                            l4.163-0.463l3.612,1.881l6.701,6.32l4.311,2.116l2.538-1.962l1.343-4.973l0.739-6.95l1.612-1.954l0.9-2.212l0.739-2.367
                            l2.484-5.59l0.739-0.989l0.322,0.309l2.86,0.34l1.276-1.195l2.833-3.389l1.974-1.113l10.032-0.886l0.645-0.886l0.927-2.762
                            l0.671-2.846l0.269-1.836l0.484-1.238l1.329-1.001l1.544-0.031l5.318,2.012l6.715-0.258l-0.027-3.435l2.028-0.464l10.985,5.622
                            l2.847,0.701l3.075-1.103l1.491-1.403l2.068-2.569l1.329-0.753l1.195-0.083l2.807,0.423l4.915-0.794l2.028,0.361l11.536,13.827
                            l2.055,1.504l2.914,0.453l2.216-0.134l2.041,0.309l2.431,1.813l2.122,2.214l2.108,1.534l2.39,0.453l3.048-1.102l2.807-2.44
                            l4.244-6.233l2.672-2.607l2.041-0.433l2.74-0.031l2.404-0.484l1.061-1.825l-1.585-3.011l-2.995-1.826l-1.585-1.816l2.632-2.951
                            l1.987-0.949l5.278-1.074l2.014,0.186l2.35,1.621l1.853,2.074l1.988,1.372l2.793-0.464l2.229-2.095l4.056-6.029l2.35-1.632
                            l1.799,0.434l7.279,3.893l12.664,3.592l2.149-0.021l4.821-1.063l1.907,0.568l2.369-0.964l1.968-0.801l9.306-1.053l2.431,0.63
                            l1.316,0.888l2.417,2.363l1.316,0.918l0.98,0.134l2.014-0.454l1.289,0.382l2.189,2.249l4.365,6.744l2.001,1.629l1.356-0.907
                            l1.84-2.196l2.243-2.062l2.619-0.485l2.377,1.361l4.767,4.402l6.997,3.504l4.687,4.429l3.733,6.054l1.638,7.027l0.859,6.334
                            l3.68,2.703l9.199,1.757l4.23,2.732l1.504,0.668l1.303,0.082l3.116-0.38l1.074,0.205l1.423,1.592l0.013,1.396l-0.362,1.283
                            l0.295,1.252l0.967,0.831l6.097,1.868l7.185-0.277l2.766,1.098l6.58,6.637l4.767,1.466l10.166,0.441L770,223.382z"
                            />
                    </g> 
                        {/* Render the dot */}
                        {/* {dotCoords.x && dotCoords.y && (
                          <circle cx={dotCoords.x} cy={dotCoords.y} r={5} fill="green" />
                        )} */}

                    </svg>
                    </div>
                </div>

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
                    <div className='hidden md:block w-[500px] h-[650px] sticky top-[55px] overflow-y-auto'>
                        
                           
                        <Card data={accommodationData}  selectedRange={selectedRange} />
                    
                    </div>

                    
                </div>
                <CommonSection />
                <div>
                <StickyFooter
                  data={accommodationData}
                  buttonText="Choose a date"
                  selectedRange={selectedRange}
                  onSave={handleSaveClick} // Scroll to card component on save
                  onChooseDate={handleChooseDateClick}
                />
              </div>
            </div>
            
            <Email />
            <Footer />
        </div>
    );
};

export default Page;
