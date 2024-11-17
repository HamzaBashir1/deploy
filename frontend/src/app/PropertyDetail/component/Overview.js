import React, { useState, useEffect } from "react";
import { BsStarFill, BsWifi } from "react-icons/bs";
import { GiPoolDive, GiKnifeFork } from "react-icons/gi";
import { FaParking, FaSmokingBan, FaPaw } from "react-icons/fa";
import { toast } from "react-toastify";
import { Base_URL } from "../../config";

const Feature = ({ icon, title, description }) => (
  <div className="group transition-all duration-300 hover:bg-gray-50 rounded-xl p-3 cursor-pointer">
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const RatingStars = ({ rating }) => (
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <BsStarFill
        key={star}
        className={`w-5 h-5 transition-colors duration-300 ${
          star <= rating ? "text-yellow-400" : "text-gray-200"
        }`}
      />
    ))}
  </div>
);

const Overview = ({ data, accommodationId }) => {
  const [ratingsData, setRatingsData] = useState({
    averageRating: 0,
    ratingsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${Base_URL}/reviews/${accommodationId}`);
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const totalRatings = result.data.reduce(
          (sum, review) => sum + review.overallRating,
          0
        );
        setRatingsData({
          averageRating: totalRatings / result.data.length,
          ratingsCount: result.data.length,
        });
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (accommodationId) {
      fetchReviews();
    }
  }, [accommodationId]);

  const features = [
    {
      enabled: data?.wifi,
      icon: <BsWifi size={24} />,
      title: "Wi-Fi",
      description: data?.wifi,
    },
    {
      enabled: data?.wellness,
      icon: <GiPoolDive size={24} />,
      title: "Wellness",
      description: data?.wellness,
    },
    {
      enabled: data?.diet,
      icon: <GiKnifeFork size={24} />,
      title: "Diet",
      description: data?.diet,
    },
    {
      enabled: data?.parking,
      icon: <FaParking size={24} />,
      title: "Parking",
      description: data?.parking,
    },
    {
      enabled: data?.smoking,
      icon: <FaSmokingBan size={24} />,
      title: "Smoking",
      description: data?.smoking,
    },
    {
      enabled: data?.pets,
      icon: <FaPaw size={24} />,
      title: "Pets",
      description: data?.pets,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-6">
                Amenities & Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map(
                  (feature, index) =>
                    feature.enabled && (
                      <Feature
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                      />
                    )
                )}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">Guest Rating</h2>
              {isLoading ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-4">
                    {ratingsData.averageRating > 0
                      ? ratingsData.averageRating.toFixed(1)
                      : "New"}
                  </div>
                  <RatingStars rating={Math.round(ratingsData.averageRating)} />
                  <p className="text-sm text-gray-600 mt-4">
                    {ratingsData.ratingsCount}{" "}
                    {ratingsData.ratingsCount === 1 ? "rating" : "ratings"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
