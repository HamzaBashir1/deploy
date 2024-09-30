"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { BiHeart, BiPlus } from 'react-icons/bi';
import { BsPersonCircle } from 'react-icons/bs';
import { CiLocationOn, CiSearch, CiStar } from 'react-icons/ci';
import { AuthContext } from "../../context/AuthContext";
import LineChart from "./LineChart";
import { Base_URL } from "../../config.js";
import useFetchData from '../../hooks/useFetchData.js';
import Loading from '../../components/Loader/Loading.js';
import Error from '../../components/Error/Error.js';
import { MdLocalParking, MdOutlinePets } from 'react-icons/md';
import { IoWifi } from 'react-icons/io5';

const AccommodationShow = () => {
  const { user } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ratingsData, setRatingsData] = useState({});

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { data: accommodationData, loading, error } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/accommodation`);

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

  return (
    <div>
      <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between items-start md:items-center">
          <div className="flex flex-col">
            <h1 className="text-[#292A34] font-bold text-xl md:text-2xl">Accommodation</h1>
            {/* <p className="text-[#292A34B2] text-sm md:text-xs font-medium">Apartment Košice </p> */}
          </div>

          <div className="hidden md:flex md:flex-row md:items-center gap-4 cursor-pointer" onClick={toggleMenu}>
            <CiSearch className="text-xl text-gray-500" />
            <button className="flex items-center bg-white text-black border border-gray-300 px-4 py-2 rounded-lg space-x-2 hover:bg-gray-100">
              <BiPlus className="text-lg" />
              <span>Add Accommodation</span>
            </button>
            <div className="flex items-center gap-2">
              {user?.photo ? (
                <img
                  src={user?.photo}
                  alt="User Profile"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <BsPersonCircle className="text-[#292A34] text-xl" />
              )}
              <h1 className="text-[#292A34] text-sm">{user?.name || 'User'}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row">
        <div className="flex-1">
          <img src="/putko.png" className="rounded-lg" alt="Accommodation" />
          <div className="flex-row">
            <FaCheckCircle />
            <p>Verified accommodation</p>
          </div>
          <hr className="my-2" />
          <p>Accommodation name</p>
          <p>Total capacity: <span className="font-bold">2 beds</span></p>
          <p>Number of Apartment: <span className="font-bold">1</span></p>
        </div>

        <div className="flex-1">
          <div className="p-1 bg-slate-300 flex justify-between">
            <h1>Views</h1>
            <p>Statistics</p>
          </div>
          <LineChart />
        </div>
      </div>

      {loading && <Loading />}
      {error && <Error />}
      
      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {accommodationData && accommodationData.map((property) => {
            const ratingsInfo = ratingsData[property._id] || { averageRating: 0, ratingsCount: 0 };
            const { averageRating, ratingsCount } = ratingsInfo;

            return (
              <div key={property._id} className="flex flex-col w-full max-w-xs overflow-hidden border rounded-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
                <div className="relative w-full h-56 sm:h-64">
                  <img
                    src={property.images[0] || "/bedroom.jpg"}
                    alt={property.name}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2 bg-[#00000059] rounded-full p-1 sm:p-2">
                    <BiHeart className="text-xl sm:text-2xl text-[#4FBE9F]" />
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h1 className="font-bold text-base sm:text-lg text-[#1F2937]">{property.name}</h1>
                  <p className="text-lg sm:text-sm text-[#666666]">
                    {property.person} persons, {property.bedroomCount} bedrooms, {property.bathroomCount} bathrooms
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                    {property.equipmentAndServices.includes("Parking") && (
                      <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                        <MdLocalParking className="text-[#292A34]" />
                      </div>
                    )}
                    {property.equipmentAndServices.includes("Free Wifi") && (
                      <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                        <IoWifi className="text-[#292A34]" />
                      </div>
                    )}
                    {property.pets.includes("They are not allowed") && (
                      <div className="border rounded-lg p-1 sm:p-2 flex items-center border-[#292A34]">
                        <MdOutlinePets className="text-[#292A34]" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center mt-2 sm:mt-3">
                    <CiLocationOn className="text-[#292A34]" />
                    <p className="text-xs sm:text-sm text-[#292A34] ml-1 sm:ml-2">
                      {property.location?.address || "Unknown location"}
                    </p>
                  </div>

                  <hr className="my-3 sm:my-4 h-0.5 bg-neutral-100 dark:bg-white/10" />
                  <div className="flex items-center justify-between">
                    <h1 className="text-sm font-bold sm:text-base lg:text-lg">
                      ${property.price} <span className="text-xs font-normal sm:text-sm lg:text-base">/night</span>
                    </h1>
                    <div className="flex items-center">
                      <CiStar className="text-[#DC2626]" />
                      <h1 className="ml-1 text-sm font-bold lg:text-lg md:text-base">{averageRating.toFixed(1)}</h1>
                      <p className="ml-1 text-xs text-gray-600 sm:text-sm lg:text-base md:text-sm sm:ml-2">({ratingsCount})</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AccommodationShow;