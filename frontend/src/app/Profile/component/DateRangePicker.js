"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { AiOutlineCalendar } from "react-icons/ai";

const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  return (
    <div className="flex flex-col mb-4 px-4 md:px-6 ">
      <label className="text-gray-700 text-sm md:text-base font-medium mb-2">Date from — to</label>
      <div className="flex items-center border border-gray-300 rounded-lg p-2 md:p-3 bg-white">
        <DatePicker
          selected={startDate}
          onChange={(dates) => {
            const [start, end] = dates;
            onDateChange(start, end);
          }}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          dateFormat="dd.MM.yyyy"
          className="w-full outline-none text-sm md:text-base text-gray-700"
        />
        <AiOutlineCalendar className="text-blue-500 ml-2 text-lg md:text-xl" />
      </div>
    </div>
  );
};

export default DateRangePicker;
