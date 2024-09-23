"use client";
import React, { useState } from 'react';
import Favorite from './Favorite';
import SkiResort from './SkiResort';
import TouristArea from './TouristArea';
import CitiesTown from './CitiesTown';
import Mountains from './Mountains';
import WaterBodies from './WaterBodies';
// Import other content components as needed

const Location = () => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('Favorite');

  // Function to handle tab clicks
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className='mt-10 mx-4 md:mx-20'>
      <h1 className='text-2xl font-semibold text-center mb-4'>Locations</h1>
      <div className='overflow-x-auto'>
        <div className='tabs-container flex justify-start md:justify-center'>
          <ul className='flex whitespace-nowrap text-sm font-medium'>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Favorite')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Favorite' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Favorite
              </button>
            </li>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Ski resorts')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Ski resorts' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Ski resorts
              </button>
            </li>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Tourist areas')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Tourist areas' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Tourist areas
              </button>
            </li>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Cities and towns')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Cities and towns' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Cities and towns
              </button>
            </li>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Mountains')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Mountains' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Mountains
              </button>
            </li>
            <li className='me-2'>
              <button
                onClick={() => handleTabClick('Water bodies')}
                className={`inline-block px-4 py-3 border rounded-lg ${activeTab === 'Water bodies' ? 'text-[#58CAAA] border-[#58CAAA]' : 'text-[#667085] border-[#667085]'} bg-white hover:text-[#58CAAA] hover:border-[#58CAAA] focus:outline-none`}
              >
                Water bodies
              </button>
            </li>
            {/* Add other tabs */}
          </ul>
        </div>
      </div>
      <div className='mt-6'>
        {activeTab === 'Favorite' && <Favorite />}
        {activeTab === 'Ski resorts' && <SkiResort />}
        {activeTab === 'Tourist areas' && <TouristArea />}
        {activeTab === 'Cities and towns' && <CitiesTown />}
        {activeTab === 'Mountains' && <Mountains />}
        {activeTab === 'Water bodies' && <WaterBodies />}
      </div>
    </div>
  );
};

export default Location;
