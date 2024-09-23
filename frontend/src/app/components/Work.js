import React from 'react';

const Work = () => {
  return (
    <div className='lg:py-20 py-5 px-4 md:px-8 lg:px-16 bg-white'>
      <h1 className='font-bold text-2xl sm:text-3xl lg:text-4xl text-center mb-6'>
        How it Works
      </h1>
      <p className='text-center text-base sm:text-lg font-normal mb-10 text-gray-400'>
        Accommodation
      </p>

      <div className='flex flex-col md:flex-row md:justify-center gap-8 md:gap-12 lg:gap-60'>
        <div className='flex flex-col items-center text-center max-w-xs mb-8 md:mb-0'>
          <img 
            src='/aero.png'
            alt='Book & Relax'
            className='w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 object-cover'
          />
          <h2 className='text-base sm:text-lg lg:text-sm font-bold mb-2'>Book & Relax</h2>
          <p className='text-xs sm:text-sm lg:text-[10px]'>
            Let each trip be an inspirational journey,<br />each room a peaceful space
          </p>
        </div>
        <div className='flex flex-col items-center text-center max-w-xs mb-8 md:mb-0'>
          <img 
            src='/sunny.png'
            alt='Sunny Days'
            className='w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 object-cover'
          />
          <h2 className='text-base sm:text-lg lg:text-sm font-bold mb-2'>Smart checklist</h2>
          <p className='text-xs sm:text-sm lg:text-[10px]'>
            Let each trip be an inspirational journey,<br />each room a peaceful space
          </p>
        </div>
        <div className='flex flex-col items-center text-center max-w-xs mb-8 md:mb-0'>
          <img 
            src='/camera.png'
            alt='Capture Moments'
            className='w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mb-4 object-cover'
          />
          <h2 className='text-base sm:text-lg lg:text-sm font-bold mb-2'>Save more</h2>
          <p className='text-xs sm:text-sm lg:text-[10px]'>
            Let each trip be an inspirational journey,<br />each room a peaceful space
          </p>
        </div>
      </div>
    </div>
  );
}

export default Work;
