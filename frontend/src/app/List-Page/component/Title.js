"use client"
import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

const Title = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='pt-40 lg:mx-20 mx-4'>
      <h1 className='font-bold text-[#292A34] text-3xl mb-2'>Accommodation</h1>
      <p className='text-[#54555D] text-base mb-10'>
        See accommodation for rent at the best price directly from the accommodation provider.
      </p>

      <div className='flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0 pb-10'>
        <div className='flex flex-wrap gap-2'>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]'>Location</button>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]'>Date from - to</button>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm px-5 text-[10px]'>Number of persons</button>
        </div>

        <div className='flex flex-wrap items-center gap-2 lg:gap-3'>
          <button className='bg-[#E7EAEE] rounded-lg py-[9.5px] lg:text-sm text-[10px] px-5 flex items-center'>
            <BsFilter className='mr-2' /> Filter
          </button>
          <p className='text-[10px] lg:text-sm'>Sort by:</p>

          <div className='relative'>
            <button
              onClick={toggleDropdown}
              id='dropdownDefaultButton'
              className='text-[10px] lg:text-sm font-bold text-black rounded-lg px-2 py-2.5 text-center inline-flex items-center'
              type='button'
            >
              Dropdown button
              <svg
                className='w-2.5 h-2.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 10 6'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m1 1 4 4 4-4'
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div
                id='dropdown'
                className='absolute z-10 mt-1 divide-y divide-gray-100 rounded-lg shadow w-28 sm:w-36 lg:w-44 bg-white'
              >
                <ul className='py-2 text-xs sm:text-sm text-gray-700'>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 hover:bg-gray-100'
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button className='bg-[#E7EAEE] lg:text-sm rounded-lg py-[9.5px] text-[10px] px-5 flex items-center'>
            <BsFilter className='mr-2' /> Map
          </button>
        </div>
      </div>
    </div>
  );
};

export default Title;
