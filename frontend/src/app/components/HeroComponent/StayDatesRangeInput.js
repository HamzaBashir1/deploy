"use client";

import * as React from "react";
import {
  addMonths,
  format, 
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { FormContext } from "../../FormContext";

// Utility function for conditional class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// Button Component
function Button({ children, variant, className, ...props }) {
  return (
    <button
      type="button"
      className={cn(
        "px-4 py-2 mt-4 rounded-lg transition-all",
        variant === "outline" && "border border-gray-200",
        "focus:outline-none focus:shadow-[4px_0_8px_-2px_rgba(0,0,0,0.1),-4px_0_8px_-2px_rgba(0,0,0,0.1)]", // Left and right shadow
        "focus:border-l-2 focus:border-r-2 focus:rounded-l-3xl focus:rounded-r-3xl", // Rounded corners on left and right
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Popover Component
function Popover({ children, isOpen, setIsOpen }) {
  const handleClickOutside = (event) => {
    if (
      !event.target.closest(".popover-content") &&
      !event.target.closest(".popover-trigger")
    ) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return <div className="relative inline-block">{children}</div>;
}

// PopoverTrigger Component
function PopoverTrigger({ children }) {
  return <div className="popover-trigger">{children}</div>;
}

// PopoverContent Component
function PopoverContent({ children, className }) {
  return (
    <div
      className={cn(
        "popover-content absolute z-10 bg-white border border-gray-200 rounded-3xl shadow-lg mt-2",
        className
      )}
    >
      {children}
    </div>
  );
}

// Main Component
export default function DateRangePicker() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [activeMonth, setActiveMonth] = React.useState(new Date());
  const { updatestartdate, updatendate } = React.useContext(FormContext);

  // Handle date selection
  const handleDateSelect = (date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
      console.log("Start Date:", format(date, "yyyy-MM-dd")); // Log start date
      updatestartdate(format(date, "yyyy-MM-dd")); // Update start date in context
    } else {
      if (date < startDate) {
        setStartDate(date);
        console.log("Updated Start Date:", format(date, "yyyy-MM-dd")); // Log updated start date
        updatestartdate(format(date, "yyyy-MM-dd")); // Update start date in context
      } else {
        setEndDate(date);
        console.log("End Date:", format(date, "yyyy-MM-dd")); // Log end date
        updatendate(format(date, "yyyy-MM-dd")); // Update end date in context
      }
    }
  };

  // Get class names for a specific day
  const getDayClass = (date) => {
    if (startDate && endDate) {
      if (isSameDay(date, startDate)) {
        return "bg-green-500 text-white rounded-l-full"; // Start date
      }
      if (isSameDay(date, endDate)) {
        return "bg-green-500 text-white rounded-r-full"; // End date
      }
      if (date > startDate && date < endDate) {
        return "bg-gray-200"; // Dates in the range
      }
    }
    if (startDate && isSameDay(date, startDate)) {
      return "bg-green-500 text-white rounded-full"; // Single selected start date
    }
    return "";
  };

  // Render a calendar for a specific month
  const renderMonth = (monthDate) => {
    const start = startOfMonth(monthDate);
    const end = endOfMonth(monthDate);
    const days = eachDayOfInterval({ start, end });

    return (
      <div className="w-[400px] h-[350px] p-4 bg-white ">
  {/* Month header */}
  <div className="mb-4 text-lg font-semibold text-center">
    {format(monthDate, "MMMM yyyy")}
  </div>

  {/* Days grid */}
  <div className="grid grid-cols-7 gap-2 text-sm">
    {/* Day names */}
    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
      <div
        key={day}
        className="flex items-center justify-center h-10 font-medium text-gray-600 uppercase"
      >
        {day}
      </div>
    ))}

    {/* Dates */}
    {days.map((day) => (
      <button
        key={day.toISOString()}
        type="button"
        onClick={() => handleDateSelect(day)}
        className={cn(
          "h-10 w-10 flex items-center justify-center rounded-full transition-all",
          "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-400",
          getDayClass(day),
          !isSameMonth(day, monthDate) && "text-gray-400"
        )}
      >
        {format(day, "d")}
      </button>
    ))}
  </div>
</div>

    );
  };

  return (
    <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="outline"
          className="flex items-center w-[300px] h-[68px] px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-4 ">
            <Calendar className="w-6 h-6 text-gray-500" />
            <div className="flex flex-col items-start">
              <span className="text-base font-semibold">
                {startDate && endDate
                  ? `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`
                  : "Add dates"}
              </span>
              <span className="text-sm text-gray-500">Check in - Check out</span>
            </div>
            {(startDate || endDate) && (
              <X
                className="w-4 h-4 ml-auto text-gray-500 hover:text-gray-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setStartDate(null);
                  setEndDate(null);
                }}
              />
            )}
          </div>
        </Button>
      </PopoverTrigger>
      {/* Calendar Content */}
      {isOpen && (
        <PopoverContent className="w-auto p-4">
          <div className="flex gap-8">
            {/* Left Calendar */}
            <div>
              <Button
                variant="outline"
                className="absolute left-2 top-2"
                onClick={() => setActiveMonth(addMonths(activeMonth, -1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              {renderMonth(activeMonth)}
            </div>
            {/* Right Calendar */}
            <div>
              <Button
                variant="outline"
                className="absolute right-2 top-2"
                onClick={() => setActiveMonth(addMonths(activeMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              {renderMonth(addMonths(activeMonth, 1))}
            </div>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}
