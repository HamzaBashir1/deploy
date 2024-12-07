"use client"
import React, { useContext, useEffect, useState } from "react";
import HeaderFilter from "./GridFeaturePlaces/HeaderFilter";
import StayCard from "./GridFeaturePlaces/StayCard";
import { FormContext } from "../FormContext";
import useFetchData from "../hooks/useFetchData";

import Loading from "../components/Loader/Loading";
import Error from "../components/Error/Error.js";

const GridFeaturePlaces = ({
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Chisfis recommends for you",
  headingIsCenter,
  tabs = ["Bratislava", "Kosice", "trenčín", "žilina"],
}) => {
  const [stayListings, setStayListings] = useState([]);
  const { city, updateCity } = useContext(FormContext);
  const [activeTab, setActiveTab] = useState(null); // Track active tab
  const [displayCount, setDisplayCount] = useState(8); // Initial display count

  const {
    location,
    person,
    country,
    drop,
    pricemin,
    pricemax,
    Bathrooms,
    Beds,
    Equipment,
    pricemaxs,
    pricemins,
    Bedss,
    updatesorting,
    sort,
    Bathroomss,
    enddate,
    startdate,
    setLoadingProperties,
    loadingProperties,
  } = useContext(FormContext);

  const bedquery = Bedss > 0 ? Bedss : "";
  const bathbedquery = Bathroomss > 0 ? Bathroomss : "";
  const personquery = person > 0 ? person : "";

  const formattedStartDate =
    startdate && !isNaN(new Date(startdate))
      ? new Date(startdate).toISOString().split("T")[0]
      : "";
  const formattedEndDate =
    enddate && !isNaN(new Date(enddate))
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
    `bedroomCount=${bedquery || ""}`,
    `bathroomCount=${bathbedquery || ""}`,
    `startDate=${formattedStartDate || ""}`,
    `endDate=${formattedEndDate || ""}`,
    `person=${personquery || ""}`,
  ]
    .filter(Boolean)
    .join("&");

  const { data: accommodationData, loading, error } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/accommodations/searching?${queryParameters}`
  );

  useEffect(() => {
    if (accommodationData) {
      setStayListings(accommodationData);
    }
  }, [accommodationData]);

  const handleShowMore = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };
  

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab
    updateCity(tab); // Update city in FormContext
  };

  const renderCard = (stay) => {
    return <StayCard key={stay.id} data={stay} />;
  };

  return (
    <div className="relative nc-SectionGridFeaturePlaces">
      <HeaderFilter
        tabActive={activeTab} // Pass activeTab for styling
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
        onClickTab={handleTabClick} // Pass click handler
      />
      {stayListings && stayListings.length > 0 ? (
        <div
          className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
        >
          {stayListings.slice(0, displayCount).map((stay) => renderCard(stay))} {/* Limit the displayed cards */}
        </div>
      ) : (
        <div className="flex items-center justify-center mt-16">
          <p className="text-lg text-gray-500">No accommodation found</p>
        </div>
      )}
      {stayListings.length > displayCount && (
        <div className="flex items-center justify-center mt-16">
          <button
            onClick={handleShowMore} // Add the onClick handler
            className="ttnc-ButtonPrimary disabled:bg-opacity-70 bg-[#238869] hover:bg-[#14634b] text-neutral-50 relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium sm:px-6 px-4 py-3"
          >
            Show me more
          </button>
        </div>
      )}
    </div>
  );
};

export default GridFeaturePlaces;
