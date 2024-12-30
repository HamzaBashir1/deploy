import React, { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "../../Shared/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "../../Shared/DatePickerCustomDay";
import ButtonPrimary from "../../Shared/ButtonPrimary";
import PropTypes from "prop-types";

const ModalSelectDate = ({ renderChildren }) => {
  const [showModal, setShowModal] = useState(false);

  // State for dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.checkInDate && userData.checkOutDate) {
      setStartDate(new Date(userData.checkInDate));
      setEndDate(new Date(userData.checkOutDate));
    }
  }, []);

  // Handle date change and update localStorage
  const onChangeDate = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedData = {
      ...userData,
      checkInDate: start ? start.toLocaleDateString() : null,
      checkOutDate: end ? end.toLocaleDateString() : null,
    };
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  const clearDates = () => {
    setStartDate(null);
    setEndDate(null);

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const updatedData = {
      ...userData,
      checkInDate: null,
      checkOutDate: null,
    };
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  // Modal controls
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);

  const renderButtonOpenModal = () =>
    renderChildren ? (
      renderChildren({ openModal })
    ) : (
      <button onClick={openModal}>Select Date</button>
    );

  return (
    <>
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 HeroSearchFormMobile__Dialog"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-100">
            <div className="flex h-full">
              <Transition.Child
                as={Fragment}
                enter="ease-out transition-transform"
                enterFrom="opacity-0 translate-y-52"
                enterTo="opacity-100 translate-y-0"
                leave="ease-in transition-transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-52"
              >
                <Dialog.Panel className="relative flex flex-col justify-between flex-1 h-full overflow-hidden">
                  <div className="absolute left-4 top-4">
                    <button
                      className="focus:outline-none focus:ring-0"
                      onClick={closeModal}
                    >
                      <XMarkIcon className="w-5 h-5 text-black" />
                    </button>
                  </div>
                  <div className="flex flex-col flex-1 p-1 pt-12 overflow-auto">
                    <div className="flex flex-col flex-1 bg-white">
                      <div className="p-5">
                        <span className="block text-xl font-semibold sm:text-2xl">
                          {`When's your trip?`}
                        </span>
                      </div>
                      <div className="relative z-10 flex flex-1">
                        <div className="overflow-hidden rounded-3xl">
                          <DatePicker
                            selected={startDate}
                            onChange={onChangeDate}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            monthsShown={2}
                            showPopperArrow={false}
                            inline
                            minDate={new Date()} // Disable past dates
                            renderCustomHeader={(props) => (
                              <DatePickerCustomHeaderTwoMonth {...props} />
                            )}
                            renderDayContents={(day, date) => (
                              <DatePickerCustomDay
                                dayOfMonth={day}
                                date={date}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between px-4 py-3 bg-white border-t border-neutral-200">
                    <button
                      type="button"
                      className="flex-shrink-0 font-semibold underline"
                      onClick={clearDates}
                    >
                      Clear dates
                    </button>
                    <ButtonPrimary
                      sizeClass="px-6 py-3 !rounded-xl"
                      onClick={() => {
                        closeModal();
                        window.location.reload(); // Refresh the page
                      }}
                    >
                      Save
                    </ButtonPrimary>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

ModalSelectDate.propTypes = {
  renderChildren: PropTypes.func,
};

export default ModalSelectDate;  
