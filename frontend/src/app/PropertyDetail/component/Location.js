import React from 'react';
import Image from 'next/image';
import { ImCart, ImPieChart, ImSpoonKnife } from 'react-icons/im';
import location from '../../../../public/location.png';
import { FaBusAlt, FaGasPump, FaMoneyBillWave, FaSwimmer, FaTrain, FaUmbrellaBeach } from 'react-icons/fa';
import { MdAirportShuttle, MdChargingStation, MdMuseum } from 'react-icons/md';
import { GiCastle, GiCycle, GiMountainClimbing, GiTigerHead, GiWaterfall } from 'react-icons/gi';
import { BsFillHouseFill } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { BiWater } from 'react-icons/bi';

const Location = ({ data }) => {
  const locationDetails = data?.locationDetails || {};
  const contactDetails = data?.contactDetails || {};
  const placeTypes = locationDetails?.placesNearby || []; // Updated to use placesNearby

  const getIcon = (place) => {
    switch (place) {
      case 'Restaurant':
        return <ImSpoonKnife />;
      case 'Supermarket':
        return <FiShoppingCart />;
      case 'BusStation':
        return <FaBusAlt />;
      case 'TrainStation':
        return <FaTrain />;
      case 'Airport':
        return <MdAirportShuttle />;
      case 'SkiSlope':
        return <GiMountainClimbing />;
      case 'AquaPark':
        return <GiWaterfall />;
      case 'TouristTrail':
        return <GiMountainClimbing />;
      case 'CycleRoute':
        return <GiCycle />;
      case 'ATM':
        return <FaMoneyBillWave />;
      case 'GasStation':
        return <FaGasPump />;
      case 'ChargingStation':
        return <MdChargingStation />;
      case 'CableCar':
        return <FaBusAlt />;
      case 'SwimmingPool':
        return <BiWater />;
      case 'WaterArea':
        return <FaSwimmer />;
      case 'TheSea':
        return <FaSwimmer />;
      case 'Beach':
        return <FaUmbrellaBeach />;
      case 'Castle':
        return <GiCastle />;
      case 'Zoo':
        return <GiTigerHead />;
      case 'Museum':
        return <MdMuseum />;
      case 'BusinessCenter':
        return <BsFillHouseFill />;
      default:
        return <span className='text-xl'>❓</span>; // Default case for unknown places
    }
  };

  return (
    <div className='p-4 sm:p-6 mt-5 bg-white rounded-lg lg:mr-[440px] lg:ml-[18px]'>
      <h1 className='mb-2 text-lg font-bold sm:text-xl md:text-2xl'>Location</h1>
      <p className='p-2 mb-4 text-sm rounded-md sm:text-base'>
        {locationDetails?.country} / {locationDetails?.city} / {locationDetails?.zipCode}
      </p>

      <Image src={location} alt="Location" className='w-full h-auto mb-4' />

      <p className='mb-4 text-sm sm:text-base'>
        <span className='font-bold'>{contactDetails?.host}</span>
        {locationDetails?.locationDescription}
      </p>

      <hr className='mb-4' />

      <div className='space-y-4'>
        {placeTypes.map((place, index) => (
          <div key={index} className='flex items-center justify-between md:flex-row'>
            <div className='flex flex-row items-center space-x-2'>
              <div className='p-2 rounded-full bg-slate-200'>
                {getIcon(place.placeType)} {/* Use placeType from placesNearby */}
              </div>
              <p className='text-sm sm:text-base'>{place.placeType}</p>
            </div>
            <p className='text-sm sm:text-base'>{place.distance} km</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
