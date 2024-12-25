"use client";
import React, { useState, useEffect, useContext } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import StartRating from "./StarRating";
import GallerySlider from "./GallerySlider";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";
import { toast } from 'react-toastify';
import SaleOffBadge from "@/app/Shared/SaleOffBadge";
import Badge from "../Badge/Badge";

const StayCard = ({ data, size = "default", className = "" }) => {
  const [favorite, setFavorite] = useState([]);
  const { user } = useContext(AuthContext);

  const {
    _id,  // Using _id as the propertyId
    images = [],
    propertyType,
    locationDetails,
    name,
    beds,
    discount,
    priceMonThus,
    reviews = [],
    reviewCount,
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
        // toast.error(result.error || "Error fetching favorites.");
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      // toast.error("Error fetching favorites: " + error.message);
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
          uniqueID={`StayCard_${_id}`}
          ratioClass="aspect-w-4 aspect-h-3"
          galleryImgs={images}
          href={`/listing-stay-detail/${_id}`} // Pass _id for the link
          stayId={_id}
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
        {discount > 4 && <SaleOffBadge desc={discount} className="absolute left-3 top-3" />}
      </div>
    );
  };

  const renderContent = () => {
    const reviewCount = reviews.length || 0;
    const rating = reviews.length ? reviews[0]?.rating : 0;

    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
        <a href={`/listing-stay-detail/${_id}`}>
          <div className="space-y-2">
            <span className="text-sm text-neutral-500">
              {propertyType} · {beds} beds
            </span>
            <div className="flex items-center space-x-2">
            {reviewCount > 0 && <Badge name="ADS" color="green" />}
              <h2 className={`font-medium capitalize ${size === "default" ? "text-lg" : "text-base"}`}>
                <span className="line-clamp-1">{name}</span>
              </h2>
            </div>
            <div className="flex items-center space-x-2 text-sm text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{locationDetails?.streetAndNumber}</span>
            </div>
          </div>
          <div className="border-b w-14 my-2 border-neutral-100"></div>
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">
              €{priceMonThus}{" "}
              {size === "default" && (
                <span className="text-sm font-normal text-neutral-500">/night</span>
              )}
            </span>
            <StartRating reviewCount={reviewCount} point={rating} />
          </div>
        </a>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard group relative bg-white border border-neutral-100 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}>
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard;
