import Image from 'next/image';
import React from 'react';
import Glacier from '../../../public/Glacier.png';
import mobile from '../../../public/mobile.png';
import Link from 'next/link';

const Section = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center'>
      {/* First Section */}
      <div className='relative flex flex-col items-center text-center w-full md:w-1/2'>
        <div className='relative w-full h-[400px] flex justify-center items-center'>
          {/* Image Container */}
          <div className='relative w-full h-[400px] flex justify-center items-center'>
            <Image
              src={Glacier}
              alt="Glacier image"
              fill  // This ensures the image fills the parent container
              style={{ objectFit: 'cover' }}
              className='w-full h-full'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-black opacity-50'></div>
          </div>
          {/* Text and Button Overlay */}
          <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-4'>
            <h1 className='text-white text-4xl md:text-3xl font-bold mb-4'>
              Rent accommodation<br />with Putko
            </h1>
            <Link href='/BUY'>
            <button className='bg-[#58CAAA] text-white px-4 py-2 rounded hover:bg-[#52c0a1]'>
              View Package
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className='relative flex flex-col items-center text-center w-full md:w-1/2 md:mt-0 mt-[-4px]'>
        <div className='relative w-full h-[400px] flex justify-center items-center'>
          {/* Image Container */}
          <div className='relative w-full h-[400px] flex justify-center items-center'>
            <Image
              src={mobile}
              alt="Mobile image"
              fill  // This ensures the image fills the parent container
              style={{ objectFit: 'cover' }}
              className='w-full h-full'
            />
            {/* Overlay */}
            <div className='absolute inset-0 bg-black opacity-50'></div>
          </div>
          {/* Text and Button Overlay */}
          <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-4'>
            <h1 className='text-white text-4xl md:text-3xl font-bold mb-4'>
              How selection and<br />booking work
            </h1>
            <Link href='/BUY'>
            <button className='bg-[#58CAAA] text-white px-4 py-2 rounded hover:bg-[#52c0a1]'>
              View Package
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
