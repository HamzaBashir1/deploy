import React, { useState } from "react";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import Customer from "./Customer";
import AccommodationProvider from "./AccommodationProvider";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("accommodation");

  return (
    <div className="pt-16 mx-4 lg:mx-20">
      <div className="py-6 bg-white">
        <div className="px-4 mx-auto max-w-[1320px] sm:px-6">
          {/* Blog Title and Social Media Icons */}
          <div className="flex lg:flex-row lg:items-center justify-between mt-6 lg:mt-16 space-y-6 lg:space-y-0">
            {/* Blog Title (for all devices, no need to repeat) */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900">
              Blog<span className="text-red-500">.</span>
            </h1>

            {/* Social Media Icons */}
            <div className="flex space-x-4 lg:space-x-8">
              <a href="#" className="text-black hover:text-gray-700">
                <FaFacebook className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <BsInstagram className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <BsYoutube className="w-5 h-5 lg:w-6 lg:h-6" />
              </a>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-6 border-b">
            <nav className="flex space-x-4 lg:space-x-8">
              <button
                className={`pb-3 transition duration-200 border-b-2 ${
                  activeTab === "customer"
                    ? "text-gray-900 border-black"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:border-black"
                }`}
                onClick={() => setActiveTab("customer")}
              >
                For customers
              </button>
              <button
                className={`pb-3 transition duration-200 border-b-2 ${
                  activeTab === "accommodation"
                    ? "text-gray-900 border-black"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:border-black"
                }`}
                onClick={() => setActiveTab("accommodation")}
              >
                For accommodation providers
              </button>
            </nav>
          </div>

          {/* Show Components based on activeTab */}
          <div className="mt-6">
            {activeTab === "customer" ? <Customer /> : <AccommodationProvider />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
