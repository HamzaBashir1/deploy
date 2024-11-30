import React from "react";
import NcImage from "./NcImage/NcImage";

const OurFeatures = ({
  className = "lg:py-14",
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src="/our-features.png" />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          BENnefits
        </span>
        <h2 className="font-semibold text-4xl mt-5">Happening cities </h2>

        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-blue-800 bg-blue-100 hover:bg-blue-800 hover:text-white transition-colors" name="" >
             Advertising
            </span>
            <span className="block text-xl font-semibold">
              Cost-effective advertising
            </span>
            <span className="block mt-5 text-neutral-500">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </li>
          <li className="space-y-4">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-[#065f46] bg-[#d1fae5] hover:bg-[#065f46] hover:text-white transition-colors">
            Exposure
            </span>
            <span className="block text-xl font-semibold">
              Reach millions with Chisfis
            </span>
            <span className="block mt-5 text-neutral-500">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <span className="inline-flex px-2.5 py-1 rounded-full font-medium text-xs text-[#991b1b] bg-[#fee2e2] hover:bg-[#991b1b] hover:text-white transition-colors" >
            Secure
            </span>
            <span className="block text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-500">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OurFeatures;
