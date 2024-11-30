import React from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const DatePickerMonth = ({
  monthDate,
  customHeaderCount,
  decreaseMonth,
  increaseMonth,
}) => {
  return (
    <div>
      <button
        aria-label="Previous Month"
        className={
          "react-datepicker__navigation react-datepicker__navigation--previous absolute -top-1 left-0 flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
        }
        style={customHeaderCount === 1 ? { visibility: "hidden" } : {}}
        onClick={decreaseMonth}
        type="button"
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous">
          <GoChevronLeft className="w-5 h-5" />
        </span>
      </button>
      <span className="react-datepicker__current-month">
        {monthDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </span>
      <button
        aria-label="Next Month"
        className="react-datepicker__navigation react-datepicker__navigation--next absolute -top-1 -right-0 flex items-center justify-center p-2 hover:bg-gray-100 rounded-full"
        style={customHeaderCount === 0 ? { visibility: "hidden" } : {}}
        type="button"
        onClick={increaseMonth}
      >
        <span className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next">
          <GoChevronRight className="w-5 h-5" />
        </span>
      </button>
    </div>
  );
};

export default DatePickerMonth;
