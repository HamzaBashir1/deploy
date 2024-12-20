"use client";
import React, { useEffect, useState, useContext } from "react";
import { BsBox, BsStarFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";
import {
  BiCopy,
  BiHeart,
  BiSolidCopy,
  BiSolidHeart,
  BiUpload,
} from "react-icons/bi";
import { Base_URL } from "../../config";
import { FaUserFriends } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import useFetchData from "../../hooks/useFetchData";

const Heading = ({ data, handleClick }) => {
  // Safely access data using optional chaining
  const name = data?.name || "Accommodation Name";
  const location = data?.location?.address || "Unknown Location"; // Access specific location field
  const latitude = data?.location?.latitude;
  const url = data._id;
  const longitude = data?.location?.longitude;
  const rating = data?.rating || 5.0;
  const persons = data?.person || 8;
  const isVerified = data?.verified || false;
  const _id = data?._id || "N/A";
  // Assuming data.images is an array of image URLs
  const { user } = useContext(AuthContext);
  const [ratingsData, setRatingsData] = useState({});
  const [favorite, setFavorite] = useState([]);
  const [isCopied, setIsCopied] = useState(false);

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

  const [dotCoords, setDotCoords] = useState({ x: 0, y: 0 });
  const [showDot, setShowDot] = useState(false);

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

  console.log("Dot Coordinates:", dotCoords);

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

  useEffect(() => {
    if (user) {
      fetchMyFavorites(user._id);
    }
  }, [user]);

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

  const {
    data: ReviewData,
    loading: fetchLoading,
    error,
  } = useFetchData(`${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${data._id}`);

  // Calculate the average rating from all reviews
  const totalRating = ReviewData.reduce(
    (acc, review) => acc + review.overallRating,
    0
  );
  const averageRating =
    ReviewData.length > 0 ? totalRating / ReviewData.length : 0; // Calculate average

  if (fetchLoading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="pt-10 ">
      {/* Heading Section */}
      <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
        {/* Left Section */}
        <div className="flex flex-col mb-4 space-y-2 lg:mb-0">
          <h1 className="text-2xl font-bold md:text-2xl lg:text-3xl">{name}</h1>
          <div className="flex justify-between">
            <div className="flex flex-col space-y-2 md:flex-row md:space-x-4 md:items-center md:space-y-0">
              <h2 className="text-sm md:text-base">{location}</h2>
              {/* Optional: Show latitude and longitude if available */}
              {/* {latitude && longitude && (
                              <h2 className="text-sm text-gray-500">({latitude}, {longitude})</h2>
                          )} */}

              <div className="flex items-center space-x-1">
                <h2 className="text-sm font-bold md:text-base">
                  {averageRating > 0
                    ? averageRating.toFixed(1)
                    : "No Ratings Yet"}
                </h2>
                <div className="flex space-x-1">
                  {/* Render stars based on the average rating */}
                  {[...Array(Math.round(averageRating))].map((_, i) => (
                    <BsStarFill key={i} className="text-yellow-500" />
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <FaUserFriends />
                <h2 className="text-sm md:text-base">{persons} persons</h2>
              </div>

              <div className="flex items-center space-x-2">
                <MdVerified
                  className={isVerified ? "text-green-500" : "text-gray-500"}
                />
                <h2 className="text-sm font-bold md:text-base">
                  {isVerified ? "Verified accommodation" : "Not Verified"}
                </h2>
              </div>
            </div>
            <div className="block md:hidden">
              <div className="" style={{ aspectRatio: "1/1" }}>
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 900 600"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  onClick={handleClick}
                >
                  <path
                    d="M770,223.382l-0.994,3.269l-0.94,4.528l-0.604,4.567l0.054,3.347l-2.014,1.719l-4.996,0.737l-2.283,1.801 l-2.82,8.302l-1.612,3.515l-0.161,0.971l0.013,2.553l-0.255,1.205l-1.222,1.767l-3.116,2.644l-0.988,1.421l-0.247,0.355 l-0.859,2.408l-0.094,1.54l0.255,1.612l0.282,6.689l-0.295,1.335l-0.9,2.262l-1.128,1.63l-1.222,0.968l-0.994,1.294l-0.403,2.637 l0.161,4.225l-0.833,4.182l-1.585,3.672l-2.081,2.766l-1.571,1.027l-3.465,1.108l-1.598,1.098l-0.98,1.382l-1.356,3.135 l-0.806,1.432l-8.487,6.89l-1.947,3.197l-0.269,3.977l1.518,7.949l-0.457,3.081l-1.437,3.191l-0.121,14.109l-2.458,3.16 l-2.27,1.805l-2.417,0.708l-7.775-0.768l-2.35,0.152l-2.39,0.829l-6.782,0.354l-1.894,0.748l-3.962,2.274l-5.6,0.839l-6.728,3.45 l-3.948,0.343l-4.069-1.394l-3.438-2.551l-3.075-3.598l-7.279-11.216l-1.061-2.095l-1.692-8.09l-1.128-2.229l-2.216-0.501 l-4.794,0.066l-2.068-0.953l-0.873-1.378l-1.182-3.801l-0.859-1.683l-1.115-1.019l-2.35-0.928l-4.365-2.617l-1.893-0.578 l-6.742,2.146l-4.432,0.096l-2.176,0.446l-2.538,1.506l-1.088,1.83l-0.739,2.089l-1.517,2.199l-1.92,1.084l-1.477-0.649 l-1.612-1.363l-2.35-1.034l-4.311,0.983l-10.058,4.824l-3.29-0.765l-2.619-2.594l-3.626-1.647l-3.827-0.689l-3.25,0.253 l-4.633-0.416l-7.077-4.34l-4.083-0.436l-1.88-0.492l-3.854-3.53l-2.014-1.065l-2.108,0.036l-27.49,6.375l-8.057,0.548 l-3.747,1.511l-0.148,1.48l-0.04,1.632l0.255,3.4l0.081,0.689l0.013,0.694l-0.054,0.699l-0.108,0.689l-1.746,2.618l-0.295,0.313 l-3.949,4.192l-1.947,2.576l-1.504,3.04l-5.049,15.526l-2.713,5.639l-3.25,4.986l-3.774,3.813l-2.968,1.553l-1.571-0.671 l-1.464-1.619l-2.592-1.311l-1.464,0.646l-3.921,3.631l-2.176,0.968l-2.283-0.242l-1.329-0.494l-1.115,0.222l-1.625,1.936 l-0.51,1.371l-0.712,3.507l-0.953,1.743l-1.074,0.851l-2.457,0.952l-5.169,3.179l-0.431,0.265l-4.942,1.551l-2.995,1.857 l-5.882,5.509l-3.062,1.127l-2.699-1.036l-4.942-4.488l-3.196-1.022l-4.687,1.797l-1.236-0.161l-1.222-1.847l0.322-1.646 l0.739-1.681l-0.067-1.913l-2.31-2.81l-3.048-0.504l-5.989,1.169l-1.303-0.68l-2.82-3.501l-1.477-1.26l-1.303-0.383l-1.383-0.045 l-11.952,3.19l-2.243,1.305l-1.423,2.836l-1.222,7.541l-1.544,3.079l-0.04,0.09l-0.027,0.091l0.027,0.121l0.04,0.131l0.201,1.066 l0.067,1.056l-0.067,1.026l-0.201,1.006l-6.956,4.957l-17.538-0.372l-7.762,4.995l-1.423,0.291l-16.115-1.974l-7.776,1.14 l-2.553-0.122l-2.927-0.14l-1.907,0.894l-6.266,1.413l-12.361,2.786l-2.27,1.858l-3.478,7.247l-1.236,1.073l-2.525,0.431 l-1.182,0.692l-1.692,2.091l0.174,0.717l0.9,0.777l0.43,2.241l-1.303,8.007l-0.322,4.081l0.846,3.629l3.801,3.733l4.996,3.657 l-0.2,0.071l-3.198,1.134l-2.941,0.78l-2.256,1.68l-4.297,4.933l-3.169,1.964l-3.787,0.4l-3.881-0.759l-4.727-2.094l-5.828-0.425 l-26.603,3.108l-9.723,3.966l-4.821,0.459l-16.021-1.663l-29.767,1.926l-7.513,0.486l-10.878-2.971l-2.956-1.602l-5.531-2.999 l-1.356-1.519l-1.021-1.989l-2.404-2.3l-2.699-1.94l-1.934-0.97l-1.464,0.22l-1.303,0.64l-1.343,0.05l-1.585-1.635l-4.391-6.609 l-1.209-0.801l-3.263-0.691l-1.343-0.561l-1.276-1.181l-13.335-17.92l-4.096-3.401l-8.474-1.285l-1.346-0.377l-5.382-1.51 l-4.687-1.014l-4.741,2.881l-3.035-2.735l-4.203-1.501l-2.981-1.637l0.698-3.189l-1.558-1.301l-0.51-0.321l0.739-3.617l0.671-1.97 l1.33-1.644l-1.692-1.815l-0.617-1.127l-1.948-3.555l-1.37-0.88l-2.082-0.322l-1.786-1.097l-3.277-3.603l-0.927-3.035l-0.014-4.225 l-0.618-3.526l-2.028-7.006l-0.054-0.933l0.175-2.234l-0.121-0.847l-0.484-0.676l-0.806-0.277l-1.437-1.312l-1.182-0.545 l-0.994-0.641l-0.43-1.151l-0.161-0.888l-0.416-1.12l-0.443-0.979l-0.349-0.414l-0.564-0.404l0.242-0.99l0.51-1.131l0.295-0.868 l-0.591-1.551l-1.329-1.49l-1.37-1.132l-0.739-0.435l-2.619-0.278l-1.007-0.611L30,362.546l0.081-2.148l0.228-0.89l0.322-0.581 l0.336-1.234l1.155-10.451l0.537-2.799l1.316-2.638l3.398-4.913l0.685-2.609l0.967-1.85l2.149-1.739l2.135-2.261l0.28-1.003 l0.687-2.466l-1.209-9.185l0.322-3.732l2.055-2.514l1.491-2.739l6.567-18.988l3.196-5.46l4.472-3.883l1.867-2.375l0.765-3.722 l1.182-1.836l6.983-5.102l5.815-1.245l6.245,1.633l14.826,7.539l2.256-0.428l2.533-1.666l2.382-1.568l3.089-0.908l1.894,0.918 l3.975,4.212l4.754,0.744l24.965-9.855l2.296-1.909l4.485-7.741l2.095-1.747l3.196-0.552l2.74,0.47l2.484-0.143l2.39-2.34 l1.061-2.709l1.007-6.126l0.806-2.937l1.719-3.459l2.726-1.761l3.142-0.491l6.97,0.543l4.311-1.986l3.827-3.575l2.699-4.58 l0.859-4.357l-0.166-8.869l-0.022-1.195l0.47-5.328l1.652-6.523l2.431-6.065l3.129-5.102l3.827-3.632l17.485-6.836l4.806-3.775  l3.063-2.407l0.322-9.475l3.787,0.856l2.914-1.919l5.533-6.791l4.271-2.303l1.074-1.095l0.658-1.756l0.322-3.719l0.671-1.643 l2.672-1.695l5.748,0.837l3.706-1.964l0.9-0.186l0.9,0.186l4.257,2.15l3.76,1.158l3.639-0.207l5.331-4.921l2.431-0.931l5.318-0.145 l12.865,1.189l3.76,2.306l-1.141,3.369l0.134,2.852l0.631,2.706l0.336,2.964l-0.537,6.564l0.725,2.249l2.538,0.475l3.29-0.258 l5.022-2.93l2.834-0.671l1.195,0.413l2.578,1.888l1.249,0.64l1.343,0.093l3.263-0.65l4.002-1.609l0.94-1.6l0.336-2.487l0.913-3.892 l0.376-0.083l1.598-0.041l0.577-0.434l0.309-1.332l-0.255-0.95l-0.416-0.599l-0.228-0.227l2.082-6.49l1.773-2.843l1.893-1.81 l2.122-1.045l2.498-0.538l4.002,0.041l1.343-0.217l1.84-0.745l0.98-0.848l11.267-12.454l0.497-0.994l0.752-0.331l0.714,0.294 l1.099,0.452l2.189,3.874l0.98,1.046l3.048,2.029l1.571,4.026l2.363,10.095l2.095,6.366l0.671,1.426l2.229,1.725l2.713,0.733 l5.197,0.052l-0.604,1.26l-0.201,1.084l0.081,3.128l-0.276,2.35l-0.007,0.059l7.467,2.553l2.833,0.309l2.632-0.268l4.351-1.754 l1.168,0.888l0.027,0.02l1.209,3.775l0.658,3.32l0.766,9.644l-0.201,0.814l-0.994,1.493l-0.079,0.829l-0.001,0.016l0.457,0.669 l1.773,1.318l0.013,0.01l0.208,0.452l0.034,0.073l0.987,1.041l0.048,0.05l0.242,0.865l-0.309,1.122l-0.752,0.443l-0.833,0.237 l-0.578,0.473l-4.915,8.042l-0.524,2.621l1.679,2.322l3.277,1.202l5.989,0.452l2.887-1.069l1.829-1.894l2.536-2.628l2.35-1.748 l4.163-0.463l3.612,1.881l6.701,6.32l4.311,2.116l2.538-1.962l1.343-4.973l0.739-6.95l1.612-1.954l0.9-2.212l0.739-2.367 l2.484-5.59l0.739-0.989l0.322,0.309l2.86,0.34l1.276-1.195l2.833-3.389l1.974-1.113l10.032-0.886l0.645-0.886l0.927-2.762 l0.671-2.846l0.269-1.836l0.484-1.238l1.329-1.001l1.544-0.031l5.318,2.012l6.715-0.258l-0.027-3.435l2.028-0.464l10.985,5.622 l2.847,0.701l3.075-1.103l1.491-1.403l2.068-2.569l1.329-0.753l1.195-0.083l2.807,0.423l4.915-0.794l2.028,0.361l11.536,13.827 l2.055,1.504l2.914,0.453l2.216-0.134l2.041,0.309l2.431,1.813l2.122,2.214l2.108,1.534l2.39,0.453l3.048-1.102l2.807-2.44 l4.244-6.233l2.672-2.607l2.041-0.433l2.74-0.031l2.404-0.484l1.061-1.825l-1.585-3.011l-2.995-1.826l-1.585-1.816l2.632-2.951 l1.987-0.949l5.278-1.074l2.014,0.186l2.35,1.621l1.853,2.074l1.988,1.372l2.793-0.464l2.229-2.095l4.056-6.029l2.35-1.632 l1.799,0.434l7.279,3.893l12.664,3.592l2.149-0.021l4.821-1.063l1.907,0.568l2.369-0.964l1.968-0.801l9.306-1.053l2.431,0.63 l1.316,0.888l2.417,2.363l1.316,0.918l0.98,0.134l2.014-0.454l1.289,0.382l2.189,2.249l4.365,6.744l2.001,1.629l1.356-0.907 l1.84-2.196l2.243-2.062l2.619-0.485l2.377,1.361l4.767,4.402l6.997,3.504l4.687,4.429l3.733,6.054l1.638,7.027l0.859,6.334 l3.68,2.703l9.199,1.757l4.23,2.732l1.504,0.668l1.303,0.082l3.116-0.38l1.074,0.205l1.423,1.592l0.013,1.396l-0.362,1.283 l0.295,1.252l0.967,0.831l6.097,1.868l7.185-0.277l2.766,1.098l6.58,6.637l4.767,1.466l10.166,0.441L770,223.382z"
                    fill="#f0f0f0"
                    stroke="#000"
                    strokeWidth="2"
                  />
                  {showDot && (
                    <circle
                      cx={dotCoords.x}
                      cy={dotCoords.y}
                      r="15"
                      fill="red"
                    />
                  )}
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 ">
          <div className="hidden pt-3 sm:block">
            <div className="relative" style={{ aspectRatio: "1/1" }}>
              <svg
                width="110"
                height="80"
                viewBox="0 0 800 500"
                className=""
                onClick={handleClick}
              >
                <path
                  d="M770,223.382l-0.994,3.269l-0.94,4.528l-0.604,4.567l0.054,3.347l-2.014,1.719l-4.996,0.737l-2.283,1.801 l-2.82,8.302l-1.612,3.515l-0.161,0.971l0.013,2.553l-0.255,1.205l-1.222,1.767l-3.116,2.644l-0.988,1.421l-0.247,0.355 l-0.859,2.408l-0.094,1.54l0.255,1.612l0.282,6.689l-0.295,1.335l-0.9,2.262l-1.128,1.63l-1.222,0.968l-0.994,1.294l-0.403,2.637 l0.161,4.225l-0.833,4.182l-1.585,3.672l-2.081,2.766l-1.571,1.027l-3.465,1.108l-1.598,1.098l-0.98,1.382l-1.356,3.135 l-0.806,1.432l-8.487,6.89l-1.947,3.197l-0.269,3.977l1.518,7.949l-0.457,3.081l-1.437,3.191l-0.121,14.109l-2.458,3.16 l-2.27,1.805l-2.417,0.708l-7.775-0.768l-2.35,0.152l-2.39,0.829l-6.782,0.354l-1.894,0.748l-3.962,2.274l-5.6,0.839l-6.728,3.45 l-3.948,0.343l-4.069-1.394l-3.438-2.551l-3.075-3.598l-7.279-11.216l-1.061-2.095l-1.692-8.09l-1.128-2.229l-2.216-0.501 l-4.794,0.066l-2.068-0.953l-0.873-1.378l-1.182-3.801l-0.859-1.683l-1.115-1.019l-2.35-0.928l-4.365-2.617l-1.893-0.578 l-6.742,2.146l-4.432,0.096l-2.176,0.446l-2.538,1.506l-1.088,1.83l-0.739,2.089l-1.517,2.199l-1.92,1.084l-1.477-0.649 l-1.612-1.363l-2.35-1.034l-4.311,0.983l-10.058,4.824l-3.29-0.765l-2.619-2.594l-3.626-1.647l-3.827-0.689l-3.25,0.253 l-4.633-0.416l-7.077-4.34l-4.083-0.436l-1.88-0.492l-3.854-3.53l-2.014-1.065l-2.108,0.036l-27.49,6.375l-8.057,0.548 l-3.747,1.511l-0.148,1.48l-0.04,1.632l0.255,3.4l0.081,0.689l0.013,0.694l-0.054,0.699l-0.108,0.689l-1.746,2.618l-0.295,0.313 l-3.949,4.192l-1.947,2.576l-1.504,3.04l-5.049,15.526l-2.713,5.639l-3.25,4.986l-3.774,3.813l-2.968,1.553l-1.571-0.671 l-1.464-1.619l-2.592-1.311l-1.464,0.646l-3.921,3.631l-2.176,0.968l-2.283-0.242l-1.329-0.494l-1.115,0.222l-1.625,1.936 l-0.51,1.371l-0.712,3.507l-0.953,1.743l-1.074,0.851l-2.457,0.952l-5.169,3.179l-0.431,0.265l-4.942,1.551l-2.995,1.857 l-5.882,5.509l-3.062,1.127l-2.699-1.036l-4.942-4.488l-3.196-1.022l-4.687,1.797l-1.236-0.161l-1.222-1.847l0.322-1.646 l0.739-1.681l-0.067-1.913l-2.31-2.81l-3.048-0.504l-5.989,1.169l-1.303-0.68l-2.82-3.501l-1.477-1.26l-1.303-0.383l-1.383-0.045 l-11.952,3.19l-2.243,1.305l-1.423,2.836l-1.222,7.541l-1.544,3.079l-0.04,0.09l-0.027,0.091l0.027,0.121l0.04,0.131l0.201,1.066 l0.067,1.056l-0.067,1.026l-0.201,1.006l-6.956,4.957l-17.538-0.372l-7.762,4.995l-1.423,0.291l-16.115-1.974l-7.776,1.14 l-2.553-0.122l-2.927-0.14l-1.907,0.894l-6.266,1.413l-12.361,2.786l-2.27,1.858l-3.478,7.247l-1.236,1.073l-2.525,0.431 l-1.182,0.692l-1.692,2.091l0.174,0.717l0.9,0.777l0.43,2.241l-1.303,8.007l-0.322,4.081l0.846,3.629l3.801,3.733l4.996,3.657 l-0.2,0.071l-3.198,1.134l-2.941,0.78l-2.256,1.68l-4.297,4.933l-3.169,1.964l-3.787,0.4l-3.881-0.759l-4.727-2.094l-5.828-0.425 l-26.603,3.108l-9.723,3.966l-4.821,0.459l-16.021-1.663l-29.767,1.926l-7.513,0.486l-10.878-2.971l-2.956-1.602l-5.531-2.999 l-1.356-1.519l-1.021-1.989l-2.404-2.3l-2.699-1.94l-1.934-0.97l-1.464,0.22l-1.303,0.64l-1.343,0.05l-1.585-1.635l-4.391-6.609 l-1.209-0.801l-3.263-0.691l-1.343-0.561l-1.276-1.181l-13.335-17.92l-4.096-3.401l-8.474-1.285l-1.346-0.377l-5.382-1.51 l-4.687-1.014l-4.741,2.881l-3.035-2.735l-4.203-1.501l-2.981-1.637l0.698-3.189l-1.558-1.301l-0.51-0.321l0.739-3.617l0.671-1.97 l1.33-1.644l-1.692-1.815l-0.617-1.127l-1.948-3.555l-1.37-0.88l-2.082-0.322l-1.786-1.097l-3.277-3.603l-0.927-3.035l-0.014-4.225 l-0.618-3.526l-2.028-7.006l-0.054-0.933l0.175-2.234l-0.121-0.847l-0.484-0.676l-0.806-0.277l-1.437-1.312l-1.182-0.545 l-0.994-0.641l-0.43-1.151l-0.161-0.888l-0.416-1.12l-0.443-0.979l-0.349-0.414l-0.564-0.404l0.242-0.99l0.51-1.131l0.295-0.868 l-0.591-1.551l-1.329-1.49l-1.37-1.132l-0.739-0.435l-2.619-0.278l-1.007-0.611L30,362.546l0.081-2.148l0.228-0.89l0.322-0.581 l0.336-1.234l1.155-10.451l0.537-2.799l1.316-2.638l3.398-4.913l0.685-2.609l0.967-1.85l2.149-1.739l2.135-2.261l0.28-1.003 l0.687-2.466l-1.209-9.185l0.322-3.732l2.055-2.514l1.491-2.739l6.567-18.988l3.196-5.46l4.472-3.883l1.867-2.375l0.765-3.722 l1.182-1.836l6.983-5.102l5.815-1.245l6.245,1.633l14.826,7.539l2.256-0.428l2.533-1.666l2.382-1.568l3.089-0.908l1.894,0.918 l3.975,4.212l4.754,0.744l24.965-9.855l2.296-1.909l4.485-7.741l2.095-1.747l3.196-0.552l2.74,0.47l2.484-0.143l2.39-2.34 l1.061-2.709l1.007-6.126l0.806-2.937l1.719-3.459l2.726-1.761l3.142-0.491l6.97,0.543l4.311-1.986l3.827-3.575l2.699-4.58 l0.859-4.357l-0.166-8.869l-0.022-1.195l0.47-5.328l1.652-6.523l2.431-6.065l3.129-5.102l3.827-3.632l17.485-6.836l4.806-3.775  l3.063-2.407l0.322-9.475l3.787,0.856l2.914-1.919l5.533-6.791l4.271-2.303l1.074-1.095l0.658-1.756l0.322-3.719l0.671-1.643 l2.672-1.695l5.748,0.837l3.706-1.964l0.9-0.186l0.9,0.186l4.257,2.15l3.76,1.158l3.639-0.207l5.331-4.921l2.431-0.931l5.318-0.145 l12.865,1.189l3.76,2.306l-1.141,3.369l0.134,2.852l0.631,2.706l0.336,2.964l-0.537,6.564l0.725,2.249l2.538,0.475l3.29-0.258 l5.022-2.93l2.834-0.671l1.195,0.413l2.578,1.888l1.249,0.64l1.343,0.093l3.263-0.65l4.002-1.609l0.94-1.6l0.336-2.487l0.913-3.892 l0.376-0.083l1.598-0.041l0.577-0.434l0.309-1.332l-0.255-0.95l-0.416-0.599l-0.228-0.227l2.082-6.49l1.773-2.843l1.893-1.81 l2.122-1.045l2.498-0.538l4.002,0.041l1.343-0.217l1.84-0.745l0.98-0.848l11.267-12.454l0.497-0.994l0.752-0.331l0.714,0.294 l1.099,0.452l2.189,3.874l0.98,1.046l3.048,2.029l1.571,4.026l2.363,10.095l2.095,6.366l0.671,1.426l2.229,1.725l2.713,0.733 l5.197,0.052l-0.604,1.26l-0.201,1.084l0.081,3.128l-0.276,2.35l-0.007,0.059l7.467,2.553l2.833,0.309l2.632-0.268l4.351-1.754 l1.168,0.888l0.027,0.02l1.209,3.775l0.658,3.32l0.766,9.644l-0.201,0.814l-0.994,1.493l-0.079,0.829l-0.001,0.016l0.457,0.669 l1.773,1.318l0.013,0.01l0.208,0.452l0.034,0.073l0.987,1.041l0.048,0.05l0.242,0.865l-0.309,1.122l-0.752,0.443l-0.833,0.237 l-0.578,0.473l-4.915,8.042l-0.524,2.621l1.679,2.322l3.277,1.202l5.989,0.452l2.887-1.069l1.829-1.894l2.536-2.628l2.35-1.748 l4.163-0.463l3.612,1.881l6.701,6.32l4.311,2.116l2.538-1.962l1.343-4.973l0.739-6.95l1.612-1.954l0.9-2.212l0.739-2.367 l2.484-5.59l0.739-0.989l0.322,0.309l2.86,0.34l1.276-1.195l2.833-3.389l1.974-1.113l10.032-0.886l0.645-0.886l0.927-2.762 l0.671-2.846l0.269-1.836l0.484-1.238l1.329-1.001l1.544-0.031l5.318,2.012l6.715-0.258l-0.027-3.435l2.028-0.464l10.985,5.622 l2.847,0.701l3.075-1.103l1.491-1.403l2.068-2.569l1.329-0.753l1.195-0.083l2.807,0.423l4.915-0.794l2.028,0.361l11.536,13.827 l2.055,1.504l2.914,0.453l2.216-0.134l2.041,0.309l2.431,1.813l2.122,2.214l2.108,1.534l2.39,0.453l3.048-1.102l2.807-2.44 l4.244-6.233l2.672-2.607l2.041-0.433l2.74-0.031l2.404-0.484l1.061-1.825l-1.585-3.011l-2.995-1.826l-1.585-1.816l2.632-2.951 l1.987-0.949l5.278-1.074l2.014,0.186l2.35,1.621l1.853,2.074l1.988,1.372l2.793-0.464l2.229-2.095l4.056-6.029l2.35-1.632 l1.799,0.434l7.279,3.893l12.664,3.592l2.149-0.021l4.821-1.063l1.907,0.568l2.369-0.964l1.968-0.801l9.306-1.053l2.431,0.63 l1.316,0.888l2.417,2.363l1.316,0.918l0.98,0.134l2.014-0.454l1.289,0.382l2.189,2.249l4.365,6.744l2.001,1.629l1.356-0.907 l1.84-2.196l2.243-2.062l2.619-0.485l2.377,1.361l4.767,4.402l6.997,3.504l4.687,4.429l3.733,6.054l1.638,7.027l0.859,6.334 l3.68,2.703l9.199,1.757l4.23,2.732l1.504,0.668l1.303,0.082l3.116-0.38l1.074,0.205l1.423,1.592l0.013,1.396l-0.362,1.283 l0.295,1.252l0.967,0.831l6.097,1.868l7.185-0.277l2.766,1.098l6.58,6.637l4.767,1.466l10.166,0.441L770,223.382z"
                  fill="#ffffff"
                  stroke="#000"
                  strokeWidth="2"
                  transform="scale(1.0, 1.) translate(0, -110)"
                  {...(showDot && (
                    <circle
                      cx={dotCoords.x}
                      cy={dotCoords.y}
                      r="15"
                      fill="green"
                      className="absolute bg-slate-950"
                    />
                  ))}
                />
                {showDot && (
                  <circle
                    cx={dotCoords.x}
                    cy={dotCoords.y}
                    r="15"
                    fill="green"
                    className="absolute bg-slate-950"
                  />
                )}
              </svg>
            </div>
          </div>
          {/* </div> */}
          {favorite.includes(_id) ? (
            <BiSolidHeart
              className="text-xl sm:block hidden sm:text-2xl text-[#DC2626] cursor-pointer hover:text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(_id); // Call the new handle function
              }}
            />
          ) : (
            <BiHeart
              className="text-xl sm:text-2xl sm:block hidden text-[#4FBE9F] cursor-pointer hover:text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(_id); // Call the new handle function
              }}
            />
          )}
          {/* Copy link functionality */}
          {isCopied ? (
            <BiSolidCopy
              className="hidden text-xl text-blue-500 cursor-pointer md:text-2xl sm:block"
              onClick={handleCopyLink}
            />
          ) : (
            <BiCopy
              className="hidden text-xl cursor-pointer sm:block md:text-2xl hover:text-blue-500"
              onClick={handleCopyLink}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Heading;
