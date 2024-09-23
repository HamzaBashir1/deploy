import React from 'react';

const Content = () => {
  return (
    <section>
      <div className='flex flex-col lg:flex-row gap-10 items-center mx-6 lg:mx-24 my-16 lg:my-32'>
        {/* Main Title Section */}
        <div className='mb-6 md:mb-0 md:mr-0 lg:mr-96 '>
          <h1 className='text-[#222222] text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-medium'>
            It’s easy to get <br /> started on Putko
          </h1>
        </div>

        {/* Steps Section */}
        <div className='flex flex-col space-y-6'>
          {/* Step 1 */}
          <div className='flex flex-row gap-2 lg:gap-10'>
            <div className='flex flex-row'>
              <h1 className='font-bold text-lg md:text-xl'>1</h1>
            </div>
            <div className='flex flex-col'>
              <h2 className='font-bold text-[#222222] text-lg md:text-xl'>
                Tell us about your place
              </h2>
              <p className='text-[#6A6A6A] text-sm sm:text-md md:text-lg'>
                Share some basic info, such as where it is and how <br className='hidden md:block' />
                many guests can stay.
              </p>
            </div>
            <div className='ml-auto mt-4 md:mt-0'>
              <img className='w-12 sm:w-16 md:w-24' src='/bed.png' alt='Bed Icon' />
            </div>
          </div>
          <hr />

          {/* Step 2 */}
          <div className='flex flex-row gap-2 lg:gap-10'>
            <div className='flex flex-row'>
              <h1 className='font-bold text-lg md:text-xl'>2</h1>
            </div>
            <div className='flex flex-col'>
              <h2 className='font-bold text-[#222222] text-lg md:text-xl'>
                Make it stand out
              </h2>
              <p className='text-[#6A6A6A] text-sm sm:text-md md:text-lg'>
                Add 5 or more photos plus a title and description –<br className='hidden md:block' />
                we’ll help you out.
              </p>
            </div>
            <div className='ml-auto mt-4 md:mt-0'>
              <img className='w-12 sm:w-16 md:w-24' src='/wadrobe.png' alt='Price Icon' />
            </div>
          </div>
          <hr />

          {/* Step 3 */}
          <div className='flex flex-row gap-2 lg:gap-10'>
            <div className='flex flex-row'>
              <h1 className='font-bold text-lg md:text-xl'>3</h1>
            </div>
            <div className='flex flex-col'>
              <h2 className='font-bold text-[#222222] text-lg md:text-xl'>
                Finish up and publish
              </h2>
              <p className='text-[#6A6A6A] text-sm sm:text-md md:text-lg'>
                Choose a starting price, verify a few details, then<br className='hidden md:block' />
                publish your listing.
              </p>
            </div>
            <div className='ml-auto mt-4 md:mt-0'>
              <img className='w-12 sm:w-16 md:w-24' src='/door.png' alt='Photos Icon' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
