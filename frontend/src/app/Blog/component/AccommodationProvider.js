import { categories } from '@/app/components/Categories';
import React, { useState } from 'react';
import Articles from './Article';

const AccommodationProvider = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  // const [searchTerm, setSearchTerm] = useState("");
  
  
  const handleSearchSubmit = () => {
    // e.preventDefault();
    setSelectedCategory('Accommodation')
    console.log(selectedCategory)
    setSearchTerm(selectedCategory);
    onSearch(searchTerm);
  };
  const handleSearchSubmits = () => {
    // e.preventDefault();
    setSelectedCategory('Inspiration')
    console.log(selectedCategory)
    setSearchTerm(selectedCategory);
    onSearch(searchTerm);
  };

  return (
    <div className="px-4 lg:px-0">
    {/* Category Buttons */}
      <div className="flex mt-4 space-x-4">
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 " onClick={handleSearchSubmit}>Accommodation</button>
        <button className="px-4 py-2 text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 " onClick={ handleSearchSubmits}> Inspiration</button>
      </div>
      {/* Main Layout: Image first on mobile, text first on large screens */}
      <div className="flex flex-col mt-10 lg:flex-row-reverse">
        
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-2xl lg:w-[68%] shadow-lg h-[250px] lg:h-[400px]">
          <img
            src="/Blog.png"
            alt="How to be an eco-host"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col items-start mt-10 text-left lg:w-1/2 lg:mt-32">
          <div className="lg:pr-14">
            <div className="text-red-500">Inspiration</div>
            <h2 className="text-2xl font-semibold lg:text-3xl">How to be an eco-host</h2>
            <button className="px-6 py-3 mt-4 text-white transition bg-red-500 rounded-md hover:bg-pink-700">
              To read
            </button>
          </div>
        </div>
      </div>

      <Articles searchTerm={searchTerm} />
    </div>
  );
};

export default AccommodationProvider;
