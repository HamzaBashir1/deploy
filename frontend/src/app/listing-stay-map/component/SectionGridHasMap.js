// SectionGridHasMap Component
"use client";

import React, { useState, useEffect, useContext } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ButtonClose from "../../Shared/ButtonClose";
import Heading2 from "../../Shared/Heading2";
import Pagination from "../../Shared/Pagination";
import useFetchData from "../../hooks/useFetchData";
import TabFilters from "./TabFilters";
import StayCard2 from "./StayCard2";
import { FormContext } from "../../FormContext";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useSearchParams } from "next/navigation";
import Checkbox from "../../Shared/Checkbox";
import AnyReactComponent from "./AnyReactComponent";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const SectionGridHasMap = () => {
  const [currentHoverID, setCurrentHoverID] = useState(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [stayListings, setStayListings] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [cityReady, setCityReady] = useState(false); // Tracks when `city` is updated
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { sortOption, updatesort } = useContext(FormContext); 
  const {
    location,
    person,
    city,
    updateCity,
    country,
    drop,
    pricemins,
    updatepricemins,
    pricemaxs,
    Bathroomss,
    rentalform,
    updateacclen,
    acclen,
    Bedss,
    Equipment,
    enddate,
    startdate,
  } = useContext(FormContext);
  const searchParams = useSearchParams(); // Access query parameters 
  const title = searchParams.get("title"); // Get the 'title' parameter from the URL
  console.log("Title from URL:", title); // Log the title value to the console

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const formattedStartDate = startdate
    ? new Date(startdate).toISOString().split("T")[0]
    : "";
  const formattedEndDate = enddate
    ? new Date(enddate).toISOString().split("T")[0]
    : "";
  console.log("city", city);

  const queryParameters = [
    `category=${drop || ""}`,
    `city=${city || ""}`,
    `location=${location || ""}`,
    `country=${country || ""}`,
    `minPrice=${pricemins || ""}`,
    `maxPrice=${pricemaxs || ""}`,
    `equipmentAndServices=${Equipment || ""}`,
    `bedroomCount=${Bedss > 0 ? Bedss : ""}`,
    `bathroomCount=${Bathroomss > 0 ? Bathroomss : ""}`,
    `startDate=${formattedStartDate}`,
    `endDate=${formattedEndDate}`,
    `rentalform=${rentalform || ""}`,
    `person=${person > 0 ? person : ""}`,
  ]
    .filter(Boolean)
    .join("&");

  useEffect(() => {
    if (title) {
      updateCity(title.toLowerCase());
      setCityReady(true); // Mark city as ready after the update
    } else {
      setCityReady(true); // Still mark city as ready to fetch all properties
    }
  }, [title, updateCity]);

  // Fetch data only when city is ready
  const { data: accommodationData, loading, error } = useFetchData(
    cityReady
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/accommodations/searching?${queryParameters}`
      : null // Prevent API call if city isn't ready
  );
  useEffect(() => {
    if (accommodationData) {
      setShowLoading(true);
      let sortedListings = Array.isArray(accommodationData) ? accommodationData : [];
  
      // Sort listings based on sortOption
      if (sortOption === "lowToHigh") {
        sortedListings.sort((a, b) => a.priceMonThus - b.priceMonThus);
      } else if (sortOption === "highToLow") {
        sortedListings.sort((a, b) => b.priceMonThus - a.priceMonThus);
      }
  
      setStayListings(sortedListings); // Update state with sorted listings
      updateacclen(sortedListings.length);
      const timer = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [accommodationData, sortOption]); // Include sortOption as a dependency
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedListings = stayListings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(stayListings.length / itemsPerPage);

  const defaultLocation = { latitude: 48.669, longitude: 19.699 };

  const selectedLocation = {
    lat: accommodationData?.[0]?.location?.latitude || defaultLocation.latitude,
    lng: accommodationData?.[0]?.location?.longitude || defaultLocation.longitude,
  };

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (!stayListings || stayListings.length === 0)
    return <div className="mt-8 text-center">No accommodations found.</div>;

  return (
    <div>
      <div className="relative flex min-h-screen">
        {/* Cards Section */}
        <div className="min-h-screen w-full xl:w-[60%] 2xl:w-[60%] max-w-[1184px] flex-shrink-0 xl:px-8">
          <Heading2 className="!mb-8" title="Explore Accommodations" />
          <div className="mb-8 lg:mb-11">
            <TabFilters />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 2xl:gap-x-6 gap-y-8">
            {paginatedListings.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID(item.id)}
                onMouseLeave={() => setCurrentHoverID(-1)}
              >
                <StayCard2 data={item} />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-16">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* Show Map Button */}
        {!showFullMapFixed && (
          <div
            className="fixed z-30 flex items-center justify-center px-6 py-2 space-x-3 text-sm text-white transform -translate-x-1/2 rounded-full shadow-2xl cursor-pointer xl:hidden bottom-16 md:bottom-8 left-1/2 bg-neutral-900"
            onClick={() => setShowFullMapFixed(true)}
          >
            <i className="text-lg las la-map"></i>
            <span>Show map</span>
          </div>
        )}

        {/* Map Section */}
        <div
          className={`xl:flex-1 xl:static xl:block ${
            showFullMapFixed ? "fixed inset-0 z-50" : "hidden"
          }`}
        >
          {showFullMapFixed && (
            <ButtonClose
              onClick={() => setShowFullMapFixed(false)}
              className="absolute z-50 w-10 h-10 bg-white shadow-lg left-3 top-3 rounded-xl"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            <div className="absolute bottom-5 left-3 lg:bottom-auto lg:top-2.5 lg:left-1/2 transform lg:-translate-x-1/2 py-2 px-4 bg-white shadow-xl z-10 rounded-2xl min-w-max">
              <Checkbox
                className="text-xs xl:text-sm"
                name="xx"
                label="Search as I move the map"
              />
            </div>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation}
                zoom={5}
              >
                {stayListings.map((item) => (
                  <Marker
                    key={item.id}
                    position={{
                      lat: item.location.latitude,
                      lng: item.location.longitude,
                    }}
                    label={currentHoverID === item.id ? "Selected" : undefined}
                  />
                ))}
              </GoogleMap>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
