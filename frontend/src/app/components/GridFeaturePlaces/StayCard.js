"use client";
import React, { useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import StartRating from "./StarRating";
import GallerySlider from "./GallerySlider";
import Link from "next/link";

const StayCard = ({ data, size = "default", className = "" }) => {
  const [favorite, setFavorite] = useState([]);

  const {
    id,
    images = [],
    propertyType,
    location,
    name,
    bedroomCount,
    price,
    reviews = [],
    reviewCount,
  } = data;

  console.log("data ",data)
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard_${id}`}
          ratioClass="aspect-w-4 aspect-h-3"
          galleryImgs={images}
        />
        <div className="absolute right-3 top-3 z-[1] bg-[#00000059] rounded-full p-1 sm:p-2">
          {favorite.includes(id) ? (
            <BiSolidHeart
              className="text-xl text-white sm:text-2xl"
              onClick={() => setFavorite((fav) => fav.filter((favId) => favId !== id))}
            />
          ) : (
            <BiHeart
              className="text-xl text-white sm:text-2xl"
              onClick={() => setFavorite((fav) => [...fav, id])}
            />
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-4 space-y-4" : "p-3 space-y-2"}>
      <Link href={`/listing-stay-detail/${data._id}`}> 
      <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            {propertyType} · {bedroomCount} beds
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-medium capitalize ${
                size === "default" ? "text-lg" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{name}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-2 text-sm text-neutral-500 dark:text-neutral-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
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
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{location?.address}</span>
          </div>
        </div>
        <div className="border-b w-14 border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">
            {price}
            {size === "default" && (
              <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
                /night
              </span>
            )}
          </span>
          {!!reviews.length && (
            <StartRating reviewCount={reviewCount} point={reviews[0]?.rating || 0} />
          )}
        </div>
        </Link>
      </div>
    );
  };

  return (
    <div
      className={`nc-StayCard group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden will-change-transform hover:shadow-xl transition-shadow ${className}`}
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard;
