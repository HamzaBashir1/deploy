"use client"
import React, { useEffect, useState } from "react";
import Heading from "../HowItWork/Heading";
import { FaArrowRight } from "react-icons/fa";

const HeaderFilter = ({
  tabActive,
  tabs,
  subHeading = "",
  heading = "🎈 Latest Articles",
  onClickTab,
}) => {
  const [tabActiveState, setTabActiveState] = useState(tabActive);

  useEffect(() => {
    setTabActiveState(tabActive);
  }, [tabActive]);

  const handleClickTab = (item) => {
    if (onClickTab) {
      onClickTab(item);
    }
    setTabActiveState(item);
  };

  return (
    <div className="flex flex-col mb-8 relative">
      <Heading desc={subHeading}>{heading}</Heading>
      <div className="flex items-center justify-between">
      <div className="relative flex w-full overflow-x-auto text-sm md:text-base hiddenScrollbar">
        <ul className="flex sm:space-x-2">
            {tabs.map((item, index) => (
            <li key={index} className="nc-NavItem relative" data-nc-id="NavItem">
                <button
                className={`block !leading-none font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
                    tabActiveState === item
                    ? "bg-[#14634b] text-white "
                    : "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
                onClick={() => handleClickTab(item)}
                >
                {item}
                </button>
            </li>
            ))}
        </ul>
       </div>

        <span className="hidden sm:block flex-shrink-0">
          <a
              href="/listing-stay-map"
              className={`ttnc-ButtonSecondary font-medium whitespace-nowrap px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full border bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-100`}
              >
              <span>View all →</span>
          </a>
        </span>
      </div>
    </div>
  );
};

export default HeaderFilter;
