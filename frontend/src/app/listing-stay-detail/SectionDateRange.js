import React, { useEffect, useState } from "react";
// import "./styles.css";  // Adjust the path as needed
import "./styless.css"
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "./component/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "./component/DatePickerCustomDay";

const SectionDateRange = ({data}) => {
  // console.log("cal", data.occupancyCalendar);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);

  // Process occupancyCalendar to extract disabled dates
  useEffect(() => {
    if (data?.occupancyCalendar) {
      const dates = data.occupancyCalendar.map((item) => {
        return new Date(item.startDate); // Convert startDate strings to Date objects
      });
      setDisabledDates(dates);
    }
  }, [data]);

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  // Check if a date should be highlighted in red
  const isDisabledDate = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getDate() === disabledDate.getDate()
    );
  };


  const renderSectionCheckIndate = () => {
    return (
      <div className="overflow-hidden listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 ">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200"></div>
        {/* CONTENT */}

        <div>
          <DatePicker
            
            onChange={onChangeDate}
            
            selectsRange
            
            monthsShown={2}
            showPopperArrow={false}
            inline
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
