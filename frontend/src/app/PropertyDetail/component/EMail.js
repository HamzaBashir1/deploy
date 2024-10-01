import React from 'react'

function EMail() {
  return (
    <div>
    <div className="relative w-full h-[400px] md:h-[400px] lg:h-[400px] mb-10">
    {/* Black overlay */}
    <div className="absolute inset-0 bg-black opacity-60"></div>

    {/* Image */}
    <img
      src='/PropertyDetail.png'
      alt='Email Banner'
      className='object-cover object-center w-full h-full'
    />

    {/* Content Positioned at the Center */}
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-white text-[24px] sm:text-lg md:text-3xl lg:text-3xl mb-2 font-bold leading-10">
        Action, news, and interesting things to email
      </h1>
      <p className="mb-4 text-sm text-white sm:text-lg md:text-xl lg:text-lg">
        Be the first to know about releases, industry news, and insights.
      </p>
      <div className="flex flex-col items-center justify-center w-full max-w-md sm:flex-row">
        <input 
          placeholder='Enter your email' 
          className='w-full px-4 py-2 mb-2 bg-white rounded-lg sm:mb-0 sm:mr-2 sm:w-auto'
        />
        <button className='rounded-lg bg-[#4FBE9F] py-2 px-4 text-white w-full sm:w-auto'>
          Subscribe
        </button>
      </div>
      <p className='mt-2 text-xs text-white'>
        We care about your data in our <span className='underline'>privacy policy</span>
      </p>
    </div>
  </div>
    </div>
  )
}

export default EMail
