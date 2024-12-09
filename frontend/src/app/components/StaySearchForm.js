"use client";

import converSelectedDateToString from "../utlis/utils/converSelectedDateToString";
import React, { useContext, useState, useEffect } from "react";
import GuestsInput from "./GuestsInput";
import LocationInput from "./LocationInput";
// import DatesRangeInput from "./components/DatesRangeInput";
import { FormContext } from "../FormContext";
import StayDatesRangeInput from "./DatesRangeInput";

const StaySearchForm = () => {
  const [fieldNameShow, setFieldNameShow] = useState("location"); // "location" | "dates" | "guests"
  const [locationInputTo, setLocationInputTo] = useState("");
  const [guestInput, setGuestInput] = useState({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const [startDate, setStartDate] = useState(new Date("2024/02/06"));
  const [endDate, setEndDate] = useState(new Date("2024/02/23"));

  const { updateperson } = useContext(FormContext);

  // Effect to update total guests in context
  useEffect(() => {
    const totalGuests =
      (guestInput.guestAdults || 0) +
      (guestInput.guestChildren || 0) +
      (guestInput.guestInfants || 0);
    updateperson(totalGuests);
  }, [guestInput, updateperson]);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputTo}
            onChange={(value) => {
              setLocationInputTo(value);
            }}
          />
        )}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === "dates";

    return (
      <div
        className={`w-full bg-white overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("dates")}
          >
            <span className="text-neutral-400">When</span>
            <span>
              {startDate
                ? converSelectedDateToString([startDate, endDate])
                : "Add date"}
            </span>
          </button>
        ) : (
          <StayDatesRangeInput />
        )}
      </div>
    );
  };

  const renderInputGuests = () => {
    const isActive = fieldNameShow === "guests";
    let guestSelected = "";
    if (guestInput.guestAdults || guestInput.guestChildren) {
      const guest =
        (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
      guestSelected += `${guest} guests`;
    }

    if (guestInput.guestInfants) {
      guestSelected += `, ${guestInput.guestInfants} infants`;
    }

    return (
      <div
        className={`w-full bg-white overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("guests")}
          >
            <span className="text-neutral-400">Who</span>
            <span>{guestSelected || `Add guests`}</span>
          </button>
        ) : (
          <GuestsInput defaultValue={guestInput} onChange={setGuestInput} />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {renderInputLocation()}
        {renderInputDates()}
        {renderInputGuests()}
      </div>
    </div>
  );
};

export default StaySearchForm;
