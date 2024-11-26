import React, { useState } from "react";
// import "./styles.css";  // Adjust the path as needed
import "./styless.css"
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "./component/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "./component/DatePickerCustomDay";

const SectionDateRange = () => {
  const [startDate, setStartDate] = useState(new Date("2023/02/06"));
  const [endDate, setEndDate] = useState(new Date("2023/02/23"));

  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const renderSectionCheckIndate = () => {
    return (
      <div className="overflow-hidden listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="border-b w-14 border-neutral-200 dark:border-neutral-700"></div>
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

  return renderSectionCheckIndate();
};

export default SectionDateRange;
