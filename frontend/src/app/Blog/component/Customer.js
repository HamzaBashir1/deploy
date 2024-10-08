"use client";
import React, { useState } from 'react';
import CustomerArticle from './CustomerArticle';

function Customer({ onSearch }) { 
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (category) => {
    setSearchTerm(category);
    onSearch(category);
  };

  const categories = [
    'Accommodation', 
    'Inspiration', 
    'Traveling', 
    'Curiosities', 
    'Advice and Tips', 
    'Tips for a Trip'
  ];

  return (
    <div className="px-4 lg:px-0">
      {/* Category Buttons */}
      <div className="flex mt-4 space-x-4 overflow-x-auto flex-nowrap">
        {categories.map((category) => (
          <button 
            key={category} 
            className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg whitespace-nowrap hover:bg-gray-200"
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex flex-col mt-10 lg:flex-row-reverse">
        <div className="relative overflow-hidden rounded-2xl lg:w-[68%] shadow-lg h-[250px] lg:h-[400px]">
          <img
            src="/customer.png"
            alt="Curiosities of Slovak caves"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-start mt-10 text-left lg:w-1/2 lg:mt-32">
          <div className="lg:pr-14">
            <div className="text-red-500">Inspiration</div>
            <h2 className="text-2xl font-semibold lg:text-3xl">Curiosities of Slovak caves</h2>
            <button className="px-6 py-3 mt-4 text-white transition bg-red-500 rounded-md hover:bg-pink-700">
              To read
            </button>
          </div>
        </div>
      </div>

      <CustomerArticle searchTerm={searchTerm} />
    </div>
  );
}

export default Customer;
