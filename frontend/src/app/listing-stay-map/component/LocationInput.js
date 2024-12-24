"use client";

import React, { useState, useRef, useEffect, useContext } from "react";
import { HiOutlineMapPin } from "react-icons/hi2";
import { CiClock2 } from "react-icons/ci";
import { CircleX } from "lucide-react";
import { FormContext } from "../../FormContext";

const LocationInput = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showPopover, setShowPopover] = useState(autoFocus);
  const { updateCity } = useContext(FormContext);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    const eventClickOutsideDiv = (event) => {
      if (!containerRef.current) return;
      if (!showPopover || containerRef.current.contains(event.target)) {
        return;
      }
      setShowPopover(false);
    };

    if (showPopover) {
      document.addEventListener("click", eventClickOutsideDiv);
    }

    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  const loadGoogleMapsScript = () => {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        `script[src="https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places"]`
      );

      if (existingScript) {
        existingScript.onload = resolve;
        existingScript.onerror = reject;
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = resolve;
      script.onerror = (error) => {
        console.error("Error loading Google Maps API", error);
        reject(error);
      };
      document.body.appendChild(script);
    });
  };

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      await loadGoogleMapsScript();
      const service = new window.google.maps.places.AutocompleteService();
      service.getPlacePredictions(
        {
          input,
          types: ["(cities)"], // Restrict to cities only
        },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || []);
          } else {
            setSuggestions([]);
          }
        }
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setValue(input);
    updateCity(input);
    fetchSuggestions(input);
    updateCity(input.toLowerCase());
  };
  const handleSelectLocation = (item) => {  
    const cityName = item.description.split(",")[0].trim().toLowerCase(); // Convert to lowercase
    setValue(item.description);
    setShowPopover(false);
    updateCity(cityName);
  };
  const renderSearchSuggestions = () => {
    return suggestions.map((item) => (
      <span
        onClick={() => handleSelectLocation(item)}
        key={item.place_id}
        className="flex items-center px-4 py-4 space-x-3 cursor-pointer sm:px-8 sm:space-x-4 hover:bg-neutral-100"
      >
        <span className="block text-neutral-400">
          <CiClock2 className="w-4 h-4 sm:h-6 sm:w-6" />
        </span>
        <span className="block font-medium text-neutral-700">{item.description}</span>
      </span>
    ));
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300">
          <HiOutlineMapPin className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className="block w-full p-0 font-semibold truncate bg-transparent border-none focus:ring-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg placeholder-neutral-800"
            placeholder={placeHolder}
            value={value}
            onChange={handleInputChange}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">{value ? placeHolder : desc}</span>
          </span>
          {value && showPopover && (
            <button
              onClick={() => {
                setValue("");
                setSuggestions([]);
              }}
              className="absolute z-10 flex items-center justify-center w-5 h-5 text-sm transform -translate-y-1/2 rounded-full lg:w-6 lg:h-6 bg-neutral-200 right-1 lg:right-3 top-1/2"
            >
              <CircleX className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {renderSearchSuggestions()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
