"use client";
import React, { useState } from 'react';
import Searching from './Searching';  // Ensure this component has enough content to scroll
import Map from './Map';
import TouristArea from './TouristArea';
import Mountains from './Mountains';
import SkiResort from './SkiResort';
import WaterBodies from './WaterBodies';

const Location = () => {
  const [activeTab, setActiveTab] = useState('Searching');  // Default tab is 'Searching'

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="">
      {/* Tabs Navigation */}
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <button
              onClick={() => handleTabClick('Searching')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'Searching'
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
                  ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
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
          <div className="overflow-y-auto h-96">
            <Searching />
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
};

export default Location;