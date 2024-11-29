"use client";
import React, { useContext, useState } from 'react';
import Searching from './Searching';  // Ensure this component has enough content to scroll
import Map from './Map';
import TouristArea from './TouristArea';
import Mountains from './Mountains';
import SkiResort from './SkiResort';
import { FaArrowCircleLeft } from "react-icons/fa";
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
import BulgariaComponent from './BulgariaComponent';
import CzechiaComponent from './CzechiaComponent';
import { FormContext } from '../../FormContext';
import { Search } from 'lucide-react';
// Add more imports for other city components if needed


function SlovakiaComponent() {
    

    const locations = [
        { name: 'High Tatras', image: HighTatras, count: 551 },
        { name: 'Low Tatras', image: LowTatras, count: 420 },
        { name: 'Little Fatra', image: LittleFatra, count: 320 },
        { name: 'Orava', image: Orava, count: 215 },
        { name: 'Velka Fatra', image: VelkaFatra, count: 180 },
        { name: 'Orava', image: Orava1, count: 180 },
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
        <div className="">
          {/* Tabs Navigation */}
          <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
            <ul className="flex flex-wrap -mb-px">
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('Searching')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'Searching'
                      ? 'text-blue-600 border-b-2 border-blue-600 '
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                  }`}
                >
                  Searching
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('Map')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'Map'
                      ? 'text-blue-600 border-b-2 border-blue-600 '
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                  }`}
                >
                  Map
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('TouristArea')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'TouristArea'
                      ? 'text-blue-600 border-b-2 border-blue-600 '
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                  }`}
                >
                  Tourist Areas
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('Mountains')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'Mountains'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                  }`}
                >
                  Mountains
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('SkiResorts')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'SkiResorts'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                  }`}
                >
                  Ski Resorts
                </button>
              </li>
              <li className="me-2">
                <button
                  onClick={() => handleTabClick('WaterBodies')}
                  className={`inline-block p-4 rounded-t-lg ${
                    activeTab === 'WaterBodies'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 '
                  }`}
                >
                  Water Bodies
                </button>
              </li>
            </ul>
          </div>
    
          {/* Content Display based on the active tab */}
          <div className="p-4">
            {activeTab === 'Searching' && (
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
            )}
            {activeTab === 'Map' && <Map />}
            {activeTab === 'TouristArea' && <TouristArea />}
            {activeTab === 'Mountains' && <Mountains />}
            {activeTab === 'SkiResorts' && <SkiResort />}
            {activeTab === 'WaterBodies' && <WaterBodies />}
          </div>
        </div>
      );
}

export default SlovakiaComponent
