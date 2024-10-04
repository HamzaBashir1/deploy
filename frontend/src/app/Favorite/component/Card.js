"use client";
import React, { useEffect, useState, useContext } from 'react';
import { BiX } from 'react-icons/bi'; 
import { LuWaves } from "react-icons/lu";
import { MdLocalParking, MdOutlinePets } from "react-icons/md";
import { IoWifi } from "react-icons/io5";
import { CiLocationOn, CiStar } from "react-icons/ci";
import { Base_URL } from "../../config";
import useFetchData from '../../hooks/useFetchData.js';
import Loading from '../../components/Loader/Loading.js';
import Error from '../../components/Error/Error.js';
import { AuthContext } from '../../context/AuthContext.js';
import { toast } from 'react-toastify';

const PropertyCard = ({ property, onRemoveFavorite }) => {
    const { user } = useContext(AuthContext);
    const [ratingsData, setRatingsData] = useState({ averageRating: 0, ratingsCount: 0 });
    const { data: accommodationData, loading, error } = useFetchData(`${Base_URL}/accommodation`);

    useEffect(() => {
        if (property?._id) {
            fetchReviews(property._id);
        }
    }, [property]);

    const fetchReviews = async (accommodationId) => {
        try {
            const response = await fetch(`${Base_URL}/reviews/${accommodationId}`);
            const result = await response.json();

            if (result.success && result.data.length > 0) {
                const totalRatings = result.data.reduce((sum, review) => sum + review.overallRating, 0);
                const avgRating = totalRatings / result.data.length;

                setRatingsData({ averageRating: avgRating, ratingsCount: result.data.length });
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    const handleCardClick = async (id) => {
        // Increment the view count
        await incrementViewCount(id);
        router.push(`/PropertyDetail/${id}`);
    };

    return (
        <>
            {loading && <Loading />}
            {error && <Error />}

            {!loading && !error && (
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
                            <BiX
                                className='text-xl sm:text-2xl text-[#DC2626]'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemoveFavorite(property._id); // Call removeFavorite passed from Favorites
                                }}
                            />
                        </div>
                    </div>
                    <div className='p-3 sm:p-4'>
                        <h1 className='font-bold text-base sm:text-lg text-[#1F2937]'>{property.name}</h1>
                        <p className='text-lg sm:text-sm text-[#666666]'>{property.person} persons, {property.bedroomCount} bedrooms, {property.bathroomCount} bathrooms </p>
                        
                        <div className='flex flex-wrap gap-2 mt-2 sm:mt-3'>
                            {property.equipmentAndServices && Array.isArray(property.equipmentAndServices) && (
                                <>
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
                                </>
                            )}
                        </div>

                        <div className='flex items-center mt-2 sm:mt-3'>
                            <CiLocationOn className='text-[#292A34]' />
                            <p className='text-xs sm:text-sm text-[#292A34] ml-1 sm:ml-2'>
                                {property.location?.address || "Unknown location"}
                            </p>
                        </div>

                        <hr className="my-3 sm:my-4 h-0.5 bg-neutral-100 dark:bg-white/10" />
                        <div className='flex items-center justify-between'>
                            <h1 className='text-sm font-bold sm:text-base lg:text-lg'>${property.price} <span className='text-xs font-normal sm:text-sm lg:text-base'>/night</span></h1>
                            <div className='flex items-center'>
                                <CiStar className='text-[#DC2626]' />
                                <h1 className='ml-1 text-sm font-bold lg:text-lg md:text-base'>{ratingsData.averageRating.toFixed(1) || "0.0"}</h1>
                                <p className='ml-1 text-xs text-gray-600 sm:text-sm lg:text-base md:text-sm sm:ml-2'>({ratingsData.ratingsCount})</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PropertyCard;
