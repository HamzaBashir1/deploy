import React from 'react';
import FeatureCard from './FeatureCard';
import Link from 'next/link';

const FeatureSection = () => {
  return (
    <div className='py-10 bg-[#F3F4F6]'>
      {/* Header Section */}
      <div className='flex flex-col lg:flex-row lg:justify-between items-center mx-4 lg:mx-20 mb-8'>
        <div className='mb-4 lg:mb-0 text-center lg:text-left'>
          <h1 className='font-bold text-3xl lg:text-4xl text-[#1F2937] pb-3'>Premium Offer</h1>
          <p className='text-[#6B7280] text-base'>See premium accommodation</p>
        </div>
        <Link href='/List-Page'>
        <button className='hidden lg:block bg-white text-[#4B5563] border border-[#4B5563] rounded-full px-4 py-2 hover:bg-[#F3F4F6]' >
          See More →
        </button>
        </Link>
      </div>
      
      {/* Feature Cards Section */}
      <div className='mx-4 sm:mx-20 mt-8'>
        <div className='flex flex-nowrap lg:flex-wrap lg:gap-6 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide'>
          {/* Feature Cards */}
          <div className='min-w-full lg:min-w-[calc(24%-0.75rem)] snap-start'>
            <FeatureCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
