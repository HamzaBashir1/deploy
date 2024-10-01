"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BsBox, BsPersonBadgeFill, BsStar,BsStarFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { BiHeart, BiUpload } from 'react-icons/bi';
import map from '../../../../public/map.png'; // Adjust the path if necessary
import { Base_URL } from '../../config';

const Heading = ({ data }) => {
    // Safely access data using optional chaining
    const name = data?.name || "Accommodation Name";
    const location = data?.location?.address || "Unknown Location"; // Access specific location field
    const latitude = data?.location?.latitude;
    const url = data._id;
    const longitude = data?.location?.longitude;
    const rating = data?.rating || 5.0;
    const persons = data?.person || 8;
    const isVerified = data?.verified || false;
      // Assuming data.images is an array of image URLs
      const [ratingsData, setRatingsData] = useState({});  
      const fetchReviews = async () => {
        try {
          const response = await fetch(`${Base_URL}/api/reviews/${url}`);
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
    
      useEffect(() => {
        fetchReviews();
      }, [url]);
    

    return (
        <div className="px-4 md:px-10 lg:px-20 pt-20 bg-[#f8f8f8]">
            {/* Heading Section */}
            <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
                {/* Left Section */}
                <div className="flex flex-col mb-4 space-y-2 lg:mb-0">
                    <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{name}</h1>
                    
                    <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:items-center md:space-y-0">
                        <h2 className="text-sm md:text-base">{location}</h2>
                        {/* Optional: Show latitude and longitude if available */}
                        {latitude && longitude && (
                            <h2 className="text-sm text-gray-500">({latitude}, {longitude})</h2>
                        )}
                        
                        <div className="flex items-center space-x-1">
                            <h2 className="text-sm font-bold md:text-base"> {ratingsData?.averageRating?.toFixed(1) || "No Ratings Yet"}</h2>
                            <div className="flex space-x-1">
                                 {[...Array(Math.round(ratingsData?.averageRating || 0))].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-500" />
                    ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <BsPersonBadgeFill />
                            <h2 className="text-sm md:text-base">{persons} persons</h2>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <MdVerified className={isVerified ? 'text-green-500' : 'text-gray-500'} />
                            <h2 className="text-sm font-bold md:text-base">{isVerified ? 'Verified accommodation' : 'Not Verified'}</h2>
                        </div>
                    </div>
                </div>
                
                {/* Right Section */}
                <div className="flex items-center space-x-4"> 
                 {/* {images.length > 0 ? (
                    images.map((imageUrl, index) => (
                        <div key={index} >
                            <img
                                src={imageUrl} 
                                alt={`Accommodation image ${index + 1}`} 
                                layout="fill" 
                                objectFit="cover" 
                                className="rounded-md"
                            />
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )} */}
                    <BiHeart className="text-xl cursor-pointer md:text-2xl hover:text-red-500" />
                    <BiUpload className="text-xl cursor-pointer md:text-2xl hover:text-blue-500" />
                    <BsBox className="text-xl cursor-pointer md:text-2xl hover:text-gray-500" />
                </div>
            </div>
        </div>
    );
}

export default Heading;
