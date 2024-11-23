"use client"
import { useContext, useState } from 'react';
import { Search, X, Menu } from 'lucide-react'; // Hamburger Menu Icon from Lucide
import Dates from './Dates';
import Person from './Person';
import Filtersection from './Filtersection';
import Location from './Location';
import { IoClose } from 'react-icons/io5';
import { FormContext } from '../../FormContext';
import LocationM from './LocationM';

const Fillter = ({ closePopup }) => {
  const [selectedLocation, setSelectedLocation] = useState('High Tatras');
  const { updateLocation,location} = useContext(FormContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Location'); // State for active sidebar tab
  const {  
     loadingProperties,
        setLoadingProperties,
    
  } = useContext(FormContext);
  const handleShowAccommodation = () => {
    setLoadingProperties(true); // Set loading state to true when button is clicked
    closePopup(); // Close the popup if necessary
  };

  // Function to set the active tab
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false); // Close sidebar after selecting a tab
  };

  // Sidebar content rendering
  const renderContent = () => {
    switch (activeTab) {
      case 'Location':
        return <LocationM />; 
      case 'Date':
        return <Dates />;
      case 'Persons':
        return <Person />;
      case 'Filter':
        return <Filtersection />;
      default:
        return <p>Select an option from the sidebar.</p>;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 lg:flex-row">
      {/* Mobile Header */}
      <div className="flex items-center justify-between p-4 text-white bg-gray-800 lg:hidden">
        {/* Hamburger Menu on Left */}
        <Menu 
          className="w-6 h-6 cursor-pointer" 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <h1 className="text-xl font-bold">Slovakia Travel</h1>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-10 w-64 p-4 transition-transform bg-gray-800 text-white lg:static lg:translate-x-0 lg:block ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button for small screens */}
        <div className="flex justify-end lg:hidden">
          <X 
            className="w-6 h-6 mb-4 cursor-pointer" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        </div>

        {/* Location Section */}
        <div className="mb-4">
          <h2 className="text-sm text-gray-400">Location</h2>
          <div
            className={`flex items-center justify-between p-2 rounded cursor-pointer ${
              activeTab === 'Location' ? 'bg-gray-600' : 'bg-gray-700'
            }`}
            onClick={() => handleTabClick('Location')}
          >
            <span>{ location || "laocation" }</span>
            <X 
              className="w-4 h-4 cursor-pointer" 
              onClick={() => setSelectedLocation('')} 
            />
          </div>
        </div>

        {/* Other Sidebar Items */}
        <div
          className={`mb-4 cursor-pointer rounded ${
            activeTab === 'Date' ? 'bg-gray-600' : 'bg-gray-800'
          }`}
          onClick={() => handleTabClick('Date')}
        >
          <h2 className="text-sm text-gray-400">Date from — to</h2>
          <p className="text-gray-300">When will you go?</p>
        </div>

        <div
          className={`mb-4 cursor-pointer rounded ${
            activeTab === 'Persons' ? 'bg-gray-600' : 'bg-gray-800'
          }`}
          onClick={() => handleTabClick('Persons')}
        >
          <h2 className="text-sm text-gray-400">Number of persons</h2>
          <p className="text-gray-300">How many will you be?</p>
        </div>

        <div
          className={`mb-4 cursor-pointer rounded ${
            activeTab === 'Filter' ? 'bg-gray-600' : 'bg-gray-800'
          }`}
          onClick={() => handleTabClick('Filter')}
        >
          <h2 className="text-sm text-gray-400">Filter</h2>
          <p className="text-gray-300">Your requirements?</p>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="relative flex-1 p-6 bg-white lg:w-3/4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{activeTab} Details</h2>
        <button
          className="p-2 text-sm font-semibold text-white bg-red-500 rounded hover:bg-gray-300"
          onClick={closePopup}
          aria-label="Close"
        >
        <IoClose/>
        </button>
      </div>
    
      <div>{renderContent()}</div>
    
      {/* Show Accommodation Button */}
      <div className="fixed inset-x-0 flex justify-center bottom-4 lg:relative lg:mt-4">
  <button
    className="px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600"
    onClick={handleShowAccommodation} 
  >
    Show accommodation
  </button>
</div>
    </div>
    
    </div>
  );
};

export default Fillter;
