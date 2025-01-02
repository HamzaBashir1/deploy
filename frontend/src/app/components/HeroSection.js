import React from "react";
import HeroSearchForm from "./HeroComponent/HeroSearchForm";
import Link from "next/link";
import Image from "next/image";


const HeroSection = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            Hotel, car & experiences
          </h2>
          <span className="text-base md:text-lg text-neutral-500">
            Accompanying us, you have a trip full of experiences. With Putko,
            booking accommodation, resort villas, hotels
          </span>
          {/* <ButtonPrimary>Start your search</ButtonPrimary> */}
          <Link href="/listing-stay-map">
            <button className="px-4 py-3 sm:px-6 text-white text-sm sm:text-base relative h-auto inline-flex items-center justify-center bg-[#238869] font-medium rounded-full transition-colors">Start your search</button>
          </Link>
        </div>
        <div className="flex-grow">
        <Image
          src="/hero-right.png"
          alt="hero"
          layout="responsive"
          width={1000} // Adjust to your image's original dimensions
          height={600}
          priority // Ensures this image is loaded eagerly
        />
        </div>
      </div>

      <div className="hidden lg:block z-10 mb-12 lg:mb-0 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default HeroSection;
