"use client";

import DatePicker from "react-datepicker";
import React, { useContext, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "../Shared/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../Shared/DatePickerCustomDay";
import "../listing-stay-detail/styless.css";
import { FormContext } from "../FormContext";

const StayDatesRangeInput = ({ className = "", closeModal, onChangeDate }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { updatestartdate, updatendate } = useContext(FormContext);

  // Callback for date selection
  const handleDateChange = (dates) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

      // Update context
      updatestartdate(start);
      updatendate(end);

      // Notify parent
      if (onChangeDate) {
        onChangeDate(dates);
      }
    }
  };

  // Close modal when end date is selected
  useEffect(() => {
    if (endDate) {
      closeModal();
    }
  }, [endDate, closeModal]);

  return (
    <div>
      <div className="p-5">
        <span className="block text-xl font-semibold sm:text-2xl">
          {`When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className}`}
      >
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(props) => (
            <DatePickerCustomHeaderTwoMonth {...props} />
          )}
          renderDayContents={(day, date) => (
            <DatePickerCustomDay dayOfMonth={day} date={date} />
          )} 
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
