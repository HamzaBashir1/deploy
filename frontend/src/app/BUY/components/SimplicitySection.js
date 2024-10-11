"use client";
import React from "react";
import Image from 'next/image';
import section from '../../../../public/s.png';

function SimplicitySection() {
  return (
    <> 
    <div className="relative flex flex-col md:flex-row  h-auto md:h-[480px] bg-[#292A34] overflow-hidden">
      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center md:items-start p-8 text-left space-y-4 order-1">
        <h1 className="text-white text-[20px]  md:text-[40px] leading-[28px] md:leading-[44px] font-semibold">
        Speed, clarity and <br />simplicity 
        </h1>
        <div className="lg:w-[422px] w-[322px] ">
        <p className="text-md lg:text-lg text-white ">
        Our goal is to <span className="font-semibold">save your time</span> thanks to the simplicity
        and clarity of the system. We bring you an effective tool for acquiring new customers.
      </p>
      </div>
      </div>

      {/* Image Section */}
      <div className="relative w-full md:w-[70%] h-[240px] md:h-full overflow-hidden md:order-2 order-2 ">
        <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-[#292A34]  to-transparent z-10" />
        <Image
          src={section}
          alt="Section background"
          fill
          className="w-full h-full"
        />
      </div>
    </div>
    </>
  );
}

export default SimplicitySection;
