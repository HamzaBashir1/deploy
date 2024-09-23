import React from 'react';
import Image from 'next/image';
import { ImCart, ImPieChart, ImSpoonKnife } from 'react-icons/im';
import location from '../../../../public/location.png';

const Location = ({ data }) => {
  const locationDetails = data?.locationDetails || {};
  const contactDetails = data?.contactDetails || {};
  const placeTypes = locationDetails?.placesNearby || []; // Updated to use placesNearby

  const getIcon = (place) => {
    switch (place) {
      case 'Restaurant':
        return <ImSpoonKnife />;
      case 'Supermarket':
        return <ImPieChart />;
      case 'BusStation':
      case 'TrainStation':
        return <span className='text-xl'>🚍</span>;
      case 'Airport':
        return <span className='text-xl'>✈️</span>;
      default:
        return <span className='text-xl'>❓</span>;
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
