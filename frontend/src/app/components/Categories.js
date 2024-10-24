"use client";
import { useState, useRef, useContext } from 'react';
import Container from './Container';
import CategoryBox from "./CategoryBox";
import { Base_URL } from "../config.js";
import PropertyCard from "./PropertyCard.js";
import {
  GiTreehouse,
  GiCaveEntrance,
  GiForestCamp,
  GiBunkBeds,
  GiWindmill,
  GiWoodenDoor,
  GiFamilyHouse,
} from "react-icons/gi";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineApartment, MdCottage, MdHouseboat, MdOutlineBed, MdArrowForwardIos, MdArrowBackIos, MdFilterList } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";
import FilterModal from './FilterModal';
import { FormContext } from '../FormContext';
import { BiSortAlt2 } from 'react-icons/bi';

export const categories = [
  { label: "Apartment", icon: MdOutlineApartment },
  { label: "Flat", icon: FaHotel },
  { label: "Glamping", icon: GiWindmill },
  { label: "Cottages", icon: MdCottage },
  { label: "Motels/Hostel", icon: RiHotelLine },
  { label: "Wooden Houses", icon: GiWoodenDoor },
  { label: "Guest Houses", icon: GiFamilyHouse },
  { label: "Hotels", icon: FaHotel },
  { label: "Dormitories", icon: GiBunkBeds },
  { label: "Caves", icon: GiCaveEntrance },
  { label: "Secluded Accommodation", icon: BsFillHouseDoorFill },
  { label: "Campsites", icon: GiForestCamp },
  { label: "Treehouses", icon: GiTreehouse },
  { label: "Houseboats", icon: MdHouseboat },
  { label: "Rooms", icon: MdOutlineBed },
  { label: "Entire Homes", icon: IoHomeSharp },
  { label: "Luxury Accommodation", icon: IoDiamond },
];

const Categories = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for modal visibility
  const { sortOption ,updatesort} = useContext(FormContext);

  const categoryRef = useRef(null); // Ref to access category list container
  const [showSortingOptions, setShowSortingOptions] = useState(false);

  const handleSortingClick = () => {
    setShowSortingOptions(!showSortingOptions);  // Toggle the visibility of the sorting options
  };
  
  const handleSortOption = (option) => {
    if (option === "lowToHigh") {
      updatesort("lowToHigh")
      // Implement the sorting logic for Low to High

      console.log("Sorting: Low to High");
    } else if (option === "highToLow") {
      updatesort("highToLow")
      // Implement the sorting logic for High to Low
      console.log("Sorting: High to Low");
    }
    setShowSortingOptions(false);  // Close the sorting options after selection
  };
  // Function to fetch accommodations by category
  const fetchAccommodationsByCategory = async (category) => {
    setSelectedCategory(category);
    const fetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/accommodation/search?category=${encodeURIComponent(category)}`;

    try {
      const response = await fetch(fetchUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filteredData = data.filter(item => item.propertyType === category);
      setAccommodations(filteredData);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      setAccommodations([]); // Clear accommodations on error
    }
  };

      // Scroll left or right
      const scroll = (direction) => {
        const container = categoryRef.current;
        const scrollAmount = 300; // Adjust the scroll distance
    
        if (container) {
          container.scrollBy({ 
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
          });
        }
      };
      // bg-[#F7F7F7]
  return (
    
    <Container>
      <div className="relative pt-4 bg-[#F7F7F7] " >
        {/* Left Scroll Button */}
        <button 
          className="absolute left-0 z-10 w-10 h-10 p-2 transform -translate-y-1/2 bg-white rounded-full shadow-md top-1/2 hover:shadow-lg hover:bg-gray-100" // Set width and height
          onClick={() => scroll('left')}
        >
          <MdArrowBackIos size={24} />
        </button>

        {/* Category List */}
        <div 
          ref={categoryRef} 
          className="flex flex-row items-center justify-between pl-6 pr-10 space-x-4 overflow-x-auto mr-36 no-scrollbar" // Added padding-right to avoid overlap
          style={{ scrollBehavior: 'smooth' }}
        >
          {categories.map((item) => (
            <div key={item.label} className="flex-shrink-0 min-w-[70px]">
              <CategoryBox 
                label={item.label}
                icon={item.icon}
                selected={selectedCategory === item.label}
                onClick={() => fetchAccommodationsByCategory(item.label)}
              />
            </div>
          ))}
        </div>
        

            {/* Right Scroll Button and other buttons */}
    <div className="absolute z-10 flex items-center right-0 top-1/4 space-x-2">
      
      {/* Right Scroll Button */}
      <button 
        className="w-10 h-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transform -translate-y-1/2"
        onClick={() => scroll('right')}
      >
        <MdArrowForwardIos size={24} />
      </button>

      {/* Filter and Sort Buttons */}
      <div className="flex flex-col space-y-2 -top-[100%]">
        {/* Filter Button */}
        <button
          className="flex p-2 px-4 space-x-1 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
          onClick={() => setIsFilterModalOpen(true)}
        >
          <MdFilterList size={24} />
          <span className="font-medium text-gray-700">Filters</span>
        </button>

        {/* Sorting Button */}
        <button
          className="flex items-center p-2 px-4 space-x-1 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transition-all duration-300"
          onClick={handleSortingClick}
        >
          <BiSortAlt2 size={24} />
          <span className="font-medium text-gray-700">Sort</span>
        </button>
      </div>
    </div>



      </div>
      
  {showSortingOptions && (
    <div className="absolute right-0 w-40 mt-2 bg-white rounded-lg shadow-lg">
      <ul className="py-2">
      <li 
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSortOption("lowToHigh")}
        >
          Low
        </li>
        <li 
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSortOption("highToLow")}
        >
          High
        </li>  
      <li 
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSortOption("lowToHigh")}
        >
          Low to High
        </li>
        <li 
          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          onClick={() => handleSortOption("highToLow")}
        >
          High to Low
        </li>
      </ul>
    </div>
  )}

      {selectedCategory && accommodations.length > 0 && (
        <div className="pt-4">
          <h2 className="text-xl font-bold">Showing results for: {selectedCategory}</h2>
          <PropertyCard accommodations={accommodations} />
        </div>
      )}

      {selectedCategory && accommodations.length === 0 && (
        <div className="pt-4">
          <h2 className="text-xl font-bold">No accommodations found for: {selectedCategory}</h2>
        </div>
      )}
      <FilterModal 
      isOpen={isFilterModalOpen} 
      onClose={() => setIsFilterModalOpen(false)} // Close the modal
    />
    </Container>
  );
};

export default Categories;
