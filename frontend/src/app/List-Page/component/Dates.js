import { FormContext } from "@/app/FormContext";
import React, { useContext, useState } from "react";

const Dates = ({ year, months = [], onDateRangeSelect }) => {
  const {  updatestartdate,updatendate ,} = useContext(FormContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null); // For hover effect
  const [displayedMonthsCount, setDisplayedMonthsCount] = useState(4); // Initially show 4 months

  // Helper to format the date as dd-mm-yyyy
  const formatDate = (date) => {
    const day = String(date.day).padStart(2, '0');
    const month = String(date.month + 1).padStart(2, '0'); // +1 because month is zero-based
    const year = date.year;
    return `${day}-${month}-${year}`;
  };

  // Helper function to check if a date is between startDate and hoverDate
  const isDateInRange = (actualYear, monthIndex, day) => {
    if (!startDate || !hoverDate) return false;
    const start = new Date(startDate.year, startDate.month, startDate.day);
    const hover = new Date(hoverDate.year, hoverDate.month, hoverDate.day);
    const currentDate = new Date(actualYear, monthIndex, day);

    return currentDate >= start && currentDate <= hover;
  };

  const handleDateClick = (year, monthIndex, day) => {
    const selectedDate = { year, month: monthIndex, day };

    if (!startDate) {
      setStartDate(selectedDate); // Set the start date first
    } else if (!endDate) {
      setEndDate(selectedDate); // Set the end date next

      // Log the selected dates in dd-mm-yyyy format
      
      console.log("Selected Start Date:", formatDate(startDate));
      console.log("Selected End Date:", formatDate(selectedDate));
      updatestartdate(formatDate(startDate))
      updatendate(formatDate(selectedDate))

      onDateRangeSelect(startDate, selectedDate); // Pass both dates to the parent
    } else {
      // If both dates are already selected, reset and select a new start date
      setStartDate(selectedDate);
      setEndDate(null);
    }
  };

  const handleDateHover = (year, monthIndex, day) => {
    if (startDate && !endDate) {
      setHoverDate({ year, month: monthIndex, day });
    }
  };

  const loadMoreMonths = () => {
    const totalMonths = months.length;
    setDisplayedMonthsCount((prevCount) =>
      Math.min(prevCount + 4, totalMonths)
    );
  };

  return (
    <div className="p-5 overflow-y-auto h-96">
      {/* Months Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {months.slice(0, displayedMonthsCount).map((month, index) => {
          const actualYear = month.year;
          const monthIndex = month.month;
          const daysInMonth = new Date(actualYear, monthIndex + 1, 0).getDate();
          const firstDay = new Date(actualYear, monthIndex, 1).getDay();

          return (
            <div key={index} className="p-4">
              <h2 className="mb-3 text-lg font-semibold">
                {new Date(actualYear, monthIndex).toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <div className="grid grid-cols-7 gap-2 text-center">
                {["MON", "TUES", "WED", "THUR", "FRI", "SAT", "SUN"].map(
                  (day) => (
                    <div key={day} className="text-sm text-gray-500">
                      {day}
                    </div>
                  )
                )}

                {[...Array(firstDay === 0 ? 6 : firstDay - 1)].map((_, i) => (
                  <div key={i}></div>
                ))}

                {[...Array(daysInMonth)].map((_, i) => {
                  const date = i + 1;

                  const isSelectedStartDate =
                    startDate &&
                    startDate.year === actualYear &&
                    startDate.month === monthIndex &&
                    startDate.day === date;

                  const isSelectedEndDate =
                    endDate &&
                    endDate.year === actualYear &&
                    endDate.month === monthIndex &&
                    endDate.day === date;

                  const isInRange = isDateInRange(actualYear, monthIndex, date);

                  return (
                    <div
                      key={i}
                      className={`p-2 text-sm rounded cursor-pointer ${
                        isSelectedStartDate
                          ? "bg-green-400 text-white"
                          : isSelectedEndDate
                          ? "bg-green-400 text-white"
                          : isInRange
                          ? "bg-yellow-200"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() =>
                        handleDateClick(actualYear, monthIndex, date)
                      }
                      onMouseEnter={() =>
                        handleDateHover(actualYear, monthIndex, date)
                      }
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        {displayedMonthsCount < months.length && (
          <button
            onClick={loadMoreMonths}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Show More Months
          </button>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const maxYear = 2027;

  const monthsToShow = [];
  for (let year = currentYear; year <= maxYear; year++) {
    for (let month = 0; month < 12; month++) {
      if (year === currentYear && month < currentMonth) continue;
      monthsToShow.push({ year, month });
    }
  }

  const handleDateRangeSelect = (startDate, endDate) => {
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
  };

  return (
    <Dates
      year={currentYear}
      months={monthsToShow}
      onDateRangeSelect={handleDateRangeSelect}
    />
  );
};

export default App;
