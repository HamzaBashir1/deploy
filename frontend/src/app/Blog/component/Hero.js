import React, { useState } from "react";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import Customer from "./Customer";
import AccommodationProvider from "./AccommodationProvider";

const Hero = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState("accommodation");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogType, setBlogType] = useState("provider"); // Set initial blog type

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setBlogType(tab === "accommodation" ? "provider" : "customer");
  };

  return (
    <div className="pt-16 mx-4 lg:mx-20">
      <div className="py-6 bg-white">
        <div className="px-4 mx-auto max-w-[1320px] sm:px-6">
          {/* Blog Title and Social Media Icons */}
          <div className="flex justify-between mt-6 space-y-6 lg:flex-row lg:items-center lg:mt-16 lg:space-y-0">
            {/* Blog Title */}
            <h1 className="text-5xl font-bold text-gray-900 lg:text-7xl">
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
                  blogType === "customer"
                    ? "text-gray-900 border-black"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:border-black"
                }`}
                onClick={() => handleTabClick("customer")}
              >
                For customers
              </button>
              <button
                className={`pb-3 transition duration-200 border-b-2 ${
                  blogType === "accommodation"
                    ? "text-gray-900 border-black"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:border-black"
                }`}
                onClick={() => handleTabClick("accommodation")}
              >
                For accommodation providers
              </button>
              
            </nav>
          </div>

          {/* Show Components based on activeTab */}
          <div className="mt-6">
            {activeTab === "customer" ? (
              <Customer blogType={blogType} onSearch={onSearch} />
            ) : (
              <AccommodationProvider blogType={blogType} onSearch={onSearch} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
