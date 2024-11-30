import React from "react";
import LocationInput from "./LocationInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import GuestsInput from "./GuestsInput";

const StaySearchForm = () => {
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl bg-white">
        <LocationInput className="flex-[1.5]" />
        <div className="self-center border-r border-slate-200 h-8"></div>
        <StayDatesRangeInput className="flex-1" />
        <div className="self-center border-r border-slate-200 h-8"></div>
        <GuestsInput className="flex-1" />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
