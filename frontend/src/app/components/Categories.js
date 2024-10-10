"use client";
import { useState, useRef } from 'react';
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
import { MdOutlineApartment, MdCottage, MdHouseboat, MdOutlineBed } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { FaHotel } from "react-icons/fa";
import { IoHomeSharp } from "react-icons/io5";

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
  const categoryRef = useRef(null); // Ref to access category list container

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

  return (
    <Container>
      <div className="pt-4 bg-[#F7F7F7] relative">
        {/* Category List */}
        <div 
          ref={categoryRef} 
          className="flex flex-row items-center justify-between overflow-x-auto space-x-4 no-scrollbar"
          style={{
            scrollBehavior: 'smooth', // Smooth scrolling effect
          }}
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
      </div>

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
    </Container>
  );
};

export default Categories;
