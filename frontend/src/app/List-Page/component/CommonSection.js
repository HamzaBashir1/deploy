import React from 'react';
import { BiSend } from 'react-icons/bi';
import { CiCalendar, CiVault } from 'react-icons/ci';

const CommonSection = () => {
  return (
    <div className='bg-[#F3F4F6] px-4 py-8 md:px-8 md:py-12 lg:px-16 lg:py-20 flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8'>
      <div className='flex flex-col p-4 md:p-6 border border-[#00000033] rounded-[20px] shadow-lg w-full md:w-[45%] lg:w-[30%]'>
        <CiVault className='text-3xl md:text-4xl mb-3 md:mb-4'/>
        <h1 className='font-bold text-[#292A34] text-lg md:text-xl leading-6 mb-3 md:mb-4'>The best price</h1>
        <p className='text-[#292A34] leading-6 text-sm md:text-base'>
          The prices are determined directly by the accommodation provider and are without increase.
        </p>
      </div>
      <div className='flex flex-col p-4 md:p-6 border border-[#00000033] rounded-[20px] shadow-lg w-full md:w-[45%] lg:w-[30%]'>
        <CiCalendar className='text-3xl md:text-4xl mb-3 md:mb-4'/>
        <h1 className='font-bold text-[#292A34] text-lg md:text-xl leading-6 mb-3 md:mb-4'>Easy booking</h1>
        <p className='text-[#292A34] leading-6 text-sm md:text-base'>
          You communicate and book directly with the accommodation provider.
        </p>
      </div>
      <div className='flex flex-col p-4 md:p-6 border border-[#00000033] rounded-[20px] shadow-lg w-full md:w-[45%] lg:w-[30%]'>
        <BiSend className='text-3xl md:text-4xl mb-3 md:mb-4'/>
        <h1 className='font-bold text-[#292A34] text-lg md:text-xl leading-6 mb-3 md:mb-4'>
          Direct payment to the accommodation provider
        </h1>
        <p className='text-[#292A34] leading-6 text-sm md:text-base'>
          Completely free of fees and commissions, you pay all payments directly to the accommodation provider.
        </p>
      </div>
    </div>
  );
}

export default CommonSection;
