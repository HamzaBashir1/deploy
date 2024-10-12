"use client";
import React, { useState, useEffect, useContext } from "react";
import { BsStarFill, BsWifi } from "react-icons/bs";
import { GiPoolDive, GiKnifeFork } from "react-icons/gi";
import { FaParking, FaSmokingBan, FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";
import { Base_URL } from "../../config";

const Overview = ({ data, accommodationId }) => {
  const [ratingsData, setRatingsData] = useState({ averageRating: 0, ratingsCount: 0 });

  // Fetch reviews based on accommodationId
  const fetchReviews = async () => {
    try {
      const response = await fetch(`${Base_URL}/reviews/${accommodationId}`);
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
      toast.error("Failed to fetch reviews.");
    }
  };

  useEffect(() => {
    if (accommodationId) {
      fetchReviews();
    }
  }, [accommodationId]);

  return (
    <div className="bg-[#f8f8f8]">
      <div className="flex flex-col lg:ml-4 lg:flex-row lg:space-x-8">
        <div className="flex-1">
          <div className="flex flex-col p-4 bg-white lg:rounded-lg sm:p-8 lg:flex-row lg:space-x-8">
            {/* Features and Evaluation Section */}
            <div className="flex-1 mb-8 lg:mb-0">
              <div className="flex flex-col justify-between mb-8 space-y-6 md:flex-row md:space-y-0">
                {/* Features Section */}
                <div className="grid grid-cols-1 gap-6 p-4 bg-white rounded-lg sm:grid-cols-2">
                  {data?.wifi && <Feature icon={<BsWifi size={24} />} title="Wi-Fi" description={data.wifi} />}
                  {data?.wellness && <Feature icon={<GiPoolDive size={24} />} title="Wellness" description={data.wellness} />}
                  {data?.parking && <Feature icon={<FaParking size={24} />} title="Parking" description={data.parking} />}
                  {data?.smoking && <Feature icon={<FaSmokingBan size={24} />} title="Smoking" description={data.smoking} />}
                  {data?.pets && <Feature icon={<FaPaw size={24} />} title="Pets" description={data.pets} />}
                  {data?.diet && <Feature icon={<GiKnifeFork size={24} />} title="Diet" description={data.diet} />}
                </div>

                {/* Evaluation Section */}
                <div className="flex flex-col items-center flex-shrink-0 w-full p-4 bg-white rounded-lg md:w-1/3">
                  <h1 className="mb-2 text-lg font-bold">Evaluation</h1>
                  <h2 className="mb-2 text-3xl font-bold">
                    {ratingsData.averageRating > 0 ? ratingsData.averageRating.toFixed(1) : "No Ratings Yet"}
                  </h2>
                  <div className="flex mb-2">
                    {/* Render stars based on the average rating */}
                    {[...Array(Math.round(ratingsData.averageRating || 0))].map((_, i) => (
                      <BsStarFill key={i} className="text-yellow-500" />
                    ))}
                  </div>
                  <p className="text-sm">{ratingsData.ratingsCount} ratings</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-center p-4 space-x-4">
    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h1 className="font-bold">{title}</h1>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Overview;