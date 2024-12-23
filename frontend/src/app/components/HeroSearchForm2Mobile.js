"use client";

import React, { Fragment, useContext, useState } from "react";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTimeoutFn } from "react-use";
import StaySearchForm from "../components/StaySearchForm";
import Link from "next/link";
import { FormContext } from "../FormContext";

const HeroSearchForm2Mobile = () => {
  const [showModal, setShowModal] = useState(false);

  // FOR RESET ALL DATA WHEN CLICK CLEAR BUTTON
  const [showDialog, setShowDialog] = useState(false);
  const {
    updateperson,
    updateCity,
    updatestartdate,
    updatendate,
    city,
    startdate,
    enddate,
  } = useContext(FormContext);

  const [, , resetIsShowingDialog] = useTimeoutFn(() => setShowDialog(true), 1);

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  const handleSearchButtonClick = () => {
    if (window.location.href === "https://www.putkoapp.online/listing-stay-map") {
      closeModal();
    }
  };

  const renderButtonOpenModal = () => {
    return (
      <button
        onClick={openModal}
        className="relative flex items-center w-full px-4 py-2 border rounded-full shadow-lg border-neutral-200 pr-11"
      >
        <MagnifyingGlassIcon className="flex-shrink-0 w-5 h-5" />

        <div className="flex-1 ml-3 overflow-hidden text-left">
          <span className="block text-sm font-medium">Where to?</span>
          <span className="block mt-0.5 text-xs font-light text-neutral-500">
            <span className="line-clamp-1">Anywhere • Any week • Add guests</span>
          </span>
        </div>

        <span className="absolute flex items-center justify-center transform -translate-y-1/2 border rounded-full right-2 top-1/2 w-9 h-9 border-neutral-200">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            role="presentation"
            focusable="false"
            className="block w-4 h-4"
            fill="currentColor"
          >
            <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
          </svg>
        </span>
      </button>
    );
  };

  return (
    <div className="HeroSearchForm2Mobile">
      {renderButtonOpenModal()}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative HeroSearchFormMobile__Dialog z-max"
          onClose={closeModal}
        >
          <div className="fixed inset-0 bg-neutral-200">
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
                <Dialog.Panel className="relative flex flex-col justify-between flex-1 h-full overflow-hidden ">
                  {showDialog && (
                    <Tab.Group manual>
                      <div className="absolute left-4 top-4">
                        <button className="" onClick={closeModal}>
                          <XMarkIcon className="w-5 h-5 text-black" />
                        </button>
                      </div>

                      <Tab.List className="flex justify-center w-full pt-12 space-x-6 text-sm font-semibold sm:text-base text-neutral-500 sm:space-x-8">
                        {["Stay", ""].map((item, index) => (
                          <Tab key={index} as={Fragment}>
                            {({ selected }) => (
                              <div className="relative outline-none select-none focus:outline-none focus-visible:ring-0">
                                <div
                                  className={`${
                                    selected ? "text-black" : ""
                                  }`}
                                >
                                  {item}
                                </div>
                                {selected && (
                                  <span className="absolute inset-x-0 border-b-2 border-black top-full"></span>
                                )}
                              </div>
                            )}
                          </Tab>
                        ))}
                      </Tab.List>
                      <div className="flex-1 pt-3 px-1.5 sm:px-4 flex overflow-hidden">
                        <Tab.Panels className="flex-1 py-4 overflow-y-auto hiddenScrollbar">
                          <Tab.Panel>
                            <div className="transition-opacity animate-[myblur_0.4s_ease-in-out]">
                              <StaySearchForm />
                            </div>
                          </Tab.Panel>
                        </Tab.Panels>
                      </div>
                      <div className="z-50 flex justify-between px-4 py-3 bg-white border-t border-neutral-200">
                        <button
                          type="button"
                          className="flex-shrink-0 font-semibold underline"
                          onClick={() => {
                            updateCity("");
                            updatendate("");
                            updatestartdate("");
                            updateperson("");
                            setShowDialog(false);
                            resetIsShowingDialog();
                          }}
                        >
                          Clear all
                        </button>
                        <Link href="/listing-stay-map" passHref>
                          <button
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                            onClick={handleSearchButtonClick}
                          >
                            Search
                          </button>
                        </Link>
                      </div>
                    </Tab.Group>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default HeroSearchForm2Mobile;
