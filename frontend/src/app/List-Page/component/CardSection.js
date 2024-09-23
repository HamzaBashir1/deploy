import React from 'react';
import PropertyCard from '../../components/PropertyCard';

const CardSection = () => {
  return (
    <div className='mx-4 sm:mx-20 pt-10'>
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
