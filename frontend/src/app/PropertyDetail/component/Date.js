import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

const DateComponent = ({ data, onDateChange }) => {
  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const occupancyCalendar = data?.occupancyCalendar || [];

  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);

  useEffect(() => {
    const dates = [];
    occupancyCalendar.forEach((entry) => {
      const startDate = dayjs(entry.startDate);
      const endDate = dayjs(entry.endDate);
      let date = startDate;
      while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
        dates.push(date.format("YYYY-MM-DD"));
        date = date.add(1, "day");
      }
    });
    setOccupiedDates(dates);
  }, [occupancyCalendar]);

  const isOccupied = (date) => occupiedDates.includes(date);
  const isPastDate = (date) => dayjs(date).isBefore(dayjs(), "day");

  const isInRange = (date) => {
    const { start, end } = selectedRange;
    if (!start) return false;
    if (end) return dayjs(date).isBetween(start, end, null, "[]");
    if (hoveredDate && dayjs(hoveredDate).isAfter(start)) {
      return dayjs(date).isBetween(start, hoveredDate, null, "[]");
    }
    return false;
  };

  const handleDateClick = (date) => {
    if (isPastDate(date) || isOccupied(date)) return;

    if (!selectedRange.start) {
      const newRange = { start: date, end: null };
      setSelectedRange(newRange);
      onDateChange(newRange);
    } else if (!selectedRange.end && dayjs(date).isAfter(selectedRange.start)) {
      const newRange = { ...selectedRange, end: date };
      setSelectedRange(newRange);
      onDateChange(newRange);
    } else {
      const newRange = { start: date, end: null };
      setSelectedRange(newRange);
      onDateChange(newRange);
    }
  };

  const handleMouseEnter = (date) => {
    if (!selectedRange.end && !isPastDate(date) && selectedRange.start) {
      setHoveredDate(date);
    }
  };

  const nextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));
  const prevMonth = () => setCurrentMonth(currentMonth.subtract(1, "month"));

  const getDaysInMonth = (month) => {
    const startDay = month.startOf("month").day();
    const daysInMonth = month.daysInMonth();

    return Array.from({ length: 42 }, (_, index) => {
      const day = index - (startDay === 0 ? 6 : startDay - 1);
      if (day <= 0 || day > daysInMonth) return null;
      return month.date(day).format("YYYY-MM-DD");
    });
  };

  const renderDateCell = (date) => {
    if (!date) return <div className="w-10 h-10" />;

    const isSelected =
      date === selectedRange.start || date === selectedRange.end;
    const inRange = isInRange(date);
    const occupied = isOccupied(date);
    const past = isPastDate(date);
    const isToday = dayjs(date).isSame(dayjs(), "day");

    let cellClasses =
      "w-10 h-10 flex items-center justify-center rounded-full ";
    let textClasses = "text-base ";

    if (past || occupied) {
      cellClasses += "bg-neutral-100";
      textClasses += "text-neutral-400";
    } else if (isSelected) {
      cellClasses += "bg-[#58caaa] hover:bg-[#4bb598]";
      textClasses += "text-white font-medium";
    } else if (inRange) {
      cellClasses += "bg-[#e6f7f2] hover:bg-[#d1f0e7]";
      textClasses += "text-[#58caaa]";
    } else {
      cellClasses += "hover:bg-neutral-50";
      textClasses += isToday
        ? "text-[#58caaa] font-medium"
        : "text-neutral-900";
    }

    return (
      <button
        onClick={() => handleDateClick(date)}
        onMouseEnter={() => handleMouseEnter(date)}
        disabled={past || occupied}
        className={`${cellClasses} transition-all duration-200 ${
          past || occupied ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span className={textClasses}>{dayjs(date).format("D")}</span>
      </button>
    );
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-sm">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-neutral-900">Availability</h2>
          <span className="block mt-2 text-lg text-neutral-500">
            Prices may increase on weekends or holidays
          </span>
        </div>

        <div className="w-16 border-b border-neutral-200" />

        <div className="flex gap-12">
          {[currentMonth, currentMonth.add(1, "month")].map((month, index) => (
            <div key={index} className="flex-1">
              <div className="relative flex items-center justify-center mb-6">
                {index === 0 && (
                  <button
                    onClick={prevMonth}
                    className="absolute left-0 p-1.5 hover:bg-neutral-100 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-neutral-600" />
                  </button>
                )}
                <span className="text-xl font-semibold text-neutral-900">
                  {month.format("MMMM YYYY")}
                </span>
                {index === 1 && (
                  <button
                    onClick={nextMonth}
                    className="absolute right-0 p-1.5 hover:bg-neutral-100 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-neutral-600" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {daysOfWeek.map((day) => (
                  <div
                    key={day}
                    className="h-10 flex items-center justify-center text-sm font-medium text-neutral-500"
                  >
                    {day}
                  </div>
                ))}
                {getDaysInMonth(month).map((date, i) => (
                  <div key={i} className="flex items-center justify-center">
                    {renderDateCell(date)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-6 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-100 rounded-full" />
            <span className="text-sm text-neutral-600">Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#58caaa] rounded-full" />
            <span className="text-sm text-neutral-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#e6f7f2] rounded-full" />
            <span className="text-sm text-neutral-600">In range</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateComponent;
