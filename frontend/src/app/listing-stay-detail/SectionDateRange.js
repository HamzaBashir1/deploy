import React, { useContext, useEffect, useState } from "react";
import "./styless.css";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "./component/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "./component/DatePickerCustomDay";
import { FormContext } from "../FormContext";

const SectionDateRange = ({ data }) => {
  const [startDate, setStartDate] = useState(null); // Initially null
  const [endDate, setEndDate] = useState(null); // Initially null
  const [disabledRanges, setDisabledRanges] = useState([]);
  const {
    pricenight,
    ida,
    accdata,
    updatendate,
    enddate,
    startdate,
    updatestartdate,
  } = useContext(FormContext);

  // Process occupancyCalendar to extract disabled ranges
  useEffect(() => {
    if (data?.occupancyCalendar) {
      const ranges = data.occupancyCalendar.map((item) => ({
        startDate: new Date(item.startDate), // Convert startDate string to Date object
        endDate: new Date(item.endDate), // Convert endDate string to Date object
      }));
      setDisabledRanges(ranges);
    }
  }, [data]);

  // Check if a date is disabled
  const isDisabledDate = (date) => {
    return disabledRanges.some(
      (range) =>
        date >= range.startDate && date <= range.endDate // Check if date falls within the range
    );
  };

  // Check if any disabled dates are in the range
  const hasDisabledDatesInRange = (start, end) => {
    if (!start || !end) return false;

    let currentDate = new Date(start);
    while (currentDate <= end) {
      if (isDisabledDate(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1); // Increment by one day
    }
    return false;
  };

  // Handle date changes
  const onChangeDate = (dates) => {
    const [start, end] = dates;

    // Check if selected range includes any disabled dates
    if (
      (start && isDisabledDate(start)) ||
      (end && isDisabledDate(end)) ||
      (start && end && hasDisabledDatesInRange(start, end))
    ) {
      alert("You cannot select disabled dates. Please choose a valid range.");
      setStartDate(null);
      setEndDate(null);
     
      return;
    }

    // Update state for valid date selections
    setStartDate(start);
    setEndDate(end);
    updatestartdate(start);
    updatendate(end);
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="overflow-hidden listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200"></div>
        {/* CONTENT */}
        <div>
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            minDate={new Date()} // Disable all past dates
            filterDate={(date) => !isDisabledDate(date)} // Disable disabled dates for selection
            renderCustomHeader={(props) => (
              <DatePickerCustomHeaderTwoMonth {...props} />
            )}
            renderDayContents={(day, date) => {
              const isDisabled = isDisabledDate(date);
              return (
                <div
                  style={{
                    color: isDisabled ? "gray" : "inherit",
                    textDecoration: isDisabled ? "line-through" : "none",
                  }}
                >
                  <DatePickerCustomDay dayOfMonth={day} date={date} />
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
