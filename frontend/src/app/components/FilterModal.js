import React, { useContext, useState } from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FormContext } from "../FormContext";


import Slider from '@mui/material/Slider';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FilterModal = ({ isOpen, onClose }) => {
  const [showMore, setShowMore] = useState(false); 
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const { pricemin , updatepricemin,pricemax,updatepricemax , updateBeds,updateBathrooms,updateamenity,updatebooking } = useContext(FormContext);

  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10, 1000]);
  const [beds, setBeds] = useState(0); // 0 represents "Any"
  const [bathrooms, setBathrooms] = useState(0); // 0 represents "Any"

//   const [propertyOpen, setPropertyOpen] = useState(false);
  
  // State to manage selected property types
  const [selectedProperties, setSelectedProperties] = useState([]);

  // Handle property type selection
  const handlePropertySelect = (property) => {
    setSelectedProperties((prevSelected) => {
      if (prevSelected.includes(property)) {
        // Deselect the property if already selected
        const updatedProperties = prevSelected.filter((item) => item !== property);
        console.log('Selected Property Types:', updatedProperties);
        return updatedProperties;
      } else {
        // Add the property to the selection
        const updatedProperties = [...prevSelected, property];
        console.log('Selected Property Types:', updatedProperties);
        return updatedProperties;
      }
    });
  };

  // State to manage selected options

  // Handle option select and deselect
  const handleOptionSelect = (option) => {
    setSelectedOptions((prevSelected) => {
      if (prevSelected.includes(option)) {
        // Deselect the option if it's already selected
        const updatedOptions = prevSelected.filter((opt) => opt !== option);
        console.log('Selected Options:', updatedOptions);
        return updatedOptions;
      } else {
        // Add the option if it's not selected
        const updatedOptions = [...prevSelected, option];
        console.log('Selected Options:', updatedOptions);
        return updatedOptions;
      }
    });
  };

  // Manage selected amenities
  const [selectedAmenities, setSelectedAmenities] = useState({
    Wifi: false,
    Kitchen: false,
    Washer: false,
    Dryer: false,
    'Air conditioning': false,
    Heating: false,
    Parking: false,
    Pool: false,
    Gym: false,
  });
  // Handle checkbox changes
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prevState) => {
      const updatedState = {
        ...prevState,
        [amenity]: !prevState[amenity],
      };
      console.log('Selected Amenities:', updatedState);
      return updatedState;
    });
  };
  // Increment/decrement beds
  const increaseBeds = () => setBeds(prev => prev + 1);
  const decreaseBeds = () => setBeds(prev => (prev > 0 ? prev - 1 : 0));

  // Increment/decrement bathrooms
  const increaseBathrooms = () => setBathrooms(prev => prev + 1);
  const decreaseBathrooms = () => setBathrooms(prev => (prev > 0 ? prev - 1 : 0));
  // Handle slider change
//   const handleSliderChange = (event, newValues) => {
//     setPriceRange(newValues);
//   };

  // Handle input changes
  const handleMinInputChange = (e) => {
    const newMin = Math.min(Number(e.target.value), priceRange[1] - 5);
    setPriceRange([newMin, priceRange[1]]);
  };

  const handleMaxInputChange = (e) => {
    const newMax = Math.max(Number(e.target.value), priceRange[0] + 5);
    setPriceRange([priceRange[0], newMax]);
  };
  if (!isOpen) return null;

  // Update slider values
  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Helper to update bar colors based on slider range
  const getBarColors = () => {
    return initialData.map((_, index) => {
      const price = index * 10; // Assuming price buckets in steps of 10
      if (price >= priceRange[0] && price <= priceRange[1]) {
        return originalColor;
      } else {
        return greyColor;
      }
    });
  };
// Initial dataset (example values)
const initialData = [445, 315, 325, 350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350,350, 240, 160, 350, 200, 100, 500];
const originalColor = '#FF385C'; // Original color for bars
const greyColor = '#D3D3D3'; // Grey color for bars outside range

  // Data for the histogram chart
  const data = {
    labels: Array.from({ length: 40 }, (_, i) => `$${50 * i}`),
    datasets: [
      {
        label: 'Price Distribution',
        data: initialData,
        backgroundColor: getBarColors(), // Dynamically set colors based on range
        borderRadius: 4,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { display: false },
    },
    maintainAspectRatio: false,
  };
  const handleShowClick = () => {
    updatepricemin(priceRange[0]);
    updatepricemax(priceRange[1]);
    updateBeds(beds);
    console.log("test",selectedAmenities)
    updateamenity(selectedAmenities);
    updatebooking(selectedOptions)
    updateBathrooms(bathrooms);
    onClose()
  };
  
  const initialPriceRange = [10, 1000]; // Define the initial price range

// Function to clear the selected price range
const handleclear = () => {
    setPriceRange(initialPriceRange); // Reset the price range to initial values
    updatepricemin(initialPriceRange[0]); // Set the minimum price to initial value
    updatepricemax(initialPriceRange[1]);

    setBeds(0);
  setBathrooms(0);


  // Reset selected property types to an empty array
  setSelectedProperties([]);

  // Reset selected options to an empty array (assuming you have selectedOptions state)
  setSelectedOptions([]);

  // Reset amenities to their default false state
  setSelectedAmenities({
    Wifi: false,
    Kitchen: false,
    Washer: false,
    Dryer: false,
    'Air conditioning': false,
    Heating: false,
    Parking: false,
    Pool: false,
    Gym: false,
  });

  console.log('All fields reset to initial state'); // Set the maximum price to initial value
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg max-h-[80vh] flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white">
         
          <h2 className="flex-1 -ml-6 text-xl font-semibold text-center">Filters</h2>
          <button onClick={onClose}>
          <MdClose className="w-6 h-6" />
        </button>
          </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Histogram Section */}
          <div className="space-y-4">
      <h3 className="text-sm font-medium">Nightly prices before fees and taxes</h3>
      <div className="h-24 mb-2">
        <Bar data={data} options={options} />
        <Slider
          value={priceRange}
          min={10}
          max={1000}
          step={5}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
        />
      </div>

      {/* Min/Max Price Inputs */}
      <div className="flex justify-between mt-2">
        <input
          type="number"
          placeholder="$10"
          className="w-24 p-2 border rounded-md focus:outline-none"
          value={priceRange[0]}
          onChange={handleMinInputChange}
        />
        <input
          type="number"
          placeholder="$500+"
          className="w-24 p-2 border rounded-md focus:outline-none"
          value={priceRange[1]}
          onChange={handleMaxInputChange}
        />
      </div>
    </div>

          {/* Beds and Bathrooms Section */}
          <div className="mt-6 space-y-6">
          <h3 className="text-lg font-semibold">Beds and bathrooms</h3>
    
          {/* Beds Control */}
          <div className="flex items-center justify-between">
            <span>Beds</span>
            <div className="flex items-center space-x-2">
              <button
                className="p-1 border rounded-full"
                onClick={decreaseBeds}
                disabled={beds === 0}
              >
                <FiMinus />
              </button>
              <span className="text-gray-500">
                {beds === 0 ? 'Any' : beds}
              </span>
              <button className="p-1 border rounded-full" onClick={increaseBeds}>
                <FiPlus />
              </button>
            </div>
          </div>
    
          {/* Bathrooms Control */}
          <div className="flex items-center justify-between">
            <span>Bathrooms</span>
            <div className="flex items-center space-x-2">
              <button
                className="p-1 border rounded-full"
                onClick={decreaseBathrooms}
                disabled={bathrooms === 0}
              >
                <FiMinus />
              </button>
              <span className="text-gray-500">
                {bathrooms === 0 ? 'Any' : bathrooms}
              </span>
              <button className="p-1 border rounded-full" onClick={increaseBathrooms}>
                <FiPlus />
              </button>
            </div>
          </div>
        </div>

          {/* Amenities Section */}
          <div className="mt-6 space-y-6">
      <h3 className="text-lg font-semibold">Amenities</h3>
      <div className="overflow-y-auto max-h-40">
        <div className="grid grid-cols-2 gap-4">
          {/* List of Amenities */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities.Wifi}
              onChange={() => handleAmenityChange('Wifi')}
            />
            <span>Free Wifi</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities.Kitchen}
              onChange={() => handleAmenityChange('Kitchen')}
            />
            <span>Kitchen</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities.Washer}
              onChange={() => handleAmenityChange('Washer')}
            />
            <span>Washer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities.Dryer}
              onChange={() => handleAmenityChange('Dryer')}
            />
            <span>Dryer</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities['Air conditioning']}
              onChange={() => handleAmenityChange('Air conditioning')}
            />
            <span>Air conditioning</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={selectedAmenities.Heating}
              onChange={() => handleAmenityChange('Heating')}
            />
            <span>Heating</span>
          </label>

          {/* Conditional Show More */}
          {showMore && (
            <>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedAmenities.Parking}
                  onChange={() => handleAmenityChange('Parking')}
                />
                <span>Parking</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedAmenities.Pool}
                  onChange={() => handleAmenityChange('Pool')}
                />
                <span>Pool</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={selectedAmenities.Gym}
                  onChange={() => handleAmenityChange('Gym')}
                />
                <span>Gym</span>
              </label>
            </>
          )}
        </div>
      </div>
      <button
        className="text-sm font-semibold text-blue-600"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? 'Show less' : 'Show more'}
      </button>
    </div>
          
        {/* Booking Options Section */}
           <div className="mt-6 space-y-6">
      <h3 className="text-lg font-semibold">Booking Options</h3>
      <div className="grid grid-cols-2 gap-4">
        {/* Instant Book */}
        <button
          className={`flex items-center justify-center w-full p-2 space-x-2 text-sm font-medium bg-gray-100 rounded-full ${
            selectedOptions.includes('Instant Book') ? 'bg-blue-600 text-blue-600' : ''
          }`}
          onClick={() => handleOptionSelect('Instant Book')}
        >
          <span>Instant Book</span>
        </button>

        {/* Self Check-in */}
        <button
          className={`flex items-center justify-center w-full p-2 space-x-2 text-sm font-medium bg-gray-100 rounded-full ${
            selectedOptions.includes('Self check-in') ? 'bg-blue-600 text-blue-600' : ''
          }`}
          onClick={() => handleOptionSelect('Self check-in')}
        >
          <span>Self check-in</span>
        </button>

        {/* Free Cancellation */}
        <button
          className={`flex items-center justify-center w-full p-2 space-x-2 text-sm font-medium bg-gray-100 rounded-full ${
            selectedOptions.includes('Free cancellation') ? 'bg-blue-600 text-blue-600' : ''
          }`}
          onClick={() => handleOptionSelect('Free cancellation')}
        >
          <span>Free cancellation</span>
        </button>

        {/* Allows Pets */}
        <button
          className={`flex items-center justify-center w-full p-2 space-x-2 text-sm font-medium bg-gray-100 rounded-full ${
            selectedOptions.includes('Pets are allowed') ? 'bg-blue-600 text-blue-600' : ''
          }`}
          onClick={() => handleOptionSelect('Pets are allowed')}
        >
          <span>Pets are allowed</span>
        </button>
      </div>
    </div>
 

        {/* Standout Stays Section */}
        <div className="mt-6 space-y-6">
          <h3 className="text-lg font-semibold">Standout stays</h3>
          <button className="flex items-center justify-center w-full p-2 space-x-2 text-sm font-medium bg-gray-100 rounded-full">
            <span className="text-gray-600">Guest favorite</span>
          </button>
        </div>

        {/* Property Type Section */}
         <div className="mt-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Property Type</h3>
        <button onClick={() => setPropertyOpen(!propertyOpen)}>
          {propertyOpen ? <FiMinus /> : <FiPlus />}
        </button>
      </div>

      {propertyOpen && (
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('House')}
              checked={selectedProperties.includes('House')}
            />
            <span>House</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('Apartment')}
              checked={selectedProperties.includes('Apartment')}
            />
            <span>Apartment</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('Condo')}
              checked={selectedProperties.includes('Condo')}
            />
            <span>Condo</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('Cabin')}
              checked={selectedProperties.includes('Cabin')}
            />
            <span>Cabin</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('Villa')}
              checked={selectedProperties.includes('Villa')}
            />
            <span>Villa</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              onChange={() => handlePropertySelect('Studio')}
              checked={selectedProperties.includes('Studio')}
            />
            <span>Studio</span>
          </label>
        </div>
      )}
    </div>
         {/* Property Type Section */}
         <div className="mt-6 space-y-6">
         <div className="flex items-center justify-between">
           <h3 className="text-lg font-semibold"> Accessibility features</h3>
           <button onClick={() => setAccessibilityOpen(!accessibilityOpen)}>
             {accessibilityOpen ? <FiMinus /> : <FiPlus />}
           </button>
         </div>

         {accessibilityOpen && (
           <div className="grid grid-cols-2 gap-4">
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>House</span>
             </label>
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>Apartment</span>
             </label>
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>Condo</span>
             </label>
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>Cabin</span>
             </label>
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>Villa</span>
             </label>
             <label className="flex items-center space-x-2">
               <input type="checkbox" className="form-checkbox" />
               <span>Studio</span>
             </label>
           </div>
         )}
       </div>

        {/* Languages Spoken Section */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold"> host Languages </h3>
            <button onClick={() => setLanguageOpen(!languageOpen)}>
              {languageOpen ? <FiMinus /> : <FiPlus />}
            </button>
          </div>

          {languageOpen && (
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>English</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Spanish</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>French</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>German</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Chinese</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox" />
                <span>Japanese</span>
              </label>
            </div>
          )}
        </div>


        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between mt-4">
          <button className="text-gray-500"  onClick={handleclear}>Clear all</button>
          <button className="px-4 py-2 text-white bg-black rounded-md"  onClick={handleShowClick}>
            Show 
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
