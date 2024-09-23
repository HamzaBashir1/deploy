"use client";
import { useState } from 'react';
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
  { label: "Apartment", icon: MdOutlineApartment, description: "This property is Apartments!" },
  { label: "Flat", icon: FaHotel, description: "This property has Flat!" },
  { label: "Glamping", icon: GiWindmill, description: "This property has Glamping!" },
  { label: "Cottages", icon: MdCottage, description: "This property has Cottages!" },
  { label: "Motels/Hostel", icon: RiHotelLine, description: "This property is in the Motels/Hostel!" },
  { label: "Wooden Houses", icon: GiWoodenDoor, description: "This property has beautiful Wooden Houses!" },
  { label: "Guest Houses", icon: GiFamilyHouse, description: "This property has beautiful GuestHouses!" },
  { label: "Secluded Accommodation", icon: BsFillHouseDoorFill, description: "This property is in Secluded Accommodation!" },
  { label: "Hotels", icon: FaHotel, description: "This is a beautiful Hotel!" },
  { label: "Dormitories", icon: GiBunkBeds, description: "This property is a Dormitory!" },
  { label: "Caves", icon: GiCaveEntrance, description: "This property is in a spooky cave!" },
  { label: "Campsites", icon: GiForestCamp, description: "This property offers camping activities!" },
  { label: "Treehouses", icon: GiTreehouse, description: "This property is in Treehouses!" },
  { label: "Houseboats", icon: MdHouseboat, description: "This property is in Houseboats!" },
  { label: "Rooms", icon: MdOutlineBed, description: "This property is in Rooms!" },
  { label: "Entire Homes", icon: IoHomeSharp, description: "This property is an Entire Home!" },
  { label: "Luxury Accommodation", icon: IoDiamond, description: "This property is brand new and luxurious!" },
];

const Categories = () => {
  // Initialize accommodations as an empty array
  const [accommodations, setAccommodations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchAccommodationsByCategory = async (category) => {
    console.log("Fetching accommodations for category:", category);
    setSelectedCategory(category); // Set to the category label

    // Fetch accommodations for the selected category
    const fetchUrl = `${Base_URL}/accommodation/search?category=${encodeURIComponent(category)}`;
    console.log("Fetch URL:", fetchUrl);

    try {
        const response = await fetch(fetchUrl);
        console.log("Response status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Filter data to ensure it matches the selected category
        const filteredData = data.filter(item => item.propertyType === category);

        console.log("Filtered data:", filteredData);
        setAccommodations(filteredData); // Only set accommodations that match the selected category
    } catch (error) {
        console.error("Error fetching accommodations:", error);
        setAccommodations([]); // Clear accommodations on error
    }
};


  return (
    <Container>
      <div className='pt-4 flex flex-row items-center justify-center overflow-x-auto bg-[#F7F7F7]'>
        {categories.map((item) => (
          <CategoryBox 
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={selectedCategory === item.label}
            onClick={() => fetchAccommodationsByCategory(item.label)}
          />
        ))}
      </div>

      {/* Show selected category and accommodations */}
      {selectedCategory && accommodations.length > 0 && (
        <div className="pt-4">
          <h2 className="text-xl font-bold">Showing results for: {selectedCategory}</h2>
          <PropertyCard accommodations={accommodations} />
        </div>
      )}

      {/* Show a message if no accommodations are found for the selected category */}
      {selectedCategory && accommodations.length === 0 && (
        <div className="pt-4">
          <h2 className="text-xl font-bold">No accommodations found for: {selectedCategory}</h2>
        </div>
      )}
    </Container>
  );
};

export default Categories;
