"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { BiHeart } from 'react-icons/bi';
import { LuWaves } from "react-icons/lu";
import { MdLocalParking } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { MdOutlinePets } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { CiStar } from "react-icons/ci";
import { Base_URL } from "../config.js";
import useFetchData from '../hooks/useFetchData.js';
import Loading from './Loader/Loading.js';
import Error from './Error/Error.js';
import { AuthContext } from '../context/AuthContext.js';
import { FormContext } from '../FormContext.js';

const PropertyCard = () => {
    const router = useRouter();

    const { location ,city,country} = useContext(FormContext); 
    const [ratingsData, setRatingsData] = useState({});  // State to store ratings for each property
    const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`);
    console.log("location",location,"city",city,"country",country);

    useEffect(() => {
        if (accommodationData) {
            accommodationData.forEach((property) => {
                fetchReviews(property._id);
            });
        }
    }, [accommodationData]);

    const fetchReviews = async (accommodationId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${accommodationId}`);
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
                const avgRating = totalRatings / result.data.length;

                setRatingsData((prevState) => ({
                    ...prevState,
                    [accommodationId]: {
                        averageRating: avgRating,
                        ratingsCount: result.data.length,
                    },
                }));
            } else {
                setRatingsData((prevState) => ({
                    ...prevState,
                    [accommodationId]: {
                        averageRating: 0,
                        ratingsCount: 0,
                    },
                }));
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };


    // Function to increment view count before navigating to the property details page
    const incrementViewCount = async (id) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${id}/view`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error("Error incrementing view count:", response.statusText);
            }
        } catch (error) {
            console.error("Error incrementing view count:", error);
        }
    };

    const handleCardClick = async (id) => {
         // Increment the view count
         await incrementViewCount(id);
        router.push(`/PropertyDetail/${id}`);
    };


        // Filter properties based on location
        const filteredProperties = accommodationData?.filter(property => {
            // If no location is selected, show all properties
            if (!location && !city && !country) {
                return true;
            }
        
            // Check if property location exists and has an address before using toLowerCase
            const propertyAddress = property?.location?.address || '';
            const propertyCity = property?.locationDetails?.city || ''; // Assuming property location has a city field
            const propertyCountry = property?.locationDetails?.country || '';
            console.log("propertyAddress",propertyAddress,"propertyCity",propertyCity)
            const selectedAddress = location || '';
            const selectedCity = city || '';
            const selectedCountry = country || '';
            console.log("selectedAddress",selectedAddress,"selcity",selectedCity)
        
            // Return true if the property location matches the selected location (case-insensitive)
            return propertyAddress.toLowerCase().includes(selectedAddress.toLowerCase()) && propertyCity.toLowerCase().includes(selectedCity.toLowerCase()) &&  propertyCountry.toLowerCase().includes(selectedCountry.toLowerCase());
    
        });


    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!loading && !error && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {filteredProperties && filteredProperties.map((property) => {
                        const ratingsInfo = ratingsData[property._id] || { averageRating: 0, ratingsCount: 0 };
                        const { averageRating, ratingsCount } = ratingsInfo;

                        return (
                            <div
                                key={property._id}
                                className='flex flex-col w-full max-w-xs overflow-hidden border rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg'
                                onClick={() => handleCardClick(property._id)}
                            >
                                <div className='relative w-full h-56 sm:h-64'>
                                    <img
                                        src={property.images[0] || '/bedroom.jpg'}
                                        alt={property.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className='absolute top-2 right-2 bg-[#00000059] rounded-full p-1 sm:p-2'>
                                        <BiHeart className='text-xl sm:text-2xl text-[#4FBE9F]' />
                                    </div>
                                </div>
                                <div className='p-3 sm:p-4'>
                                    <h1 className='font-bold text-base sm:text-lg text-[#1F2937]'>{property.name}</h1>
                                    <p className='text-lg sm:text-sm text-[#666666]'>{property.person} persons, {property.bedroomCount} bedrooms, {property.bathroomCount} bathrooms </p>
                                    {property.equipmentAndServices && Array.isArray(property.equipmentAndServices) && (
                                        <div className='flex flex-wrap gap-2 mt-2 sm:mt-3'>
                                            {property.equipmentAndServices.includes('waves') && (
                                                <div className='border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]'>
                                                    <LuWaves className='text-[#292A34]' />
                                                </div>
                                            )}
                                            {property.equipmentAndServices.includes('Parking') && (
                                                <div className='border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]'>
                                                    <MdLocalParking className='text-[#292A34]' />
                                                </div>
                                            )}
                                            {property.equipmentAndServices.includes('Free Wifi') && (
                                                <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                                                    <IoWifi className="text-[#292A34]" />
                                                </div>
                                            )}
                                            {property.pets.includes('They are not allowed') && (
                                                <div className='border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]'>
                                                    <MdOutlinePets className='text-[#292A34]' />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className='flex items-center mt-2 sm:mt-3'>
                                        <CiLocationOn className='text-[#292A34]' />
                                        <p className='text-xs sm:text-sm text-[#292A34] ml-1 sm:ml-2'>
                                            {property.location && property.location.address ? property.location.address : "Unknown location"}
                                        </p>
                                    </div>

                                    <hr className="my-3 sm:my-4 h-0.5 bg-neutral-100 dark:bg-white/10" />
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-sm font-bold sm:text-base lg:text-lg'>${property.price} <span className='text-xs font-normal sm:text-sm lg:text-base'>/night</span></h1>
                                        <div className='flex items-center'>
                                            <CiStar className='text-[#DC2626]' />
                                            <h1 className='ml-1 text-sm font-bold lg:text-lg md:text-base'>{averageRating.toFixed(1) || "0.0"}</h1>
                                            <p className='ml-1 text-xs text-gray-600 sm:text-sm lg:text-base md:text-sm sm:ml-2'>({ratingsCount})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default PropertyCard;
