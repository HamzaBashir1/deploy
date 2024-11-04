"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { CiHeart, CiHeartFilled } from "react-icons/ci";
import Image from 'next/image';
import { toast } from 'react-toastify';
import useFetchData from '../../hooks/useFetchData.js';
import { AuthContext } from '../../context/AuthContext.js';
import { FormContext } from '../../FormContext.js';
import Loading from '../../components/Loader/Loading.js';
import Error from '../../components/Error/Error.js';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { BsFillHeartFill, BsFillHeartPulseFill } from 'react-icons/bs';
import Link from 'next/link.js';

const DiscountCard = () => {
  const router = useRouter();

  const { location ,city,country} = useContext(FormContext); 
  const { pricemin , pricemax ,Beds,Bathrooms ,booking,amenity} = useContext(FormContext);
  const { sortOption ,updatesort} = useContext(FormContext);

  const { user } = useContext(AuthContext); 
  const [ratingsData, setRatingsData] = useState({}); 
  const [favorite, setFavorite] = useState([]);   
  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`);
  console.log("location",location,"city",city,"country",country,"pricemin",pricemin,"pricemax",pricemax,Bathrooms,Beds,amenity,booking);

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
      // router.push(`/PropertyDetail/${id}`);
  };

      // Filter properties based on location
  // Filter properties based on location and price range
  
  
  
      const toggleFavorite = async (propertyId) => {
          if (!user) {
              toast.error('You need to be logged in to add favorites.');
              return;
          }

              

      
          const isFavorite = favorite.includes(propertyId);
      
          // If the accommodation is already in favorites, fill the heart and show a toast message
          if (isFavorite) {
              toast.info('This accommodation is already in your favorites!');
              return; // Prevent further actions if already favorited
          }
      
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/add`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      userId: user._id,
                      accommodationId: propertyId,
                  }),
              });
      
              const result = await response.json();
              if (response.ok) {
                  toast.success('Added to favorites!');
                  setFavorite([...favorite, propertyId]); // Add the property to favorites

              } else {
                  console.error(result.error);
                  // toast.error(result.error); // Show any error message from the server
              }
          } catch (error) {
              console.error("Error updating favorite:", error);
              // toast.error("Error updating favorite: " + error.message); // Fix error toast message
          }
      };

      
      
      // New function to handle removal of favorite
      const removeFavorite = async (propertyId) => {
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/remove/${propertyId}`, {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      userId: user._id,
                      accommodationId: propertyId,
                  }),
              });
      
              const result = await response.json();
              if (response.ok) {
                  toast.success('Removed from favorites!');
                  setFavorite(favorite.filter(id => id !== propertyId)); // Remove the property from favorites
              } else {
                  console.error(result.error);
                  toast.error(result.error); // Show any error message from the server
              }
          } catch (error) {
              console.error("Error updating favorite:", error);
              // toast.error("Error updating favorite: " + error.message); // Fix error toast message
          }
      };
      
      // Toggle function with condition
      const handleToggleFavorite = (propertyId) => {
          const isFavorite = favorite.includes(propertyId);
          if (isFavorite) {
              // Call removeFavorite function if it is already a favorite
              removeFavorite(propertyId);
          } else {
              // Call toggleFavorite function to add to favorites
              toggleFavorite(propertyId);
          }
      };
      
  
      useEffect(() => {
          if (user) {
              fetchMyFavorites(user._id);
          }
      }, [user]);
      
      const fetchMyFavorites = async () => {
          if (!user) {
              toast.error('You need to be logged in to view favorites.');
              return;
          }
  
          try {
              const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/my-favorites?userId=${user._id}`);
              const result = await response.json();
              if (response.ok) {
                  setFavorite(result.favorites || []); // Ensure favorites is an array
                  console.log("Fetched Favorites:", result.favorites);
              } else {
                  console.error(result.error);
                  toast.error(result.error);
              }
          } catch (error) {
              console.error("Error fetching favorites:", error);
              // toast.error("Error fetching favorites: " + error.message);
          }
      };

  return (
    <div className='grid grid-cols-1 gap-6 p-4 sm:grid-cols-1 lg:grid-cols-3'>
      {accommodationData && accommodationData
        .filter(property => property.discount > 0)  // Filter properties with discount > 0
        .map((property) => (
          <div key={property._id} className='flex flex-col mb-4 bg-white rounded-lg shadow-md'>
          <Link
          onClick={() => handleCardClick(property._id)}
          href={`/PropertyDetail/${property._id}`}  
      >

          <div className='relative'>
              <img 
                src={property.images[0] || "/bedroom.jpg"} 
                width={1000}
                height={50}
                alt="Bedroom"
                style={{ objectFit: 'cover', width: '100%' }}
                className='w-full h-48 rounded-t-lg sm:h-64' 
              />
              <div className='absolute p-1 rounded-full top-2 right-2 sm:p-2'>
                <div className="bg-[#DA0034] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  until - {property.discount }%
                </div>
              </div>
            </div> 
            <div className='flex items-center justify-between p-4'>
              <div className='flex flex-col'>
                <h1 className='text-[#DA0034] text-lg sm:text-xl'>
                  from <span className='font-bold'>€{property.price}</span>
                </h1>
                <p className='mt-1 text-sm'>1 night</p>
              </div>
              <button >
              {favorite.includes(property._id) ? (
                <BiSolidHeart
                    className='text-xl sm:text-2xl text-[#DC2626]'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property._id);
                    }}
                />
            ) : (
                <BiHeart
                    className='text-xl text-pink-600 sm:text-2xl'
                    onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(property._id);
                    }}
                />
            )}
              </button>
            </div>
            </Link>
          </div>
          
      ))}
      
    </div>
  );
};

export default DiscountCard;
