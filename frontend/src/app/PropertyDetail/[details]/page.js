"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "../component/Heading";
import Location from "../component/Location";
import DateComponent from "../component/Date"; // Renamed to avoid conflict with Date object
import ReservationCard from "../component/ReservationCard";
import Navbar from "../component/Navbar";
import Persons from "../component/Persons";
import Diet from "../component/Diet";
import CommonSection from "../../List-Page/component/CommonSection";
import Loading from "../../components/Loader/Loading.js";
import Error from "../../components/Error/Error.js";
import Footer from "../../components/Footer/Footer.js";
import { Base_URL } from "../../config";
import Photo from "../component/Photo";
import Information from "../component/Information";
import Overlook from "../component/Overlook";
import { PiLessThanBold } from "react-icons/pi";
import Email from "../../components/Email";
import Card from "../component/Card";
import Overview from "../component/Overview";
import { BiCopy, BiHeart, BiSolidCopy, BiSolidHeart } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import StickyFooter from "../component/StickyFooter";
import Ratings from "../component/Ratings";

const Page = ({ params }) => {
  const [accommodationData, setAccommodationData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [showSharjeelOnly, setShowSharjeelOnly] = useState(false);
  const [id, setid] = useState("");
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const latitude = accommodationData?.location?.latitude;
  const longitude = accommodationData?.location?.longitude;
  const [scrolled, setScrolled] = useState(false);
  const [dotCoords, setDotCoords] = useState({ x: 0, y: 0 });
  const [showDot, setShowDot] = useState(false);

  const styles = {
    st0: {
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    st1: {
      fontFamily: "Roboto, sans-serif",
    },
    st2: {
      fontSize: "14px",
    },
  };

  // Define Slovakia's bounding box
  const SLOVAKIA_BOUNDS = {
    north: 49.603,
    south: 47.728,
    west: 16.84,
    east: 22.57,
  };

  // Function to convert lat/lon to SVG coordinates
  const convertLatLonToXY = (latitude, longitude) => {
    const mapWidth = 800;
    const mapHeight = 500;

    const x =
      ((longitude - SLOVAKIA_BOUNDS.west) /
        (SLOVAKIA_BOUNDS.east - SLOVAKIA_BOUNDS.west)) *
      mapWidth;
    const y =
      ((SLOVAKIA_BOUNDS.north - latitude) /
        (SLOVAKIA_BOUNDS.north - SLOVAKIA_BOUNDS.south)) *
      mapHeight;

    return { x, y };
  };

  useEffect(() => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    if (
      isNaN(lat) ||
      isNaN(lon) ||
      lat < SLOVAKIA_BOUNDS.south ||
      lat > SLOVAKIA_BOUNDS.north ||
      lon < SLOVAKIA_BOUNDS.west ||
      lon > SLOVAKIA_BOUNDS.east
    ) {
      // alert('Coordinates are not within Slovakia')
      setShowDot(false);
    } else {
      const { x, y } = convertLatLonToXY(lat, lon);
      setDotCoords({ x, y });
      setShowDot(true);
    }
    if (latitude && longitude) {
      const { x, y } = convertLatLonToXY(latitude, longitude);
      setDotCoords({ x, y });
      console.log("X and Y:", x, y); // Log x and y here
      console.log(
        `Latitude: ${latitude}, Longitude: ${longitude}, X: ${x}, Y: ${y}`
      );
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setScrolled(true); // Apply green background after scrolling 50px
      } else {
        setScrolled(false); // Revert to original background when at top
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up event listener
    };
  }, []);

  // State to manage selected date range

  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchAccommodationData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/${params.details}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setAccommodationData(result);
        setid(result._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAccommodationData();
  }, [params.details, router]);

  // Logging the fetched data for debugging
  console.log("Accommodation Data:", accommodationData);

  const handleDateChange = (newRange) => {
    setSelectedRange(newRange); // Update the selected range when dates are changed
  };

  if (loading) {
    return <Loading />; // Render Loading component
  }

  if (error) {
    return <Error message={error} />; // Render Error component with message prop
  }

  // Scroll to specific section when tab is clicked
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews/${url}`
      );
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        const totalRatings = result.data.reduce(
          (sum, review) => sum + review.overallRating,
          0
        );
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
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async (propertyId) => {
    if (!user) {
      toast.error("You need to be logged in to add favorites.");
      return;
    }

    const isFavorite = favorite.includes(propertyId);

    if (isFavorite) {
      toast.info("This accommodation is already in your favorites!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            accommodationId: propertyId,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Added to favorites!");
        setFavorite([...favorite, propertyId]);
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Error updating favorite: " + error.message);
    }
  };

  // Function to remove favorite status
  const removeFavorite = async (propertyId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/remove/${propertyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
            accommodationId: propertyId,
          }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        toast.success("Removed from favorites!");
        setFavorite(favorite.filter((id) => id !== propertyId));
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      toast.error("Error updating favorite: " + error.message);
    }
  };

  // Handle toggling between add and remove favorite
  const handleToggleFavorite = (propertyId) => {
    const isFavorite = favorite.includes(propertyId);
    if (isFavorite) {
      removeFavorite(propertyId);
    } else {
      toggleFavorite(propertyId);
    }
  };

  // Fetch user favorites on mount
  const fetchMyFavorites = async () => {
    if (!user) {
      toast.error("You need to be logged in to view favorites.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/favorite/my-favorites?userId=${user._id}`
      );
      const result = await response.json();
      if (response.ok) {
        setFavorite(result.favorites || []);
        console.log("Fetched Favorites:", result.favorites);
      } else {
        console.error(result.error);
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      toast.error("Error fetching favorites: " + error.message);
    }
  };

  const handleCopyLink = () => {
    const accommodationUrl = `${window.location.origin}/accommodation/${_id}`;

    navigator.clipboard
      .writeText(accommodationUrl)
      .then(() => {
        setIsCopied(true); // Set copied state
        toast.success("Link copied!"); // Show success toast when link is copied
        setTimeout(() => {
          setIsCopied(false); // Reset icon after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        toast.error("Failed to copy the link.");
        console.error("Error copying link:", err);
      });
  };

  const handleClick = () => {
    scrollToSection("location"); // Call scrollToSection directly
  };

  const handleChooseDateClick = () => {
    scrollToSection("date");
  };

  // Handle save click - scroll to card
  const handleSaveClick = () => {
    scrollToSection("card");
  };

  const handleChooseDateClicks = () => {
    console.log("date");
    scrollToSection("date");
  };

  const name = accommodationData?.name || "N/A";
  const location = accommodationData?.location?.address || "Unknown Location";
  const price = accommodationData?.price || "N/A";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main container with consistent max-width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero section with heading */}
        <div className="py-6">
          <div className="hidden md:block">
            {/* <Heading data={accommodationData} handleClick={handleClick} /> */}
          </div>
        </div>

        {/* Sticky navigation bar */}
        <nav
          className={`sticky top-0 z-50 bg-white border-b border-gray-200 ${
            scrolled ? "shadow-sm" : ""
          }`}
        >
          <div className="flex items-center justify-between h-16">
            {/* Left side navigation */}
            <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar">
              <button
                onClick={() => router.back()}
                className="flex items-center px-3 py-2 text-sm text-emerald-600 hover:text-emerald-700"
              >
                <IoIosArrowBack className="mr-1" />
                Back
              </button>

              {/* Navigation links with consistent styling */}
              {[
                "Overview",
                "Occupancy",
                "Information",
                "Location",
                "Don't Overlook",
                "Diet",
                "Ratings",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 whitespace-nowrap"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center space-x-4 px-4">
              <button
                onClick={() => handleToggleFavorite(id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {favorite.includes(id) ? (
                  <BiSolidHeart className="w-6 h-6 text-red-600" />
                ) : (
                  <BiHeart className="w-6 h-6 text-emerald-600" />
                )}
              </button>
              <button
                onClick={handleCopyLink}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                {isCopied ? (
                  <BiSolidCopy className="w-6 h-6 text-blue-600" />
                ) : (
                  <BiCopy className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Photo gallery */}
        <div className="py-6">
          <Photo data={accommodationData} />
        </div>

        {/* Mobile header */}
        <div className="flex justify-between items-start py-4 md:hidden">
          <div className="space-y-1">
            <h1 className="text-xl font-semibold text-gray-900">{name}</h1>
            <p className="text-sm text-gray-600">{location}</p>
          </div>
          <div className="flex-shrink-0">
            {/* Slovakia map component */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 900 600"
              className="cursor-pointer"
              onClick={handleClick}
            >
              {/* Map path and dot remain the same */}
            </svg>
          </div>
        </div>

        {/* Main content layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Main content */}
          <div className="flex-1 space-y-8">
            <div id="overview">
              <Overview data={accommodationData} />
              <div className="block md:hidden mt-2">
                <Card
                  data={accommodationData}
                  selectedRange={selectedRange}
                  onSave={handleChooseDateClicks}
                />
              </div>
            </div>

            {/* Other sections with consistent spacing */}
            {[
              { id: "date", Component: DateComponent },
              { id: "information", Component: Information },
              { id: "location", Component: Location },
              { id: "Overlook", Component: Overlook },
              { id: "diet", Component: Diet },
              { id: "ratings", Component: Ratings },
            ].map(({ id, Component }) => (
              <section key={id} id={id} className="py-0">
                <Component
                  data={accommodationData}
                  onDateChange={id === "date" ? handleDateChange : undefined}
                  userId={
                    id === "ratings" ? accommodationData?.userId : undefined
                  }
                />
              </section>
            ))}
          </div>

          {/* Right column - Sticky card */}
          <div className="hidden lg:block w-[400px] flex-shrink-0">
            <div className="sticky top-24">
              <Card
                data={accommodationData}
                selectedRange={selectedRange}
                onSave={handleChooseDateClicks}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer sections */}
      <div className="mt-12">
        <StickyFooter
          data={accommodationData}
          buttonText="Choose a date"
          selectedRange={selectedRange}
          onSave={handleSaveClick}
          onChooseDate={handleChooseDateClick}
        />
        <Email />
        <Footer />
      </div>
    </div>
  );
};

export default Page;
