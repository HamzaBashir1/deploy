import React, { useContext, useEffect, useState } from "react";
import "./styless.css";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "./component/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "./component/DatePickerCustomDay";
import { FormContext } from "../FormContext";

const SectionDateRange = ({ data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledRanges, setDisabledRanges] = useState([]);
  const { pricenight,ida,accdata,updatendate, updatestartdate } = useContext(FormContext);

  // Utility function to normalize a date (remove time)
  const normalizeDate = (date) => {
    if (!date) return null;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  // Process occupancyCalendar to extract disabled ranges
  useEffect(() => {
    if (data?.occupancyCalendar) {
      const ranges = data.occupancyCalendar.map((item) => ({
        startDate: normalizeDate(new Date(item.startDate)), // Normalize dates
        endDate: normalizeDate(new Date(item.endDate)),
      }));
      setDisabledRanges(ranges);
    }
  }, [data]);

  // Check if a date is disabled
  const isDisabledDate = (date) => {
    const normalizedDate = normalizeDate(date);
    return disabledRanges.some(
      (range) =>
        normalizedDate >= range.startDate && normalizedDate <= range.endDate
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
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  // Handle date changes
  const onChangeDate = (dates) => {
    const [start, end] = dates;

    const normalizedStart = normalizeDate(start);
    const normalizedEnd = normalizeDate(end);

    // Check if selected range includes any disabled dates
    if (
      (normalizedStart && isDisabledDate(normalizedStart)) ||
      (normalizedEnd && isDisabledDate(normalizedEnd)) ||
      (normalizedStart && normalizedEnd && hasDisabledDatesInRange(normalizedStart, normalizedEnd))
    ) {
      alert("You cannot select disabled dates. Please choose a valid range.");
      setStartDate(null);
      setEndDate(null);
      return;
    }

    // Update state with valid dates
    setStartDate(normalizedStart);
    setEndDate(normalizedEnd);
    updatestartdate(normalizedStart);
    updatendate(normalizedEnd);
  };

  return (
    <div className="overflow-hidden listingSection__wrap">
      <div>
        <h2 className="text-2xl font-semibold">Availability</h2>
        <span className="block mt-2 text-neutral-500">
          Prices may increase on weekends or holidays
        </span>
      </div>
      <div className="border-b w-14 border-neutral-200"></div>
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
          minDate={new Date()}
          filterDate={(date) => !isDisabledDate(date)}
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

export default SectionDateRange;
