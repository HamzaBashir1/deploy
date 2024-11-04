import React from 'react';
import DiscountCard from './DiscountCard';
import { GiPriceTag } from 'react-icons/gi';

const Discount = () => {
  return (
    <div className='py-10 lg:mx-20'>
      <div className='flex flex-row items-center gap-2 pl-5 lg:mb-6'>
        <GiPriceTag className='text-[#292A34] text-2xl lg:text-3xl' />
        <h1 className='text-[#292A34] font-semibold text-lg md:text-xl lg:text-2xl'>
          Action and discounts, Slovakia
        </h1>
      </div>
      <div className='mx-4 lg:mt-10'>
        <div className='flex gap-4 overflow-x-auto flex-nowrap lg:flex-wrap lg:gap-6 lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide'>
          {/* Repeated DiscountCard components */}
          <div className='min-w-[80%] sm:min-w-[60%] md:min-w-[40%] lg:min-w-[10%] xl:min-w-[calc(20%-1.5rem)] snap-start'>
            <DiscountCard />
          </div>
         
         
        </div>
      </div>
    </div>
  );
};

export default Discount;
