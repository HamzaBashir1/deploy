import Image from 'next/image';
import React from 'react';
import section from '../../../../public/section.png';

const Section = () => {
  return (
    <div className="relative flex flex-col md:flex-row w-full max-w-[1540px] h-auto md:h-[480px] mx-auto bg-[#292A34] rounded-[20px] overflow-hidden ">
      {/* Mobile design: gradient before image */}
      <div className="relative w-full md:w-[70%] h-[240px] md:h-full overflow-hidden md:order-1 order-2">
        <div className="absolute inset-0 bg-gradient-to-l from-[#292A34] to-transparent z-10" />
        <Image
          src={section}
          alt="Section background"
          fill
          className="w-full h-full"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col justify-center md:items-start p-8 text-left space-y-4 order-1 md:order-2">
        <h1 className="text-white text-[20px] md:text-[34px] leading-[28px] md:leading-[44px] font-semibold">
          Rent accommodation <br />
          with Putko and <span className="text-[#4FBE9F]">guests <br /> pay you directly</span>
        </h1>
        <button className="bg-[#4FBE9F] text-white rounded-[6px] py-[10px] md:py-[15.5px] px-[16px] md:px-[25px] w-full md:w-[192px] h-[40px] md:h-[48px] flex items-center justify-center shadow-md hover:bg-[#3fae8b] transition duration-300">
          <span className="text-[14px] md:text-[17px] font-semibold">More information</span>
        </button>
      </div>
    </div>
  );
};

export default Section;
