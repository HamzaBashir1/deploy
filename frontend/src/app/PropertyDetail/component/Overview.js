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
    <div className="border rounded-lg">
      <div className="lg:ml-4">
        <div className="p-4 rounded-lg sm:p-8">
          {/* Features and Evaluation Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start"> {/* Adjust flex direction */}
            {/* Features Section */}
            <div className="flex flex-wrap"> {/* Allow wrapping for small screens */}
              {data?.wifi && <Feature icon={<BsWifi size={20} />} title="Wi-Fi" description={data.wifi} />}
              {data?.wellness && <Feature icon={<GiPoolDive size={20} />} title="Wellness" description={data.wellness} />}
              {data?.diet && <Feature icon={<GiKnifeFork size={20} />} title="Diet" description={data.diet} />}
              {data?.parking && <Feature icon={<FaParking size={20} />} title="Parking" description={data.parking} />}
              {data?.smoking && <Feature icon={<FaSmokingBan size={20} />} title="Smoking" description={data.smoking} />}
              {data?.pets && <Feature icon={<FaPaw size={20} />} title="Pets" description={data.pets} />}
            </div>

            {/* Evaluation Section */}
            <div className="flex flex-col items-center p-4 rounded-lg mt-4 sm:mt-0 w-full sm:w-1/3"> {/* Responsive width */}
              <h1 className="mb-2 text-lg font-bold">Evaluation</h1>
              <h2 className="mb-2 text-2xl text-center font-bold">
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
  );
};

const Feature = ({ icon, title, description }) => (
  <div className="flex items-center p-2 space-x-4 m-2"> {/* Margin for spacing between features */}
    <div className="p-2 rounded-full">{icon}</div>
    <div>
      <h1 className="font-bold text-base">{title}</h1>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  </div>
);

export default Overview;