import React, { useContext, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import DatePickerCustomHeaderTwoMonth from "./component/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "./component/DatePickerCustomDay";
import DatePicker from "react-datepicker";
import ClearDataButton from "./component/ClearDataButton";
import { FormContext } from "../FormContext";

const StayDatesRangeInput = ({ className = "flex-1", onDateChange, data }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  
  // Access values from FormContext
  const { pricenight, ida, accdata, updatendate, enddate, startdate, updatestartdate } = useContext(FormContext);

  // Use startDate and endDate from FormContext if available
  useEffect(() => {
    if (startdate) {
      setStartDate(startdate); // Initialize startDate from FormContext if available
    }
    if (enddate) {
      setEndDate(enddate); // Initialize endDate from FormContext if available
    }
  }, [startdate, enddate]);

  useEffect(() => {
    if (data?.occupancyCalendar) {
      const dates = data.occupancyCalendar.map((item) => {
        return new Date(item.startDate); // Convert startDate strings to Date objects
      });
      setDisabledDates(dates);
    }
  }, [data]);

  const isDisabledDate = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.getFullYear() === disabledDate.getFullYear() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getDate() === disabledDate.getDate()
    );
  };

  const isRangeContainingDisabledDate = (start, end) => {
    if (!start || !end) return false;
    const currentDate = new Date(start);

    while (currentDate <= end) {
      if (isDisabledDate(currentDate)) {
        return true;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return false;
  };

  const onChangeDate = (dates) => {
    const [start, end] = dates;

    // Check if the selected range contains any disabled date
    if (isRangeContainingDisabledDate(start, end)) {
      alert("You cannot select a range that includes a disabled date.");
      setStartDate(null);
      setEndDate(null);
      return;
    }

    setStartDate(start);
    setEndDate(end);
    console.log("startDate " , startDate ,startdate,"enddate", endDate,enddate )
    // Update the FormContext with the new start and end dates
   
    if (onDateChange) {
      onDateChange([start, end]); // Notify the parent with updated dates
    }
  };

  console.log("startDate " , startDate ,startdate,"enddate", endDate,enddate )
  const renderInput = () => {
    return (
      <>
        <div className="text-neutral-300">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block font-semibold xl:text-lg">
            {startDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
            }) || "Add dates"}
            {endDate
              ? " - " +
                endDate?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })
              : ""}
          </span>
          <span className="block mt-1 text-sm font-light leading-none text-neutral-400">
            {"Check in - Check out"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`StayDatesRangeInput z-10 relative flex ${className}`}>
      {({ open }) => (
        <>
          <Popover.Button
            className={`flex-1 flex relative p-3 items-center space-x-3 focus:outline-none ${
              open ? "shadow-lg" : ""
            }`}
          >
            {renderInput()}
            {startDate && open && <ClearDataButton onClick={() => onChangeDate([null, null])} />}
          </Popover.Button>

          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 left-auto z-10 w-screen max-w-sm px-4 mt-3 xl:-right-10 top-full sm:px-0 lg:max-w-3xl">
              <div className="p-8 overflow-hidden bg-white shadow-lg rounded-3xl ring-1 ring-black ring-opacity-5">
                <DatePicker
                  selected={startDate}
                  onChange={onChangeDate}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  monthsShown={2}
                  showPopperArrow={false}
                  inline
                  renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
                  renderDayContents={(day, date) => {
                    const isDisabled = isDisabledDate(date);
                    return (
                      <div
                        style={{
                          color: isDisabled ? "gray" : "inherit",
                        }}
                      >
                        <DatePickerCustomDay dayOfMonth={day} date={date} />
                      </div>
                    );
                  }}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default StayDatesRangeInput;
