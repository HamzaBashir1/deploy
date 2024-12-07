"use client";

import { MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FormContext } from "../FormContext";

const LocationInput = ({
  onChange = () => {},
  className = "",
  defaultValue = "United States",
  headingText = "Where to?", 
}) => {
  const [value, setValue] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const { updateLocation } = useContext(FormContext);
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const handleSelectLocation = (item) => {
    setTimeout(() => {
      setValue(item);
      onChange && onChange(item);
      updateLocation(item); // Store the selected location in updateLocation
    }, 0);
  };

  const renderSearchValues = ({ heading, items }) => {
    return (
      <>
        <p className="block text-base font-semibold">
          {heading || "Destinations"}
        </p>
        <div className="mt-3">
          {items.map((item) => {
            return (
              <div
                className="flex items-center py-2 mb-1 space-x-3 text-sm"
                onClick={() => handleSelectLocation(item)}
                key={item}
              >
                <MapPinIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                <span className="">{item}</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className={`${className}`} ref={containerRef}>
      <div className="p-5">
        <span className="block text-xl font-semibold sm:text-2xl">
          {headingText}
        </span>
        <div className="relative mt-5">
          <input
            className={`block w-full bg-transparent border px-4 py-3 pr-12 border-neutral-900 dark:border-neutral-200 rounded-xl focus:ring-0 focus:outline-none text-base leading-none placeholder-neutral-500 dark:placeholder-neutral-300 truncate font-bold placeholder:truncate`}
            placeholder={"Search destinations"}
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <MagnifyingGlassIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-400" />
          </span>
        </div>
        <div className="mt-7">
          {value
            ? renderSearchValues({
                heading: "Locations",
                items: [
                  "Afghanistan",
                  "Albania",
                  "Algeria",
                  "American Samoa",
                  "Andorra",
                ],
              })
            : renderSearchValues({
                heading: "Popular destinations",
                items: [
                  "Australia",
                  "Canada",
                  "Germany",
                  "United Kingdom",
                  "United Arab Emirates",
                ],
              })}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;
