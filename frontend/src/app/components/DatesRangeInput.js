"use client";

import DatePicker from "react-datepicker";
import React, { useState } from "react";
import DatePickerCustomHeaderTwoMonth from "../Shared/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../Shared/DatePickerCustomDay";
import "../listing-stay-detail/styless.css"

const StayDatesRangeInput = ({ className = "" }) => {
  const [startDate, setStartDate] = useState(new Date("2023/02/06"));
  const [endDate, setEndDate] = useState(new Date("2023/02/23"));

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div>
      <div className="p-5">
        <span className="block text-xl font-semibold sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} `}
      > 
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
