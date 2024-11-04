"use client";
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import useFetchData from '../../hooks/useFetchData.js';
import { AuthContext } from '../../context/AuthContext.js';
import { FormContext } from '../../FormContext.js';
import Loading from '../../components/Loader/Loading.js';
import Error from '../../components/Error/Error.js';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import Link from 'next/link.js';

const DiscountCard = () => {
  const router = useRouter();

  const { location } = useContext(FormContext); 
  const { user } = useContext(AuthContext); 
  const [ratingsData, setRatingsData] = useState({}); 
  const [favorite, setFavorite] = useState([]);   
  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    // Filter accommodations based on location and discount
    if (accommodationData) {
      const filtered = accommodationData.filter(property => 
        (location ? property.locationDetails.city === location : true) && 
        property.discount > 0
      );
      setFilteredProperties(filtered);
    }
  }, [accommodationData, location]);

  // Function to increment view count before navigating to the property details page

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
            toast.error(result.error); // Show any error message from the server
        }
    } catch (error) {
        console.error("Error updating favorite:", error);
        toast.error("Error updating favorite: " + error.message); // Fix error toast message
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
            // toast.error(result.error); // Show any error message from the server
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
            // toast.error(result.error);
        }
    } catch (error) {
        console.error("Error fetching favorites:", error);
        // toast.error("Error fetching favorites: " + error.message);
    }
};

  // Handle favorite toggle, view count, and fetch reviews as previously defined

  if (loading) return <Loading />;
  if (error) return <Error message="Failed to load accommodations." />;

  return (
    <div className='p-4'>
      {filteredProperties.length > 0 ? (
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3'>
          {filteredProperties.map((property) => (
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
                      until - {property.discount}%
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
                  <button>
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
      ) : (
        <div className="text-center text-gray-600">
          <p>No accommodations found for {location || 'any location'} with discounts available.</p>
        </div>
      )}
    </div>
  );
};

export default DiscountCard;
