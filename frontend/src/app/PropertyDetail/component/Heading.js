"use client"
import React, { useEffect, useState, useContext } from 'react';
import { BsBox,BsStarFill } from 'react-icons/bs';
import { MdVerified } from 'react-icons/md';
import { BiCopy, BiHeart, BiSolidCopy, BiSolidHeart, BiUpload } from 'react-icons/bi';
import { Base_URL } from '../../config';
import { FaUserFriends } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

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
    const _id = data?._id || "N/A"
      // Assuming data.images is an array of image URLs
      const { user } = useContext(AuthContext);
      const [ratingsData, setRatingsData] = useState({});  
      const [favorite, setFavorite] = useState([]); 
      const [isCopied, setIsCopied] = useState(false); // State for copying


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
    
      useEffect(() => {
        fetchReviews();
      }, [url]);

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

        useEffect(() => {
          fetchReviews();
        }, [_id]);

        useEffect(() => {
          if (user) {
            fetchMyFavorites(user._id);
          }
        }, [user]);

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
    


    return (
        <div className="lg:p-4 md:p-8 bg-[#F3F4F6]">
            {/* Heading Section */}
            <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
                {/* Left Section */}
                <div className="flex flex-col mb-4 space-y-2 lg:mb-0">
                    <h1 className="text-2xl font-bold md:text-2xl lg:text-3xl">{name}</h1>
                    
                    <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:items-center md:space-y-0">
                        <h2 className="text-sm md:text-base">{location}</h2>
                        {/* Optional: Show latitude and longitude if available */}
                        {/* {latitude && longitude && (
                            <h2 className="text-sm text-gray-500">({latitude}, {longitude})</h2>
                        )} */}
                        
                        <div className="flex items-center space-x-1">
                            <h2 className="text-sm font-bold md:text-base"> {ratingsData?.averageRating?.toFixed(1) || "No Ratings Yet"}</h2>
                            <div className="flex space-x-1">
                                 {[...Array(Math.round(ratingsData?.averageRating || 0))].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-500" />
                    ))}
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <FaUserFriends  />
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
                <img src='/map.png' className='sm:block hidden ' />
                {favorite.includes(_id) ? (
                        <BiSolidHeart
                            className='text-xl sm:text-2xl text-[#DC2626] cursor-pointer hover:text-red-600'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(_id); // Call the new handle function
                            }}
                        />
                    ) : (
                        <BiHeart
                            className='text-xl sm:text-2xl text-[#4FBE9F] cursor-pointer hover:text-red-500'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(_id); // Call the new handle function
                            }}
                        />
                    )}
                    {/* Copy link functionality */}
                    {isCopied ? (
                      <BiSolidCopy
                        className="text-xl cursor-pointer md:text-2xl text-[#4FBE9F]"
                        onClick={handleCopyLink}
                      />
                    ) : (
                      <BiCopy
                        className="text-xl cursor-pointer md:text-2xl hover:text-red-500"
                        onClick={handleCopyLink}
                      />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Heading;
