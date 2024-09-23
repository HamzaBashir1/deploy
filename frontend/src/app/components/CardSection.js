import React from 'react';
import PropertyCard from './PropertyCard';

const CardSection = () => {
  return (
      <div className='mx-4 sm:mx-20 mt-8'>
        <div className='flex flex-nowrap lg:flex-wrap lg:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide'>
          {/* Feature Cards */}
          <div className='min-w-full lg:min-w-[calc(24%-0.75rem)] snap-start'>
          <PropertyCard />
          </div>
        </div>
      </div>
  );
};

export default CardSection;
