"use client";

import React, { useState } from "react";
import StaySearchForm from "./StaySearchForm";

const HeroSearchForm = ({ className = "", currentTab = "Stays", currentPage }) => {
  const tabs = ["Stays", ""];
  const [tabActive, setTabActive] = useState(currentTab);

  const renderTab = () => {
    return (
      <ul className="flex ml-2 space-x-5 overflow-x-auto sm:ml-6 md:ml-12 sm:space-x-8 lg:space-x-11 hiddenScrollbar">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex-shrink-0 flex items-center cursor-pointer text-sm lg:text-base font-medium ${
                active
                  ? ""
                  : "text-neutral-500 hover:text-neutral-700"
              } `}
              key={tab}
            >
              {active && (
                <span className="block w-2.5 h-2.5 rounded-full bg-neutral-800 mr-2" />
              )}
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderForm = () => {
    switch (tabActive) {
      case "Stays":
        return <StaySearchForm />;
      case "Experiences":
        return <StaySearchForm />;
      default:
        return null;
    }
  };

  return (
    <div className={`nc-HeroSearchForm w-full max-w-6xl py-5 lg:py-0 ${className}`}>
      {renderTab()}
      {renderForm()}
    </div>
  );
};

export default HeroSearchForm;
