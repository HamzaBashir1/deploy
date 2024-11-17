import React, { useState } from "react";
import {
  BsCheck,
  BsPersonCircle,
  BsMailbox,
  BsChevronDown,
  BsChevronUp,
} from "react-icons/bs";
import { CiLock } from "react-icons/ci";
import { BiGlobe } from "react-icons/bi";
import useFetchData from "@/app/hooks/useFetchData";

const Information = ({ data }) => {
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const ITEMS_TO_SHOW = 2;

  const {
    name = "Accommodation Name",
    description = "No description available",
    persons = "N/A",
    equipmentAndServices = [],
    children = [],
    arrivalAndDeparture = {},
    responseSpeed = [],
    contactDetails = {},
    userId,
  } = data || {};

  // Combine children facilities with equipment and services
  const allAmenities = [...equipmentAndServices, ...children];

  const { data: userData } = useFetchData(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${userId?._id}`
  );

  const renderBadge = (text, icon) => (
    <span className="px-6 py-3 bg-[#58caaa]/10 text-[#58caaa] rounded-full text-sm font-medium flex items-center gap-2">
      {icon}
      {text}
    </span>
  );

  const renderPropertyOverview = () => (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 mb-8 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-bold text-neutral-900 mb-6">{name}</h1>
        <div className="flex flex-wrap gap-4 mb-8">
          {renderBadge(`${persons} persons`, <BsPersonCircle />)}
          {renderBadge("3 bedrooms", <CiLock />)}
          {renderBadge("3 bathrooms", <BiGlobe />)}
        </div>
        <p className="text-neutral-600 leading-relaxed text-lg max-w-4xl">
          {description}
        </p>
      </div>
    </div>
  );

  const renderAmenityItem = (item, index) => (
    <div
      key={index}
      className="flex items-center space-x-4 p-5 rounded-2xl hover:bg-[#58caaa]/5 transition-all duration-200 group border border-transparent hover:border-[#58caaa]/20"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-[#58caaa]/10 rounded-xl group-hover:bg-[#58caaa]/20 transition-colors">
        <BsCheck className="text-2xl text-[#58caaa]" />
      </div>
      <span className="text-neutral-700 dark:text-neutral-300 font-medium">
        {item}
      </span>
    </div>
  );

  const renderAmenitiesSection = () => (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 mb-8 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-neutral-900">
            Equipment and Services
          </h2>
          <span className="block mt-3 text-neutral-500 text-lg">
            Discover all the amenities, services, and children facilities
            available at this property
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allAmenities
            .slice(0, showAllAmenities ? allAmenities.length : ITEMS_TO_SHOW)
            .map(renderAmenityItem)}
        </div>

        {allAmenities.length > ITEMS_TO_SHOW && (
          <button
            onClick={() => setShowAllAmenities(!showAllAmenities)}
            className="mt-8 flex items-center space-x-2 text-[#58caaa] hover:text-[#4ab596] font-medium transition-colors"
          >
            <span>
              {showAllAmenities
                ? "Show less"
                : `Show all ${allAmenities.length} amenities`}
            </span>
            {showAllAmenities ? <BsChevronUp /> : <BsChevronDown />}
          </button>
        )}
      </div>
    </div>
  );

  const renderCheckInInfo = () => (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 mb-8 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-bold text-neutral-900 mb-10">
          Check-in Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
            <CiLock className="text-3xl text-[#58caaa] mt-1" />
            <div>
              <h3 className="font-medium text-neutral-900 mb-3">
                Check-in/out Times
              </h3>
              <p className="text-neutral-600 space-y-2">
                <span className="block">
                  Check-in:{" "}
                  <span className="font-medium">
                    {arrivalAndDeparture?.arrivalFrom} -{" "}
                    {arrivalAndDeparture?.arrivalTo}
                  </span>
                </span>
                <span className="block">
                  Check-out:{" "}
                  <span className="font-medium">
                    {arrivalAndDeparture?.departureFrom} -{" "}
                    {arrivalAndDeparture?.departureTo}
                  </span>
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
            <BiGlobe className="text-3xl text-[#58caaa] mt-1" />
            <div>
              <h3 className="font-medium text-neutral-900 mb-3">
                Languages Spoken
              </h3>
              <p className="text-neutral-600">
                <span className="font-medium">Slovak, English</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHostInfo = () => (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 p-10 w-full">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              {userData?.photo ? (
                <img
                  src={userData.photo}
                  alt="Host"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-offset-4 ring-[#58caaa]/20"
                />
              ) : (
                <BsPersonCircle className="w-20 h-20 text-neutral-400" />
              )}
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-[#58caaa] rounded-full border-4 border-white"></div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                {contactDetails?.host}
              </h3>
              <p className="text-neutral-500">
                Typically responds within {responseSpeed}
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center space-x-3 bg-[#58caaa] hover:bg-[#4ab596] text-white px-10 py-4 rounded-2xl transition-colors font-medium shadow-lg hover:shadow-xl">
            <BsMailbox className="text-xl" />
            <span>Contact Host</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full ">
      <div className="space-y-8">
        {renderPropertyOverview()}
        {renderAmenitiesSection()}
        {renderCheckInInfo()}
        {renderHostInfo()}
      </div>
    </div>
  );
};

export default Information;
