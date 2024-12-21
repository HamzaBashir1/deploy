import React, { useContext } from "react";
import HeroSearchForm from "./HeroSearchForm";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LiaHomeSolid } from "react-icons/lia";
import { MdOutlinePlace } from "react-icons/md";
import { FormContext } from "../../FormContext";


const HeroSection = ({ className = "" }) => {
  const {city, updateCity } = useContext(FormContext);
  const searchParams = useSearchParams();
  const title = searchParams.get("title"); // Get the 'title' parameter from the URL
  console.log("Title from URL:", title);
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex flex-col items-start flex-shrink-0 space-y-8 lg:w-1/2 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl !leading-[114%] ">
            {city || "Slovakia"}
          </h2>
          <div className="flex items-center text-base md:text-lg ">
              <MdOutlinePlace /> 
              <span className="ml-2.5">{city || "Slovakia"} </span>
              <span className="mx-5"></span>
              <LiaHomeSolid />
              <span className="ml-2.5">112 properties</span>
          </div>
          <Link href="/listing-stay-map">
            <button className="px-4 py-3 sm:px-6 text-white text-sm sm:text-base relative h-auto inline-flex items-center justify-center bg-[#238869] font-medium rounded-full transition-colors">Start your search</button>
          </Link>
        </div>
        <div className="flex-grow">
          <img className="w-full" src="/hero-right2.png" alt="hero" />
        </div>
      </div>

      <div className="z-10 hidden w-full mb-12 lg:block lg:mb-0 lg:-mt-40">
        <HeroSearchForm />
      </div>
    </div>
    
  );
};

export default HeroSection;
