"use client";
import React from "react";
import { BiGlobe } from "react-icons/bi";
import { BsMailbox, BsReply, BsCheck } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

const Information = ({ data }) => {
  const name = data?.name || "Accommodation Name";
  const description = data?.description || "No description available";
  const persons = data?.person || "N/A";
  const bedroomCount = data?.bedroomCount || "N/A";
  const bathroomCount =data?.bathroomCount || "N/A";
  const equipmentAndServices = data?.equipmentAndServices || [];
  const children = data?.children || [];
  const arrivalAndDeparture = data?.arrivalAndDeparture || {};
  const responseSpeed = data?.responseSpeed || [];
  const contactDetails = data?.contactDetails || {};

  return (
    <div className="rounded-lg p-6 mt-5 bg-white lg:mr-[440px] lg:ml-[18px]">
      <h1 className="mb-4 text-xl font-bold">Information about accommodation</h1>
      <p className="mb-4">
        {name} | <span>{persons} Person</span> | {bedroomCount} bedrooms | {bathroomCount} bathrooms
      </p>

      <p className="mb-4">
        <span className="font-bold">{name}</span>
      </p>

      <p className="mb-4">
        <span className="font-bold">Accommodation</span> {description}
      </p>

      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className="grid grid-cols-1 gap-4 mb-12 sm:grid-cols-2">
        <div className="bg-[#E7EAEE] p-5">
          <h1 className="mb-2 font-bold">Equipment and services</h1>
          {equipmentAndServices.length > 0 ? (
            equipmentAndServices.map((service, index) => (
              <div key={index} className="flex items-center mb-2">
                <BsCheck className="mr-2" />
                <p>{service}</p>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>

        <div className="bg-[#E7EAEE] p-5">
          <h1 className="mb-2 font-bold">Children</h1>
          {children.length > 0 ? (
            children.map((children, index) => (
              <div key={index} className="flex items-center mb-2">
                <BsCheck className="mr-2" />
                <p>{children}</p>
              </div>
            ))
          ) : (
            <p>No services available</p>
          )}
        </div>

        

        {/* <div className="bg-[#E7EAEE] p-5">
          <h1 className="mb-2 font-bold">Sport and entertainment</h1>
          <div className="flex items-center mb-2">
            <BsCheck className="mr-2" />
            <p>Bicycle storage</p>
          </div>
          <div className="flex items-center mb-2">
            <BsCheck className="mr-2" />
            <p>Ski room</p>
          </div>
          <div className="flex items-center">
            <BsCheck className="mr-2" />
            <p>Social games</p>
          </div>
        </div>
        
        <div className="bg-[#E7EAEE] p-5">
          <h1 className="mb-2 font-bold">Wellness & spa</h1>
          <div className="flex items-center mb-2">
            <BsCheck className="mr-2" />
            <p>Outdoor pool</p>
          </div>
          <div className="flex items-center mb-2">
            <BsCheck className="mr-2" />
            <p>Children's pool</p>
          </div>
          <div className="flex items-center mb-2">
            <BsCheck className="mr-2" />
            <p>Hot tub</p>
          </div>
          <div className="flex items-center">
            <BsCheck className="mr-2" />
            <p>Sauna</p>
          </div>
        </div> */}
        
      </div>

      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className="mb-12">
        <div className="flex items-center mb-2">
          <CiLock className="mr-2" />
          <p>
            Check-in: <span className="font-bold">from {arrivalAndDeparture?.arrivalFrom || "N/A"} to {arrivalAndDeparture?.arrivalTo || "N/A"}</span>, Check-out:
            <span className="font-bold">{arrivalAndDeparture?.departureFrom || "N/A"} to {arrivalAndDeparture?.departureTo || "N/A"}</span>
          </p>
        </div>
        <div className="flex items-center mb-2">
          <BiGlobe className="mr-2" />
          <p>
            Language: <span className="font-bold">Slovak, English</span>
          </p>
        </div>
        <div className="flex items-center">
          <BsReply className="mr-2" />
          <p>
            Response speed: <span className="font-bold">{responseSpeed}</span>
          </p>
        </div>
      </div>

      <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />

      <div className="flex flex-col items-center justify-between sm:flex-row">
        <div className="flex items-center mb-4 sm:mb-0">
          <img src="/map" alt="Map" className="w-12 h-12 mr-4 rounded-full" />
          <div>
            <h1 className="font-bold">{contactDetails?.host}</h1>
            
          </div>
        </div>

        <div>
          <button className="flex items-center p-2 text-white bg-blue-500 rounded-lg">
            <BsMailbox className="mr-2" />
            Contact accommodation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Information;
