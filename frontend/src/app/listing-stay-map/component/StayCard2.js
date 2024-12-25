"use client"

import React, {useContext, useState, useEffect} from "react";
import GallerySlider from "../../Shared/GallerySlider";
import Badge from "../../Shared/Badge";
import Link from "next/link";
import SaleOffBadge from "../../Shared/SaleOffBadge";
import BtnLikeIcon from "../../Shared/BtnLikeIcon";
import StartRating from "../../Shared/StartRating";
import { AuthContext } from "../../context/AuthContext";
import { BiHeart, BiSolidHeart } from "react-icons/bi";

// const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const StayCard2 = ({
  size = "default",
  className = "",
  data,
}) => {
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
      <div className="relative w-full">
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

  const renderContent = () => {
    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500">
            {propertyType} · {bedroom} beds
          </span>
          <div className="flex items-center space-x-2">
            {/* {isAds && <Badge name="ADS" color="green" />} */}
            <h2
              className={`font-semibold capitalize text-neutral-900 ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 text-sm space-x-1.5">
            {size === "default" && (
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 3 0 11-6 0 3 3 6 0 016 0z"
                />
              </svg>
            )}
            <span className="">{locationDetails?.streetAndNumber}</span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
          €{priceMonThus}
            {` `}
            {size === "default" && (
              <span className="text-sm text-neutral-500 font-normal">
                /night
              </span>
            )}
          </span>
          {!!reviewStart && (
            <StartRating reviewCount={reviewCount} point={reviewStart} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <a href={`/listing-stay-detail/${_id}`}>{renderContent()}</a>
    </div>
  );
};

export default StayCard2;
