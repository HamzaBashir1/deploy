import React from 'react';
import PropertyCard from './PropertyCard';

const CardSection = () => {
  return (
    <div className="mx-4 sm:mx-20 mt-8">
      <div className="flex flex-nowrap lg:flex-wrap gap-4 lg:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide">
        {/* Mobile layout: Display PropertyCards in a single row and center them */}
        <div className="flex justify-center items-center min-w-full sm:min-w-[60%] md:min-w-[40%] lg:min-w-[10%] xl:min-w-[calc(20%-1.5rem)] snap-start sm:hidden">
          <PropertyCard />
        </div>

        {/* Desktop layout: Use this section for the original design */}
        <div className="hidden sm:flex gap-4">
          <PropertyCard />
        </div>
      </div>
    </div>
  );
};

export default CardSection;
