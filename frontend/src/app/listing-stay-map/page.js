"use client"

import React, { Suspense } from "react";
import SectionGridHasMap from "./component/SectionGridHasMap";
import HeroSection from "./component/HeroSection";
import BgGlassmorphism from "../components/BgGlassmorphism";
import Subscribe from "../components/Subscribe";
import BackgroundSection from "../components/BackgroundSection";
import GridAuthorBox from "../components/GridAuthorBox";
import Footer from "../components/Footer/Footer";
import Loading from "../components/Loader/Loading";

const page = () => {
  return (
    <div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
        <BgGlassmorphism />
        <HeroSection/>
      </div>
      <div className=" pb-24 lg:pb-28 2xl:pl-10 xl:pr-0 xl:max-w-none">
        <Suspense fallback={<Loading />}>
          <SectionGridHasMap />
        </Suspense>
      </div>
      <div className="container relative mb-24 space-y-24 lg:space-y-28 lg:mb-28">
        <Subscribe />
      
        <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <GridAuthorBox />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default page;