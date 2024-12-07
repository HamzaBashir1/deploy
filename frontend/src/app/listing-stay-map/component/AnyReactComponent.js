"use client";

import { Transition } from "@headlessui/react";
import StayCard from "./StayCard2";
import React, { useState, Fragment } from "react";

const AnyReactComponent = ({
  className = "",
  listing,
  isSelected,
  lat,
  lng,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`nc-AnyReactComponent relative ${className}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        className={`flex px-2 py-1 rounded-lg bg-white text-sm font-semibold items-center justify-center min-w-max shadow-lg hover:bg-neutral-900 hover:text-white transition-colors ${
          isSelected
            ? "bg-neutral-900 text-white"
            : ""
        }`}
      >
        {listing?.price}
      </span>
      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute z-50 bottom-full pb-3 -left-12 w-[260px] aspect-w-1">
          {listing && (
            <StayCard size="small" data={listing} className="shadow-2xl" />
          )}
        </div>
      </Transition>
    </div>
  );
};

export default AnyReactComponent;
