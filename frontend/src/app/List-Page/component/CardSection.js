import React from 'react';
import PropertyCard from './Propertycard';

const CardSection = () => {
  return (
    <div className='pt-10 mx-4 sm:mx-20'>
      {/* Grid layout for responsiveness */}
      <div className=''>
        {/* Repeat this div to add more cards if needed */}
        <div className=''>
          <PropertyCard />
        </div>
      </div>
    </div>
  );
};

export default CardSection;
