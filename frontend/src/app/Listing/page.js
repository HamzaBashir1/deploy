"use client"
import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Content from './component/Content';
import PropertyStep from './component/PropertyStep'; 
import Footer from "../components/Footer/Footer"

const Page = () => {
  const [showPropertyStep, setShowPropertyStep] = useState(false);

  const handleGetStarted = () => {
    // Hide everything and show only the PropertyStep component
    setShowPropertyStep(true);
  };

  return (
    <div>
      <Navbar />
      {/* Conditionally render either the main content (Navbar, Content) or PropertyStep */}
      {!showPropertyStep ? (
        <>
          {/* Show Navbar and Content when 'showPropertyStep' is false */}
          <Content />
          <div>
            <hr className='bg-[#DDDDDD] h-[2px]' />
            <div className='flex flex-col lg:flex-row lg:justify-between lg:mx-48 py-8 lg:py-10 px-6'>
              <div className='mb-6 lg:mb-0'>
                {/* You can add additional content here if needed */}
              </div>
              <div className='w-full lg:w-auto'>
                <button
                  className='rounded-lg text-white bg-[#4FBE9F] py-4 w-full lg:py-[10px] lg:px-[18px]'
                  onClick={handleGetStarted}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Show only PropertyStep when 'showPropertyStep' is true
        <div className="mt-8">
          <PropertyStep />
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Page;
