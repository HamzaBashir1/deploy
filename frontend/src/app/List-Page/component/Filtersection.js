import { FormContext } from '../../FormContext';
import { Timer } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { BiLabel } from 'react-icons/bi'
import Slider from '@mui/material/Slider';
const Filtersection = () => {

  const {  
    updateTravelingWithPet,
    updateBeds,
    Beds,
    updateBathrooms,
    Bathrooms,
    updateEquipment,
    Equipment,
    travelingWithPet,
    infants,
    adults,
    updateAdults,
    updateChildren,
    childrens,
    updateInfants,
    updatepricemins,
    updatepricemaxs,
    pricemaxs,
    pricemins,
    updateBedss,
        updateBathroomss
        ,
        Bedss,
        Bathroomss,
    
  } = useContext(FormContext);
  const [beds, setBeds] = useState(0); // 0 represents "Any"
  const [bathrooms, setBathrooms] = useState(0); // 0 represents "Any"

  // const handleIncrement = (setter, value) => setter(value + 1);
  // const handleDecrement = (setter, value) => setter(value > 0 ? value - 1 : 0);
  const increaseBeds = () => setBeds(prev => prev + 1);
  const decreaseBeds = () => setBeds(prev => (prev > 0 ? prev - 1 : 0));

  // Increment/decrement bathrooms
  const increaseBathrooms = () => setBathrooms(prev => prev + 1);
  const decreaseBathrooms = () => setBathrooms(prev => (prev > 0 ? prev - 1 : 0));
  const [selectedServices, setSelectedServices] = useState([]);
  const [priceRange, setPriceRange] = useState([ Number(pricemins) || 50, Number(pricemaxs) || 1500]);

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
    updatepricemins(newValue[0])
    updatepricemaxs(newValue[1])
    console.log(`Selected Price Range: ${newValue[0]} - ${newValue[1]},${pricemins} - ${pricemaxs}`);
  };
  // const handleServiceCheckboxChange = (event) => {
  //   const { id, checked } = event.target;
  //   setSelectedServices((prev) => ({ ...prev, [id]: checked }));
  // };

  // Persist changes to context when component mounts or unmounts
  useEffect(() => {
    updateBedss(beds);
    updateEquipment(selectedServices);
    updateBathroomss(bathrooms);
  }, [beds, bathrooms, updateBeds, updateBathrooms,selectedServices,updateEquipment]);
  const servicesList = [
    { id: 'Free Wifi', label: 'Free Wifi' },
    { id: 'High speed internet', label: 'High speed internet' },
    { id: 'Barrier-free access', label: 'Barrier-free access' },
    { id: 'Charging station', label: 'Charging station' },
    { id: 'Reception', label: 'Reception' },
    { id: 'Invoicing possible', label: 'Invoicing possible' },
    { id: 'Card payment possible', label: 'Card payment possible' },
    { id: 'Room service', label: 'Room service' },
    { id: 'Air conditioning', label: 'Air conditioning' },
    { id: 'ATM', label: 'ATM' },
    { id: 'Parking', label: 'Parking' },
    { id: 'Kitchen', label: 'Kitchen' },
    { id: 'Exchange office', label: 'Exchange office' },
    { id: 'Restaurant', label: 'Restaurant' },
    { id: 'Bar', label: 'Bar' },
    { id: 'Wellness', label: 'Wellness' },
    { id: 'Swimming pool', label: 'Swimming pool' },
    { id: 'Hairdressing', label: 'Hairdressing' },
    { id: 'Game room', label: 'Game room' },
    { id: 'Fireplace', label: 'Fireplace' },
    { id: 'Grill', label: 'Grill' },
    { id: 'Shelter', label: 'Shelter' },
    { id: 'Terrace', label: 'Terrace' },
    { id: 'Conference Room', label: 'Conference Room' },
    { id: 'Laundry Room', label: 'Laundry Room' },
    { id: 'Cleaning plant', label: 'Cleaning plant' }
  ];

  const handleServiceCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setSelectedServices((prev) => {
      if (checked) {
        // Add service if checked
        return [...prev, id];
      } else {
        // Remove service if unchecked
        return prev.filter((service) => service !== id);
      }
    });
  };

  console.log('Selected services:', selectedServices,"equipment",Equipment); // Display selected services in console

  return (
    <div className='h-[500px] p-4 overflow-y-auto rounded-lg shadow-lg md:p-6 lg:p-8 bg-gray-50'>
  <h1 className='mb-4 text-lg font-bold md:text-xl'>Type of accommodation</h1>
  <div>
    <div className="flex items-center mb-4">
      <input id="apartment-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
      <label htmlFor="apartment-checkbox" className="text-sm font-medium text-gray-900 ms-2 ">Apartment / flat for rent</label>
    </div>

    <div className="flex items-center mb-4">
      <input id="cottage-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
      <label htmlFor="cottage-checkbox" className="text-sm font-medium text-gray-900 ms-2 ">Cottage / Wooden house / Log house</label>
    </div>

    {/* Add more checkboxes similarly */}

    <hr className='my-4'/>

    <h1 className='mb-4 text-lg font-bold md:text-xl'>Rooms</h1>

    {/* Responsive Number of bedrooms */}
    <div>
      {/* Responsive Number of Bedrooms */}
      <div className="flex items-center justify-between mb-6 space-x-4">
  <div>
    <p className="text-sm font-medium text-gray-700 md:text-lg">Number of bedrooms</p>
  </div>
  <div className="flex items-center space-x-4">
    <button
      type="button"
      aria-label="Decrease guest count"
      onClick={decreaseBeds}
      disabled={beds === 0}
      className={`p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300 ${
        beds === 0 ? "cursor-not-allowed" : ""
      }`}
    >
      -
    </button>
    <span className="text-lg font-semibold text-gray-700 md:text-xl">{beds === 0 ? '0' : beds}</span> {/* Show 0 if bedrooms is empty */}
    <button
      type="button"
      aria-label="Increase guest count"
      onClick={increaseBeds}
      className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
    >
      +
    </button>
  </div>
</div>

{/* Number of Bathrooms */}
<div className="flex items-center justify-between mb-6 space-x-4">
  <div>
    <p className="text-sm font-medium text-gray-700 md:text-lg">Number of bathrooms</p>
  </div>
  <div className="flex items-center space-x-4">
    <button
      type="button"
      aria-label="Decrease guest count"
      onClick={decreaseBathrooms}
      disabled={bathrooms === 0}
      className={`p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300 ${
        bathrooms === 0 ? "cursor-not-allowed" : ""
      }`}
    >
      -
    </button>
    <span className="text-lg font-semibold text-gray-700 md:text-xl">{bathrooms === 0 ? '0' : bathrooms}</span> {/* Show 0 if bathrooms is empty */}
    <button
      type="button"
      aria-label="Increase guest count"
      onClick={increaseBathrooms}
      className="p-2 px-4 text-xl font-bold transition bg-gray-200 rounded-md hover:bg-gray-300"
    >
      +
    </button>
  </div>
</div>


</div>

    <h1 className='mb-4 text-lg font-bold md:text-xl'>Price per night</h1>

    <div className="h-24 mb-2">
    {/* Slider from MUI */}
    <Slider
      value={priceRange}
      min={50}
      max={1500}
      step={5}
      onChange={handleSliderChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      getAriaLabel={() => 'Price range'}
    />
    
    {/* Displaying Min and Max Prices */}
    <div className="relative mb-6">
      <div className='flex justify-between'>
        <span className="text-xs md:text-sm">Min (€{priceRange[0]})</span>
        <span className="text-xs md:text-sm">€{(priceRange[0] + priceRange[1]) / 2}</span>
        <span className="text-xs md:text-sm">Max (€{priceRange[1]})</span>
      </div>
    </div>
  </div>
     <hr className='my-4'/>

    {/* Action and Special Offers */}
    <div className='flex flex-col gap-4 lg:flex-row'>
      <div className='flex flex-row p-4 space-x-4 bg-white border rounded-md shadow'>
        <Timer className='w-8 h-8'/>
        <div className='flex flex-col'>
          <h1 className='text-sm font-bold md:text-lg'>Last Minute</h1>
          <p className='text-sm md:text-base'>Check out the last minute discounted accommodation.</p>
        </div>
      </div>

      <div className='flex flex-row p-4 space-x-4 bg-white border rounded-md shadow'>
        <BiLabel className='w-8 h-8'/>
        <div className='flex flex-col'>
          <h1 className='text-sm font-bold md:text-lg'>Promotion and Discounts</h1>
          <p className='text-sm md:text-base'>Check out accommodation that offers promotions and discounted prices.</p>
        </div>
      </div>
    </div>

    <hr className='my-4'/>

    {/* Equipment and Services */}
    <div className='p-5 mb-4 bg-white rounded-md shadow'>
    <h1 className='mb-4 text-lg font-bold'>Equipment and Services</h1>
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {servicesList.map(({ id, label }) => (
        <div key={id} className='flex items-center space-x-2'>
          <input
            id={id}
            type='checkbox'
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2'
            checked={selectedServices.includes(id)} // Check if selected
            onChange={handleServiceCheckboxChange}
          />
          <label htmlFor={id} className='text-sm font-medium text-gray-900'>
            {label}
          </label>
        </div>
      ))}
    </div>
  </div>
  </div>
</div>

  )
}

export default Filtersection;
