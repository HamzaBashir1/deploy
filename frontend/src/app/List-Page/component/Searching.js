import { Search } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import BanskáŠtiavnica from '../../../../public/BanskáŠtiavnica.jpg';
import LowTatras from '../../../../public/LowTatras.png';
import TatranskáLomnica from '../../../../public/TatranskáLomnica.jpg';
import StarýSmokovec from '../../../../public/StarýSmokovec.JPG';
import ŠtrbskéPleso from '../../../../public/ŠtrbskéPleso.jpg';
import LiptovskýMikuláš from '../../../../public/LiptovskýMikuláš.jpg';
import Terchová from '../../../../public/Terchová.jpg';
import Bojnice from '../../../../public/Bojnice.jpg';
import BanskáBystrica from '../../../../public/BanskáBystrica.jpg';
import Košice from '../../../../public/Košice.jpg';
import Bratislava from '../../../../public/Bratislava.jpg';
import Pieniny from '../../../../public/Pieniny.png';
import Link from 'next/link';
import { FormContext } from '../../FormContext';
import { FaArrowCircleLeft } from "react-icons/fa";

// Import city components
import SlovakiaComponent from './SlovakiaComponent';
import BulgariaComponent from './BulgariaComponent';
import CzechiaComponent from './CzechiaComponent';
// Add more imports for other city components if needed

const Searching = () => {
  const locations = [
    { name: 'Slovakia', image: BanskáŠtiavnica, count: 551, component: <SlovakiaComponent /> },
    { name: 'Bulgaria', image: TatranskáLomnica, count: 320, component: <BulgariaComponent /> },
    { name: 'Czechia', image: StarýSmokovec, count: 215, component: <CzechiaComponent /> },
    // Add more locations with their respective components
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null); // New state for selected city
  const { updateLocation } = useContext(FormContext);

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCityClick = (city) => {
    setSelectedCity(city); // Set the selected city
    updateLocation(city.name);
  };

  return (
    <div>
      
      {/* Conditional rendering of city component */}
      {selectedCity ? (
        <div>
          <button onClick={() => setSelectedCity(null)} className="mb-4">
          
            <FaArrowCircleLeft />
          </button>
         
          {selectedCity.component}
        </div>
      ) : (
        <div>
        <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search in Slovakia..."
          className="w-full p-2 pl-10 bg-gray-100 border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" />
      </div>
        
        <div className="grid grid-cols-1 gap-6">
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => handleCityClick(location)}
            >
              <Image
                src={location.image}
                alt={location.name}
                className="rounded-lg"
                width={100}
                height={75}
              />
              <div className="flex flex-col">
                <h1 className="text-[#292A34] text-lg font-semibold">
                  {location.name}
                </h1>
                <p className="text-[13px] text-[#888888]">
                  {location.count} objects
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Searching;
