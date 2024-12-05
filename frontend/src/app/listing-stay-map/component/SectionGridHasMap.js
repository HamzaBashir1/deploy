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

const containerStyle = {
  width: "100%",
  height: "100%",
};

const SectionGridHasMap = () => {
  
  const [currentHoverID, setCurrentHoverID] = useState(-1);
  const [showFullMapFixed, setShowFullMapFixed] = useState(false);
  const [stayListings, setStayListings] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  const {
    location,
    person,
    city,
    country,
    drop,
    pricemins,
    pricemaxs,
    Bathroomss,
    Bedss,
    Equipment,
    enddate,
    startdate,
  } = useContext(FormContext);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const formattedStartDate = startdate
    ? new Date(startdate).toISOString().split("T")[0]
    : "";
  const formattedEndDate = enddate
    ? new Date(enddate).toISOString().split("T")[0]
    : "";

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
    `person=${person > 0 ? person : ""}`,
  ]
    .filter(Boolean)
    .join("&");

  const { data: accommodationData, loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/accommodations/searching?${queryParameters}`
  );

  useEffect(() => {
    if (accommodationData) {
      setShowLoading(true);
      setStayListings(accommodationData);
      const timer = setTimeout(() => setShowLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [accommodationData]);

  const defaultLocation = { latitude: 48.669, longitude: 19.699 };

  const selectedLocation = {
    lat: accommodationData?.[0]?.location?.latitude || defaultLocation.latitude,
    lng: accommodationData?.[0]?.location?.longitude || defaultLocation.longitude,
  };

  if (loading) return <Loading />;
  if (error) return <Error/>;
  if (!accommodationData || accommodationData.length === 0)
    return <div className="text-center mt-8">No accommodations found.</div>;

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
            {stayListings.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCurrentHoverID(item.id)}
                onMouseLeave={() => setCurrentHoverID(-1)}
              >
                <StayCard2 data={item} />
              </div>
            ))}
          </div>
          <div className="flex mt-16 justify-center items-center">
            <Pagination />
          </div>
        </div>

        {/* Show Map Button */}
        {!showFullMapFixed && (
          <div
            className="flex xl:hidden items-center justify-center fixed bottom-16 md:bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-neutral-900 text-white shadow-2xl rounded-full z-30 space-x-3 text-sm cursor-pointer"
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
              className="bg-white absolute z-50 left-3 top-3 shadow-lg rounded-xl w-10 h-10"
            />
          )}

          <div className="fixed xl:sticky top-0 xl:top-[88px] left-0 w-full h-full xl:h-[calc(100vh-88px)] rounded-md overflow-hidden">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selectedLocation}
                zoom={12}
                options={{
                  disableDefaultUI: true,
                  zoomControl: true,
                  styles: [
                    {
                      featureType: "poi",
                      elementType: "labels",
                      stylers: [{ visibility: "off" }],
                    },
                  ],
                }}
              >
                {stayListings.map((item) => (
                  <Marker
                    key={item.id}
                    position={{
                      lat: item.location?.latitude,
                      lng: item.location?.longitude,
                    }}
                    label={item.name}
                  />
                ))}
              </GoogleMap>
            ) : (
              <div className="text-center mt-8">Loading Map...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionGridHasMap;
