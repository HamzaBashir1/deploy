"use client";
import React, { useContext, useState } from 'react';
import Searching from './Searching';  // Ensure this component has enough content to scroll
import TouristArea from './TouristArea';
import Mountains from './Mountains';
import SkiResort from './SkiResort';
import WaterBodies from './WaterBodies';
import BanskáŠtiavnica from '../../../../public/BanskáŠtiavnica.jpg';
// import LowTatras from '../../../../public/LowTatras.png';
import TatranskáLomnica from '../../../../public/TatranskáLomnica.jpg';
import StarýSmokovec from '../../../../public/StarýSmokovec.JPG';
// import Orava from '../../../../public/Orava.png';
import Slovenskýraj from '../../../../public/Slovenskýraj.jpg';
import kysuce from '../../../../public/kysuce.jpg';
import Turiec from '../../../../public/Turiec.jpg';
// import VelkaFatra from '../../../../public/VelkaFatra.png';
import Image from 'next/image';
// import Orava1 from '../../../../public/Orava1.png'
// import Pieniny from '../../../../public/Pieniny.png'
// import Herohronie from '../../../../public/Herohronie.png'
import HighTatras from '../../../../public/HighTatras.png';
import LowTatras from '../../../../public/LowTatras.png';
import LittleFatra from '../../../../public/LittleFatra.png';
import Orava from '../../../../public/Orava.png';
import VelkaFatra from '../../../../public/VelkaFatra.png';
import Orava1 from '../../../../public/Orava1.png'
import Pieniny from '../../../../public/Pieniny.png'
import Herohronie from '../../../../public/Herohronie.png'
import Sleep from '../../../../public/Sleep.png'
// import Sleep from '../../../../public/Sleep.png'
// Import city components
// import BulgariaComponent from './BulgariaComponent';
// import CzechiaComponent from './CzechiaComponent';
import { FormContext } from '../../FormContext';
import { Search } from 'lucide-react';
// Add more imports for other city components if needed

function CzechiaComponent() {
    
  const locations = [
   
    { name: 'Liptov', image: Orava1, count: 180 },
    { name: 'Pieniny', image: Pieniny, count: 180 },
    { name: 'Herohronie', image: Herohronie, count: 180 },
    { name: 'Donovaly', image: Pieniny, count: 180 },
    { name: 'Štiavnické hills', image: Herohronie, count: 180 },
    { name: 'Sleep', image: Sleep, count: 180 },
  ];
  
  const [activeTab, setActiveTab] = useState('Searching');  // Default tab is 'Searching'

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
 
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
    <div className="overflow-y-auto h-96">
    <div className="grid grid-cols-1 gap-6">
    {filteredLocations.map((location, index) => (
      <div
        key={index}
        className='flex items-center space-x-4'
        onClick={() => updateLocation(location.name)}
      >
        <Image
          src={location.image}
          alt={location.name}
          className='rounded-lg'
          width={100}
          height={75}
          // layout='intrinsic'
        />
        <div className='flex flex-col'>
          <h1 className='text-[#292A34] text-lg font-semibold'>{location.name}</h1>
          <p className='text-[13px] text-[#888888]'>{location.count} objects</p>
        </div>
      </div>
    ))}
  </div>
    </div>
    </div>
  )
}

export default CzechiaComponent
