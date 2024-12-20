"use client"
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import GallerySlider from "../../Shared/GallerySlider";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import StartRating from "../../Shared/StartRating";
import Link from "next/link";


const StayCardH = ({ className = "", data, }) => {
    const [favorite, setFavorite] = useState([]);
    const { user } = useContext(AuthContext);
  
    const {
      _id,  // Using _id as the propertyId
      images = [],
      propertyType,
      locationDetails,
      name,
      bedroom,
      beds,
      bathroom,
      priceMonThus,
      reviews = [],
      reviewCount,
      reviewStart
    } = data;
  
    console.log("id", _id);
  
    // Fetching user favorites when user context is available
    useEffect(() => {
      if (user) {
        fetchMyFavorites(user._id);
      }
    }, [user]);
  
    const fetchMyFavorites = async (userId) => {
      if (!userId) {
        toast.error("You need to be logged in to view favorites.");
        return;
      }
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/my-favorites?userId=${userId}`);
        const result = await response.json();
        if (response.ok) {
          setFavorite(result.favorites || []); // Ensure favorites is an array
          console.log("Fetched Favorites:", result.favorites);
        } else {
          console.error(result.error);
          toast.error(result.error || "Error fetching favorites.");
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
        toast.error("Error fetching favorites: " + error.message);
      }
    };
  
    const toggleFavorite = async (_id) => {  // Updated to use _id
      if (!user) {
        toast.error("You need to be logged in to add favorites.");
        return;
      }
  
      const isFavorite = favorite.includes(_id);  // Using _id
  
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
            accommodationId: _id,  // Updated to use _id
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          toast.success("Added to favorites!");
          setFavorite([...favorite, _id]);  // Using _id
        } else {
          console.error(result.error);
          toast.error(result.error || "Error adding to favorites.");
        }
      } catch (error) {
        console.error("Error updating favorite:", error);
        toast.error("Error adding to favorites: " + error.message);
      }
    };
  
    const removeFavorite = async (_id) => {  // Updated to use _id
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/favorite/remove/${_id}`, {  // Using _id
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            accommodationId: _id,  // Updated to use _id
          }),
        });
  
        const result = await response.json();
        if (response.ok) {
          toast.success("Removed from favorites!");
          setFavorite(favorite.filter((id) => id !== _id));  // Using _id
        } else {
          console.error(result.error);
          toast.error(result.error || "Error removing from favorites.");
        }
      } catch (error) {
        console.error("Error updating favorite:", error);
        toast.error("Error removing from favorites: " + error.message);
      }
    };
  
    const handleToggleFavorite = (_id) => {  // Updated to use _id
      const isFavorite = favorite.includes(_id);  // Using _id
      if (isFavorite) {
        removeFavorite(_id);  // Using _id
      } else {
        toggleFavorite(_id);  // Using _id
      }
    };

  const renderSliderGallery = () => {
    return (
      <div className="relative flex-shrink-0 w-full md:w-72">
        <GallerySlider
          // uniqueID={`StayCard2_${_id}`}
          ratioClass="aspect-w-2 aspect-h-2"
          galleryImgs={images}
          href={`/listing-stay-detail/${_id}`} // Pass _id for the link
          stayId={_id}
          imageClass="rounded-lg"
        />
        <div className="absolute right-3 top-3 z-[1] bg-[#00000059] rounded-full p-1 sm:p-2">
                  {favorite.includes(_id) ? (  // Using _id
                    <BiSolidHeart
                      className="text-xl text-white sm:text-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(_id);  // Using _id
                      }}
                    />
                  ) : (
                    <BiHeart
                      className="text-xl text-white sm:text-2xl"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(_id);  // Using _id
                      }}
                    />
                  )}
        </div>
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="hidden sm:grid grid-cols-3 gap-2">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-user text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              6 guests
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-bed text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {beds} beds
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-bath text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {bathroom} baths
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-smoking-ban text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              No smoking
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <i className="las la-door-open text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {bedroom} bedrooms
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <i className="las la-wifi text-lg"></i>
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Wifi
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:p-5 flex flex-col">
        <div className="space-y-2">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            <span>
            {propertyType} in {locationDetails?.streetAndNumber}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
        </div>
        <div className="hidden sm:block w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        {renderTienIch()}
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800 my-4"></div>
        <div className="flex justify-between items-end">
        {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
          <span className="text-base font-semibold text-secondary-500">
            {priceMonThus}
            {` `}
            <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
              /night
            </span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCardH group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow will-change-transform ${className}`}
      data-nc-id="StayCardH"
    >
      <Link href={`/listing-stay-detail/${_id}`} className="absolute inset-0"></Link>
      <div className="grid grid-cols-1 md:flex md:flex-row">
        {renderSliderGallery()}
        {renderContent()}
      </div>
    </div>
  );
};

export default StayCardH;
